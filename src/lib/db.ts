import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

let databaseUrl = process.env.DATABASE_URL
console.log('process.env.DATABASE_URL:', databaseUrl);


if (!databaseUrl) {
  try {
    const envPath = path.resolve(process.cwd(), '.env.local');
    const envFile = fs.readFileSync(envPath, 'utf-8');
    const envVars = envFile.split('\n').reduce((acc, line) => {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        let value = valueParts.join('=').trim();
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }
        acc[key.trim()] = value;
      }
      return acc;
    }, {} as Record<string, string>);
    databaseUrl = envVars['DATABASE_URL'];
    console.log('DATABASE_URL from .env.local:', databaseUrl);
  } catch (error) {
    console.error('Could not read .env.local file', error);
  }
}


export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    datasources: {
      db: {
        url: databaseUrl,
      },
    },
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db