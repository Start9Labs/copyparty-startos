import { utils } from '@start9labs/start-sdk'
import { copypartyConf } from '../fileModels/copyparty.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'
import { adminUsername, randomPassword } from '../utils'

export const setAdminPassword = sdk.Action.withoutInput(
  'set-admin-password',

  async () => ({
    name: i18n('Set Admin Password'),
    description: i18n(
      'Generate a new random password for the copyparty admin account. Replaces any existing password.',
    ),
    warning: null,
    allowedStatuses: 'any',
    group: null,
    visibility: 'enabled',
  }),

  async ({ effects }) => {
    const adminPassword = utils.getDefaultString(randomPassword)
    await copypartyConf.merge(effects, { adminPassword })

    return {
      version: '1',
      title: i18n('Admin Credentials'),
      message: i18n(
        'Use these credentials to sign in to copyparty. Write them down or save them to a password manager.',
      ),
      result: {
        type: 'group',
        value: [
          {
            type: 'single',
            name: i18n('Username'),
            description: null,
            value: adminUsername,
            masked: false,
            copyable: true,
            qr: false,
          },
          {
            type: 'single',
            name: i18n('Password'),
            description: null,
            value: adminPassword,
            masked: true,
            copyable: true,
            qr: false,
          },
        ],
      },
    }
  },
)
