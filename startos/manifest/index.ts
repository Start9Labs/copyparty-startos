import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

const dockerImage = 'copyparty/ac'
const dockerVersion = '1.20.20'

export const manifest = setupManifest({
  id: 'copyparty',
  title: 'copyparty',
  license: 'MIT',
  packageRepo: 'https://github.com/Start9Labs/copyparty-startos',
  upstreamRepo: 'https://github.com/9001/copyparty',
  marketingUrl: 'https://github.com/9001/copyparty',
  donationUrl: 'https://github.com/sponsors/9001',
  description: { short, long },
  volumes: ['data', 'config'],
  images: {
    copyparty: {
      source: {
        dockerTag: `${dockerImage}:${dockerVersion}`,
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  dependencies: {},
})
