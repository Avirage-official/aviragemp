-- AlterTable
ALTER TABLE "Venue" ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];
