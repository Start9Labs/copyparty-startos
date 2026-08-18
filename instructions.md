# copyparty

## Documentation

- [copyparty README](https://github.com/9001/copyparty#readme) — the full upstream manual, including every configuration option.
- [Accounts and volumes](https://github.com/9001/copyparty#accounts-and-volumes) — how copyparty's permission model works, if you want to add more users.

## What you get on StartOS

copyparty gives you a private place to put files and get them back from any device. It is built for large transfers: uploads are split into chunks and resume where they left off, so a big video that dies halfway through picks up rather than starting over, and there is no size limit.

Your files live in a single folder on your server. copyparty indexes them so search is instant, makes thumbnails for images and video, and plays music and video right in the browser. You can also connect to it as a network drive from Windows, macOS, or Linux — no app to install.

## Getting set up

1. Install copyparty. StartOS will show a task telling you to set an admin password — the service will not start until you do.
2. Run the **Set Admin Password** action. It generates a strong password and shows it to you once. **Copy it into your password manager now.** You can re-run the action later if you lose it, but that replaces the old password.
3. Start copyparty and open the **Web UI**.
4. Sign in. copyparty asks only for the password — there is no username field until you add a second account.

## Using copyparty

### Web interface

Drag files onto the page to upload them. Large uploads show per-chunk progress and survive a closed laptop lid or a dropped connection — reopen the page and they continue.

The magnifying glass searches by name, and also by media tag once copyparty has finished indexing. A first index of a large folder takes a while; it runs in the background and search improves as it goes.

### Connecting as a network drive

copyparty serves WebDAV on the same address as the web interface, so you can mount it as a drive:

- **Windows** — File Explorer, right-click _This PC_ → _Map network drive_, and enter your copyparty address.
- **macOS** — Finder, _Go_ → _Connect to Server_, and enter your copyparty address.
- **Linux** — in most file managers, _Other Locations_ → _Connect to Server_, prefixing the address with `davs://`.

Sign in with `admin` and your admin password.

### Actions

**Set Admin Password** — generates a new random password. Use it the first time, and any time you want to rotate the credential. The old password stops working immediately, and anyone signed in on another device will have to sign in again.

**Public Access** — off by default. Turn it on and anyone who can reach your copyparty address can browse and download your files without signing in. Uploading, renaming, and deleting still require the admin password. Turn it on if you want to hand out links to people; leave it off if this is only for you.

### Adding more accounts

The package sets up one `admin` account. If you want more, add a file ending in `.conf` to copyparty's config folder — for example `99-custom.conf` — and copyparty will load it alongside the one StartOS manages. The [upstream accounts documentation](https://github.com/9001/copyparty#accounts-and-volumes) covers the syntax. Don't edit `00-startos.conf` itself; StartOS overwrites it whenever you run an action.
