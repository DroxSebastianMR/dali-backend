import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedUserRoles() {
  const adminRole = await prisma.role.findUnique({
    where: {
      code: 'ADMIN',
    },
  });

  const customerRole = await prisma.role.findUnique({
    where: {
      code: 'CUSTOMER',
    },
  });

  const businessOwnerRole = await prisma.role.findUnique({
    where: {
      code: 'BUSINESS_OWNER',
    },
  });

  const sebastian = await prisma.user.findUnique({
    where: {
      email: 'SebastianMR08@dali.com',
    },
  });

  if (adminRole && sebastian) {
    await prisma.userRole.upsert({
      where: {
        user_id_role_id: {
          user_id: sebastian.id,
          role_id: adminRole.id,
        },
      },

      update: {},

      create: {
        user_id: sebastian.id,
        role_id: adminRole.id,
      },
    });

    console.log('✅ ADMIN asignado a Sebastian');
  }

  const users = await prisma.user.findMany();

  for (const user of users) {
    if (user.email !== 'SebastianMR08@dali.com' && customerRole) {
      await prisma.userRole.upsert({
        where: {
          user_id_role_id: {
            user_id: user.id,
            role_id: customerRole.id,
          },
        },

        update: {},

        create: {
          user_id: user.id,
          role_id: customerRole.id,
        },
      });

      console.log(`✅ CUSTOMER asignado a ${user.email}`);
    }
  }
}
