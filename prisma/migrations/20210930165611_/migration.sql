/*
  Warnings:

  - A unique constraint covering the columns `[document,profileId]` on the table `Costumers` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Costumers_document_profileId_key" ON "Costumers"("document", "profileId");
