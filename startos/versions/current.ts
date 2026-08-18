import { IMPOSSIBLE, VersionInfo } from '@start9labs/start-sdk'

export const current = VersionInfo.of({
  version: '1.20.20:0',
  releaseNotes: {
    en_US: 'Initial release of copyparty for StartOS.',
    es_ES: 'Versión inicial de copyparty para StartOS.',
    de_DE: 'Erstveröffentlichung von copyparty für StartOS.',
    pl_PL: 'Pierwsze wydanie copyparty dla StartOS.',
    fr_FR: 'Version initiale de copyparty pour StartOS.',
  },
  migrations: {
    up: async () => {},
    down: IMPOSSIBLE,
  },
})
