import { sdk } from '../sdk'
import { setAdminPassword } from './setAdminPassword'
import { setPublicAccess } from './setPublicAccess'

export const actions = sdk.Actions.of()
  .addAction(setAdminPassword)
  .addAction(setPublicAccess)
