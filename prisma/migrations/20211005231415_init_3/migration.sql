/*
  Warnings:

  - You are about to drop the column `cardsId` on the `Charges` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_cardsId_fkey";

-- AlterTable
ALTER TABLE "Charges" DROP COLUMN "cardsId",
ADD COLUMN     "cardId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;
