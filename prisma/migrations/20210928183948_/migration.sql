/*
  Warnings:

  - Added the required column `profileId` to the `Providers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Providers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Providers" ADD COLUMN     "profileId" VARCHAR(255) NOT NULL,
ADD COLUMN     "userId" VARCHAR(255) NOT NULL,
ALTER COLUMN "priority" SET DEFAULT 1;
