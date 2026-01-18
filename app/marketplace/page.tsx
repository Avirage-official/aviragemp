// app/marketplace/page.tsx
import { prisma } from "@/lib/prisma";
import MarketplaceClient from "./MarketplaceClient";

export const dynamic = "force-dynamic";

/* ============================================================================
   TYPES
   ============================================================================ */

type Experience = {
  id: string;
  title: string;
  description: string;
  location: string;
  city: string;
  category: "experience" | "retreat" | "workshop" | "event" | "service";
  priceLabel: string;
  bookingType: "INQUIRY" | "INSTANT";
  tags: string[];
  createdAt: string;
  views: number;
  likes: number;
  businessName: string;
  imageUrl: string | null;
};

/* ============================================================================
   PAGE
   ============================================================================ */

export default async function MarketplacePage() {
  const listings = await prisma.listing.findMany({
    where: { isActive: true },
    include: {
      business: {
        select: {
          businessName: true,
        },
      },
      analytics: {
        where: {
          action: "VIEW",
        },
        select: {
          id: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const experiences: Experience[] = listings.map((listing) => {
    // Price formatting
    const priceLabel = (() => {
      const pricingType = String(listing.pricingType ?? "").toUpperCase();
      if (pricingType === "CUSTOM") return "Contact";
      
      const price = typeof listing.price === "number" ? listing.price : null;
      if (price === null) return "Contact";
      
      return `$${Math.round(price)}`;
    })();

    // Tags (safe array)
    const tags = Array.isArray(listing.tags)
      ? listing.tags.filter((t): t is string => typeof t === "string")
      : [];

    return {
      id: listing.id,
      title: listing.title,
      description: listing.description,
      location: listing.location ?? "—",
      city: listing.city ?? "—",
      category: listing.category as Experience["category"],
      priceLabel,
      bookingType: listing.bookingType as "INQUIRY" | "INSTANT",
      tags,
      createdAt: listing.createdAt.toISOString(),
      views: listing.analytics.length,
      likes: 0, // TODO: Implement likes system
      businessName: listing.business?.businessName ?? "Unknown Business",
      imageUrl: Array.isArray(listing.images) && listing.images.length > 0 
        ? listing.images[0] 
        : null, // Use first image from images array
    };
  });

  return <MarketplaceClient initialExperiences={experiences} />;
}