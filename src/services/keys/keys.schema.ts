// // For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve } from '@feathersjs/schema'
import { Type, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { KeyService } from './keys.class'

// Main data model schema
export const keySchema = Type.Object(
  {
    key: Type.Optional(Type.String()),
    keyId: Type.Optional(Type.String())
  },
  { $id: 'Key', additionalProperties: false }
)
export type Key = Static<typeof keySchema>
export const keyValidator = getValidator(keySchema, dataValidator)
export const keyResolver = resolve<Key, HookContext<KeyService>>({})

export const keyExternalResolver = resolve<Key, HookContext<KeyService>>({})

// Schema for creating new entries
export const keyDataSchema = Type.Pick(keySchema, [], {
  $id: 'KeyData'
})
export type KeyData = Static<typeof keyDataSchema>
export const keyDataValidator = getValidator(keyDataSchema, dataValidator)
export const keyDataResolver = resolve<Key, HookContext<KeyService>>({})

// Schema for updating existing entries
export const keyPatchSchema = Type.Partial(keySchema, {
  $id: 'KeyPatch'
})
export type KeyPatch = Static<typeof keyPatchSchema>
export const keyPatchValidator = getValidator(keyPatchSchema, dataValidator)
export const keyPatchResolver = resolve<Key, HookContext<KeyService>>({})

// Schema for allowed query properties
export const keyQueryProperties = Type.Pick(keySchema, ['key', 'keyId'])
export const keyQuerySchema = Type.Intersect(
  [
    querySyntax(keyQueryProperties),
    // Add additional query properties here
    Type.Object({}, { additionalProperties: false })
  ],
  { additionalProperties: false }
)
export type KeyQuery = Static<typeof keyQuerySchema>
export const keyQueryValidator = getValidator(keyQuerySchema, queryValidator)
export const keyQueryResolver = resolve<KeyQuery, HookContext<KeyService>>({})
