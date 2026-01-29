"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin } from "@phosphor-icons/react";
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
    <section className="mb-16">
      <div className="flex items-end justify-between mb-5 px-6">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
      </div>

      <div className="relative overflow-x-auto scrollbar-hide">
        <div className="flex gap-6 px-6 pb-2">
          {venues.map((venue) => (
            <Link
              key={venue.id}
              href={`/marketplace/${venue.id}`}
              className="flex-[0_0_320px]"
            >
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-xl overflow-hidden bg-[#0f0f0f] border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="relative h-[220px] bg-zinc-900">
                  {venue.imageUrl ? (
                    <img
                      src={venue.imageUrl}
                      alt={venue.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>

                <div className="p-4">
                  <h3 className="text-white font-medium mb-2 line-clamp-2">
                    {venue.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-zinc-400">
                    <MapPin weight="fill" />
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
    </section>
  );
}
