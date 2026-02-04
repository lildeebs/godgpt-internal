-- CreateTable
CREATE TABLE "affiliate_submissions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "socialMediaChannels" TEXT NOT NULL,
    "followerCount" INTEGER NOT NULL,
    "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "emailSentAt" DATETIME,
    "emailSentStatus" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE INDEX "affiliate_submissions_email_idx" ON "affiliate_submissions"("email");

-- CreateIndex
CREATE INDEX "affiliate_submissions_submittedAt_idx" ON "affiliate_submissions"("submittedAt");

-- CreateIndex
CREATE INDEX "affiliate_submissions_status_idx" ON "affiliate_submissions"("status");
