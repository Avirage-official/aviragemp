// components/dashboard/BentoCard.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight,
  Sparkle,
  Sun,
  Moon,
  Hash,
  Users,
  Calendar,
  Target,
  Compass,
  MapPin,
  Heart,
  Star,
} from "@phosphor-icons/react";

// Phosphor icon map
const ICON_MAP = {
  sparkle: Sparkle,
  sun: Sun,
  moon: Moon,
  hash: Hash,
  users: Users,
  calendar: Calendar,
  target: Target,
  compass: Compass,
  mapPin: MapPin,
  heart: Heart,
  star: Star,
} as const;

type IconName = keyof typeof ICON_MAP;

interface BentoCardProps {
  title: string;
  subtitle?: string;
  icon: IconName;
  href: string;
  color: "blue" | "mint" | "lavender" | "pink" | "orange";
  size?: "default" | "large" | "wide";
  children?: React.ReactNode;
  badge?: string | number;
}

const COLOR_MAP = {
  blue: {
    bg: "from-[#4F8CFF]/20 to-[#4F8CFF]/5",
    border: "border-[#4F8CFF]/30 hover:border-[#4F8CFF]/50",
    icon: "from-[#4F8CFF]/30 to-[#4F8CFF]/10 text-[#4F8CFF]",
    text: "text-[#4F8CFF]",
  },
  mint: {
    bg: "from-[#7CF5C8]/20 to-[#7CF5C8]/5",
    border: "border-[#7CF5C8]/30 hover:border-[#7CF5C8]/50",
    icon: "from-[#7CF5C8]/30 to-[#7CF5C8]/10 text-[#7CF5C8]",
    text: "text-[#7CF5C8]",
  },
  lavender: {
    bg: "from-[#C7B9FF]/20 to-[#C7B9FF]/5",
    border: "border-[#C7B9FF]/30 hover:border-[#C7B9FF]/50",
    icon: "from-[#C7B9FF]/30 to-[#C7B9FF]/10 text-[#C7B9FF]",
    text: "text-[#C7B9FF]",
  },
  pink: {
    bg: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/30 hover:border-pink-500/50",
    icon: "from-pink-500/30 to-pink-500/10 text-pink-400",
    text: "text-pink-400",
  },
  orange: {
    bg: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/30 hover:border-orange-500/50",
    icon: "from-orange-500/30 to-orange-500/10 text-orange-400",
    text: "text-orange-400",
  },
};

export function BentoCard({
  title,
  subtitle,
  icon,
  href,
  color,
  size = "default",
  children,
  badge,
}: BentoCardProps) {
  const colors = COLOR_MAP[color];
  const Icon = ICON_MAP[icon];

  return (
    <Link href={href} className="block group h-full">
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={`
          relative h-full rounded-2xl sm:rounded-3xl border bg-gradient-to-br backdrop-blur-sm
          transition-all duration-300 overflow-hidden
          ${colors.bg} ${colors.border}
          ${size === "large" ? "p-6 sm:p-8" : size === "wide" ? "p-5 sm:p-6" : "p-4 sm:p-6"}
        `}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} blur-xl`} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br ${colors.icon} flex items-center justify-center`}>
              <Icon className="w-5 h-5 sm:w-6 sm:h-6" weight="duotone" />
            </div>
            
            {badge !== undefined && (
              <span className={`px-2 py-1 rounded-full text-xs font-semibold bg-white/10 ${colors.text}`}>
                {badge}
              </span>
            )}
          </div>

          {/* Content */}
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1">{title}</h3>
          {subtitle && (
            <p className="text-xs sm:text-sm text-white/50 mb-3 sm:mb-4">{subtitle}</p>
          )}

          {/* Custom content */}
          {children && <div className="mb-3 sm:mb-4 flex-1">{children}</div>}

          {/* Footer */}
          <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium ${colors.text} group-hover:gap-2 transition-all mt-auto`}>
            <span>Explore</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" weight="bold" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}