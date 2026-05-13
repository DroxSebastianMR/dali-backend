import {
  PrismaClient,
  UpdateType,
} from '@prisma/client';

export async function seedSystem(prisma: PrismaClient) {
  console.log('🌱 Seeding system config...');

  await prisma.systemConfig.upsert({
    where: {
      environment: 'development',
    },

    update: {
      backend_name: 'DALI_BACKEND',
      backend_version: '1.0.0',
      maintenance_enabled: false,
    },

    create: {
      environment: 'development',

      backend_name: 'DALI_BACKEND',
      backend_version: '1.0.0',

      maintenance_enabled: false,

      appConfigs: {
        create: [
          {
            platform: 'ANDROID',

            current_version: '1.2.0',
            min_supported_version: '1.0.0',

            update_type: UpdateType.PATCH,

            update_message:
              'Nueva actualización disponible.',

            store_url:
              'https://play.google.com/store/apps/details?id=com.dali.app',

            active: true,
          },

          {
            platform: 'IOS',

            current_version: '1.2.0',
            min_supported_version: '1.0.0',

            update_type: UpdateType.PATCH,

            update_message:
              'Nueva actualización disponible.',

            store_url:
              'https://apps.apple.com/app/dali/id123456789',

            active: true,
          },
        ],
      },
    },
  });

  console.log('✅ System config procesado');
}