// components/business/BusinessIdentityPanel.tsx
"use client";

import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Target,
  TrendingUp,
  MessageSquare,
  Palette,
  Megaphone,
  Lightbulb,
  Users,
  TrendingDown,
  CheckCircle2,
  AlertCircle,
  Info
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type Props = {
  businessName: string;
  primaryKeyFallback: MythicalCodeKey;
  secondaryKey: MythicalCodeKey | null;
  tertiaryKey: MythicalCodeKey | null;
};

/* -------------------------------------------------------------------------- */
/* ANIMATION VARIANTS                                                         */
/* -------------------------------------------------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export function BusinessIdentityPanel({
  businessName,
  primaryKeyFallback,
  secondaryKey,
  tertiaryKey,
}: Props) {
  const prefersReducedMotion = useReducedMotion();
  
  const primary = MYTHICAL_CODES[primaryKeyFallback];
  const secondary = secondaryKey ? MYTHICAL_CODES[secondaryKey] : null;
  const tertiary = tertiaryKey ? MYTHICAL_CODES[tertiaryKey] : null;

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      {/* PRIMARY IDENTITY */}
      <motion.div variants={fadeInUp}>
        <IdentityCard
          title="Primary Identity"
          subtitle="Your core essence"
          color="lav"
          icon={<Sparkles className="h-5 w-5" />}
        >
          <div className="space-y-6">
            {/* Code Header */}
            <div className="flex items-start gap-4">
              <div 
                className="h-16 w-16 rounded-2xl border flex items-center justify-center flex-shrink-0 text-3xl"
                style={{
                  backgroundColor: `${primary.colorMood.primary}15`,
                  borderColor: `${primary.colorMood.primary}40`
                }}
              >
                ✨
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl font-bold text-white/95 mb-1">
                  {primary.label}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {primary.essence}
                </p>
              </div>
            </div>

            {/* Brand Tone */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AttributeCard
                icon={<MessageSquare className="h-4 w-4" />}
                label="Voice"
                value={primary.brandTone.voice}
                color="lav"
              />
              <AttributeCard
                icon={<Palette className="h-4 w-4" />}
                label="Pace"
                value={primary.brandTone.pace}
                color="lav"
              />
              <AttributeCard
                icon={<Megaphone className="h-4 w-4" />}
                label="Posture"
                value={primary.brandTone.posture}
                color="lav"
              />
            </div>

            {/* Strengths & Blind Spots */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ListCard
                icon={<CheckCircle2 className="h-4 w-4" />}
                label="Strengths"
                items={primary.strengths}
                color="lav"
                positive
              />
              <ListCard
                icon={<AlertCircle className="h-4 w-4" />}
                label="Blind Spots"
                items={primary.blindSpots}
                color="lav"
                positive={false}
              />
            </div>

            {/* Positioning Guidance */}
            <div className="rounded-xl bg-gradient-to-br from-[#C7B9FF]/5 to-transparent border border-[#C7B9FF]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-4 w-4 text-[#C7B9FF]" />
                <p className="text-sm font-semibold text-white/90">Positioning Guidance</p>
              </div>
              <ul className="space-y-2">
                {primary.positioningGuidance.map((item, i) => (
                  <li key={i} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                    <span className="text-[#C7B9FF] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Angles */}
            <div className="rounded-xl bg-gradient-to-br from-[#C7B9FF]/5 to-transparent border border-[#C7B9FF]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-4 w-4 text-[#C7B9FF]" />
                <p className="text-sm font-semibold text-white/90">Content Angles</p>
              </div>
              <ul className="space-y-2">
                {primary.contentAngles.map((item, i) => (
                  <li key={i} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                    <span className="text-[#C7B9FF] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Offering Style */}
            <div className="rounded-xl bg-gradient-to-br from-[#C7B9FF]/5 to-transparent border border-[#C7B9FF]/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-4 w-4 text-[#C7B9FF]" />
                <p className="text-sm font-semibold text-white/90">Offering Style</p>
              </div>
              <ul className="space-y-2">
                {primary.offeringStyle.map((item, i) => (
                  <li key={i} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                    <span className="text-[#C7B9FF] mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Primary Advice */}
            <InfoBox color="lav">
              <strong className="font-semibold">Primary Advice:</strong>{" "}
              {primary.primaryAdvice}
            </InfoBox>

            {/* Ideal Audience */}
            <AudienceSection
              idealAudience={primary.idealAudience}
              strugglesWith={primary.strugglesWith}
            />
          </div>
        </IdentityCard>
      </motion.div>

      {/* SECONDARY IDENTITY */}
      {secondary && (
        <motion.div variants={fadeInUp}>
          <IdentityCard
            title="Secondary Influence"
            subtitle="Adds depth and nuance"
            color="blue"
            icon={<Target className="h-5 w-5" />}
          >
            <div className="space-y-6">
              {/* Code Header */}
              <div className="flex items-start gap-4">
                <div 
                  className="h-14 w-14 rounded-xl border flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{
                    backgroundColor: `${secondary.colorMood.primary}15`,
                    borderColor: `${secondary.colorMood.primary}40`
                  }}
                >
                  🎯
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white/95 mb-1">
                    {secondary.label}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {secondary.essence}
                  </p>
                </div>
              </div>

              {/* Brand Tone Layering */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <AttributeCard
                  icon={<MessageSquare className="h-4 w-4" />}
                  label="Voice Layer"
                  value={secondary.brandTone.voice}
                  color="blue"
                />
                <AttributeCard
                  icon={<Palette className="h-4 w-4" />}
                  label="Pace Layer"
                  value={secondary.brandTone.pace}
                  color="blue"
                />
                <AttributeCard
                  icon={<Megaphone className="h-4 w-4" />}
                  label="Posture Layer"
                  value={secondary.brandTone.posture}
                  color="blue"
                />
              </div>

              {/* Secondary Effect */}
              <InfoBox color="blue">
                <strong className="font-semibold">Secondary Effect:</strong>{" "}
                {secondary.secondaryEffect}
              </InfoBox>
            </div>
          </IdentityCard>
        </motion.div>
      )}

      {/* TERTIARY IDENTITY */}
      {tertiary && (
        <motion.div variants={fadeInUp}>
          <IdentityCard
            title="Tertiary Influence"
            subtitle="Your unexpected edge"
            color="mint"
            icon={<TrendingUp className="h-5 w-5" />}
          >
            <div className="space-y-6">
              {/* Code Header */}
              <div className="flex items-start gap-4">
                <div 
                  className="h-14 w-14 rounded-xl border flex items-center justify-center flex-shrink-0 text-2xl"
                  style={{
                    backgroundColor: `${tertiary.colorMood.primary}15`,
                    borderColor: `${tertiary.colorMood.primary}40`
                  }}
                >
                  💫
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-white/95 mb-1">
                    {tertiary.label}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {tertiary.essence}
                  </p>
                </div>
              </div>

              {/* Edge Quality */}
              <div className="rounded-xl bg-gradient-to-br from-[#7CF5C8]/5 to-transparent border border-[#7CF5C8]/20 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-[#7CF5C8]" />
                  <p className="text-sm font-semibold text-white/90">What Makes You Unexpected</p>
                </div>
                <ul className="space-y-2">
                  {tertiary.contentAngles.map((item, i) => (
                    <li key={i} className="text-sm text-white/70 leading-relaxed flex items-start gap-2">
                      <span className="text-[#7CF5C8] mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tertiary Effect */}
              <InfoBox color="mint">
                <strong className="font-semibold">Tertiary Effect:</strong>{" "}
                {tertiary.tertiaryEffect}
              </InfoBox>
            </div>
          </IdentityCard>
        </motion.div>
      )}

      {/* SYNTHESIS */}
      <motion.div variants={fadeInUp}>
        <SynthesisCard
          businessName={businessName}
          primary={primary}
          secondary={secondary}
          tertiary={tertiary}
        />
      </motion.div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function IdentityCard({
  title,
  subtitle,
  color,
  icon,
  children
}: {
  title: string;
  subtitle: string;
  color: "lav" | "blue" | "mint";
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  const colors = {
    lav: {
      gradient: "from-[#C7B9FF]/5 via-transparent to-transparent",
      icon: "text-[#C7B9FF]",
      glow: "from-[#C7B9FF]/5 via-[#9b7fd8]/5 to-transparent"
    },
    blue: {
      gradient: "from-[#4F8CFF]/5 via-transparent to-transparent",
      icon: "text-[#4F8CFF]",
      glow: "from-[#4F8CFF]/5 via-[#3b6bd8]/5 to-transparent"
    },
    mint: {
      gradient: "from-[#7CF5C8]/5 via-transparent to-transparent",
      icon: "text-[#7CF5C8]",
      glow: "from-[#7CF5C8]/5 via-[#5cd4a8]/5 to-transparent"
    }
  }[color];

  return (
    <div className="relative group">
      <div className={`absolute -inset-[1px] rounded-[28px] bg-gradient-to-br ${colors.glow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700`} />
      
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
        <div className={`px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-gradient-to-r ${colors.gradient}`}>
          <div className="flex items-center gap-3">
            <div className={colors.icon}>
              {icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white/90">
                {title}
              </h2>
              <p className="text-xs text-white/50">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {children}
        </div>
      </div>
    </div>
  );
}

function AttributeCard({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: "lav" | "blue" | "mint";
}) {
  const colors = {
    lav: {
      bg: "from-[#C7B9FF]/5 to-transparent",
      border: "border-[#C7B9FF]/20",
      icon: "text-[#C7B9FF]"
    },
    blue: {
      bg: "from-[#4F8CFF]/5 to-transparent",
      border: "border-[#4F8CFF]/20",
      icon: "text-[#4F8CFF]"
    },
    mint: {
      bg: "from-[#7CF5C8]/5 to-transparent",
      border: "border-[#7CF5C8]/20",
      icon: "text-[#7CF5C8]"
    }
  }[color];

  return (
    <div className={`rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-4`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={colors.icon}>
          {icon}
        </div>
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <p className="text-sm text-white/90 leading-relaxed capitalize">
        {value}
      </p>
    </div>
  );
}

function ListCard({
  icon,
  label,
  items,
  color,
  positive
}: {
  icon: React.ReactNode;
  label: string;
  items: readonly string[];  // ✅ FIXED: Added readonly
  color: "lav" | "blue" | "mint";
  positive: boolean;
}) {
  const colors = {
    lav: {
      bg: "from-[#C7B9FF]/5 to-transparent",
      border: "border-[#C7B9FF]/20",
      icon: "text-[#C7B9FF]",
      bullet: "text-[#C7B9FF]"
    },
    blue: {
      bg: "from-[#4F8CFF]/5 to-transparent",
      border: "border-[#4F8CFF]/20",
      icon: "text-[#4F8CFF]",
      bullet: "text-[#4F8CFF]"
    },
    mint: {
      bg: "from-[#7CF5C8]/5 to-transparent",
      border: "border-[#7CF5C8]/20",
      icon: "text-[#7CF5C8]",
      bullet: "text-[#7CF5C8]"
    }
  }[color];

  return (
    <div className={`rounded-xl bg-gradient-to-br ${colors.bg} border ${colors.border} p-4`}>
      <div className="flex items-center gap-2 mb-3">
        <div className={colors.icon}>
          {icon}
        </div>
        <p className="text-xs font-semibold text-white/90 uppercase tracking-wider">
          {label}
        </p>
      </div>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-xs text-white/70 leading-relaxed flex items-start gap-2">
            <span className={`${colors.bullet} mt-0.5 flex-shrink-0`}>{positive ? "✓" : "⚠"}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AudienceSection({
  idealAudience,
  strugglesWith
}: {
  idealAudience: readonly string[];  // ✅ FIXED: Added readonly
  strugglesWith: readonly string[];  // ✅ FIXED: Added readonly
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="rounded-xl bg-gradient-to-br from-[#7CF5C8]/5 to-transparent border border-[#7CF5C8]/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="h-4 w-4 text-[#7CF5C8]" />
          <p className="text-xs font-semibold text-white/90 uppercase tracking-wider">
            Ideal Audience
          </p>
        </div>
        <ul className="space-y-2">
          {idealAudience.map((item, i) => (
            <li key={i} className="text-xs text-white/70 leading-relaxed flex items-start gap-2">
              <span className="text-[#7CF5C8] mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-red-500/5 to-transparent border border-red-500/20 p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="h-4 w-4 text-red-400" />
          <p className="text-xs font-semibold text-white/90 uppercase tracking-wider">
            Struggles With
          </p>
        </div>
        <ul className="space-y-2">
          {strugglesWith.map((item, i) => (
            <li key={i} className="text-xs text-white/70 leading-relaxed flex items-start gap-2">
              <span className="text-red-400 mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function InfoBox({
  children,
  color
}: {
  children: React.ReactNode;
  color: "lav" | "blue" | "mint";
}) {
  const colors = {
    lav: {
      bg: "bg-[#C7B9FF]/5",
      border: "border-[#C7B9FF]/20",
      icon: "text-[#C7B9FF]"
    },
    blue: {
      bg: "bg-[#4F8CFF]/5",
      border: "border-[#4F8CFF]/20",
      icon: "text-[#4F8CFF]"
    },
    mint: {
      bg: "bg-[#7CF5C8]/5",
      border: "border-[#7CF5C8]/20",
      icon: "text-[#7CF5C8]"
    }
  }[color];

  return (
    <div className={`rounded-xl ${colors.bg} border ${colors.border} px-4 py-3 flex items-start gap-3`}>
      <Info className={`h-4 w-4 ${colors.icon} flex-shrink-0 mt-0.5`} />
      <p className="text-xs text-white/70 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

function SynthesisCard({
  businessName,
  primary,
  secondary,
  tertiary
}: {
  businessName: string;
  primary: any;
  secondary: any | null;
  tertiary: any | null;
}) {
  const synthesisText = `${businessName} embodies the essence of ${primary.label}, ${primary.essence.toLowerCase()}${
    secondary ? ` This is layered with ${secondary.label} influence, which ${secondary.secondaryEffect.toLowerCase()}` : ""
  }${
    tertiary ? ` The unexpected edge comes from ${tertiary.label}, where ${tertiary.tertiaryEffect.toLowerCase()}` : ""
  }.`;

  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-r from-[#C7B9FF]/10 via-[#4F8CFF]/10 to-[#7CF5C8]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
        <div className="px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-gradient-to-r from-[#4F8CFF]/5 via-[#C7B9FF]/5 to-[#7CF5C8]/5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#C7B9FF]/20 via-[#4F8CFF]/20 to-[#7CF5C8]/20 border border-white/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-white/80" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white/90">
                Identity Synthesis
              </h2>
              <p className="text-xs text-white/50">
                How your codes combine to create your unique presence
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <p className="text-base text-white/80 leading-relaxed">
            {synthesisText}
          </p>
        </div>
      </div>
    </div>
  );
}