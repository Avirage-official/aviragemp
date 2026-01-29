// app/marketplace/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import MarketplaceClient from "./MarketplaceClient";

export const dynamic = "force-dynamic";

/* ============================================================================
   TYPES
   ============================================================================ */

export type Venue = {  // ADD "export" here
  id: string;
  name: string;
  description: string | null;
  neighborhood: string | null;
  city: string;
  countryCode: string;
  subcategory: string;
  priceRange: string | null;
  imageUrl: string | null;
  compatibilityScores: Record<string, number>;
  vibes: string[];
  googleMapsUrl: string | null;
  website: string | null;
};

/* ============================================================================
   PAGE
   ============================================================================ */

export default async function MarketplacePage() {
  // Get current user's archetype
  const { userId } = await auth();
  let userArchetype: string | null = null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { primaryCode: true },
    });
    userArchetype = user?.primaryCode || null;
  }
  // Fetch all active venues with vibes
  const venues = await prisma.venue.findMany({
    where: {
      isActive: true,
      // Optionally filter by user's country later
      // countryCode: "SG"
    },
    include: {
      vibes: {
        select: {
          vibe: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Transform to client format
  const clientVenues: Venue[] = venues.map((venue) => {
    // Parse compatibility scores from JSON
    const scores =
      typeof venue.compatibilityScores === "object" &&
      venue.compatibilityScores !== null
        ? (venue.compatibilityScores as Record<string, number>)
        : {};

    return {
      id: venue.id,
      name: venue.name,
      description: venue.description,
      neighborhood: venue.neighborhood,
      city: venue.city,
      countryCode: venue.countryCode,
      subcategory: venue.subcategory,
      priceRange: venue.priceRange,
      imageUrl: venue.imageUrl,
      compatibilityScores: scores,
      vibes: venue.vibes.map((v) => v.vibe),
      googleMapsUrl: venue.googleMapsUrl,
      website: venue.website,
    };
  });

  return (
    <MarketplaceClient
      initialVenues={clientVenues}
      userArchetype={userArchetype}
    />
  );
}