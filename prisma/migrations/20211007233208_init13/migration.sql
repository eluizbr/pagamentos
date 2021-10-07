-- DropForeignKey
ALTER TABLE "Cards" DROP CONSTRAINT "Cards_costumerId_fkey";

-- DropForeignKey
ALTER TABLE "Charges" DROP CONSTRAINT "Charges_profileId_fkey";

-- DropForeignKey
ALTER TABLE "Costumers" DROP CONSTRAINT "Costumers_profileId_fkey";

-- AddForeignKey
ALTER TABLE "Costumers" ADD CONSTRAINT "Costumers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
