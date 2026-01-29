"use client";

import { motion } from "framer-motion";
import { Sparkle } from "@phosphor-icons/react";
import { useState, useEffect } from "react";

interface ArchetypeSpotlightProps {
  userArchetype: string | null;
}

// Rotating nature pictures (royalty-free from Unsplash)
const NATURE_IMAGES = [
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", // Mountain landscape
  "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80", // Forest
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200&q=80", // Foggy hills
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80", // Aurora
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&q=80", // Meadow
];

const ARCHETYPE_DESCRIPTIONS: Record<string, string> = {
  sentinel: "Guardian of traditions, finding harmony in structure and wisdom",
  wanderer: "Explorer of horizons, seeking adventure and new experiences",
  creator: "Visionary artist, bringing imagination into reality",
  sage: "Seeker of truth, diving deep into knowledge and understanding",
  lover: "Connector of hearts, celebrating beauty and relationships",
  jester: "Bringer of joy, finding lightness in every moment",
  ruler: "Leader of vision, creating order and inspiring excellence",
  caregiver: "Nurturer of souls, offering compassion and support",
  rebel: "Agent of change, challenging norms and sparking transformation",
  magician: "Transformer of worlds, manifesting dreams into being",
  innocent: "Believer in wonder, embracing purity and optimism",
  hero: "Champion of courage, rising to meet every challenge",
};

export function ArchetypeSpotlight({ userArchetype }: ArchetypeSpotlightProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate images every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % NATURE_IMAGES.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  if (!userArchetype) {
    return null;
  }

  const archetypeName = userArchetype.charAt(0).toUpperCase() + userArchetype.slice(1);
  const description = ARCHETYPE_DESCRIPTIONS[userArchetype.toLowerCase()] || "Your unique archetype guides your journey";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden mb-8 shadow-2xl"
    >
      {/* Background image with crossfade */}
      <div className="absolute inset-0">
        {NATURE_IMAGES.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
            }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-pink-900/80" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
      </div>

      {/* Content */}
      <div className="relative px-8 py-12 md:px-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 mb-4"
        >
          <Sparkle className="w-8 h-8 text-yellow-300" weight="fill" />
          <span className="text-sm font-medium text-white/90 uppercase tracking-wider">
            Your Archetype
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
        >
          The {archetypeName}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute top-8 right-8 w-32 h-32 rounded-full bg-white blur-3xl"
        />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.1 }}
          transition={{ delay: 0.7, duration: 1 }}
          className="absolute bottom-8 left-8 w-40 h-40 rounded-full bg-yellow-300 blur-3xl"
        />
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-6 right-8 flex gap-2">
        {NATURE_IMAGES.map((_, index) => (
          <motion.div
            key={index}
            initial={false}
            animate={{
              width: index === currentImageIndex ? 24 : 8,
              opacity: index === currentImageIndex ? 1 : 0.5,
            }}
            transition={{ duration: 0.3 }}
            className="h-2 rounded-full bg-white"
          />
        ))}
      </div>
    </motion.div>
  );
}
