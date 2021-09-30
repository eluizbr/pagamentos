/*
  Warnings:

  - Added the required column `cardId` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" ADD COLUMN     "cardId" VARCHAR(255) NOT NULL;
