/*
  Warnings:

  - Made the column `userId` on table `Profile` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "userId" SET NOT NULL;
