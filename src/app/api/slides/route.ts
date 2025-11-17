import { db } from '@/lib/db'
import { createApiHandler } from '@/lib/api-handler'
import { slideSchema } from '@/lib/schemas'

const parseFeatures = (features: string | string[]) => {
  if (Array.isArray(features)) {
    return features;
  }
  try {
    return JSON.parse(features);
  } catch (e) {
    return [];
  }
};

const stringifyFeatures = (features: string | string[]) => {
  if (Array.isArray(features)) {
    return JSON.stringify(features);
  }
  return features;
};

const handler = createApiHandler(db.slide, {
  modelName: 'slide',
  orderBy: { order: 'asc' },
  schema: slideSchema,
  transformRequest: (data) => ({
    ...data,
    features: stringifyFeatures(data.features || []),
  }),
  transformResponse: (data) => ({
    ...data,
    features: parseFeatures(data.features),
  }),
})

export const GET = handler.GET
export const POST = handler.POST
export const PUT = handler.PUT
export const DELETE = handler.DELETE