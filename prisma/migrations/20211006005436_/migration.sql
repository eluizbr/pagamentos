/*
  Warnings:

  - Made the column `profileId` on table `Charges` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_profileId_fkey";

-- AlterTable
ALTER TABLE "Charges" ALTER COLUMN "profileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
