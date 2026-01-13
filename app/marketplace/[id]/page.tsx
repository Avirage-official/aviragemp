// app/[id]/marketplace/page.tsx
import { prisma } from "@/lib/prisma";
import MarketplaceDetailClient, {
  ListingDetailView,
} from "./MarketplaceDetailClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
  searchParams?: {
    lens?: string;
    code?: string;
  };
};

export default async function MarketplaceDetailPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;

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

  /**
   * NOTE:
   * Your current Prisma Listing model does not include:
   * - traits / whatToExpect / host / timeline
   * We keep the UI by allowing editorial fields to come from optional JSON/arrays.
   * If fields are missing, we render tasteful defaults (not “empty MVP”).
   */
  const traits =
    typeof (listing as any).traits === "object" && (listing as any).traits
      ? (listing as any).traits
      : null;
function safeStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x) => typeof x === "string") as string[];
}

  const whatToExpect = safeStringArray((listing as any).whatToExpect);
  const whatHappensNext =
    typeof (listing as any).whatHappensNext === "string"
      ? (listing as any).whatHappensNext
      : null;

  const host = (listing as any).host && typeof (listing as any).host === "object"
    ? (listing as any).host
    : null;

  const timeline =
    Array.isArray((listing as any).timeline) ? (listing as any).timeline : null;

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
      whatToExpect:
        whatToExpect.length > 0
          ? whatToExpect
          : [
              "A gentle pace — you can opt in or out of intensity",
              "Clarity over pressure (no hard selling, no forced sharing)",
              "Space to ask questions before committing",
              "Designed to feel like fit, not funnel",
            ],
      whatHappensNext:
        whatHappensNext ??
        "After you send an inquiry, the host replies with timing options, practical details, and guidance so you can decide if it fits.",
      host:
        host ?? {
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
      timeline:
        timeline ??
        [
          {
            phase: "Inquiry",
            description:
              "You send a message describing your interest, constraints, and what you want from the experience.",
          },
          {
            phase: "Host reply",
            description:
              "The host responds with options, practical details, and any preparation notes.",
          },
          {
            phase: "Confirm fit",
            description:
              "If it feels aligned, you confirm timing and next steps—no pressure if it doesn’t.",
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
