"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, ShareNetwork, Sparkle } from "@phosphor-icons/react";
import type { Venue } from "../page";

export function MarketplaceCard({ venue }: { venue: Venue }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: venue.name,
        text: venue.description || `Check out ${venue.name}`,
        url: `/marketplace/${venue.id}`,
      });
    }
  };

  return (
    <Link href={`/marketplace/${venue.id}`}>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        whileHover={{ y: -8 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative rounded-xl overflow-hidden bg-[#0F1114] border border-white/[0.06] hover:border-white/10 transition-all duration-300"
        style={{
          boxShadow: isHovered
            ? "0 18px 70px rgba(0,0,0,0.6)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Image Hero */}
        <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
          {venue.imageUrl ? (
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
              <Sparkle className="w-12 h-12 text-zinc-700" weight="duotone" />
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Quick actions */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-3 right-3 flex gap-2"
          >
            <button
              onClick={handleSave}
              aria-label={isSaved ? "Unsave venue" : "Save venue"}
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <Heart
                className="w-4 h-4"
                weight={isSaved ? "fill" : "regular"}
                color={isSaved ? "#ef4444" : "white"}
              />
            </button>
            <button
              onClick={handleShare}
              aria-label="Share venue"
              className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
            >
              <ShareNetwork className="w-4 h-4 text-white" weight="bold" />
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4 backdrop-blur-md">
          <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 leading-tight">
            {venue.name}
          </h3>
          
          <p className="text-xs text-zinc-400 mb-3 line-clamp-1">
            {venue.neighborhood
              ? `${venue.neighborhood}, ${venue.city}`
              : venue.city}
          </p>

          {/* Meta row */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Vibes chips */}
            {venue.vibes.slice(0, 2).map((vibe) => (
              <span
                key={vibe}
                className="px-2.5 py-1 rounded-full bg-gradient-to-r from-[#4F8CFF]/10 to-[#C7B9FF]/10 border border-white/[0.06] text-xs text-zinc-300"
              >
                {vibe.replace(/_/g, " ")}
              </span>
            ))}
            
            {/* Price range */}
            {venue.priceRange && (
              <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/[0.06] text-xs text-zinc-400">
                {venue.priceRange}
              </span>
            )}
          </div>
        </div>
        
        {/* Glass effect border */}
        <div className="absolute inset-0 rounded-xl pointer-events-none ring-1 ring-white/0 group-hover:ring-white/10 transition-all" />
      </motion.article>
    </Link>
  );
}
