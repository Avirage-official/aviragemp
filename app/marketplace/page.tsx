// app/marketplace/page.tsx
import { prisma } from "@/lib/prisma";
import MarketplaceClient, { Experience } from "./MarketplaceClient";

export const dynamic = "force-dynamic";

/* -------------------------------------------------------------------------- */
/* MYTHICAL CODES (SERVER AUTHORITY)                                           */
/* -------------------------------------------------------------------------- */

const MYTHICAL_CODES = [
  "khoisan",
  "kayori",
  "alethir",
  "lhumir",
  "tjukari",
  "shokunin",
  "siyuane",
  "khoruun",
  "sahen",
  "tahiri",
  "yatevar",
] as const;

type MythicalCode = (typeof MYTHICAL_CODES)[number];

function toMythicalCodes(v: unknown): MythicalCode[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is MythicalCode =>
    MYTHICAL_CODES.includes(x as MythicalCode)
  );
}

/* -------------------------------------------------------------------------- */
/* HELPERS                                                                    */
/* -------------------------------------------------------------------------- */

function safeStringArray(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x) => typeof x === "string");
}

function clampTrait(n: unknown, fallback = 50): number {
  const v = typeof n === "number" ? n : fallback;
  return Math.max(0, Math.min(100, v));
}

function deriveEditorial(listing: any): Pick<
  Experience,
  "traits" | "tags" | "duration" | "groupSize" | "priceLabel" | "resonatesWith"
> {
  const traitsObj =
    listing?.traits && typeof listing.traits === "object"
      ? listing.traits
      : null;

  const traits = {
    energy: clampTrait(traitsObj?.energy, 50),
    social: clampTrait(traitsObj?.social, 50),
    structure: clampTrait(traitsObj?.structure, 50),
    expression: clampTrait(traitsObj?.expression, 50),
    nature: clampTrait(traitsObj?.nature, 50),
    pace: clampTrait(traitsObj?.pace, 50),
    introspection: clampTrait(traitsObj?.introspection, 50),
  };

  const tags = safeStringArray(listing?.tags);

  const duration =
    typeof listing?.duration === "string" && listing.duration.trim()
      ? listing.duration.trim()
      : "Varies";

  const groupSize =
    typeof listing?.groupSize === "string" && listing.groupSize.trim()
      ? listing.groupSize.trim()
      : "Flexible";

  const priceLabel = (() => {
    const pricingType = String(listing?.pricingType ?? "").toUpperCase();
    if (pricingType === "CUSTOM") return "Contact";

    const price = typeof listing?.price === "number" ? listing.price : null;
    if (price === null) return "Contact";

    return `$${Math.round(price)}`;
  })();

  const resonatesWith = toMythicalCodes(listing?.targetCodes);

  return {
    traits,
    tags,
    duration,
    groupSize,
    priceLabel,
    resonatesWith,
  };
}

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default async function MarketplacePage() {
  const listings = await prisma.listing.findMany({
    where: { isActive: true },
    include: {
      business: {
        select: {
          businessName: true,
        },
      },
    },
    orderBy: { createdAt: "desc" }, // neutral default (not ranking)
  });

  const experiences: Experience[] = listings.map((l) => {
    const editorial = deriveEditorial(l);

    return {
      id: l.id,
      title: l.title,
      description: l.description,
      location: l.location ?? "—",
      city: l.city ?? "—",
      category: l.category as Experience["category"],
      bookingType: l.bookingType as "INQUIRY" | "INSTANT",
      ...editorial,
    };
  });

  return <MarketplaceClient initialExperiences={experiences} />;
}
