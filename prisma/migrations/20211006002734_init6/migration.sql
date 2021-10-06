/*
  Warnings:

  - You are about to drop the column `merchantId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `profileId` on the `Charges` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_merchantId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_profileId_fkey";

-- AlterTable
ALTER TABLE "Charges" DROP COLUMN "merchantId",
DROP COLUMN "profileId";
