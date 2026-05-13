import { PrismaClient } from '@prisma/client';

import { seedUsers } from './users.seed';
import { seedRoles } from './roles.seed';
import { seedSystem } from './system.seed';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seeds...');
    
  await seedRoles();
  await seedUsers();
  await seedSystem(prisma);

  console.log('✅ Seeds completados');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });