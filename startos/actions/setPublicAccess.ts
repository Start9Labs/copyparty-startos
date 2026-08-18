import { copypartyConf } from '../fileModels/copyparty.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

const { InputSpec, Value } = sdk

export const inputSpec = InputSpec.of({
  publicRead: Value.toggle({
    name: i18n('Allow Public Downloads'),
    description: i18n(
      'When enabled, anyone who can reach copyparty may browse and download your files without signing in. Uploading, renaming, and deleting always require the admin password.',
    ),
    default: false,
  }),
})

export const setPublicAccess = sdk.Action.withInput(
  'set-public-access',

  async () => ({
    name: i18n('Public Access'),
    description: i18n(
      'Choose whether visitors can browse and download your files without signing in',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  inputSpec,

  async ({ effects }) => ({
    publicRead: (await copypartyConf.read().once())?.publicRead,
  }),

  async ({ effects, input }) =>
    copypartyConf.merge(effects, { publicRead: input.publicRead }),
)
