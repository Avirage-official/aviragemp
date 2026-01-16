// app/marketplace/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import MarketplaceDetailClient, {
  ListingDetailView,
} from "./MarketplaceDetailClient";

export const dynamic = "force-dynamic";

type SearchParams = {
  lens?: string;
  code?: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: Promise<SearchParams>;
};

/* -------------------------------------------------------------------------- */
/* Small helpers                                                              */
/* -------------------------------------------------------------------------- */

function safeStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((x) => typeof x === "string")
    .map((x) => x.trim())
    .filter(Boolean);
}

function clampTrait(n: unknown, fallback = 50): number {
  const v = typeof n === "number" && Number.isFinite(n) ? n : fallback;
  return Math.max(0, Math.min(100, v));
}

function normaliseTraits(v: unknown): ListingDetailView["editorial"]["traits"] {
  if (!v || typeof v !== "object" || Array.isArray(v)) {
    return {
      energy: 55,
      social: 45,
      structure: 50,
      expression: 45,
      nature: 50,
      pace: 50,
      introspection: 55,
    };
  }

  const obj = v as Record<string, unknown>;

  return {
    energy: clampTrait(obj.energy, 55),
    social: clampTrait(obj.social, 45),
    structure: clampTrait(obj.structure, 50),
    expression: clampTrait(obj.expression, 45),
    nature: clampTrait(obj.nature, 50),
    pace: clampTrait(obj.pace, 50),
    introspection: clampTrait(obj.introspection, 55),
  };
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default async function MarketplaceDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;

  const sp = searchParams ? await searchParams : undefined;

  const listing = await prisma.listing.findFirst({
    where: { id, isActive: true },
    include: {
      business: {
        select: {
          businessName: true,
          description: true,
          website: true,
          primaryCode: true,
          secondaryCode: true,
          tertiaryCode: true,
        },
      },
    },
  });

  if (!listing) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-white/60">This experience is no longer available.</p>
      </div>
    );
  }

  // Pull editorial from Listing model
  const traits = normaliseTraits((listing as any).traits);
  const tags = safeStringArray((listing as any).tags ?? []);
  const duration =
    typeof (listing as any).duration === "string" && (listing as any).duration.trim()
      ? (listing as any).duration.trim()
      : "Varies";
  const groupSize =
    typeof (listing as any).groupSize === "string" && (listing as any).groupSize.trim()
      ? (listing as any).groupSize.trim()
      : "Flexible";

  const view: ListingDetailView = {
    id: listing.id,
    title: listing.title,
    description: listing.description,
    location: listing.location ?? listing.city ?? "—",
    city: listing.city ?? "—",
    category: listing.category,
    price: listing.price ?? null,
    pricingType: listing.pricingType,
    bookingType: listing.bookingType as "INQUIRY" | "INSTANT",
    targetCodes: listing.targetCodes ?? [],
    images: listing.images ?? [],
    business: {
      businessName: listing.business.businessName,
      description: listing.business.description ?? "",
      website: listing.business.website ?? null,
      primaryCode: listing.business.primaryCode ?? null,
      secondaryCode: listing.business.secondaryCode ?? null,
      tertiaryCode: listing.business.tertiaryCode ?? null,
    },
    editorial: {
      traits,
      tags,
      duration,
      groupSize,

      whatToExpect: [
        "A gentle pace — you can opt in or out of intensity",
        "Clarity over pressure (no forced sharing)",
        "Space to ask questions before committing",
        "Designed to feel like fit, not funnel",
      ],
      whatHappensNext:
        "After you send an inquiry, the host replies with timing options, practical details, and guidance so you can decide if it fits.",
      host: {
        name: listing.business.businessName,
        ethos:
          listing.business.description ??
          "A small operator focused on intentional, personality-aligned experiences.",
        approach: ["Low-pressure conversation first", "Fit-focused guidance", "Respect for autonomy"],
        values: ["Clarity", "Care", "Human pace"],
      },
      timeline: [
        {
          phase: "Inquiry",
          description:
            "You send a message describing your interest, constraints, and what you want from the experience.",
        },
        {
          phase: "Host reply",
          description: "The host responds with options, practical details, and any preparation notes.",
        },
        {
          phase: "Confirm fit",
          description: "If it feels aligned, you confirm timing and next steps—no pressure if it doesn't.",
        },
      ],
    },
  };

  return (
    <MarketplaceDetailClient
      view={view}
      lens={sp?.lens ?? null}
      codeLens={sp?.code ?? null}
    />
  );
}