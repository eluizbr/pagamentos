/*
  Warnings:

  - The `status` column on the `Charges` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `paymentMethod` to the `Charges` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Charges" ALTER COLUMN "amount" DROP DEFAULT,
DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "paymentMethodType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "CardsStatus" DEFAULT E'pending';
