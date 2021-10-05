-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PF', 'PJ');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('developement', 'production');

-- CreateEnum
CREATE TYPE "MecrchantStatus" AS ENUM ('active', 'deleted', 'pending');

-- CreateEnum
CREATE TYPE "ProvidersEnum" AS ENUM ('pagarme', 'pagseguro');

-- CreateEnum
CREATE TYPE "costumerDocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "CardsStatus" AS ENUM ('active', 'failed', 'pending');

-- CreateEnum
CREATE TYPE "CardsBrand" AS ENUM ('electron', 'maestro', 'visa', 'mastercard', 'amex', 'diners', 'discover', 'jcb');

-- CreateEnum
CREATE TYPE "paymentMethodType" AS ENUM ('boleto', 'credit', 'pix');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "document" VARCHAR(255) NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "user_type" "UserType" NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "street_number" VARCHAR(255) NOT NULL,
    "complementary" VARCHAR(255) NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zipcode" VARCHAR(8) NOT NULL,
    "country" VARCHAR(255) NOT NULL DEFAULT E'BR',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "userId" VARCHAR(255),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "profileId" VARCHAR(255),
    "id" VARCHAR(255) NOT NULL,
    "type" "TokenType" NOT NULL,
    "token" VARCHAR(255),
    "client_id" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "expires_in" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchants" (
    "id" VARCHAR(255) NOT NULL,
    "mcc" VARCHAR(100) NOT NULL,
    "status" "MecrchantStatus" NOT NULL DEFAULT E'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profileId" VARCHAR(255) NOT NULL,
    "userId" VARCHAR(255),

    CONSTRAINT "Merchants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Providers" (
    "id" VARCHAR(255) NOT NULL,
    "name" "ProvidersEnum" NOT NULL,
    "credentials" JSON NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profileId" VARCHAR(255),
    "userId" VARCHAR(255),
    "merchantId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Providers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Costumers" (
    "id" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "document" VARCHAR(25) NOT NULL,
    "document_type" "costumerDocumentType" NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "streetNumber" VARCHAR(255) NOT NULL,
    "district" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(70) NOT NULL,
    "complement" VARCHAR(255) NOT NULL,
    "zipCode" VARCHAR(20) NOT NULL,
    "country" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "profileId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Costumers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cards" (
    "id" VARCHAR(255) NOT NULL,
    "cardId" VARCHAR(255),
    "expirationMonth" VARCHAR(15) NOT NULL,
    "expirationYear" VARCHAR(15) NOT NULL,
    "brand" VARCHAR(50) NOT NULL,
    "last4digits" VARCHAR(10) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "cvvChecked" "CardsStatus" NOT NULL DEFAULT E'pending',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "costumerId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Charges" (
    "id" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "currency" VARCHAR(255) DEFAULT E'BRL',
    "statementDescriptor" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "capture" BOOLEAN NOT NULL DEFAULT false,
    "status" "CardsStatus" NOT NULL,
    "paymentMethod" "paymentMethodType" NOT NULL,
    "installments" INTEGER DEFAULT 1,
    "expiresDate" VARCHAR(15),
    "instructions" VARCHAR(255),
    "interestDays" INTEGER DEFAULT 1,
    "interestAmount" DECIMAL(65,30) DEFAULT 0.0,
    "interestPercentage" INTEGER DEFAULT 0,
    "fineDays" INTEGER DEFAULT 1,
    "fineAmount" DECIMAL(65,30) DEFAULT 0.0,
    "finePercentage" INTEGER DEFAULT 0,
    "cardsId" VARCHAR(255),
    "costumerId" VARCHAR(255) NOT NULL,
    "profileId" VARCHAR(255),
    "merchantId" VARCHAR(255) NOT NULL,

    CONSTRAINT "Charges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" VARCHAR(255) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL DEFAULT 0.0,
    "currency" VARCHAR(255) DEFAULT E'BRL',
    "idempotencyKey" VARCHAR(255) NOT NULL,
    "providerId" VARCHAR(255) NOT NULL,
    "providerType" VARCHAR(255) NOT NULL,
    "transactionId" VARCHAR(255) NOT NULL,
    "authorizationNsu" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "requestType" VARCHAR(255) NOT NULL,
    "responseTs" VARCHAR(255) NOT NULL,
    "networkAuthorizationCode" VARCHAR(255) NOT NULL,
    "networkResponseCode" VARCHAR(255) NOT NULL,
    "chargeId" VARCHAR(255),

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileToUser" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_ProfileToToken" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_CostumersToProfile" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_MerchantsToProviders" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_CardsToCostumers" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateTable
CREATE TABLE "_ChargesToTransactions" (
    "A" VARCHAR(255) NOT NULL,
    "B" VARCHAR(255) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_email_key" ON "Profile"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_document_key" ON "Profile"("document");

-- CreateIndex
CREATE INDEX "Profile_name_userId_idx" ON "Profile"("name", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_client_id_key" ON "Token"("client_id");

-- CreateIndex
CREATE INDEX "Token_profileId_idx" ON "Token"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchants_profileId_key" ON "Merchants"("profileId");

-- CreateIndex
CREATE INDEX "Merchants_profileId_status_mcc_idx" ON "Merchants"("profileId", "status", "mcc");

-- CreateIndex
CREATE UNIQUE INDEX "Costumers_document_key" ON "Costumers"("document");

-- CreateIndex
CREATE INDEX "Costumers_email_idx" ON "Costumers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Costumers_document_profileId_key" ON "Costumers"("document", "profileId");

-- CreateIndex
CREATE INDEX "Cards_brand_status_idx" ON "Cards"("brand", "status");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToUser_AB_unique" ON "_ProfileToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToUser_B_index" ON "_ProfileToUser"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToToken_AB_unique" ON "_ProfileToToken"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToToken_B_index" ON "_ProfileToToken"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CostumersToProfile_AB_unique" ON "_CostumersToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_CostumersToProfile_B_index" ON "_CostumersToProfile"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_MerchantsToProviders_AB_unique" ON "_MerchantsToProviders"("A", "B");

-- CreateIndex
CREATE INDEX "_MerchantsToProviders_B_index" ON "_MerchantsToProviders"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CardsToCostumers_AB_unique" ON "_CardsToCostumers"("A", "B");

-- CreateIndex
CREATE INDEX "_CardsToCostumers_B_index" ON "_CardsToCostumers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ChargesToTransactions_AB_unique" ON "_ChargesToTransactions"("A", "B");

-- CreateIndex
CREATE INDEX "_ChargesToTransactions_B_index" ON "_ChargesToTransactions"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Merchants" ADD CONSTRAINT "Merchants_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Providers" ADD CONSTRAINT "Providers_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Costumers" ADD CONSTRAINT "Costumers_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cards" ADD CONSTRAINT "Cards_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_cardsId_fkey" FOREIGN KEY ("cardsId") REFERENCES "Cards"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_costumerId_fkey" FOREIGN KEY ("costumerId") REFERENCES "Costumers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charges" ADD CONSTRAINT "Charges_merchantId_fkey" FOREIGN KEY ("merchantId") REFERENCES "Merchants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_chargeId_fkey" FOREIGN KEY ("chargeId") REFERENCES "Charges"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToUser" ADD FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToUser" ADD FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToToken" ADD FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToToken" ADD FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostumersToProfile" ADD FOREIGN KEY ("A") REFERENCES "Costumers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CostumersToProfile" ADD FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MerchantsToProviders" ADD FOREIGN KEY ("A") REFERENCES "Merchants"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MerchantsToProviders" ADD FOREIGN KEY ("B") REFERENCES "Providers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardsToCostumers" ADD FOREIGN KEY ("A") REFERENCES "Cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CardsToCostumers" ADD FOREIGN KEY ("B") REFERENCES "Costumers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChargesToTransactions" ADD FOREIGN KEY ("A") REFERENCES "Charges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChargesToTransactions" ADD FOREIGN KEY ("B") REFERENCES "Transactions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
