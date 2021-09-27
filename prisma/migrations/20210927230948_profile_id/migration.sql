/*
  Warnings:

  - Made the column `profileId` on table `Merchants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchants" ALTER COLUMN "profileId" SET NOT NULL;
