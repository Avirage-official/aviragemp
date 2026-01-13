"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

type Listing = {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number | null;
  pricingType: string;
  location: string | null;
  city: string | null;
  targetCodes: string[];
  business: {
    businessName: string;
  };
};

/* -------------------------------------------------------------------------- */
/* Reusable Components                                                         */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-gray-600 mt-1 max-w-2xl">{subtitle}</p>
        )}
      </div>
      {children}
    </section>
  );
}

function ListingCard({
  listing,
  userCode,
}: {
  listing: Listing;
  userCode: string | null;
}) {
  const isMatched = userCode
    ? listing.targetCodes.includes(userCode)
    : false;

  return (
    <Link
      href={`/marketplace/${listing.id}`}
      className="group block rounded-xl bg-white shadow-sm hover:shadow-xl transition overflow-hidden"
    >
      {/* Visual Placeholder */}
      <div className="h-44 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
        <span className="text-5xl opacity-90">
          {listing.category === "retreat"
            ? "🏔️"
            : listing.category === "coaching"
            ? "💬"
            : listing.category === "workshop"
            ? "🎨"
            : listing.category === "experience"
            ? "✨"
            : listing.category === "event"
            ? "🎉"
            : "📦"}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {listing.category}
          </span>

          {isMatched && (
            <span className="text-xs font-semibold text-green-700">
              Aligned with you
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold leading-snug line-clamp-2">
          {listing.title}
        </h3>

        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {listing.description}
        </p>

        <div className="mt-4 pt-4 border-t flex items-center justify-between">
          <p className="text-sm font-medium">
            {listing.business.businessName}
          </p>

          {listing.price ? (
            <p className="text-sm font-semibold text-blue-600">
              ${listing.price}
            </p>
          ) : (
            <p className="text-sm text-gray-500">Enquire for pricing</p>
          )}
        </div>
      </div>
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export default function MarketplacePage() {
  const { user } = useUser();
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userCode, setUserCode] = useState<string | null>(null);

  /* ---------------------------- Fetch user code ---------------------------- */
  useEffect(() => {
    async function fetchUserCode() {
      if (!user) return;
      const res = await fetch(`/api/users/${user.id}`);
      const data = await res.json();
      setUserCode(data.user?.primaryCode || null);
    }
    fetchUserCode();
  }, [user]);

  /* ---------------------------- Fetch listings ----------------------------- */
  useEffect(() => {
    async function fetchListings() {
      setIsLoading(true);
      const res = await fetch("/api/listings");
      const data = await res.json();
      setListings(data.listings || []);
      setIsLoading(false);
    }
    fetchListings();
  }, []);

  /* ---------------------------- Curated groups ----------------------------- */
  const matchedListings = useMemo(() => {
    if (!userCode) return [];
    return listings.filter((l) => l.targetCodes.includes(userCode)).slice(0, 9);
  }, [listings, userCode]);

  const popularListings = useMemo(() => {
    return listings.slice(0, 9);
  }, [listings]);

  const listingsByCategory = useMemo(() => {
    const map: Record<string, Listing[]> = {};
    listings.forEach((l) => {
      if (!map[l.category]) map[l.category] = [];
      map[l.category].push(l);
    });
    return map;
  }, [listings]);

  /* ------------------------------------------------------------------------ */

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-8 py-12">
        {/* Context Header */}
        <div className="mb-20 max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight">
            Experiences across Australia, curated by personality
          </h1>
          <p className="text-gray-600 mt-4 text-lg">
            Ethos helps you discover experiences that align with how you prefer
            to move through the world — not just what’s popular.
          </p>
        </div>

        {isLoading ? (
          <div className="text-center py-24 text-gray-500">
            Loading experiences…
          </div>
        ) : (
          <>
            {userCode && matchedListings.length > 0 && (
              <Section
                title="For You"
                subtitle="Experiences aligned with how you naturally engage with people, places, and moments."
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {matchedListings.map((l) => (
                    <ListingCard
                      key={l.id}
                      listing={l}
                      userCode={userCode}
                    />
                  ))}
                </div>
              </Section>
            )}

            <Section
              title="Popular Across Australia"
              subtitle="Well-loved experiences, across different ways of living and exploring."
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {popularListings.map((l) => (
                  <ListingCard
                    key={l.id}
                    listing={l}
                    userCode={userCode}
                  />
                ))}
              </div>
            </Section>

            {Object.entries(listingsByCategory).map(
              ([category, items]) =>
                items.length > 0 && (
                  <Section
                    key={category}
                    title={category.charAt(0).toUpperCase() + category.slice(1)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {items.slice(0, 6).map((l) => (
                        <ListingCard
                          key={l.id}
                          listing={l}
                          userCode={userCode}
                        />
                      ))}
                    </div>
                  </Section>
                )
            )}
          </>
        )}
      </div>
    </div>
  );
}
