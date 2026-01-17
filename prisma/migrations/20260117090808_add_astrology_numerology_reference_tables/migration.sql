-- CreateTable
CREATE TABLE "AstrologySignInfo" (
    "id" TEXT NOT NULL,
    "sign" TEXT NOT NULL,
    "symbol" TEXT,
    "dateRange" TEXT,
    "description" TEXT NOT NULL,
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "weaknesses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "element" TEXT NOT NULL,
    "modality" TEXT NOT NULL,
    "rulingPlanet" TEXT,
    "compatibleSigns" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "luckyNumbers" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "luckyColors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "luckyDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "bodyPart" TEXT,
    "anatomy" TEXT,
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AstrologySignInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanetInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "description" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "rulesOver" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "daysOfWeek" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "colors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "metals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PlanetInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HouseInfo" (
    "id" TEXT NOT NULL,
    "houseNumber" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "governs" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HouseInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AspectInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "symbol" TEXT,
    "angle" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "influence" TEXT NOT NULL,
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AspectInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NumerologyInfo" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "weaknesses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "lifeTheme" TEXT,
    "lifeLesson" TEXT,
    "compatibleNumbers" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "luckyColors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "luckyDays" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "personality" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "relationships" TEXT NOT NULL,
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NumerologyInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChineseZodiacInfo" (
    "id" TEXT NOT NULL,
    "animal" TEXT NOT NULL,
    "years" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT NOT NULL,
    "traits" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "strengths" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "weaknesses" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "element" TEXT NOT NULL,
    "luckiness" TEXT,
    "compatibleAnimals" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "luckyNumbers" INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    "luckyColors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "personality" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "relationships" TEXT NOT NULL,
    "fullData" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChineseZodiacInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AstrologySignInfo_sign_key" ON "AstrologySignInfo"("sign");

-- CreateIndex
CREATE INDEX "AstrologySignInfo_sign_idx" ON "AstrologySignInfo"("sign");

-- CreateIndex
CREATE UNIQUE INDEX "PlanetInfo_name_key" ON "PlanetInfo"("name");

-- CreateIndex
CREATE INDEX "PlanetInfo_name_idx" ON "PlanetInfo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "HouseInfo_houseNumber_key" ON "HouseInfo"("houseNumber");

-- CreateIndex
CREATE INDEX "HouseInfo_houseNumber_idx" ON "HouseInfo"("houseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AspectInfo_name_key" ON "AspectInfo"("name");

-- CreateIndex
CREATE INDEX "AspectInfo_name_idx" ON "AspectInfo"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NumerologyInfo_number_key" ON "NumerologyInfo"("number");

-- CreateIndex
CREATE INDEX "NumerologyInfo_number_idx" ON "NumerologyInfo"("number");

-- CreateIndex
CREATE UNIQUE INDEX "ChineseZodiacInfo_animal_key" ON "ChineseZodiacInfo"("animal");

-- CreateIndex
CREATE INDEX "ChineseZodiacInfo_animal_idx" ON "ChineseZodiacInfo"("animal");
