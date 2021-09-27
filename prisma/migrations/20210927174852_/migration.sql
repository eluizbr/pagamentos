/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Merchants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Merchants" ADD COLUMN     "userId" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_userId_key" ON "Merchants"("userId");
