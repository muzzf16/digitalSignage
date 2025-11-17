import { db } from '@/lib/db'
import { createApiHandler } from '@/lib/api-handler'
import { interestRateSchema } from '@/lib/schemas'

const handler = createApiHandler(db.interestRate, {
  modelName: 'interestRate',
  schema: interestRateSchema,
})

export const GET = handler.GET
export const POST = handler.POST
export const PUT = handler.PUT
export const DELETE = handler.DELETE