-- CreateEnum
CREATE TYPE "UpdateType" AS ENUM ('PATCH', 'MINOR', 'MAJOR');

-- CreateEnum
CREATE TYPE "UserProvider" AS ENUM ('local', 'facebook', 'google');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'suspended', 'deleted');

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

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT,
    "provider" "UserProvider" NOT NULL DEFAULT 'local',
    "provider_id" TEXT,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "telefono" TEXT,
    "foto_url" TEXT,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "telefono_verified" BOOLEAN NOT NULL DEFAULT false,
    "estado" "UserStatus" NOT NULL DEFAULT 'active',
    "last_login_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserRole" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "assigned_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserRole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SystemConfig_environment_key" ON "SystemConfig"("environment");

-- CreateIndex
CREATE UNIQUE INDEX "AppConfig_system_config_id_platform_key" ON "AppConfig"("system_config_id", "platform");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_code_key" ON "Role"("code");

-- AddForeignKey
ALTER TABLE "AppConfig" ADD CONSTRAINT "AppConfig_system_config_id_fkey" FOREIGN KEY ("system_config_id") REFERENCES "SystemConfig"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRole" ADD CONSTRAINT "UserRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
