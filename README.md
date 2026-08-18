<p align="center">
  <img src="icon.svg" alt="copyparty Logo" width="21%">
</p>

# copyparty on StartOS

> Everything not listed in this document should behave the same as upstream
> copyparty. If a feature, setting, or behavior is not mentioned here, the
> upstream documentation is accurate and fully applicable — see the
> Documentation section of `instructions.md` for links.

[copyparty](https://github.com/9001/copyparty) is a file server with a browser UI, resumable chunked uploads, a media indexer, thumbnails and WebDAV, all from a single process. On StartOS its files and its server state live on separate volumes, the whole configuration is generated from two package-owned settings, and the single `admin` account is created by an action rather than by editing a config file.

- **Upstream repo:** <https://github.com/9001/copyparty>
- **Wrapper repo:** <https://github.com/Start9Labs/copyparty-startos>

---

## Table of Contents

- [Image and Container Runtime](#image-and-container-runtime)
- [Volume and Data Layout](#volume-and-data-layout)
- [File Models](#file-models)
- [Dependencies](#dependencies)
- [Network Access and Interfaces](#network-access-and-interfaces)
- [Installation and First-Run Flow](#installation-and-first-run-flow)
- [Actions](#actions)
- [Tasks](#tasks)
- [Health Checks](#health-checks)
- [Backups and Restore](#backups-and-restore)
- [Limitations and Differences](#limitations-and-differences)
- [Quick Reference for AI Consumers](#quick-reference-for-ai-consumers)

---

## Image and Container Runtime

The upstream image is used unmodified, with its own entrypoint, and one subcontainer runs the service.

| Property      | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| Image         | `copyparty/ac`                                                     |
| Architectures | x86_64, aarch64                                                    |
| Entrypoint    | Upstream default                                                   |
| Runs as       | root — the image declares no `USER`                                |
| Subcontainer  | `copyparty-sub` — the `primary` daemon, and the one to `attach` to |

The `ac` edition bundles FFmpeg, Pillow and Mutagen, which is what makes media thumbnails, audio transcoding and tag indexing work.

The entrypoint applies a bootstrap config baked into the image — `chdir: /w` and `no-crt` — and ends with `% /cfg`, which includes every `*.conf` file in that directory in alphabetical order. That include is what loads the package's own config, and it is also the escape hatch described under [File Models](#file-models).

Because the container runs as root, mounted volumes need no ownership fixup and there is no `chown` oneshot. No StartOS-managed environment variables are set; everything is driven by the generated config file.

## Volume and Data Layout

Two volumes, split so the user's files stay separate from server state.

| Volume   | Mount Point | Purpose                                                            |
| -------- | ----------- | ------------------------------------------------------------------ |
| `data`   | `/w`        | The user's files — the single tree copyparty serves                |
| `config` | `/cfg`      | Generated config, salts, sessions, the search index and thumbnails |

`/cfg` is also `XDG_CONFIG_HOME` in the image, so copyparty's own runtime state lands under `/cfg/copyparty/` — the session database and the `ah-salt.txt`, `fk-salt.txt` and `dk-salt.txt` files that make stored passwords and shared file links reproducible across restarts.

The config sets `hist: /cfg/hists/`, which moves the search index and thumbnail cache off the data volume. Upstream's default puts them in a `.hist` directory at the root of each volume, which here would mean server state sitting in among the user's own files.

The config also sets `df: 4`, reserving 4 GiB on the data volume; uploads are refused below that. Upstream reserves nothing.

## File Models

One model, bound to `/cfg/00-startos.conf`, and every value in it except two is fixed.

| File              | Format                               | Modelled               | Written by                |
| ----------------- | ------------------------------------ | ---------------------- | ------------------------- |
| `00-startos.conf` | copyparty's own indented text format | Yes — `FileHelper.raw` | Install, and both actions |

copyparty's config is a bespoke format, not YAML, despite the modeline upstream puts in its examples — so the model is a `FileHelper.raw` with a hand-written renderer and parser rather than a schema over a standard encoding.

**Enforced** — rewritten whenever the package writes the file: the global block (`http-only`, `e2dsa`, `e2ts`, `ansi`, `name`, `hist`, `df`) and the single `/` volume pointing at `/w`. A hand edit to any of them is discarded on the next action.

**Yours:** the admin password, through Set Admin Password, and anonymous read, through Public Access. The password is stored in this file in cleartext — copyparty hashes account passwords only when `--ah-alg` is set, and the package leaves it unset — so the file is as sensitive as the credential, and rotating it means re-running the action rather than editing the file.

The `00-` prefix is load-bearing. Because the image's bootstrap includes every `*.conf` in `/cfg` alphabetically, a later filename such as `99-custom.conf` is loaded after this one and is never overwritten, which is how a user adds settings the package does not expose. Two properties of the format bite there and are both reported in the service log at startup: an inline comment needs _two_ spaces before its `#`, and an account with no matching entry in an `accs:` block silently has guest-level access rather than none.

## Dependencies

None.

## Network Access and Interfaces

One interface. copyparty serves its web UI and WebDAV from the same port, so both reach the user over the one address StartOS assigns.

| Interface | Id   | Type | Port | Description                                      |
| --------- | ---- | ---- | ---- | ------------------------------------------------ |
| Web UI    | `ui` | ui   | 3923 | The copyparty web interface, also serving WebDAV |

The port is bound on the `main` MultiHost and is not masked. The config sets `http-only`: TLS termination is StartOS's job, and leaving it on would make copyparty generate and serve its own self-signed certificate.

## Installation and First-Run Flow

There is no first-run screen, and no account exists until you create one.

1. Install writes `/cfg/00-startos.conf` with an empty `[accounts]` block.
2. A `critical` task is raised pointing at Set Admin Password.
3. Running that action generates the credential, writes it into the config, and clears the task.

`critical` blocks the service from starting, so the window in which copyparty has no account is one in which it is not serving either. It is fail-closed in any case: with a config present and no accounts defined, nobody — including anonymous visitors — has any permission.

`main.ts` reads the config reactively, so both actions take effect on their own. Writing either value restarts the service; there is nothing to apply by hand.

## Actions

Two actions, both user-facing, matching the two decisions the package leaves open.

### Set Admin Password

Generates a new random password for the `admin` account. Run it when the install task prompts, and any time you need to rotate the credential.

- **What it changes:** the `[accounts]` block of `/cfg/00-startos.conf`.
- **Availability:** any status.
- **Cost:** seconds, then a restart.
- **Repeat safety:** safe to re-run; the previous password stops working immediately and open sessions on other devices are ended.
- **Outputs:** the username and the new password, the password masked and copyable, shown once.

### Public Access

Turns anonymous read on or off. Off, only the admin account can reach anything; on, anyone who can reach the address may browse and download without signing in. Uploading, renaming and deleting always require the admin password.

- **What it changes:** the `accs:` block of the `/` volume — `A: admin` alone when off, plus `r: *` when on.
- **Availability:** any status.
- **Cost:** seconds, then a restart.
- **Repeat safety:** idempotent and reversible; the form is pre-filled with the current value.

copyparty has no global public switch, so this one boolean is the package's own mapping onto its per-volume ACL model.

## Tasks

One task, raised at install, and it blocks the service until you clear it.

| Task               | Severity   | Raised when                          | Cleared when    |
| ------------------ | ---------- | ------------------------------------ | --------------- |
| Set Admin Password | `critical` | The config defines no admin password | The action runs |

The condition is re-evaluated on every init, so the task returns if the password is ever removed from the config by hand.

## Health Checks

One check, on the only daemon.

| Check     | Displayed       | Method                                  |
| --------- | --------------- | --------------------------------------- |
| `primary` | "Web Interface" | `GET /` on the local port, 2xx required |

The status code carries the diagnosis, which is why the check asserts one rather than merely reaching the port. copyparty answers `/` with a login splash at 200 whether or not the caller is authenticated and whether or not public access is on, but returns **500** when it finds no `.conf` file in `/cfg` at all and trips its failsafe, denying every request rather than defaulting to open. A failing check therefore means the process is down, or up and refusing to serve — and the second case is recoverable by re-running Set Admin Password, which rewrites the config.

`/?h` and `/?hc` are deliberately not used: both answer 200 even with the failsafe tripped, so a check against either reports healthy on a service that is serving nothing.

## Backups and Restore

Both volumes are copied wholesale — there is no database to dump, since copyparty's state is plain files.

- **Included:** every file on `data`, the generated config, the salts and session database under `/cfg/copyparty/`, and the search index under `/cfg/hists/`.
- **Excluded:** `hists/*/th`, the thumbnail cache, which is regenerated on demand. The search index is kept, because rebuilding it means a full rescan of the data volume.
- **Restore:** complete. The salts matter more than their size suggests — `ah-salt.txt` is what keeps stored passwords valid and `fk-salt.txt` what keeps previously shared file links resolving, so a restore without them would invalidate both.

Note the size implication: `data` is the whole file tree, so the backup is as large as what you have stored.

## Limitations and Differences

1. **Only the HTTP interface is published.** copyparty can also speak FTP, SFTP, TFTP and SMB. The package declares no interface for any of them, so enabling one in a custom config yields a port nothing routes to.
2. **Zeroconf discovery cannot work here.** mDNS and SSDP depend on LAN multicast, which does not usefully cross the StartOS container bridge.
3. **Uploads are refused when the data volume has less than 4 GiB free**, and are briefly refused at every startup while the index scan runs. Both come from settings the package turns on (`df`, `-e2dsa`/`-e2ts`) that upstream leaves off.
4. **The `admin` account is the only one the package manages.** Accounts added through a custom config are outside its reach: it will not create, rotate or report on them.
5. **No riscv64 build.** x86_64 and aarch64 only.

---

## Quick Reference for AI Consumers

```yaml
package_id: copyparty
image: copyparty/ac
architectures:
  - x86_64
  - aarch64
subcontainers:
  - copyparty-sub # the running daemon
volumes:
  data: /w
  config: /cfg
file_models:
  - /cfg/00-startos.conf
startos_managed_env_vars: []
dependencies: []
interfaces:
  ui: { type: ui, port: 3923 } # web UI and WebDAV on the same port
actions:
  - set-admin-password
  - set-public-access
tasks:
  - { action: set-admin-password, severity: critical }
health_checks:
  - primary # the daemon's ready check, displayed "Web Interface"
```
