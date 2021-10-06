/*
  Warnings:

  - Made the column `cardsId` on table `Charges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `costumersId` on table `Charges` required. This step will fail if there are existing NULL values in that column.
  - Made the column `merchantsId` on table `Charges` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_cardsId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_costumersId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_merchantsId_fkey";

-- AlterTable
ALTER TABLE "Charges" ALTER COLUMN "cardsId" SET NOT NULL,
ALTER COLUMN "costumersId" SET NOT NULL,
ALTER COLUMN "merchantsId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_merchantsId_fkey" FOREIGN KEY ("merchantsId") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_costumersId_fkey" FOREIGN KEY ("costumersId") REFERENCES "Costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_cardsId_fkey" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
