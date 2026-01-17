"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface EmblemBadgeProps {
  code: string;
  label: string;
  size?: "sm" | "md" | "lg" | "xl";
  showLabel?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  className?: string;
}

const sizeMap = {
  sm: {
    container: "w-16 h-16",
    image: 48,
    border: "border-2",
    text: "text-xs mt-1",
  },
  md: {
    container: "w-24 h-24",
    image: 80,
    border: "border-2",
    text: "text-sm mt-2",
  },
  lg: {
    container: "w-32 h-32",
    image: 112,
    border: "border-3",
    text: "text-base mt-2",
  },
  xl: {
    container: "w-40 h-40",
    image: 144,
    border: "border-4",
    text: "text-lg mt-3",
  },
};

const variantStyles = {
  primary: {
    border: "border-[#4F8CFF]",
    glow: "shadow-[0_0_20px_rgba(79,140,255,0.5)]",
    bg: "bg-gradient-to-br from-[#4F8CFF]/20 to-[#7CF5C8]/20",
  },
  secondary: {
    border: "border-[#C7B9FF]",
    glow: "shadow-[0_0_20px_rgba(199,185,255,0.4)]",
    bg: "bg-gradient-to-br from-[#C7B9FF]/15 to-[#4F8CFF]/15",
  },
  tertiary: {
    border: "border-white/30",
    glow: "shadow-[0_0_15px_rgba(255,255,255,0.2)]",
    bg: "bg-gradient-to-br from-white/10 to-white/5",
  },
};

export function EmblemBadge({
  code,
  label,
  size = "md",
  showLabel = true,
  variant = "primary",
  className = "",
}: EmblemBadgeProps) {
  const sizeConfig = sizeMap[size];
  const variantConfig = variantStyles[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center ${className}`}
    >
      {/* Badge Container */}
      <div className="relative group">
        {/* Outer glow effect */}
        <div
          className={`absolute -inset-1 rounded-full ${variantConfig.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md`}
        />

        {/* Badge frame */}
        <div
          className={`relative ${sizeConfig.container} rounded-full ${sizeConfig.border} ${variantConfig.border} ${variantConfig.bg} backdrop-blur-xl p-1 transition-all duration-300 group-hover:scale-105`}
        >
          {/* Inner frame */}
          <div className="w-full h-full rounded-full border border-white/20 bg-[#111827] p-1 overflow-hidden">
            {/* Emblem image */}
            <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-white/5 to-transparent">
              <Image
                src={`/emblems/${code}-${label.replace(/\s+/g, "")}.jpeg`}
                alt={label}
                fill
                className="object-cover"
                sizes={`${sizeConfig.image}px`}
                priority={variant === "primary"}
              />
            </div>
          </div>

          {/* Rank indicator dots (military style) */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
            {variant === "primary" && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#4F8CFF]" />
              </>
            )}
            {variant === "secondary" && (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-[#C7B9FF]" />
                <div className="w-1.5 h-1.5 rounded-full bg-[#C7B9FF]" />
              </>
            )}
            {variant === "tertiary" && (
              <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            )}
          </div>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="text-center mt-3">
          <p className={`font-semibold text-white/90 ${sizeConfig.text}`}>
            {label}
          </p>
          {variant === "primary" && (
            <p className="text-xs text-[#4F8CFF] mt-0.5">Primary</p>
          )}
          {variant === "secondary" && (
            <p className="text-xs text-[#C7B9FF] mt-0.5">Secondary</p>
          )}
          {variant === "tertiary" && (
            <p className="text-xs text-white/40 mt-0.5">Tertiary</p>
          )}
        </div>
      )}
    </motion.div>
  );
}