-- AlterTable
ALTER TABLE "User" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "birthTime" TEXT;

-- CreateTable
CREATE TABLE "AstrologyProfile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sunSign" TEXT,
    "moonSign" TEXT,
    "risingSign" TEXT,
    "mercury" TEXT,
    "venus" TEXT,
    "mars" TEXT,
    "jupiter" TEXT,
    "saturn" TEXT,
    "uranus" TEXT,
    "neptune" TEXT,
    "pluto" TEXT,
    "houses" JSONB,
    "aspects" JSONB,
    "lifePathNumber" INTEGER,
    "destinyNumber" INTEGER,
    "soulUrgeNumber" INTEGER,
    "personalityNumber" INTEGER,
    "birthDayNumber" INTEGER,
    "personalYearNumber" INTEGER,
    "chineseZodiac" TEXT,
    "chineseElement" TEXT,
    "luckyNumbers" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "luckyColors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "birthElement" TEXT,
    "modality" TEXT,
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AstrologyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AstrologyProfile_userId_key" ON "AstrologyProfile"("userId");

-- CreateIndex
CREATE INDEX "AstrologyProfile_userId_idx" ON "AstrologyProfile"("userId");

-- AddForeignKey
ALTER TABLE "AstrologyProfile" ADD CONSTRAINT "AstrologyProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
