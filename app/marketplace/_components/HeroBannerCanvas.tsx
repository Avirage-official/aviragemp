"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Lightning, MapPin } from "@phosphor-icons/react";
import type { Venue } from "../page";

export function HeroBannerCanvas({
  venues,
}: {
  venues: { venue: Venue; match: number }[];
}) {
  if (!venues.length) return null;

  const hero = venues[0];

  return (
    <section className="relative w-full h-[72vh] min-h-[520px] overflow-hidden bg-black">
      {/* Image */}
      {hero.venue.imageUrl ? (
        <motion.img
          src={hero.venue.imageUrl}
          alt={hero.venue.name}
          initial={{ scale: 1.08 }}
          animate={{ scale: 1.02 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-zinc-900" />
      )}

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/5" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40" />

      {/* Ambient color fields (subtle, premium) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-violet-500/12 blur-3xl" />
        <div className="absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-emerald-500/10 blur-3xl" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1800px] mx-auto px-6 flex items-end pb-14">
        <div className="w-full">
          <div className="max-w-[760px]">
            <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/15 text-sm text-white">
              <Lightning weight="fill" className="text-emerald-400" />
              Resonating right now
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold text-white leading-tight mb-4">
              {hero.venue.name}
            </h1>

            <div className="flex items-center gap-2 text-zinc-300 mb-6">
              <MapPin weight="fill" />
              {hero.venue.neighborhood
                ? `${hero.venue.neighborhood}, ${hero.venue.city}`
                : hero.venue.city}
            </div>

            {hero.venue.description && (
              <p className="text-zinc-300 text-base md:text-lg max-w-[68ch]">
                {hero.venue.description}
              </p>
            )}

            <div className="mt-8 flex items-center gap-3">
              <Link
                href={`/marketplace/${hero.venue.id}`}
                className="inline-flex items-center justify-center px-6 h-11 rounded-lg bg-white text-black text-sm font-semibold hover:bg-zinc-200 transition"
              >
                Explore this space
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs text-zinc-400">
                {hero.match > 0 && (
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                    {hero.match}% match
                  </span>
                )}
                {hero.venue.subcategory && (
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur">
                    {hero.venue.subcategory}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Secondary strip (top picks) */}
          {venues.length > 1 && (
            <div className="mt-10">
              <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                {venues.slice(1).map(({ venue }) => (
                  <Link
                    key={venue.id}
                    href={`/marketplace/${venue.id}`}
                    className="flex-[0_0_260px] sm:flex-[0_0_300px]"
                  >
                    <motion.div
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur"
                    >
                      <div className="relative h-[140px]">
                        {venue.imageUrl ? (
                          <img
                            src={venue.imageUrl}
                            alt={venue.name}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 bg-zinc-900" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      </div>
                      <div className="p-4">
                        <div className="text-white text-sm font-medium line-clamp-1">
                          {venue.name}
                        </div>
                        <div className="text-xs text-zinc-400 mt-1 line-clamp-1">
                          {venue.neighborhood
                            ? `${venue.neighborhood}, ${venue.city}`
                            : venue.city}
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
