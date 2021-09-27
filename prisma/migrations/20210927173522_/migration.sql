/*
  Warnings:

  - A unique constraint covering the columns `[prodileId]` on the table `Merchants` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Merchants_prodileId_key" ON "Merchants"("prodileId");
