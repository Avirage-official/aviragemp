// app/marketplace/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import MarketplaceDetailClient, {
  ListingDetailView,
} from "./MarketplaceDetailClient";

export const dynamic = "force-dynamic";

function normaliseTraits(input: unknown): {
  energy: number;
  social: number;
  structure: number;
  expression: number;
  nature: number;
  pace: number;
  introspection: number;
} | null {
  if (!input || typeof input !== "object") return null;

  const obj = input as Record<string, unknown>;

  const clamp = (v: unknown, d = 50) =>
    typeof v === "number" ? Math.max(0, Math.min(100, v)) : d;

  return {
    energy: clamp(obj.energy),
    social: clamp(obj.social),
    structure: clamp(obj.structure),
    expression: clamp(obj.expression),
    nature: clamp(obj.nature),
    pace: clamp(obj.pace),
    introspection: clamp(obj.introspection),
  };
}

function safeStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x) => typeof x === "string");
}

export default async function MarketplaceDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { lens?: string; code?: string };
}) {
  const { id } = params;

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

  const traits =
    listing.traits && typeof listing.traits === "object"
      ? listing.traits
      : null;

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
    business: {
      businessName: listing.business.businessName,
      description: listing.business.description ?? "",
      website: listing.business.website ?? null,
      primaryCode: listing.business.primaryCode ?? null,
      secondaryCode: listing.business.secondaryCode ?? null,
      tertiaryCode: listing.business.tertiaryCode ?? null,
    },
    editorial: {
      traits: traits ?? {
        energy: 55,
        social: 45,
        structure: 50,
        expression: 45,
        nature: 50,
        pace: 50,
        introspection: 55,
      },
      whatToExpect: safeStringArray((listing as any).whatToExpect).length
        ? safeStringArray((listing as any).whatToExpect)
        : [
            "A gentle pace — you can opt in or out of intensity",
            "Clarity over pressure (no hard selling, no forced sharing)",
            "Space to ask questions before committing",
            "Designed to feel like fit, not funnel",
          ],
      whatHappensNext:
        typeof (listing as any).whatHappensNext === "string"
          ? (listing as any).whatHappensNext
          : "After you send an inquiry, the host replies with timing options and practical details so you can decide if it fits.",
      host:
        (listing as any).host && typeof (listing as any).host === "object"
          ? (listing as any).host
          : {
              name: listing.business.businessName,
              ethos:
                listing.business.description ??
                "A small operator focused on intentional, personality-aligned experiences.",
              approach: [
                "Low-pressure conversation first",
                "Fit-focused guidance",
                "Respect for autonomy",
              ],
              values: ["Clarity", "Care", "Human pace"],
            },
      timeline: Array.isArray((listing as any).timeline)
        ? (listing as any).timeline
        : [
            {
              phase: "Inquiry",
              description:
                "You send a message describing your interest and constraints.",
            },
            {
              phase: "Host reply",
              description:
                "The host responds with options and practical details.",
            },
            {
              phase: "Confirm fit",
              description:
                "If it feels aligned, you confirm timing and next steps.",
            },
          ],
    },
  };

  return (
    <MarketplaceDetailClient
      view={view}
      lens={searchParams?.lens ?? null}
      codeLens={searchParams?.code ?? null}
    />
  );
}
