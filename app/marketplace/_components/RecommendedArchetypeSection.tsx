"use client";

import { motion } from "framer-motion";
import { Sparkles, Heart } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import type { Venue } from "../page";

interface RecommendedArchetypeSectionProps {
  venues: Venue[];
  userArchetype: string | null;
}

// Archetype-based section messaging
const ARCHETYPE_SECTIONS: Record<string, { title: string; description: string }> = {
  khoisan: {
    title: "Spaces That Ground You",
    description: "As an Earthlistener, these venues honor your connection to the present moment and authentic experience.",
  },
  atlantean: {
    title: "Architectural Harmony",
    description: "For Architects who value structure and precision, these spaces reflect methodical excellence.",
  },
  lemurian: {
    title: "Intuitive Flow Spaces",
    description: "Harmonizers like you will feel naturally aligned with these venues' balanced energy.",
  },
  hyperborean: {
    title: "Innovation Hubs",
    description: "Visionaries discover forward-thinking spaces that challenge and inspire innovation.",
  },
  muvian: {
    title: "Creative Expression",
    description: "Creators thrive in these venues that celebrate artistic freedom and vibrant energy.",
  },
};

export function RecommendedArchetypeSection({
  venues,
  userArchetype,
}: RecommendedArchetypeSectionProps) {
  if (!userArchetype || venues.length === 0) {
    return null;
  }

  const archetypeLower = userArchetype.toLowerCase();
  const section = ARCHETYPE_SECTIONS[archetypeLower] || {
    title: "Recommended For You",
    description: "Venues perfectly matched to your unique archetype.",
  };

  return (
    <section className="w-full py-16 md:py-20 px-6 bg-gradient-to-b from-white via-slate-50/50 to-white">
      <div className="max-w-[1800px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 mb-6"
          >
            <Sparkles weight="fill" className="text-purple-500 w-5 h-5" />
            <span className="text-sm font-semibold text-purple-700">
              Curated For Your Archetype
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
            {section.title}
          </h2>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            {section.description}
          </p>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {venues.slice(0, 8).map((venue, idx) => (
            <motion.div
              key={venue.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: idx * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <Link
                href={`/marketplace/${venue.id}`}
                className="group block h-full"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative h-full rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-purple-300 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                    {venue.imageUrl ? (
                      <Image
                        src={venue.imageUrl}
                        alt={venue.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                        <Heart weight="duotone" className="w-16 h-16 text-purple-300" />
                      </div>
                    )}
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    
                    {/* Match percentage */}
                    {venue.compatibilityScores && userArchetype && (
                      <div className="absolute bottom-3 left-3">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.05, type: "spring" }}
                          className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-purple-200 text-xs font-bold text-purple-700 shadow-lg"
                        >
                          {venue.compatibilityScores[userArchetype.toLowerCase()] || 0}% Match
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
                      {venue.name}
                    </h3>
                    
                    <p className="text-xs text-slate-500 mb-3 font-medium">
                      {venue.neighborhood
                        ? `${venue.neighborhood}, ${venue.city}`
                        : venue.city}
                    </p>

                    {/* Vibes */}
                    <div className="flex flex-wrap gap-1.5">
                      {venue.vibes.slice(0, 2).map((vibe) => (
                        <span
                          key={vibe}
                          className="px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-medium"
                        >
                          {vibe.replace(/_/g, " ")}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
