-- AlterTable
ALTER TABLE "Charges" ADD COLUMN     "orderId" VARCHAR(255),
ALTER COLUMN "statementDescriptor" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "capture" DROP NOT NULL,
ALTER COLUMN "status" DROP NOT NULL;