"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  ArrowRight,
  Sparkles,
  Zap,
  Users,
  Compass,
} from "lucide-react";

// Neon Pastel Tech palette (Option 2)
// Electric Blue: #4F8CFF
// Mint:         #7CF5C8
// Lavender:     #C7B9FF
// Soft Black:   #0B0D12
// Cloud White:  #FAFAFA

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [checking, setChecking] = useState(true);

  /**
   * 🔒 HARD GUARD
   * If user already onboarded → skip this page entirely
   * (FUNCTIONALITY UNCHANGED)
   */
  useEffect(() => {
    if (!isLoaded) return;

    // Not signed in → allow onboarding selection
    if (!user) {
      setChecking(false);
      return;
    }

    // Signed in → check user type
    fetch(`/api/users/${user.id}/type`)
      .then(async (res) => {
        if (!res.ok) {
          setChecking(false);
          return;
        }

        const data = await res.json();

        if (data.type === "BUSINESS") {
          router.replace("/business/dashboard");
          return;
        }

        if (data.type === "CONSUMER") {
          router.replace("/dashboard");
          return;
        }

        // Edge case: signed in but not onboarded
        setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [isLoaded, user, router]);

  function handleAccountTypeSelect(type: "personal" | "business") {
    if (type === "business") router.push("/onboarding/business");
    else router.push("/onboarding/personal");
  }

  // Prevent flicker + accidental clicks
  if (checking) {
    return (
      <div className="min-h-screen bg-[#0B0D12] flex items-center justify-center">
        <div className="text-white/60 text-sm">Checking your account…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0B0D12]">
      {/* Left Side (KEEP IMAGE) */}
      <div className="hidden lg:block relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url(/images/onboarding/account-selection.jpg)",
          }}
        />
        {/* subtle neon wash, image still visible */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/25 via-[#C7B9FF]/15 to-[#7CF5C8]/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />

        {/* tiny “vibe” chips */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="flex flex-wrap gap-2">
            <Chip icon={<Sparkles className="w-4 h-4" />}>2 mins to start</Chip>
            <Chip icon={<Users className="w-4 h-4" />}>Find your people</Chip>
            <Chip icon={<Compass className="w-4 h-4" />}>Match your vibe</Chip>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Neon animated backdrop (no new deps) */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#0B0D12]" />

          <motion.div
            className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-50"
            style={{ background: "radial-gradient(circle, #4F8CFF 0%, transparent 60%)" }}
            animate={{ x: [0, -18, 0], y: [0, 14, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-24 -left-24 h-80 w-80 rounded-full blur-3xl opacity-45"
            style={{ background: "radial-gradient(circle, #C7B9FF 0%, transparent 60%)" }}
            animate={{ x: [0, 16, 0], y: [0, -12, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-120px] left-1/3 h-96 w-96 rounded-full blur-3xl opacity-35"
            style={{ background: "radial-gradient(circle, #7CF5C8 0%, transparent 60%)" }}
            animate={{ x: [0, -12, 0], y: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* soft vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-xl w-full"
        >
          {/* Top nav */}
          <div className="flex items-center justify-between mb-10">
            <Link
              href="/"
              className="text-sm text-white/60 hover:text-white/90 transition"
            >
              ← Back to home
            </Link>

            <div className="text-xs text-white/50">
              First step • pick your lane
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur">
              <Zap className="w-4 h-4 text-[#7CF5C8]" />
              <span className="text-sm text-white/85">
                Let’s set you up properly
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4">
              How are you using ETHOS?
            </h1>

            <p className="text-lg text-white/65 max-w-md mx-auto">
              Pick the mode that matches your goal. You can switch later.
            </p>
          </div>

          {/* Account Selection */}
          <div className="space-y-4">
            {/* Personal */}
            <NeonCardButton
              onClick={() => handleAccountTypeSelect("personal")}
              tone="personal"
              title="Personal"
              description="Meet people, discover experiences, build a life that fits you."
              badgeLeft="For you"
              badgeRight="Fast start"
              icon={<User className="text-white" />}
            />

            {/* Business */}
            <NeonCardButton
              onClick={() => handleAccountTypeSelect("business")}
              tone="business"
              title="Business"
              description="Reach the right customers through personality-aligned discovery."
              badgeLeft="For teams"
              badgeRight="Grow smarter"
              icon={<Building2 className="text-white" />}
            />
          </div>

          {/* Trust note */}
          <div className="mt-10 text-center text-xs text-white/45">
            No spam. No weird targeting. Just alignment.
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Chip({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur text-white/85 text-sm">
      <span className="text-white/90">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function NeonCardButton({
  onClick,
  tone,
  title,
  description,
  badgeLeft,
  badgeRight,
  icon,
}: {
  onClick: () => void;
  tone: "personal" | "business";
  title: string;
  description: string;
  badgeLeft: string;
  badgeRight: string;
  icon: React.ReactNode;
}) {
  const ring =
    tone === "personal"
      ? "from-[#4F8CFF]/60 via-[#C7B9FF]/50 to-[#7CF5C8]/60"
      : "from-[#C7B9FF]/60 via-[#4F8CFF]/45 to-[#7CF5C8]/55";

  const accent =
    tone === "personal" ? "text-[#4F8CFF]" : "text-[#C7B9FF]";

  return (
    <button
      onClick={onClick}
      className="group w-full text-left rounded-2xl p-[1px] transition"
    >
      {/* Gradient ring */}
      <div className={`rounded-2xl bg-gradient-to-r ${ring}`}>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl p-7 hover:bg-white/[0.06] transition">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                {icon}
              </div>

              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl text-white font-semibold">
                    {title}
                  </span>
                  <span className={`text-xs font-medium ${accent}`}>
                    • {badgeLeft}
                  </span>
                  <span className="text-xs text-white/45">• {badgeRight}</span>
                </div>

                <p className="text-white/65 text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <ArrowRight className="text-white/45 group-hover:text-white/80 group-hover:translate-x-1 transition" />
          </div>
        </div>
      </div>
    </button>
  );
}
