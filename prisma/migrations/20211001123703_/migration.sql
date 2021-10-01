/*
  Warnings:

  - You are about to drop the column `lsa4digits` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `last4digits` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "lsa4digits",
ADD COLUMN     "last4digits" VARCHAR(10) NOT NULL;
