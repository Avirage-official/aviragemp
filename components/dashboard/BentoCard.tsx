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

/* -------------------------------------------------------------------------- */
/* ICON MAP                                                                   */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* COLOR SYSTEM — MODERN / HIGH CONTRAST                                       */
/* -------------------------------------------------------------------------- */

const COLOR_MAP = {
  blue: {
    glow: "bg-[#4F8CFF]/10",
    border: "border-[#4F8CFF]/25 hover:border-[#4F8CFF]/45",
    iconBg: "from-[#4F8CFF] to-[#3B7AE8]",
    accent: "text-[#4F8CFF]",
  },
  mint: {
    glow: "bg-[#7CF5C8]/10",
    border: "border-[#7CF5C8]/25 hover:border-[#7CF5C8]/45",
    iconBg: "from-[#7CF5C8] to-[#5ED9A8]",
    accent: "text-[#7CF5C8]",
  },
  lavender: {
    glow: "bg-[#C7B9FF]/10",
    border: "border-[#C7B9FF]/25 hover:border-[#C7B9FF]/45",
    iconBg: "from-[#C7B9FF] to-[#A89BE8]",
    accent: "text-[#C7B9FF]",
  },
  pink: {
    glow: "bg-[#FFB5E8]/10",
    border: "border-[#FFB5E8]/25 hover:border-[#FFB5E8]/45",
    iconBg: "from-[#FFB5E8] to-[#E89FD0]",
    accent: "text-[#FFB5E8]",
  },
  orange: {
    glow: "bg-[#FFD97D]/10",
    border: "border-[#FFD97D]/25 hover:border-[#FFD97D]/45",
    iconBg: "from-[#FFD97D] to-[#F0C060]",
    accent: "text-[#FFD97D]",
  },
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

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
  const Icon = ICON_MAP[icon];
  const c = COLOR_MAP[color];

  return (
    <Link href={href} className="group block h-full">
      <motion.div
        whileHover={{ y: -4, scale: 1.015 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
        className={`
          relative h-full overflow-hidden rounded-2xl sm:rounded-3xl
          border bg-white text-black
          ${c.border}
          ${size === "large" ? "p-6 sm:p-8" : size === "wide" ? "p-5 sm:p-6" : "p-4 sm:p-6"}
        `}
      >
        {/* Ambient glow */}
        <div className={`pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${c.glow}`} />

        <div className="relative z-10 flex h-full flex-col">
          {/* Header */}
          <div className="mb-4 flex items-start justify-between">
            <div
              className={`flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br ${c.iconBg}`}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-black" weight="fill" />
            </div>

            {badge !== undefined && (
              <span className={`rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold ${c.accent}`}>
                {badge}
              </span>
            )}
          </div>

          {/* Text */}
          <h3 className="mb-1 text-base sm:text-lg font-semibold text-black">
            {title}
          </h3>

          {subtitle && (
            <p className="mb-4 text-xs sm:text-sm text-black/60">
              {subtitle}
            </p>
          )}

          {/* Slot */}
          {children && <div className="mb-4 flex-1">{children}</div>}

          {/* Footer */}
          <div
            className={`mt-auto flex items-center gap-1 text-xs sm:text-sm font-medium ${c.accent} transition-all group-hover:gap-2`}
          >
            <span>Explore</span>
            <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" weight="bold" />
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
