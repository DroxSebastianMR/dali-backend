/*
  Warnings:

  - A unique constraint covering the columns `[ruc]` on the table `Business` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "BusinessDocumentType" AS ENUM ('DNI', 'RUC', 'LICENSE', 'SANITARY_PERMIT', 'TAX_DOCUMENT', 'BUSINESS_PHOTO', 'LOGO', 'OTHER');

-- CreateEnum
CREATE TYPE "BusinessDocumentStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterEnum
ALTER TYPE "BusinessStatus" ADD VALUE 'REJECTED';

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "average_rating" DECIMAL(3,2),
ADD COLUMN     "cover_image_url" TEXT,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "email" TEXT,
ADD COLUMN     "facebook_url" TEXT,
ADD COLUMN     "instagram_url" TEXT,
ADD COLUMN     "is_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "staff_names" TEXT[],
ADD COLUMN     "tiktok_url" TEXT,
ADD COLUMN     "total_reviews" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "verified_at" TIMESTAMP(3),
ADD COLUMN     "website_url" TEXT,
ADD COLUMN     "whatsapp" TEXT;

-- CreateTable
CREATE TABLE "BusinessLocation" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "name" TEXT,
    "address" TEXT NOT NULL,
    "reference" TEXT,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "district" TEXT,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "phone" TEXT,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "delivery_available" BOOLEAN NOT NULL DEFAULT false,
    "pickup_available" BOOLEAN NOT NULL DEFAULT true,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessHour" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "day_of_week" INTEGER NOT NULL,
    "open_time" TEXT NOT NULL,
    "close_time" TEXT NOT NULL,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessSpecialHour" (
    "id" SERIAL NOT NULL,
    "location_id" INTEGER NOT NULL,
    "date" DATE NOT NULL,
    "open_time" TEXT,
    "close_time" TEXT,
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BusinessSpecialHour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessDocument" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "type" "BusinessDocumentType" NOT NULL,
    "file_url" TEXT NOT NULL,
    "file_name" TEXT,
    "status" "BusinessDocumentStatus" NOT NULL DEFAULT 'PENDING',
    "rejection_reason" TEXT,
    "uploaded_by" INTEGER,
    "reviewed_by" INTEGER,
    "reviewed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessDocument_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BusinessLocation_business_id_idx" ON "BusinessLocation"("business_id");

-- CreateIndex
CREATE INDEX "BusinessLocation_city_idx" ON "BusinessLocation"("city");

-- CreateIndex
CREATE INDEX "BusinessLocation_district_idx" ON "BusinessLocation"("district");

-- CreateIndex
CREATE INDEX "BusinessHour_location_id_idx" ON "BusinessHour"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessHour_location_id_day_of_week_key" ON "BusinessHour"("location_id", "day_of_week");

-- CreateIndex
CREATE INDEX "BusinessSpecialHour_location_id_idx" ON "BusinessSpecialHour"("location_id");

-- CreateIndex
CREATE UNIQUE INDEX "BusinessSpecialHour_location_id_date_key" ON "BusinessSpecialHour"("location_id", "date");

-- CreateIndex
CREATE INDEX "BusinessDocument_business_id_idx" ON "BusinessDocument"("business_id");

-- CreateIndex
CREATE INDEX "BusinessDocument_type_idx" ON "BusinessDocument"("type");

-- CreateIndex
CREATE INDEX "BusinessDocument_status_idx" ON "BusinessDocument"("status");

-- CreateIndex
CREATE UNIQUE INDEX "Business_ruc_key" ON "Business"("ruc");

-- CreateIndex
CREATE INDEX "Business_status_idx" ON "Business"("status");

-- CreateIndex
CREATE INDEX "Business_trade_name_idx" ON "Business"("trade_name");

-- CreateIndex
CREATE INDEX "Business_ruc_idx" ON "Business"("ruc");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessLocation" ADD CONSTRAINT "BusinessLocation_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessHour" ADD CONSTRAINT "BusinessHour_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "BusinessLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessSpecialHour" ADD CONSTRAINT "BusinessSpecialHour_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "BusinessLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BusinessDocument" ADD CONSTRAINT "BusinessDocument_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;
