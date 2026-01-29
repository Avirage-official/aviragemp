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
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -12 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="group relative rounded-2xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(59,130,246,0.1)"
            : "0 4px 15px rgba(0,0,0,0.08)",
        }}
      >
        {/* Image Hero - Better Aspect Ratio */}
        <div className="relative aspect-[3/2] bg-slate-100 overflow-hidden">
          {venue.imageUrl ? (
            <Image
              src={venue.imageUrl}
              alt={venue.name}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-105"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-50 to-slate-100">
              <Sparkle className="w-14 h-14 text-slate-300 opacity-50" weight="duotone" />
            </div>
          )}
          
          {/* Enhanced Gradient overlay with premium glow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <motion.div
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"
          />
          
          {/* Quick actions - Enhanced Design */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-4 right-4 flex gap-2.5"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              aria-label={isSaved ? "Unsave venue" : "Save venue"}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200 flex items-center justify-center hover:bg-white transition-all shadow-lg"
            >
              <Heart
                className="w-4.5 h-4.5"
                weight={isSaved ? "fill" : "regular"}
                color={isSaved ? "#ef4444" : "#475569"}
              />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShare}
              aria-label="Share venue"
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200 flex items-center justify-center hover:bg-white transition-all shadow-lg"
            >
              <ShareNetwork className="w-4.5 h-4.5 text-slate-700" weight="bold" />
            </motion.button>
          </motion.div>
        </div>

        {/* Content - Enhanced Padding and Typography */}
        <div className="p-5 backdrop-blur-md">
          <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-2.5 line-clamp-2 leading-tight tracking-tight">
            {venue.name}
          </h3>
          
          <p className="text-xs md:text-sm text-slate-600 mb-4 line-clamp-1 font-medium">
            {venue.neighborhood
              ? `${venue.neighborhood}, ${venue.city}`
              : venue.city}
          </p>

          {/* Meta row - Enhanced Vibe Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Vibes chips - Better Colors and Styling */}
            {venue.vibes.slice(0, 2).map((vibe, idx) => (
              <motion.span
                key={vibe}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 text-xs font-medium text-blue-700 hover:border-blue-300 transition-all"
              >
                {vibe.replace(/_/g, " ")}
              </motion.span>
            ))}
            
            {/* Price range - Enhanced Design */}
            {venue.priceRange && (
              <span className="px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                {venue.priceRange}
              </span>
            )}
          </div>
        </div>
        
        {/* Enhanced Glass effect border with glow */}
        <motion.div
          initial={false}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: "inset 0 0 0 1px rgba(59, 130, 246, 0.15), 0 0 30px rgba(59, 130, 246, 0.08)",
          }}
        />
      </motion.article>
    </Link>
  );
}
