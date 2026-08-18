import { copypartyConf } from '../fileModels/copyparty.conf'
import { sdk } from '../sdk'

export const seedFiles = sdk.setupOnInit(async (effects) => {
  await copypartyConf.merge(effects, {})
})
