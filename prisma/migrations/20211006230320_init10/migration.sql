/*
  Warnings:

  - You are about to drop the column `cardsId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `costumersId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `merchantsId` on the `Charges` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `Charges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `costumerId` to the `Charges` table without a default value. This is not possible if the table is not empty.
  - Added the required column `merchantId` to the `Charges` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_cardsId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_costumersId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_merchantsId_fkey";

-- AlterTable
ALTER TABLE "Charges" DROP COLUMN "cardsId",
DROP COLUMN "costumersId",
DROP COLUMN "merchantsId",
ADD COLUMN     "cardId" VARCHAR(255) NOT NULL,
ADD COLUMN     "costumerId" VARCHAR(255) NOT NULL,
ADD COLUMN     "merchantId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
