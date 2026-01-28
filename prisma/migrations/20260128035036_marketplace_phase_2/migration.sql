-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCountry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "preferredCountry" TEXT NOT NULL,
    "detectedCountry" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCountry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "countryCode" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT,
    "address" TEXT,
    "latitude" DECIMAL(10,8),
    "longitude" DECIMAL(11,8),
    "googleMapsUrl" TEXT,
    "category" TEXT NOT NULL DEFAULT 'spaces',
    "subcategory" TEXT NOT NULL,
    "description" TEXT,
    "imageUrl" TEXT,
    "website" TEXT,
    "phone" TEXT,
    "hours" JSONB,
    "priceRange" TEXT,
    "compatibilityScores" JSONB NOT NULL,
    "airtableId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueVibe" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "vibe" TEXT NOT NULL,

    CONSTRAINT "VenueVibe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VenueChat" (
    "id" TEXT NOT NULL,
    "venueId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "isCheckedIn" BOOLEAN NOT NULL DEFAULT false,
    "mood" TEXT,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "reportCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "editedAt" TIMESTAMP(3),

    CONSTRAINT "VenueChat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatReport" (
    "id" TEXT NOT NULL,
    "chatId" TEXT NOT NULL,
    "reportedBy" TEXT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatReport_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserBan" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "banReason" TEXT,
    "reportCount" INTEGER NOT NULL DEFAULT 0,
    "bannedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bannedUntil" TIMESTAMP(3),

    CONSTRAINT "UserBan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_code_idx" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_isActive_idx" ON "Country"("isActive");

-- CreateIndex
CREATE UNIQUE INDEX "UserCountry_userId_key" ON "UserCountry"("userId");

-- CreateIndex
CREATE INDEX "UserCountry_userId_idx" ON "UserCountry"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Venue_airtableId_key" ON "Venue"("airtableId");

-- CreateIndex
CREATE INDEX "Venue_countryCode_idx" ON "Venue"("countryCode");

-- CreateIndex
CREATE INDEX "Venue_subcategory_idx" ON "Venue"("subcategory");

-- CreateIndex
CREATE INDEX "Venue_isActive_idx" ON "Venue"("isActive");

-- CreateIndex
CREATE INDEX "Venue_city_idx" ON "Venue"("city");

-- CreateIndex
CREATE INDEX "VenueVibe_vibe_idx" ON "VenueVibe"("vibe");

-- CreateIndex
CREATE UNIQUE INDEX "VenueVibe_venueId_vibe_key" ON "VenueVibe"("venueId", "vibe");

-- CreateIndex
CREATE INDEX "VenueChat_venueId_createdAt_idx" ON "VenueChat"("venueId", "createdAt");

-- CreateIndex
CREATE INDEX "VenueChat_userId_idx" ON "VenueChat"("userId");

-- CreateIndex
CREATE INDEX "ChatReport_chatId_idx" ON "ChatReport"("chatId");

-- CreateIndex
CREATE UNIQUE INDEX "UserBan_userId_key" ON "UserBan"("userId");

-- CreateIndex
CREATE INDEX "UserBan_userId_idx" ON "UserBan"("userId");

-- AddForeignKey
ALTER TABLE "UserCountry" ADD CONSTRAINT "UserCountry_preferredCountry_fkey" FOREIGN KEY ("preferredCountry") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Venue" ADD CONSTRAINT "Venue_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Country"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueVibe" ADD CONSTRAINT "VenueVibe_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VenueChat" ADD CONSTRAINT "VenueChat_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE CASCADE ON UPDATE CASCADE;
