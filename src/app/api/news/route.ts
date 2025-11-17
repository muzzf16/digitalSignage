import { db } from '@/lib/db'
import { createApiHandler } from '@/lib/api-handler'
import { newsSchema } from '@/lib/schemas'

const handler = createApiHandler(db.news, {
  modelName: 'news',
  orderBy: { createdAt: 'desc' },
  schema: newsSchema,
})

export const GET = handler.GET
export const POST = handler.POST
export const PUT = handler.PUT
export const DELETE = handler.DELETE