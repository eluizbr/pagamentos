/*
  Warnings:

  - Added the required column `cardId` to the `Costumers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Costumers" ADD COLUMN     "cardId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Costumers" ADD CONSTRAINT "Costumers_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
