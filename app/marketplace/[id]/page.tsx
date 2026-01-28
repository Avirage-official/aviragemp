// app/marketplace/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import VenueDetailClient from "./VenueDetailClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

/* ============================================================================
   TYPES
   ============================================================================ */

export type VenueDetail = {
  id: string;
  name: string;
  description: string | null;
  neighborhood: string | null;
  city: string;
  countryCode: string;
  address: string | null;
  subcategory: string;
  priceRange: string | null;
  imageUrl: string | null;
  images: string[];  // ADD THIS LINE
  googleMapsUrl: string | null;
  website: string | null;
  phone: string | null;
  hours: any;
  compatibilityScores: Record<string, number>;
  vibes: string[];
  dominantArchetype: {
    name: string;
    score: number;
    description: string;
  };
  userMatch: {
    percentage: number;
    archetype: string;
  } | null;
};

/* ============================================================================
   ARCHETYPE DESCRIPTIONS
   ============================================================================ */

const ARCHETYPE_INFO: Record<string, string> = {
  earthlistener: "Grounded, present, attuned to natural rhythms and authentic connection.",
  horizonwalker: "Forward-thinking, exploratory, drawn to possibility and new perspectives.",
  fireweaver: "Passionate, expressive, energized by creativity and bold action.",
  shieldbearer: "Protective, reliable, committed to stability and care for others.",
  kitsune: "Adaptable, clever, navigating complexity with grace and wit.",
  harmonist: "Balanced, diplomatic, creating coherence between opposing forces.",
  flowbinder: "Intuitive, fluid, moving with ease through change and uncertainty.",
  starcaller: "Visionary, idealistic, reaching toward meaning beyond the material.",
  rootkeeper: "Traditional, steadfast, honoring legacy and lasting foundations.",
  voidwalker: "Introspective, contemplative, comfortable in solitude and mystery.",
  lightbringer: "Optimistic, inspiring, uplifting others through presence and energy.",
  stormrider: "Bold, intense, thriving in challenge and transformation.",
  dreamweaver: "Imaginative, creative, bridging inner vision with outer expression.",
  sentinel: "Vigilant, principled, standing guard over what matters most.",
  wanderer: "Curious, independent, seeking experience over attachment.",
  oracle: "Perceptive, knowing, reading patterns others miss.",
  sage: "Wise, measured, offering clarity through reflection and experience.",
  rebel: "Unconventional, disruptive, challenging norms to create change.",
  guardian: "Nurturing, loyal, providing safety and support to others.",
  dreamer: "Idealistic, hopeful, envisioning worlds not yet realized.",
};

/* ============================================================================
   HELPER FUNCTIONS
   ============================================================================ */

function getDominantArchetype(scores: Record<string, number>): {
  name: string;
  score: number;
  description: string;
} {
  let maxScore = 0;
  let dominantName = "balanced";

  Object.entries(scores).forEach(([name, score]) => {
    if (score > maxScore) {
      maxScore = score;
      dominantName = name;
    }
  });

  const capitalizedName = dominantName.charAt(0).toUpperCase() + dominantName.slice(1);
  const description =
    ARCHETYPE_INFO[dominantName.toLowerCase()] ||
    "A unique blend of energies and qualities.";

  return {
    name: capitalizedName,
    score: maxScore,
    description,
  };
}

/* ============================================================================
   PAGE
   ============================================================================ */

export default async function VenueDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Get user archetype
  const { userId } = await auth();
  let userArchetype: string | null = null;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: { primaryCode: true },
    });
    userArchetype = user?.primaryCode || null;
  }

  // Fetch venue
  const venue = await prisma.venue.findFirst({
    where: { id, isActive: true },
    include: {
      vibes: { select: { vibe: true } },
    },
  });

  if (!venue) {
    redirect("/marketplace");
  }

  // Parse scores
  const scores =
    typeof venue.compatibilityScores === "object" && venue.compatibilityScores !== null
      ? (venue.compatibilityScores as Record<string, number>)
      : {};

  // Get dominant archetype
  const dominantArchetype = getDominantArchetype(scores);

  // Calculate user match
  let userMatch: VenueDetail["userMatch"] = null;
  if (userArchetype) {
    const matchPercentage = scores[userArchetype.toLowerCase()] || 0;
    userMatch = {
      percentage: matchPercentage,
      archetype: userArchetype,
    };
  }

  // Build detail object
  const venueDetail: VenueDetail = {
    id: venue.id,
    name: venue.name,
    description: venue.description,
    neighborhood: venue.neighborhood,
    city: venue.city,
    countryCode: venue.countryCode,
    address: venue.address,
    subcategory: venue.subcategory,
    priceRange: venue.priceRange,
    imageUrl: venue.imageUrl,
    images: venue.images, 
    googleMapsUrl: venue.googleMapsUrl,
    website: venue.website,
    phone: venue.phone,
    hours: venue.hours,
    compatibilityScores: scores,
    vibes: venue.vibes.map((v) => v.vibe),
    dominantArchetype,
    userMatch,
  };

  return <VenueDetailClient venue={venueDetail} />;
}