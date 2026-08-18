import { setAdminPassword } from '../actions/setAdminPassword'
import { copypartyConf } from '../fileModels/copyparty.conf'
import { i18n } from '../i18n'
import { sdk } from '../sdk'

export const watchCredentials = sdk.setupOnInit(async (effects) => {
  const conf = await copypartyConf.read().const(effects)

  if (!conf?.adminPassword) {
    await sdk.action.createOwnTask(effects, setAdminPassword, 'critical', {
      reason: i18n('Set the admin password before signing in to copyparty'),
    })
  }
})
