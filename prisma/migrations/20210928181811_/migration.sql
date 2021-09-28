/*
  Warnings:

  - Made the column `created_at` on table `Merchants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Merchants` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Profile` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Providers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Providers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `merchantId` on table `Providers` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `Token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `Token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `expires_in` on table `Token` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Merchants" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "Providers" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "merchantId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Token" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL,
ALTER COLUMN "expires_in" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
