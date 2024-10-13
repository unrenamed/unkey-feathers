// For more information about this file see https://dove.feathersjs.com/guides/cli/authentication.html
import type { Application } from './declarations'
import {
  AuthenticationBaseStrategy,
  AuthenticationResult,
  AuthenticationService,
  JWTStrategy
} from '@feathersjs/authentication'
import { NotAuthenticated } from '@feathersjs/errors'
import { verifyApiKey } from './unkey'
import { LocalStrategy } from '@feathersjs/authentication-local'

declare module './declarations' {
  interface ServiceTypes {
    authentication: AuthenticationService
  }
}

class UnkeyApiKeyStrategy extends AuthenticationBaseStrategy {
  app: Application

  constructor(app: Application) {
    super()
    this.app = app
  }

  async authenticate(authentication: AuthenticationResult) {
    const { apiKey } = authentication

    const { result, error } = await verifyApiKey(apiKey as string)
    if (error || !result.valid) throw new NotAuthenticated('Invalid or expired API Key')

    return {
      apiKey: true,
      valid: result.enabled,
      permissions: result.permissions,
      expires: result.expires
    }
  }
}

export const authentication = (app: Application) => {
  const authentication = new AuthenticationService(app)

  authentication.register('apiKey', new UnkeyApiKeyStrategy(app))
  authentication.register('local', new LocalStrategy())
  authentication.register('jwt', new JWTStrategy())

  app.use('authentication', authentication)
}
