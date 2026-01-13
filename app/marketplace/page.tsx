"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { MOCK_LISTINGS, MockListing } from "@/lib/mockListings";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

type Listing = MockListing;

function Section({
  title,
  subtitle,
  children,
  right,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <section className="mb-14">
      <div className="flex items-end justify-between gap-6 mb-5">
        <div>
          <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-white/70 mt-1 max-w-2xl">{subtitle}</p>
          )}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function CategoryChip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-full text-sm font-medium transition",
        "border border-white/10",
        active
          ? "bg-white/15 text-white"
          : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function ListingCard({
  listing,
  userCode,
}: {
  listing: Listing;
  userCode: string | null;
}) {
  const isMatched = userCode ? listing.targetCodes.includes(userCode) : false;

  const emoji =
    listing.category === "retreat"
      ? "🏔️"
      : listing.category === "coaching"
      ? "💬"
      : listing.category === "workshop"
      ? "🎨"
      : listing.category === "experience"
      ? "✨"
      : listing.category === "event"
      ? "🎉"
      : listing.category === "service"
      ? "🫧"
      : "📦";

  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className={[
        "group block overflow-hidden rounded-2xl",
        "border border-white/10 bg-white/5 backdrop-blur-xl",
        "hover:bg-white/7 hover:border-white/15",
        "transition shadow-[0_20px_70px_rgba(0,0,0,0.55)]",
      ].join(" ")}
    >
      <div className="h-44 bg-gradient-to-br from-blue-500/35 to-purple-500/30 flex items-center justify-center">
        <span className="text-5xl opacity-95">{emoji}</span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-white/70">
            {listing.category}
          </span>
          {isMatched && (
            <span className="text-[11px] font-semibold text-green-300">
              Aligned with you
            </span>
          )}
        </div>

        <h3 className="text-base md:text-lg font-semibold leading-snug text-white line-clamp-2">
          {listing.title}
        </h3>

        <p className="text-sm text-white/70 mt-2 line-clamp-2">
          {listing.description}
        </p>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-xs text-white/50">By</p>
            <p className="text-sm font-medium text-white truncate">
              {listing.business.businessName}
            </p>
            {(listing.city || listing.location) && (
              <p className="text-xs text-white/50 mt-1 truncate">
                {listing.city ? listing.city : ""}
                {listing.city && listing.location ? " · " : ""}
                {listing.location ? listing.location : ""}
              </p>
            )}
          </div>

          <div className="text-right shrink-0">
            {listing.price ? (
              <p className="text-sm font-semibold text-white">
                A${listing.price}
              </p>
            ) : (
              <p className="text-sm text-white/60">Enquire for pricing</p>
            )}
          </div>
        </div>

        <div className="mt-3">
          <p className="text-xs text-white/50">
            Booking via inquiry — intentional, no pressure
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function MarketplacePage() {
  const { user } = useUser();

  const [userCode, setUserCode] = useState<string | null>(null);

  // UI-first dataset
  const listings = MOCK_LISTINGS;

  // Fetch user's code (works later with real users)
  useEffect(() => {
    async function fetchUserCode() {
      if (!user) return;
      try {
        const res = await fetch(`/api/users/${user.id}`);
        const data = await res.json();
        setUserCode(data.user?.primaryCode || null);
      } catch {
        setUserCode(null);
      }
    }
    fetchUserCode();
  }, [user]);

  const categories = useMemo(() => {
    return [
      { id: "all", label: "All" },
      { id: "experience", label: "Experiences" },
      { id: "retreat", label: "Retreats" },
      { id: "coaching", label: "Coaching" },
      { id: "workshop", label: "Workshops" },
      { id: "event", label: "Events" },
      { id: "service", label: "Services" },
      { id: "product", label: "Products" },
    ] as const;
  }, []);

  const [activeCategory, setActiveCategory] = useState<
    (typeof categories)[number]["id"]
  >("all");

  const matchedListings = useMemo(() => {
    if (!userCode) return [];
    return listings
      .filter((l) => l.targetCodes.includes(userCode))
      .slice(0, 9);
  }, [listings, userCode]);

  const popularListings = useMemo(() => listings.slice(0, 9), [listings]);

  const categoryMap = useMemo(() => {
    const map: Record<string, Listing[]> = {};
    for (const l of listings) {
      if (!map[l.category]) map[l.category] = [];
      map[l.category].push(l);
    }
    return map;
  }, [listings]);

  const visibleByCategory = useMemo(() => {
    if (activeCategory === "all") return listings;
    return listings.filter((l) => l.category === activeCategory);
  }, [listings, activeCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero / Context */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.65]">
          <AnimatedBackdrop />
        </div>
        <div className="relative container mx-auto px-8 pt-14 pb-12">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">
              Experiences across Australia, curated by personality
            </h1>
            <p className="text-white/70 mt-4 text-base md:text-lg leading-relaxed">
              Ethos helps you discover experiences that align with how you
              prefer to move through the world — not just what’s popular.
            </p>
            <p className="text-white/50 mt-3 text-sm">
              Australia-only for now. We’re curating carefully — not flooding the
              feed.
            </p>
          </div>

          {/* Category rail */}
          <div className="mt-10 flex flex-wrap gap-2">
            {categories.map((c) => (
              <CategoryChip
                key={c.id}
                label={c.label}
                active={activeCategory === c.id}
                onClick={() => setActiveCategory(c.id)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-8 py-12">
        {/* For You */}
        {userCode && matchedListings.length > 0 && activeCategory === "all" && (
          <Section
            title="For You"
            subtitle="Experiences aligned with how you naturally engage with people, places, and moments."
            right={
              <span className="text-sm text-white/60">
                {matchedListings.length} aligned
              </span>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {matchedListings.map((l) => (
                <ListingCard key={l.id} listing={l} userCode={userCode} />
              ))}
            </div>
          </Section>
        )}

        {/* Popular */}
        {activeCategory === "all" && (
          <Section
            title="Popular Across Australia"
            subtitle="Well-loved experiences — across different ways of living and exploring."
            right={
              <span className="text-sm text-white/60">
                {popularListings.length} featured
              </span>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularListings.map((l) => (
                <ListingCard key={l.id} listing={l} userCode={userCode} />
              ))}
            </div>
          </Section>
        )}

        {/* Category View */}
        <Section
          title={
            activeCategory === "all"
              ? "Explore by category"
              : categories.find((c) => c.id === activeCategory)?.label ||
                "Explore"
          }
          subtitle={
            activeCategory === "all"
              ? "Choose a lane — or let Ethos guide you."
              : "A focused slice — calmer than infinite scroll."
          }
          right={
            <span className="text-sm text-white/60">
              {visibleByCategory.length} shown
            </span>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {visibleByCategory.map((l) => (
              <ListingCard key={l.id} listing={l} userCode={userCode} />
            ))}
          </div>
        </Section>

        {/* Editorial footer (premium “empty without being empty”) */}
        <section className="mt-16 border-t border-white/10 pt-10">
          <p className="text-white/60 max-w-2xl leading-relaxed">
            Ethos is a curated marketplace. We add listings selectively, because
            alignment matters more than volume. If you’re a business, you’re not
            competing for attention — you’re being placed where you actually fit.
          </p>
          <p className="text-white/40 mt-3 text-sm">
            Next: richer visuals (images), location clustering, and “Why this fits
            you” explanations.
          </p>
        </section>
      </div>
    </div>
  );
}
