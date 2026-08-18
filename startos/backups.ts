import { sdk } from './sdk'

export const { createBackup, restoreInit } = sdk.setupBackups(async () =>
  sdk.Backups.withOptions()
    .addVolume('data')
    // hists holds the search index and thumbnail cache; copyparty rebuilds both.
    .addVolume('config', {
      options: { delete: true, exclude: ['hists/*/th'] },
    }),
)
