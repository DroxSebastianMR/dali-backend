-- CreateEnum
CREATE TYPE "BannerType" AS ENUM ('PROMOTION', 'BUSINESS', 'EVENT', 'NEARBY', 'RECOMMENDATION');

-- CreateEnum
CREATE TYPE "BannerTargetType" AS ENUM ('BUSINESS', 'CATEGORY', 'PRODUCT', 'PROMOTION', 'SEARCH', 'EXTERNAL_LINK');

-- CreateTable
CREATE TABLE "HomeBanner" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "image_url" TEXT NOT NULL,
    "background_color" TEXT,
    "badge_text" TEXT,
    "badge_color" TEXT,
    "type" "BannerType" NOT NULL,
    "cta_text" TEXT,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "starts_at" TIMESTAMP(3),
    "expires_at" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_by" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HomeBanner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannerTarget" (
    "id" SERIAL NOT NULL,
    "banner_id" INTEGER NOT NULL,
    "target_type" "BannerTargetType" NOT NULL,
    "business_id" INTEGER,
    "category_id" INTEGER,
    "product_id" INTEGER,
    "search_query" TEXT,
    "external_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannerTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannerLocation" (
    "id" SERIAL NOT NULL,
    "banner_id" INTEGER NOT NULL,
    "country" TEXT,
    "state" TEXT,
    "city" TEXT,
    "district" TEXT,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "radius_km" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BannerLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" SERIAL NOT NULL,
    "owner_user_id" INTEGER,
    "nombre_comercial" TEXT NOT NULL,
    "razon_social" TEXT,
    "ruc" TEXT,
    "descripcion" TEXT,
    "logo_url" TEXT,
    "estado" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductCategory" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "parent_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProductCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "barcode" TEXT,
    "marca" TEXT,
    "unidad_medida" TEXT,
    "category_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "HomeBanner_type_idx" ON "HomeBanner"("type");

-- CreateIndex
CREATE INDEX "HomeBanner_priority_idx" ON "HomeBanner"("priority");

-- CreateIndex
CREATE INDEX "HomeBanner_is_active_idx" ON "HomeBanner"("is_active");

-- CreateIndex
CREATE INDEX "BannerTarget_banner_id_idx" ON "BannerTarget"("banner_id");

-- CreateIndex
CREATE INDEX "BannerLocation_city_idx" ON "BannerLocation"("city");

-- CreateIndex
CREATE INDEX "BannerLocation_district_idx" ON "BannerLocation"("district");

-- CreateIndex
CREATE UNIQUE INDEX "Product_barcode_key" ON "Product"("barcode");

-- AddForeignKey
ALTER TABLE "HomeBanner" ADD CONSTRAINT "HomeBanner_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannerTarget" ADD CONSTRAINT "BannerTarget_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "HomeBanner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannerTarget" ADD CONSTRAINT "BannerTarget_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannerTarget" ADD CONSTRAINT "BannerTarget_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannerTarget" ADD CONSTRAINT "BannerTarget_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BannerLocation" ADD CONSTRAINT "BannerLocation_banner_id_fkey" FOREIGN KEY ("banner_id") REFERENCES "HomeBanner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductCategory" ADD CONSTRAINT "ProductCategory_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "ProductCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
