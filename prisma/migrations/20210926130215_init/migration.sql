-- DropIndex
DROP INDEX "Profile_name_idx";

-- CreateIndex
CREATE INDEX "Profile_name_userId_idx" ON "Profile"("name", "userId");

-- CreateIndex
CREATE INDEX "Token_profileId_idx" ON "Token"("profileId");
