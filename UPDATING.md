# Updating the upstream version

## Determining the upstream version

**copyparty** — [9001/copyparty](https://github.com/9001/copyparty):

```sh
gh release view -R 9001/copyparty --json tagName -q .tagName
```

All copyparty releases are stable; the project publishes no alpha, beta, or rc tags.

The Docker tag **drops the leading `v`** — git `v1.20.20` is published as `1.20.20`. Confirm the tag exists before pinning it, and confirm both architectures are present:

```sh
curl -fsSL "https://hub.docker.com/v2/repositories/copyparty/ac/tags/<version>" \
  | jq -r '.images[] | "\(.architecture) \(.os)"'
```

Expect `amd64 linux` and `arm64 linux`. Images are pushed by hand from `scripts/docker/make.sh` rather than by CI, so a tagged release occasionally has no image — `1.20.15` is an existing gap. If the newest release has no image, pin the newest one that does.

`ghcr.io/9001/copyparty-ac` carries the same tags and is a valid alternative if Docker Hub rate limits become a problem.

## Applying the bump

Edit `startos/manifest/index.ts` and set `dockerVersion` to the new version, then bump `version` and rewrite `releaseNotes` in `startos/versions/current.ts`.

The `ac` edition is the one to track. Upstream also publishes `min`, `im`, `iv`, and `dj`; `ac` is upstream's recommended general-purpose build and the only one that carries both target architectures along with FFmpeg.

Read the [changelog](https://github.com/9001/copyparty/blob/hovudstraum/docs/changelog.md) for the range being crossed. Pay particular attention to changes in the config-file parser or the permission characters, since `startos/fileModels/copyparty.conf.ts` renders that format directly.
