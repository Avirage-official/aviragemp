"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Sparkle } from "@phosphor-icons/react";
import type { Venue } from "../page";

export function EditorialLane({
  title,
  venues,
}: {
  title: string;
  venues: Venue[];
}) {
  if (!venues.length) return null;

  return (
    <section className="mb-20">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6 px-6">
        <h2 className="text-2xl font-semibold text-white tracking-tight">
          {title}
        </h2>
      </div>

      {/* Lane */}
      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-6 pb-3">
          {venues.map((venue, idx) => (
            <Link
              key={venue.id}
              href={`/marketplace/${venue.id}`}
              className="flex-[0_0_340px]"
            >
              <motion.article
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: idx * 0.03 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden bg-[#0e0e0e] border border-white/5 hover:border-white/15 transition-all"
              >
                {/* Image */}
                <div className="relative h-[240px] bg-zinc-900 overflow-hidden">
                  {venue.imageUrl ? (
                    <img
                      src={venue.imageUrl}
                      alt={venue.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
                      <Sparkle
                        className="w-12 h-12 text-zinc-700"
                        weight="duotone"
                      />
                    </div>
                  )}

                  {/* Image overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.08),transparent_60%)]" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-medium text-white mb-2 line-clamp-2 leading-snug group-hover:text-white">
                    {venue.name}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                    <MapPin weight="fill" className="opacity-80" />
                    <span className="truncate">
                      {venue.neighborhood
                        ? `${venue.neighborhood}, ${venue.city}`
                        : venue.city}
                    </span>
                  </div>
                </div>

                {/* Hover affordance */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/0 group-hover:ring-white/10 transition-all" />
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
