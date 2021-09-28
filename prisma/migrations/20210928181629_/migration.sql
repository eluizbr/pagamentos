/*
  Warnings:

  - The values [cielo] on the enum `ProvidersEnum` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProvidersEnum_new" AS ENUM ('pagarme', 'pagseguro');
ALTER TABLE "Providers" ALTER COLUMN "name" TYPE "ProvidersEnum_new" USING ("name"::text::"ProvidersEnum_new");
ALTER TYPE "ProvidersEnum" RENAME TO "ProvidersEnum_old";
ALTER TYPE "ProvidersEnum_new" RENAME TO "ProvidersEnum";
DROP TYPE "ProvidersEnum_old";
COMMIT;
