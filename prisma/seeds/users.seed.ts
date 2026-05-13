import { PrismaClient, UserProvider, UserStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function seedUsers() {
  const password = await bcrypt.hash('josmerroj', 10);

  const users = [
    {
      first_name: 'Sebastian',
      last_name: 'Mercado Rojas',
      email: 'SebastianMR08@dali.com',
      phone: '900697983',
      email_verified: true,
      telefono_verified: true,
      provider: UserProvider.LOCAL,
      status: UserStatus.ACTIVE,
      password_hash: password,
    },

    {
      first_name: 'Corina',
      last_name: 'Paredes Marcelo',
      email: 'corina.paredes@gmail.com',
      phone: '987654321',
      email_verified: true,
      telefono_verified: true,
      provider: UserProvider.LOCAL,
      status: UserStatus.ACTIVE,
      password_hash: password,
    },

    {
      first_name: 'Deyvi',
      last_name: 'Vera Medina',
      email: 'deyvi.vera@gmail.com',
      phone: '912345678',
      email_verified: true,
      telefono_verified: true,
      provider: UserProvider.LOCAL,
      status: UserStatus.ACTIVE,
      password_hash: password,
    },

    {
      first_name: 'David',
      last_name: 'Cotrina Saldaña',
      email: 'david.cotrina@gmail.com',
      phone: '956781234',
      email_verified: true,
      telefono_verified: true,
      provider: UserProvider.LOCAL,
      status: UserStatus.ACTIVE,
      password_hash: password,
    },
  ];

  for (const user of users) {
    const exists = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (!exists) {
      await prisma.user.create({
        data: user,
      });

      console.log(`✅ Usuario creado: ${user.email}`);
    } else {
      console.log(`⚠️ Usuario ya existe: ${user.email}`);
    }
  }
}