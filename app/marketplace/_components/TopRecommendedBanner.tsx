"use client";

import { motion } from "framer-motion";
import { Lightning, TrendUp, Users } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import type { Venue } from "../page";

interface TopRecommendedBannerProps {
  topVenues: { venue: Venue; match: number }[];
  userArchetype: string | null;
}

// Archetype-based messaging
const ARCHETYPE_BANNERS: Record<string, { title: string; subtitle: string }> = {
  khoisan: {
    title: "Your Perfect Spaces Await",
    subtitle: "Earthlisteners thrive in these grounded, present-focused venues",
  },
  atlantean: {
    title: "Structured Excellence, Curated for You",
    subtitle: "Architects find harmony in these methodically designed spaces",
  },
  lemurian: {
    title: "Flow-State Destinations",
    subtitle: "Harmonizers resonate deeply with these intuitive environments",
  },
  hyperborean: {
    title: "Innovation Meets Experience",
    subtitle: "Visionaries discover cutting-edge spaces that inspire",
  },
  muvian: {
    title: "Creative Sanctuaries",
    subtitle: "Creators express themselves in these artistically vibrant venues",
  },
};

export function TopRecommendedBanner({
  topVenues,
  userArchetype,
}: TopRecommendedBannerProps) {
  if (!userArchetype || topVenues.length === 0) {
    return null;
  }

  const archetypeLower = userArchetype.toLowerCase();
  const banner = ARCHETYPE_BANNERS[archetypeLower] || {
    title: "Discover Your Perfect Spaces",
    subtitle: "Top venues matched to your unique archetype",
  };

  return (
    <section className="relative w-full bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-32 -right-32 h-96 w-96 rounded-full bg-purple-300/25 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-12 left-1/3 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-12 md:py-16 px-6">
        <div className="max-w-[1800px] mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-blue-200 shadow-lg mb-6"
            >
              <Lightning weight="fill" className="text-cyan-500 w-5 h-5" />
              <span className="text-sm font-semibold text-blue-700">
                Top Recommendations
              </span>
              <TrendUp weight="bold" className="text-purple-500 w-4 h-4" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 tracking-tight">
              {banner.title}
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              {banner.subtitle}
            </p>
          </motion.div>

          {/* Top Venues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {topVenues.slice(0, 3).map((item, idx) => (
              <motion.div
                key={item.venue.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + idx * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/marketplace/${item.venue.id}`}
                  className="group block"
                >
                  <div className="relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                    {/* Image */}
                    <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                      {item.venue.imageUrl ? (
                        <Image
                          src={item.venue.imageUrl}
                          alt={item.venue.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100" />
                      )}
                      
                      {/* Match Badge */}
                      <div className="absolute top-4 right-4">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1, type: "spring" }}
                          className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-bold shadow-lg"
                        >
                          {item.match}% Match
                        </motion.div>
                      </div>
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {item.venue.name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                        {item.venue.description || `Experience ${item.venue.name} in ${item.venue.city}`}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-500 font-medium">
                          {item.venue.neighborhood
                            ? `${item.venue.neighborhood}, ${item.venue.city}`
                            : item.venue.city}
                        </span>
                        {item.venue.subcategory && (
                          <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold capitalize">
                            {item.venue.subcategory}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Stats Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 shadow-md">
              <Users weight="bold" className="text-blue-500 w-5 h-5" />
              <span className="text-sm text-slate-700 font-medium">
                <strong className="text-slate-900">{topVenues.length}</strong> venues perfectly matched to your archetype
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
