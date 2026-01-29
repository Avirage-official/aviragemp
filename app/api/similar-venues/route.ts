import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get similar venues based on compatibility scores and vibes
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

    if (!venueId) {
      return NextResponse.json(
        { error: "Missing venueId" },
        { status: 400 }
      );
    }

    // Get the current venue
    const currentVenue = await prisma.venue.findUnique({
      where: { id: venueId },
      include: {
        vibes: { select: { vibe: true } },
      },
    });

    if (!currentVenue) {
      return NextResponse.json(
        { error: "Venue not found" },
        { status: 404 }
      );
    }

    const currentVibes = currentVenue.vibes.map((v) => v.vibe);
    const currentScores =
      typeof currentVenue.compatibilityScores === "object" &&
      currentVenue.compatibilityScores !== null
        ? (currentVenue.compatibilityScores as Record<string, number>)
        : {};

    // Get other venues in the same city and subcategory
    const otherVenues = await prisma.venue.findMany({
      where: {
        id: { not: venueId },
        city: currentVenue.city,
        subcategory: currentVenue.subcategory,
        isActive: true,
      },
      include: {
        vibes: { select: { vibe: true } },
      },
      take: 20, // Get more to calculate similarity
    });

    // Calculate similarity scores
    const venuesWithScores = otherVenues.map((venue) => {
      const venueVibes = venue.vibes.map((v) => v.vibe);
      const venueScores =
        typeof venue.compatibilityScores === "object" &&
        venue.compatibilityScores !== null
          ? (venue.compatibilityScores as Record<string, number>)
          : {};

      // Calculate vibe overlap
      const vibeOverlap = currentVibes.filter((v) => venueVibes.includes(v)).length;
      const vibeScore = vibeOverlap / Math.max(currentVibes.length, 1);

      // Calculate archetype score similarity (cosine similarity-like)
      let scoreSimilarity = 0;
      let count = 0;
      Object.keys(currentScores).forEach((archetype) => {
        if (venueScores[archetype] !== undefined) {
          const diff = Math.abs(currentScores[archetype] - venueScores[archetype]);
          scoreSimilarity += 1 - diff / 100; // Normalize to 0-1
          count++;
        }
      });
      scoreSimilarity = count > 0 ? scoreSimilarity / count : 0;

      // Combined similarity (weighted average)
      const similarity = vibeScore * 0.4 + scoreSimilarity * 0.6;

      return {
        id: venue.id,
        name: venue.name,
        neighborhood: venue.neighborhood,
        city: venue.city,
        imageUrl: venue.imageUrl,
        priceRange: venue.priceRange,
        vibes: venueVibes,
        similarity,
      };
    });

    // Sort by similarity and take top 6
    const similarVenues = venuesWithScores
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 6);

    return NextResponse.json({
      similarVenues,
    });
  } catch (error) {
    console.error("Error fetching similar venues:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
