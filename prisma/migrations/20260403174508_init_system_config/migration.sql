-- CreateEnum
CREATE TYPE "UpdateType" AS ENUM ('PATCH', 'MINOR', 'MAJOR');

-- CreateTable
CREATE TABLE "SystemConfig" (
    "id" SERIAL NOT NULL,
    "environment" TEXT NOT NULL,
    "backend_name" TEXT NOT NULL,
    "backend_version" TEXT NOT NULL,
    "maintenance_enabled" BOOLEAN NOT NULL,
    "maintenance_message" TEXT,
    "maintenance_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SystemConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppConfig" (
    "id" SERIAL NOT NULL,
    "system_config_id" INTEGER NOT NULL,
    "platform" TEXT NOT NULL,
    "current_version" TEXT NOT NULL,
    "min_supported_version" TEXT NOT NULL,
    "update_type" "UpdateType" NOT NULL,
    "update_message" TEXT,
    "store_url" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AppConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_environment_key" ON "SystemConfig"("environment");

-- CreateIndex
CREATE UNIQUE INDEX "AppConfig_system_config_id_platform_key" ON "AppConfig"("system_config_id", "platform");

-- AddForeignKey
ALTER TABLE "AppConfig" ADD CONSTRAINT "AppConfig_system_config_id_fkey" FOREIGN KEY ("system_config_id") REFERENCES "SystemConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
