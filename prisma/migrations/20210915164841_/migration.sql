-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('PF', 'PJ');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('Developer', 'Production');

-- CreateTable
CREATE TABLE "User" (
    "id" VARCHAR(255) NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

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
    "phone" INTEGER NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "street_number" VARCHAR(255) NOT NULL,
    "complementary" VARCHAR(255) NOT NULL,
    "neighborhood" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "state" VARCHAR(255) NOT NULL,
    "zipcode" VARCHAR(8) NOT NULL,
    "country" VARCHAR(255) NOT NULL DEFAULT E'BR',
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" VARCHAR(255) NOT NULL,
    "type" "TokenType" NOT NULL,
    "token" VARCHAR(255) NOT NULL,
    "client_id" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProfileToToken" (
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
CREATE INDEX "Profile_name_idx" ON "Profile"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "Token_client_id_key" ON "Token"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProfileToToken_AB_unique" ON "_ProfileToToken"("A", "B");

-- CreateIndex
CREATE INDEX "_ProfileToToken_B_index" ON "_ProfileToToken"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToToken" ADD FOREIGN KEY ("A") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProfileToToken" ADD FOREIGN KEY ("B") REFERENCES "Token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
