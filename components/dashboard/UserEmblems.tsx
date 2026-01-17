"use client";

import { EmblemBadge } from "@/components/emblems/EmblemBadge";
import { getCodeLabel } from "@/lib/mythicalCodesData";
import { motion } from "framer-motion";

interface UserEmblemsProps {
  primaryCode: string;
  secondaryCode?: string | null;
  tertiaryCode?: string | null;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export function UserEmblems({
  primaryCode,
  secondaryCode,
  tertiaryCode,
}: UserEmblemsProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      className="relative"
    >
      {/* Glass panel */}
      <div className="relative group">
        <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/20 via-[#C7B9FF]/20 to-[#7CF5C8]/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />

        <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
          <div className="px-6 sm:px-8 py-6 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.02] to-transparent">
            <div className="flex items-center gap-3">
              <div className="text-[#4F8CFF]">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-white/90">
                  Your Mythical Codes
                </h2>
                <p className="text-xs text-white/50 mt-0.5">
                  Identity badges earned through personality alignment
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            {/* Badges display */}
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {/* Primary code */}
              <EmblemBadge
                code={primaryCode}
                label={getCodeLabel(primaryCode)}
                size="lg"
                variant="primary"
                showLabel={true}
              />

              {/* Secondary code */}
              {secondaryCode && (
                <EmblemBadge
                  code={secondaryCode}
                  label={getCodeLabel(secondaryCode)}
                  size="md"
                  variant="secondary"
                  showLabel={true}
                />
              )}

              {/* Tertiary code */}
              {tertiaryCode && (
                <EmblemBadge
                  code={tertiaryCode}
                  label={getCodeLabel(tertiaryCode)}
                  size="md"
                  variant="tertiary"
                  showLabel={true}
                />
              )}
            </div>

            {/* Info box */}
            <div className="mt-8 rounded-xl border border-[#4F8CFF]/20 bg-[#4F8CFF]/5 px-4 py-3">
              <p className="text-xs text-white/60 leading-relaxed">
                <span className="text-[#4F8CFF] font-semibold">Primary:</span>{" "}
                Your core identity and strongest traits.{" "}
                {secondaryCode && (
                  <>
                    <span className="text-[#C7B9FF] font-semibold">
                      Secondary:
                    </span>{" "}
                    Complementary qualities that add dimension.{" "}
                  </>
                )}
                {tertiaryCode && (
                  <>
                    <span className="text-white/50 font-semibold">
                      Tertiary:
                    </span>{" "}
                    Subtle influences that emerge in specific contexts.
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}