/*
  Warnings:

  - The values [CIELO,PAGARME,PAGSEGURO] on the enum `ProvidersName` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProvidersName_new" AS ENUM ('cielo', 'pagarme', 'pagseguro');
ALTER TABLE "Providers" ALTER COLUMN "name" TYPE "ProvidersName_new" USING ("name"::text::"ProvidersName_new");
ALTER TYPE "ProvidersName" RENAME TO "ProvidersName_old";
ALTER TYPE "ProvidersName_new" RENAME TO "ProvidersName";
DROP TYPE "ProvidersName_old";
COMMIT;
