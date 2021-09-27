/*
  Warnings:

  - You are about to drop the column `prodileId` on the `Merchants` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[profileId]` on the table `Merchants` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `profileId` to the `Merchants` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Merchants" DROP CONSTRAINT "Merchants_prodileId_fkey";

-- DropIndex
DROP INDEX "Merchants_prodileId_key";

-- DropIndex
DROP INDEX "Merchants_prodileId_status_mcc_idx";

-- AlterTable
ALTER TABLE "Merchants" DROP COLUMN "prodileId",
ADD COLUMN     "profileId" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_profileId_key" ON "Merchants"("profileId");

-- CreateIndex
CREATE INDEX "Merchants_profileId_status_mcc_idx" ON "Merchants"("profileId", "status", "mcc");

-- AddForeignKey
ALTER TABLE "Merchants" ADD CONSTRAINT "Merchants_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
