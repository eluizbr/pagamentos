-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "profileId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
