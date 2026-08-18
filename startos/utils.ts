import { sdk } from './sdk'

export const uiPort = 3923
export const dataPath = '/w'
export const configPath = '/cfg'

export const adminUsername = 'admin'

export const randomPassword = {
  charset: 'a-z,A-Z,1-9',
  len: 22,
}

export const mounts = sdk.Mounts.of()
  .mountVolume({
    volumeId: 'data',
    subpath: null,
    mountpoint: dataPath,
    readonly: false,
  })
  .mountVolume({
    volumeId: 'config',
    subpath: null,
    mountpoint: configPath,
    readonly: false,
  })
