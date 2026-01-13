-- AlterTable
ALTER TABLE "Listing" ADD COLUMN     "duration" TEXT,
ADD COLUMN     "groupSize" TEXT,
ADD COLUMN     "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "traits" JSONB;
