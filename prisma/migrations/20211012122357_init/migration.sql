-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_profileId_fkey";

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
