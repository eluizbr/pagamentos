-- AlterTable
ALTER TABLE "Token" ADD COLUMN     "profileId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
