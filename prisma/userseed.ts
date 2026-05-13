import { PrismaClient, UserProvider, UserStatus } from '@prisma/client'
import * as bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {

  // 🎭 Crear rol (si no existe)
  const role = await prisma.role.upsert({
    where: { code: 'ADMIN' },
    update: {},
    create: {
      code: 'ADMIN',
      name: 'Administrador',
      description: 'Acceso total al sistema'
    }
  })

  const password2 = await bcrypt.hash('12345678', 10)

  const user2 = await prisma.user.upsert({
    where: { email: 'admin2@test.com' },
    update: {
      password_hash: password2
    },
    create: {
      email: 'admin2@test.com',
      password_hash: password2,
      first_name: 'Admin2',
      last_name: 'Test',
      provider: UserProvider.LOCAL,
      status: UserStatus.ACTIVE,
      email_verified: true,

      user_roles: {
        create: [
          {
            role_id: role.id
          }
        ]
      }
    }
  })

  console.log('✅ Usuario creado:', user2.email)
  }

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })