-- AlterTable
ALTER TABLE "Charges" ADD COLUMN     "cardId" VARCHAR(255),
ADD COLUMN     "costumerId" VARCHAR(255),
ADD COLUMN     "merchantId" VARCHAR(255),
ADD COLUMN     "profileId" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE SET NULL ON UPDATE CASCADE;
