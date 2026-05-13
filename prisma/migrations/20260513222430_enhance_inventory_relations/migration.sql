/*
  Warnings:

  - You are about to drop the column `brand` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `ProductCategory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InventoryMovementType" AS ENUM ('IN', 'OUT', 'ADJUSTMENT', 'SALE', 'RETURN');

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "brand",
ADD COLUMN     "brand_id" INTEGER,
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "height" DECIMAL(10,2),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "length" DECIMAL(10,2),
ADD COLUMN     "requires_shipping" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "seo_description" TEXT,
ADD COLUMN     "seo_title" TEXT,
ADD COLUMN     "short_description" TEXT,
ADD COLUMN     "sku" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "type_id" INTEGER,
ADD COLUMN     "weight" DECIMAL(10,2),
ADD COLUMN     "width" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "ProductCategory" ADD COLUMN     "icon" TEXT,
ADD COLUMN     "image_url" TEXT,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "ProductType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductBrand" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "logo_url" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductBrand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImage" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "business_location_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "reserved_stock" INTEGER NOT NULL DEFAULT 0,
    "min_stock" INTEGER NOT NULL DEFAULT 0,
    "max_stock" INTEGER,
    "cost_price" DECIMAL(10,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductPrice" (
    "id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "name" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "compare_at_price" DECIMAL(10,2),
    "currency" TEXT NOT NULL DEFAULT 'PEN',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "starts_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductPrice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InventoryMovement" (
    "id" SERIAL NOT NULL,
    "inventory_id" INTEGER NOT NULL,
    "type" "InventoryMovementType" NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reason" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InventoryMovement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProductType_name_key" ON "ProductType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductBrand_name_key" ON "ProductBrand"("name");

-- CreateIndex
CREATE INDEX "ProductImage_product_id_idx" ON "ProductImage"("product_id");

-- CreateIndex
CREATE INDEX "Inventory_product_id_idx" ON "Inventory"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_business_location_id_product_id_key" ON "Inventory"("business_location_id", "product_id");

-- CreateIndex
CREATE INDEX "ProductPrice_product_id_idx" ON "ProductPrice"("product_id");

-- CreateIndex
CREATE INDEX "InventoryMovement_inventory_id_idx" ON "InventoryMovement"("inventory_id");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_sku_key" ON "Product"("sku");

-- CreateIndex
CREATE INDEX "Product_name_idx" ON "Product"("name");

-- CreateIndex
CREATE INDEX "Product_slug_idx" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "Product_sku_idx" ON "Product"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_slug_key" ON "ProductCategory"("slug");

-- CreateIndex
CREATE INDEX "ProductCategory_slug_idx" ON "ProductCategory"("slug");

-- CreateIndex
CREATE INDEX "ProductCategory_parent_id_idx" ON "ProductCategory"("parent_id");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "ProductType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "ProductBrand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_business_location_id_fkey" FOREIGN KEY ("business_location_id") REFERENCES "BusinessLocation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPrice" ADD CONSTRAINT "ProductPrice_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InventoryMovement" ADD CONSTRAINT "InventoryMovement_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Inventory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
