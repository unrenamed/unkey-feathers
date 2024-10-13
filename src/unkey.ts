import dotenv from 'dotenv'
import { Unkey, verifyKey } from '@unkey/api'

dotenv.config()

const unkey = new Unkey({ rootKey: process.env.UNKEY_ROOT_KEY! })

export const createApiKey = async () => {
  const nextWeek = new Date()
  nextWeek.setDate(new Date().getDate() + 7)

  const created = await unkey.keys.create({
    apiId: process.env.UNKEY_API_ID!,
    expires: nextWeek.getTime(),
    ratelimit: {
      type: 'fast',
      limit: 5,
      refillRate: 1,
      refillInterval: 1000
    },
    meta: {
      random: Math.random()
    }
  })

  return created
}

export const verifyApiKey = async (key: string) => {
  const nextWeek = new Date()
  nextWeek.setDate(new Date().getDate() + 7)

  const verified = await verifyKey({
    apiId: process.env.UNKEY_API_ID!,
    key
  })

  return verified
}
