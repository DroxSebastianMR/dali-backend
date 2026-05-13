-- CreateEnum
CREATE TYPE "PaymentMethodType" AS ENUM ('CASH', 'YAPE', 'PLIN', 'CARD', 'VISA', 'MASTERCARD', 'BANK_TRANSFER', 'DIGITAL_WALLET');

-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'REFUNDED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'REFUNDED');

-- CreateTable
CREATE TABLE "BusinessPaymentMethod" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "type" "PaymentMethodType" NOT NULL,
    "name" TEXT,
    "account_name" TEXT,
    "account_number" TEXT,
    "qr_image_url" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessPaymentMethod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sale" (
    "id" SERIAL NOT NULL,
    "business_id" INTEGER NOT NULL,
    "business_location_id" INTEGER,
    "user_id" INTEGER,
    "payment_method_id" INTEGER,
    "status" "SaleStatus" NOT NULL DEFAULT 'PAID',
    "payment_status" "PaymentStatus" NOT NULL DEFAULT 'PAID',
    "subtotal" DECIMAL(10,2) NOT NULL,
    "discount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "tax" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SaleItem" (
    "id" SERIAL NOT NULL,
    "sale_id" INTEGER NOT NULL,
    "product_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SaleItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "BusinessPaymentMethod_business_id_idx" ON "BusinessPaymentMethod"("business_id");

-- CreateIndex
CREATE INDEX "Sale_business_id_idx" ON "Sale"("business_id");

-- CreateIndex
CREATE INDEX "Sale_business_location_id_idx" ON "Sale"("business_location_id");

-- CreateIndex
CREATE INDEX "Sale_user_id_idx" ON "Sale"("user_id");

-- CreateIndex
CREATE INDEX "Sale_created_at_idx" ON "Sale"("created_at");

-- CreateIndex
CREATE INDEX "SaleItem_sale_id_idx" ON "SaleItem"("sale_id");

-- CreateIndex
CREATE INDEX "SaleItem_product_id_idx" ON "SaleItem"("product_id");

-- AddForeignKey
ALTER TABLE "BusinessPaymentMethod" ADD CONSTRAINT "BusinessPaymentMethod_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_business_id_fkey" FOREIGN KEY ("business_id") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_business_location_id_fkey" FOREIGN KEY ("business_location_id") REFERENCES "BusinessLocation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sale" ADD CONSTRAINT "Sale_payment_method_id_fkey" FOREIGN KEY ("payment_method_id") REFERENCES "BusinessPaymentMethod"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_sale_id_fkey" FOREIGN KEY ("sale_id") REFERENCES "Sale"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SaleItem" ADD CONSTRAINT "SaleItem_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
