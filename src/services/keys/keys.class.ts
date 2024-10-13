// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Key, KeyData, KeyPatch, KeyQuery } from './keys.schema'
import { createApiKey } from '../../unkey'
import { GeneralError } from '@feathersjs/errors'

export type { Key, KeyData, KeyPatch, KeyQuery }

export interface KeyServiceOptions {
  app: Application
}

export interface KeyParams extends Params<KeyQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class KeyService<ServiceParams extends KeyParams = KeyParams>
  implements ServiceInterface<Key, KeyData, ServiceParams, KeyPatch>
{
  constructor(public options: KeyServiceOptions) {}

  async create(data: KeyData, params?: ServiceParams): Promise<Key>
  async create(data: KeyData[], params?: ServiceParams): Promise<Key[]>
  async create(data: KeyData | KeyData[], params?: ServiceParams): Promise<Key | Key[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }
    const created = await createApiKey()
    if (created.error) throw new GeneralError(created.error)
    return { ...created.result }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}
