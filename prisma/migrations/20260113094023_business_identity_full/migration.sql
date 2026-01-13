/*
  Warnings:

  - You are about to drop the column `amount` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `billingPeriod` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "numberOfPeople" DROP NOT NULL,
ALTER COLUMN "amount" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BusinessProfile" ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "primaryCode" TEXT,
ADD COLUMN     "secondaryCode" TEXT,
ADD COLUMN     "tertiaryCode" TEXT,
ADD COLUMN     "timezone" TEXT;

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "amount",
DROP COLUMN "billingPeriod",
DROP COLUMN "currency",
ADD COLUMN     "stripeCustomerId" TEXT,
ALTER COLUMN "stripeSubscriptionId" DROP NOT NULL,
ALTER COLUMN "currentPeriodStart" DROP NOT NULL,
ALTER COLUMN "currentPeriodEnd" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "BusinessProfile_primaryCode_idx" ON "BusinessProfile"("primaryCode");

-- CreateIndex
CREATE INDEX "Subscription_status_idx" ON "Subscription"("status");
