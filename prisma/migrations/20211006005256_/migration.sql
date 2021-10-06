/*
  Warnings:

  - You are about to drop the column `cardId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `costumerId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `merchantId` on the `Charges` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_merchantId_fkey";

-- AlterTable
ALTER TABLE "Charges" DROP COLUMN "cardId",
DROP COLUMN "costumerId",
DROP COLUMN "merchantId",
ADD COLUMN     "cardsId" VARCHAR(255),
ADD COLUMN     "costumersId" VARCHAR(255),
ADD COLUMN     "merchantsId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_merchantsId_fkey" FOREIGN KEY ("merchantsId") REFERENCES "Merchants"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_costumersId_fkey" FOREIGN KEY ("costumersId") REFERENCES "Costumers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_cardsId_fkey" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
