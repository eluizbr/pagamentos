-- CreateEnum
CREATE TYPE "CardsStatus" AS ENUM ('active', 'failed', 'pending');

-- CreateEnum
CREATE TYPE "CardsBrand" AS ENUM ('amex', 'diners', 'discover', 'elo', 'jcb', 'master', 'visa');

-- CreateTable
CREATE TABLE "Costumers" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "document" JSONB NOT NULL,
    "address" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "prodileId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Costumers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" VARCHAR(255) NOT NULL,
    "expirationMonth" VARCHAR(15) NOT NULL,
    "expirationYear" VARCHAR(15) NOT NULL,
    "brand" "CardsBrand" NOT NULL,
    "lsa4digits" VARCHAR(10) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "cvvChecked" "CardsStatus" NOT NULL DEFAULT E'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costumerId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CostumersToProfile" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_CardsToCostumers" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE INDEX "Costumers_email_idx" ON "Costumers"("email");

-- CreateIndex
CREATE INDEX "Cards_brand_status_idx" ON "Cards"("brand", "status");

-- CreateIndex
CREATE UNIQUE INDEX "_CostumersToProfile_AB_unique" ON "_CostumersToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_CostumersToProfile_B_index" ON "_CostumersToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardsToCostumers_AB_unique" ON "_CardsToCostumers"("A", "B");

-- CreateIndex
CREATE INDEX "_CardsToCostumers_B_index" ON "_CardsToCostumers"("B");

-- AddForeignKey
ALTER TABLE "Costumers" ADD CONSTRAINT "Costumers_prodileId_fkey" FOREIGN KEY ("prodileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostumersToProfile" ADD FOREIGN KEY ("A") REFERENCES "Costumers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostumersToProfile" ADD FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardsToCostumers" ADD FOREIGN KEY ("A") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardsToCostumers" ADD FOREIGN KEY ("B") REFERENCES "Costumers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
