import { db } from '@/lib/db'
import { createApiHandler } from '@/lib/api-handler'
import { exchangeRateSchema } from '@/lib/schemas'

const handler = createApiHandler(db.exchangeRate, {
  modelName: 'exchangeRate',
  schema: exchangeRateSchema,
})

export const GET = handler.GET
export const POST = handler.POST
export const PUT = handler.PUT
export const DELETE = handler.DELETE