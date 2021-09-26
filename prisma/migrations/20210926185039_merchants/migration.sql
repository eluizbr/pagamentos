-- CreateEnum
CREATE TYPE "MecrchantStatus" AS ENUM ('active', 'deleted', 'pending');

-- CreateEnum
CREATE TYPE "ProvidersName" AS ENUM ('CIELO', 'PAGARME', 'PAGSEGURO');

-- CreateTable
CREATE TABLE "Merchants" (
    "id" VARCHAR(255) NOT NULL,
    "mcc" VARCHAR(100) NOT NULL,
    "status" "MecrchantStatus" NOT NULL DEFAULT E'pending',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "prodileId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Providers" (
    "id" VARCHAR(255) NOT NULL,
    "name" "ProvidersName" NOT NULL,
    "credentials" JSON NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "merchantId" VARCHAR(255),

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_MerchantsToProviders" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE INDEX "Merchants_prodileId_status_mcc_idx" ON "Merchants"("prodileId", "status", "mcc");

-- CreateIndex
CREATE UNIQUE INDEX "_MerchantsToProviders_AB_unique" ON "_MerchantsToProviders"("A", "B");

-- CreateIndex
CREATE INDEX "_MerchantsToProviders_B_index" ON "_MerchantsToProviders"("B");

-- AddForeignKey
ALTER TABLE "Merchants" ADD CONSTRAINT "Merchants_prodileId_fkey" FOREIGN KEY ("prodileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Providers" ADD CONSTRAINT "Providers_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MerchantsToProviders" ADD FOREIGN KEY ("A") REFERENCES "Merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MerchantsToProviders" ADD FOREIGN KEY ("B") REFERENCES "Providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
