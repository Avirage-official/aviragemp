import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Handle connection cleanup in serverless
if (process.env.NODE_ENV === 'production') {
  // Disconnect on process exit to prevent connection leaks
  process.on('beforeExit', async () => {
    await prisma.$disconnect()
  })
}