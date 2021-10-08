/*
  Warnings:

  - A unique constraint covering the columns `[profileId,mcc]` on the table `Merchants` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Merchants_profileId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_profileId_mcc_key" ON "Merchants"("profileId", "mcc");
