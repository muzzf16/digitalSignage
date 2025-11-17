import { z } from 'zod'

export const slideSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  subtitle: z.string().optional(),
  description: z.string().min(1, 'Description is required'),
  features: z.array(z.string()).optional(),
  backgroundColor: z.string().min(1, 'Background color is required'),
  textColor: z.string().min(1, 'Text color is required'),
  isActive: z.boolean().optional(),
  order: z.number().int(),
  category: z.string().min(1, 'Category is required'),
  imageUrl: z.string().optional(),
})

export const interestRateSchema = z.object({
  type: z.string().min(1, 'Type is required'),
  rate: z.string().min(1, 'Rate is required'),
  period: z.string().min(1, 'Period is required'),
  isActive: z.boolean().optional(),
})

export const newsSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  isActive: z.boolean().optional(),
})

export const exchangeRateSchema = z.object({
  currency: z.string().min(1, 'Currency is required'),
  code: z.string().min(1, 'Code is required'),
  buy: z.number(),
  sell: z.number(),
  change: z.number(),
  changePercent: z.number(),
  isActive: z.boolean().optional(),
})
