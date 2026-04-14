import { PrismaClient, UpdateType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.appConfig.deleteMany();
  await prisma.systemConfig.deleteMany();

  const systemConfig = await prisma.systemConfig.create({
    data: {
      environment: "development",
      backend_name: "DALI_BACKEND",
      backend_version: "1.0.0",

      maintenance_enabled: false,
      maintenance_message: null,
      maintenance_end: null,

      appConfigs: {
        create: [
          {
            platform: "ANDROID",
            current_version: "1.2.0",
            min_supported_version: "1.0.0",
            update_type: UpdateType.PATCH,
            update_message: null,
            store_url:
              "https://play.google.com/store/apps/details?id=com.zyten.app",
            active: true,
          },
          {
            platform: "IOS",
            current_version: "1.2.0",
            min_supported_version: "1.0.0",
            update_type: UpdateType.PATCH,
            update_message: null,
            store_url:
              "https://apps.apple.com/app/id123456789",
            active: true,
          },
        ],
      },
    },
  });

  console.log("✅ Seed completado:", systemConfig.environment);
}

main()
  .catch((e) => {
    console.error("❌ Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });