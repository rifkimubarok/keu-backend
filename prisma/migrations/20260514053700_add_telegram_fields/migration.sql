-- AlterTable
ALTER TABLE "users" ADD COLUMN "telegramId" TEXT,
ADD COLUMN "telegramLinkExpiry" TIMESTAMP(3),
ADD COLUMN "telegramLinkToken" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramId_key" ON "users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegramLinkToken_key" ON "users"("telegramLinkToken");
