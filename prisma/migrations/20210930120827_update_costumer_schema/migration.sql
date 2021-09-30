/*
  Warnings:

  - You are about to drop the column `address` on the `Costumers` table. All the data in the column will be lost.
  - You are about to alter the column `document` on the `Costumers` table. The data in that column could be lost. The data in that column will be cast from `JsonB` to `VarChar(25)`.
  - A unique constraint covering the columns `[document]` on the table `Costumers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `city` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `complement` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `district` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `document_type` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streetNumber` to the `Costumers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `Costumers` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "costumerDocumentType" AS ENUM ('CPF', 'CNPJ');

-- AlterTable
ALTER TABLE "Costumers" DROP COLUMN "address",
ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "complement" VARCHAR(255) NOT NULL,
ADD COLUMN     "country" VARCHAR(20) NOT NULL,
ADD COLUMN     "district" VARCHAR(255) NOT NULL,
ADD COLUMN     "document_type" "costumerDocumentType" NOT NULL,
ADD COLUMN     "state" VARCHAR(70) NOT NULL,
ADD COLUMN     "street" VARCHAR(255) NOT NULL,
ADD COLUMN     "streetNumber" VARCHAR(255) NOT NULL,
ADD COLUMN     "zipCode" VARCHAR(20) NOT NULL,
ALTER COLUMN "document" SET DATA TYPE VARCHAR(25);

-- CreateIndex
CREATE UNIQUE INDEX "Costumers_document_key" ON "Costumers"("document");
