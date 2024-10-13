import { HookContext, NextFunction } from '@feathersjs/feathers'

// This hook sets `params.authentication` if it does not exist and if `params.provider`
// exists  (which means it is an external call) to use that `apiKey` strategy.
export default () => async (context: HookContext, next: NextFunction) => {
  const { params, app } = context

  const headerField = app.get('authentication').apiKey.header
  const apiKey = params.headers ? params.headers[headerField] : null

  if (apiKey && params.provider && !params.authentication) {
    context.params = {
      ...params,
      authentication: {
        strategy: 'apiKey',
        apiKey
      }
    }
  }

  return next()
}
