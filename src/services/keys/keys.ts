// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  keyDataValidator,
  keyResolver,
  keyExternalResolver,
  keyDataResolver,
  keyQueryValidator,
  keyQueryResolver
} from './keys.schema'

import type { Application } from '../../declarations'
import { KeyService, getOptions } from './keys.class'
import { keyPath, keyMethods } from './keys.shared'

export * from './keys.class'
export * from './keys.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const key = (app: Application) => {
  // Register our service on the Feathers application
  app.use(keyPath, new KeyService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: keyMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(keyPath).hooks({
    around: {
      all: [schemaHooks.resolveExternal(keyExternalResolver), schemaHooks.resolveResult(keyResolver)]
    },
    before: {
      all: [schemaHooks.validateData(keyQueryValidator), schemaHooks.resolveData(keyQueryResolver)],
      create: [schemaHooks.validateData(keyDataValidator), schemaHooks.resolveData(keyDataResolver)]
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [keyPath]: KeyService
  }
}
