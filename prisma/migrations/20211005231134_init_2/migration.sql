-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_merchantId_fkey";

-- AlterTable
ALTER TABLE "Charges" ALTER COLUMN "costumerId" DROP NOT NULL,
ALTER COLUMN "merchantId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
