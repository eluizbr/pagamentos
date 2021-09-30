/*
  Warnings:

  - You are about to drop the column `prodileId` on the `Costumers` table. All the data in the column will be lost.
  - Added the required column `profileId` to the `Costumers` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Costumers" DROP CONSTRAINT "Costumers_prodileId_fkey";

-- AlterTable
ALTER TABLE "Costumers" DROP COLUMN "prodileId",
ADD COLUMN     "profileId" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "Costumers" ADD CONSTRAINT "Costumers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
