/*
  Warnings:

  - The values [elo,master] on the enum `CardsBrand` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CardsBrand_new" AS ENUM ('electron', 'maestro', 'visa', 'mastercard', 'amex', 'diners', 'discover', 'jcb');
ALTER TABLE "Cards" ALTER COLUMN "brand" TYPE "CardsBrand_new" USING ("brand"::text::"CardsBrand_new");
ALTER TYPE "CardsBrand" RENAME TO "CardsBrand_old";
ALTER TYPE "CardsBrand_new" RENAME TO "CardsBrand";
DROP TYPE "CardsBrand_old";
COMMIT;
