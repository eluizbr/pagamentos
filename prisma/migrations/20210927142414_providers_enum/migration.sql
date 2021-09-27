/*
  Warnings:

  - Changed the type of `name` on the `Providers` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ProvidersEnum" AS ENUM ('cielo', 'pagarme', 'pagseguro');

-- AlterTable
ALTER TABLE "Providers" DROP COLUMN "name",
ADD COLUMN     "name" "ProvidersEnum" NOT NULL;

-- DropEnum
DROP TYPE "ProvidersName";
