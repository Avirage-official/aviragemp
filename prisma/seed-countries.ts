import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Add initial countries
  await prisma.country.createMany({
    data: [
      { code: 'SG', name: 'Singapore', isActive: true },
      { code: 'MY', name: 'Malaysia', isActive: false },
      { code: 'TH', name: 'Thailand', isActive: false },
      { code: 'ID', name: 'Indonesia', isActive: false },
      { code: 'PH', name: 'Philippines', isActive: false },
    ],
    skipDuplicates: true,
  })
  
  console.log('✅ Countries seeded')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })