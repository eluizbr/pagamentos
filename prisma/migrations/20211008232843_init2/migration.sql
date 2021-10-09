/*
  Warnings:

  - You are about to drop the column `cardId` on the `Costumers` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Costumers" DROP CONSTRAINT "Costumers_cardId_fkey";

-- AlterTable
ALTER TABLE "Costumers" DROP COLUMN "cardId";
