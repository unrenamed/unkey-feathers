// For more information about this file see https://dove.feathersjs.com/guides/cli/service.shared.html
import type { Params } from '@feathersjs/feathers'
import type { ClientApplication } from '../../client'
import type { Key, KeyData, KeyPatch, KeyQuery, KeyService } from './keys.class'

export type { Key, KeyData, KeyPatch, KeyQuery }

export type KeyClientService = Pick<KeyService<Params<KeyQuery>>, (typeof keyMethods)[number]>

export const keyPath = 'keys'

export const keyMethods: Array<keyof KeyService> = ['create']

export const keyClient = (client: ClientApplication) => {
  const connection = client.get('connection')

  client.use(keyPath, connection.service(keyPath), {
    methods: keyMethods
  })
}

// Add this service to the client service type index
declare module '../../client' {
  interface ServiceTypes {
    [keyPath]: KeyClientService
  }
}
