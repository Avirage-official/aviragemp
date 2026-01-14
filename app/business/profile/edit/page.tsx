"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Sparkles, 
  CheckCircle2,
  Info,
  Zap,
  Target,
  TrendingUp
} from "lucide-react";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type FormState = {
  primaryCode: MythicalCodeKey | "";
  secondaryCode: MythicalCodeKey | "";
  tertiaryCode: MythicalCodeKey | "";
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
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function EditBusinessIdentityPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const prefersReducedMotion = useReducedMotion();

  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<FormState>({
    primaryCode: "",
    secondaryCode: "",
    tertiaryCode: "",
  });

  /* ------------------------------------------------------------------------ */
  /* LOAD EXISTING BUSINESS IDENTITY                                           */
  /* ------------------------------------------------------------------------ */

  React.useEffect(() => {
    if (!isLoaded || !user) return;

    (async () => {
      try {
        const res = await fetch("/api/businesses/me");
        if (!res.ok) throw new Error();

        const data = await res.json();

        setForm({
          primaryCode: data.primaryCode ?? "",
          secondaryCode: data.secondaryCode ?? "",
          tertiaryCode: data.tertiaryCode ?? "",
        });
      } catch {
        setError("Failed to load business identity.");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [isLoaded, user]);

  /* ------------------------------------------------------------------------ */
  /* DEDUPE LOGIC                                                             */
  /* ------------------------------------------------------------------------ */

  const usedCodes = React.useMemo(
    () =>
      new Set(
        [form.primaryCode, form.secondaryCode, form.tertiaryCode].filter(Boolean)
      ),
    [form.primaryCode, form.secondaryCode, form.tertiaryCode]
  );

  /* ------------------------------------------------------------------------ */
  /* SAVE                                                                     */
  /* ------------------------------------------------------------------------ */

  async function save() {
    if (!form.primaryCode) {
      setError("Primary identity is required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/businesses/update-identity", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryCode: form.primaryCode,
          secondaryCode: form.secondaryCode || null,
          tertiaryCode: form.tertiaryCode || null,
        }),
      });

      if (!res.ok) throw new Error();

      setShowSuccess(true);
      setTimeout(() => {
        router.push("/business/profile");
      }, 1500);
    } catch {
      setError("Failed to update business identity.");
    } finally {
      setIsSaving(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  if (isLoading) {
    return <IdentitySkeleton />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      {/* ------------------------------------------------------------------ */}
      {/* AMBIENT BACKGROUND                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.12 : [0.1, 0.15, 0.1],
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30%] left-[10%] h-[800px] w-[800px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-12"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.1 : [0.08, 0.13, 0.08],
            scale: prefersReducedMotion ? 1 : [1, 1.12, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[5%] h-[700px] w-[700px] rounded-full bg-[#C7B9FF] blur-[160px] opacity-10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.08 : [0.06, 0.11, 0.06],
            scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#7CF5C8] blur-[170px] opacity-08"
        />

        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* HEADER */}
          <motion.header variants={fadeInUp} className="space-y-4">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              Back to profile
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#C7B9FF]" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white/95">
                    Business Identity
                  </h1>
                  <p className="text-sm text-white/50 mt-1">
                    Define how you appear in the ETHOS ecosystem
                  </p>
                </div>
              </div>

              <InfoBox>
                Your identity shapes how users discover and connect with your offerings. Changes take effect immediately across the platform.
              </InfoBox>
            </div>
          </motion.header>

          {/* FORM */}
          <motion.div variants={fadeInUp} className="space-y-6">
            {/* PRIMARY CODE */}
            <IdentityCard
              title="Primary identity"
              description="Your core business essence — how you fundamentally show up"
              icon={<Zap className="h-5 w-5" />}
              required
              accentColor="blue"
            >
              <CodeSelector
                value={form.primaryCode}
                onChange={(value) => setForm({ ...form, primaryCode: value })}
                usedCodes={usedCodes}
                placeholder="Select your primary identity"
                required
              />
              {form.primaryCode && (
                <CodePreview code={form.primaryCode} />
              )}
            </IdentityCard>

            {/* SECONDARY CODE */}
            <IdentityCard
              title="Secondary influence"
              description="Your nuance layer — adds depth to how you operate"
              icon={<Target className="h-5 w-5" />}
              accentColor="lav"
            >
              <CodeSelector
                value={form.secondaryCode}
                onChange={(value) => setForm({ ...form, secondaryCode: value })}
                usedCodes={usedCodes}
                placeholder="None (optional)"
              />
              {form.secondaryCode && (
                <CodePreview code={form.secondaryCode} />
              )}
            </IdentityCard>

            {/* TERTIARY CODE */}
            <IdentityCard
              title="Tertiary influence"
              description="Your edge expression — the unexpected quality that sets you apart"
              icon={<TrendingUp className="h-5 w-5" />}
              accentColor="mint"
            >
              <CodeSelector
                value={form.tertiaryCode}
                onChange={(value) => setForm({ ...form, tertiaryCode: value })}
                usedCodes={usedCodes}
                placeholder="None (optional)"
              />
              {form.tertiaryCode && (
                <CodePreview code={form.tertiaryCode} />
              )}
            </IdentityCard>
          </motion.div>

          {/* ERROR MESSAGE */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* FOOTER ACTIONS */}
          <motion.div variants={fadeInUp} className="sticky bottom-0 z-10">
            <GlassPanel>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => router.back()}
                  disabled={isSaving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft size={16} />
                  Cancel
                </button>

                <button
                  onClick={save}
                  disabled={isSaving || !form.primaryCode}
                  className="group relative flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#C7B9FF] to-[#9b7fd8] text-white font-semibold text-sm shadow-lg shadow-[#C7B9FF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#C7B9FF]/35 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSaving ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                      Saving...
                    </>
                  ) : showSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save size={18} className="transition-transform group-hover:scale-110" />
                      Save changes
                    </>
                  )}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>
              </div>

              {!form.primaryCode && (
                <p className="text-xs text-white/40 mt-3 text-center">
                  Primary identity is required to save
                </p>
              )}
            </GlassPanel>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-[#C7B9FF]/0 via-[#4F8CFF]/0 to-[#7CF5C8]/0 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
      
      <div className="relative rounded-[24px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-4 sm:p-6">
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function IdentityCard({
  title,
  description,
  icon,
  required,
  accentColor,
  children
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  required?: boolean;
  accentColor: "blue" | "lav" | "mint";
  children: React.ReactNode;
}) {
  const colors = {
    blue: {
      icon: "text-[#4F8CFF]",
      gradient: "from-[#4F8CFF]/5 via-transparent to-transparent"
    },
    lav: {
      icon: "text-[#C7B9FF]",
      gradient: "from-[#C7B9FF]/5 via-transparent to-transparent"
    },
    mint: {
      icon: "text-[#7CF5C8]",
      gradient: "from-[#7CF5C8]/5 via-transparent to-transparent"
    }
  }[accentColor];

  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/5 via-[#C7B9FF]/5 to-[#7CF5C8]/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
        <div className={`px-6 sm:px-8 py-5 border-b border-white/[0.08] bg-gradient-to-r ${colors.gradient}`}>
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 flex-1">
              <div className={colors.icon}>
                {icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-white/90">
                    {title}
                  </h3>
                  {required && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#4F8CFF]/10 border border-[#4F8CFF]/25 text-[#4F8CFF] font-medium">
                      Required
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/50 mt-0.5">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

function CodeSelector({
  value,
  onChange,
  usedCodes,
  placeholder,
  required
}: {
  value: MythicalCodeKey | "";
  onChange: (value: MythicalCodeKey | "") => void;
  usedCodes: Set<string>;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value as MythicalCodeKey | "")}
      className="w-full rounded-xl bg-[#0B0D12] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4F8CFF]/50 transition-all duration-300 cursor-pointer"
    >
      <option value="">{placeholder}</option>
      {(Object.keys(MYTHICAL_CODES) as MythicalCodeKey[])
        .filter((k) => !usedCodes.has(k) || k === value)
        .map((k) => (
          <option key={k} value={k}>
            {MYTHICAL_CODES[k].label}
          </option>
        ))}
    </select>
  );
}

function CodePreview({ code }: { code: MythicalCodeKey }) {
  const codeData = MYTHICAL_CODES[code];

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
      className="rounded-xl bg-gradient-to-br from-[#4F8CFF]/5 to-[#C7B9FF]/5 border border-white/10 p-4"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 border border-white/10 flex items-center justify-center text-lg">
          ✨
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white/90 mb-1">
            {codeData.label}
          </p>
          <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
            {codeData.essence}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function InfoBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl bg-[#4F8CFF]/5 border border-[#4F8CFF]/20 px-4 py-3 flex items-start gap-3">
      <Info className="h-4 w-4 text-[#4F8CFF] flex-shrink-0 mt-0.5" />
      <p className="text-xs text-white/60 leading-relaxed">
        {children}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING SKELETON                                                           */
/* -------------------------------------------------------------------------- */

function IdentitySkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] left-[10%] h-[800px] w-[800px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-10 animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 sm:px-8 lg:px-12 py-8 sm:py-12 space-y-8">
        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-11 w-40 rounded-xl bg-white/5 animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-white/5 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-9 w-64 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-96 rounded-full bg-white/5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Cards skeleton */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-[28px] bg-white/[0.03] border border-white/[0.08] overflow-hidden">
            <div className="px-6 sm:px-8 py-5 border-b border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded bg-white/5 animate-pulse" />
                <div className="space-y-2 flex-1">
                  <div className="h-5 w-48 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-3 w-full max-w-md rounded-full bg-white/5 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="h-12 rounded-xl bg-white/5 animate-pulse" />
              <div className="h-20 rounded-xl bg-white/5 animate-pulse" />
            </div>
          </div>
        ))}

        {/* Footer skeleton */}
        <div className="rounded-[24px] bg-white/[0.03] border border-white/[0.08] p-6">
          <div className="flex gap-3">
            <div className="h-12 w-32 rounded-2xl bg-white/5 animate-pulse" />
            <div className="h-12 flex-1 rounded-2xl bg-white/10 animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}