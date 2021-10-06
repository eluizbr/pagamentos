/*
  Warnings:

  - You are about to drop the column `amount` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `capture` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `expiresDate` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `fineAmount` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `fineDays` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `finePercentage` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `installments` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `instructions` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `interestAmount` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `interestDays` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `interestPercentage` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `statementDescriptor` on the `Charges` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Charges` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Charges" DROP COLUMN "amount",
DROP COLUMN "capture",
DROP COLUMN "currency",
DROP COLUMN "description",
DROP COLUMN "expiresDate",
DROP COLUMN "fineAmount",
DROP COLUMN "fineDays",
DROP COLUMN "finePercentage",
DROP COLUMN "installments",
DROP COLUMN "instructions",
DROP COLUMN "interestAmount",
DROP COLUMN "interestDays",
DROP COLUMN "interestPercentage",
DROP COLUMN "orderId",
DROP COLUMN "paymentMethod",
DROP COLUMN "statementDescriptor",
DROP COLUMN "status";
