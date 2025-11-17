import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

type PrismaModel = {
  findMany: (args?: any) => Promise<any[]>,
  create: (args: any) => Promise<any>,
  update: (args: any) => Promise<any>,
  delete: (args: any) => Promise<any>,
}

type HandlerOptions = {
  orderBy?: any,
  transformRequest?: (data: any) => any,
  transformResponse?: (data: any) => any,
  modelName: string,
  schema?: z.ZodSchema<any>,
}

export function createApiHandler(model: PrismaModel, options: HandlerOptions) {
  const { orderBy, transformRequest, transformResponse, modelName, schema } = options

  const GET = async () => {
    try {
      const records = await model.findMany({
        where: { isActive: true },
        orderBy: orderBy,
      })
      const transformedRecords = transformResponse 
        ? records.map(transformResponse) 
        : records;

      return NextResponse.json({
        success: true,
        data: transformedRecords,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to fetch ${modelName}s`
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      )
    }
  }

  const POST = async (request: NextRequest) => {
    try {
      const body = await request.json()

      if (schema) {
        const validation = schema.safeParse(body)
        if (!validation.success) {
          return NextResponse.json(
            { success: false, error: validation.error.format() },
            { status: 400 }
          )
        }
      }
      
      const transformedBody = transformRequest
        ? transformRequest(body)
        : body;

      const newRecord = await model.create({
        data: {
          ...transformedBody,
          isActive: body.isActive ?? true,
        },
      })
      
      const transformedRecord = transformResponse
        ? transformResponse(newRecord)
        : newRecord;

      return NextResponse.json({
        success: true,
        data: transformedRecord,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to create ${modelName}`
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      )
    }
  }

  const PUT = async (request: NextRequest) => {
    try {
      const body = await request.json()
      const { id, ...updateData } = body

      if (schema) {
        const validation = schema.safeParse(updateData)
        if (!validation.success) {
          return NextResponse.json(
            { success: false, error: validation.error.format() },
            { status: 400 }
          )
        }
      }
      
      let transformedUpdateData = transformRequest
        ? transformRequest(updateData)
        : updateData;

      const updatedRecord = await model.update({
        where: { id },
        data: transformedUpdateData,
      })
      
      const transformedRecord = transformResponse
        ? transformResponse(updatedRecord)
        : updatedRecord;

      return NextResponse.json({
        success: true,
        data: transformedRecord,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to update ${modelName}`
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      )
    }
  }

  const DELETE = async (request: NextRequest) => {
    try {
      const { searchParams } = new URL(request.url)
      const id = searchParams.get('id')

      if (!id) {
        return NextResponse.json(
          { success: false, error: `${modelName} ID is required` },
          { status: 400 }
        )
      }

      const deletedRecord = await model.delete({
        where: { id },
      })
      
      const transformedRecord = transformResponse
        ? transformResponse(deletedRecord)
        : deletedRecord;

      return NextResponse.json({
        success: true,
        data: transformedRecord,
      })
    } catch (error) {
      const message = error instanceof Error ? error.message : `Failed to delete ${modelName}`
      return NextResponse.json(
        { success: false, error: message },
        { status: 500 }
      )
    }
  }

  return { GET, POST, PUT, DELETE }
}
