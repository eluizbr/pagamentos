/*
  Warnings:

  - Changed the type of `brand` on the `Cards` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "brand",
ADD COLUMN     "brand" VARCHAR(50) NOT NULL;

-- CreateIndex
CREATE INDEX "Cards_brand_status_idx" ON "Cards"("brand", "status");
