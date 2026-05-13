import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function seedRoles() {
  const roles = [
    {
      code: 'ADMIN',
      name: 'Administrador',
      description: 'Control total del sistema',
    },

    {
      code: 'CUSTOMER',
      name: 'Cliente',
      description: 'Usuario cliente',
    },

    {
      code: 'BUSINESS_OWNER',
      name: 'Negocio',
      description: 'Propietario de negocio',
    },
  ];

  for (const role of roles) {
    const exists = await prisma.role.findUnique({
      where: {
        code: role.code,
      },
    });

    if (!exists) {
      await prisma.role.create({
        data: role,
      });

      console.log(`✅ Rol creado: ${role.code}`);
    }
  }
}