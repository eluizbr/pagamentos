/*
  Warnings:

  - You are about to drop the column `cardId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `costumerId` on the `Charges` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_cardId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_costumerId_fkey";

-- AlterTable
ALTER TABLE "Charges" DROP COLUMN "cardId",
DROP COLUMN "costumerId";
