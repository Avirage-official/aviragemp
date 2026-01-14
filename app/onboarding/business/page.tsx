"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Target,
  Users,
  Mail,
  Fingerprint,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/* BUSINESS CODES (FULL + ALIGNED)                                             */
/* -------------------------------------------------------------------------- */

const BUSINESS_CODES = [
  { label: "Earthlistener", value: "earthlistener" },
  { label: "Stillmind", value: "stillmind" },
  { label: "Northstar", value: "northstar" },
  { label: "Echoheart", value: "echoheart" },
  { label: "Sparkmaker", value: "sparkmaker" },
  { label: "Skyweaver", value: "skyweaver" },
  { label: "Neonmuse", value: "neonmuse" },
  { label: "Tidekeeper", value: "tidekeeper" },
  { label: "Ironreader", value: "ironreader" },
  { label: "Pathfinder", value: "pathfinder" },
  { label: "Otherseer", value: "otherseer" },
  { label: "Lumenward", value: "lumenward" },
  { label: "Ashcaller", value: "ashcaller" },
  { label: "Horizonkin", value: "horizonkin" },
  { label: "Stonebound", value: "stonebound" },
  { label: "Waveborn", value: "waveborn" },
  { label: "Quietforge", value: "quietforge" },
  { label: "Brightsignal", value: "brightsignal" },
  { label: "Deepthread", value: "deepthread" },
  { label: "Mythwalker", value: "mythwalker" },
];


/* -------------------------------------------------------------------------- */
/* CATEGORIES                                                                 */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  { value: "coaching", label: "Coaching & Consulting" },
  { value: "wellness", label: "Wellness & Spa" },
  { value: "retreat", label: "Retreats & Workshops" },
  { value: "creative", label: "Creative Services" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "education", label: "Education & Learning" },
  { value: "other", label: "Other" },
];

/* -------------------------------------------------------------------------- */
/* STEPS                                                                      */
/* -------------------------------------------------------------------------- */

const STEPS = [
  { id: 1, title: "Business identity", icon: Building2 },
  { id: 2, title: "What you offer", icon: Target },
  { id: 3, title: "Industry & market", icon: Users },
  { id: 4, title: "Contact details", icon: Mail },
  { id: 5, title: "Business personality", icon: Fingerprint },
] as const;

const STEP_IMAGES = [
  "/images/onboarding/business-1.jpg",
  "/images/onboarding/business-2.jpg",
  "/images/onboarding/business-3.jpg",
  "/images/onboarding/business-4.jpg",
  "/images/onboarding/business-5.jpg",
];

type StepId = (typeof STEPS)[number]["id"];

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function BusinessOnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [step, setStep] = useState<StepId>(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    businessName: "",
    description: "",
    category: "",
    contactEmail: "",
    contactPhone: "",
    website: "",
    primaryCode: "",
    secondaryCode: "",
    tertiaryCode: "",
  });

  /* ------------------------------------------------------------------------ */
  /* CODE DEDUPING                                                            */
  /* ------------------------------------------------------------------------ */

  const usedCodes = useMemo(
    () =>
      new Set(
        [form.primaryCode, form.secondaryCode, form.tertiaryCode].filter(Boolean)
      ),
    [form.primaryCode, form.secondaryCode, form.tertiaryCode]
  );

  /* ------------------------------------------------------------------------ */
  /* VALIDATION                                                               */
  /* ------------------------------------------------------------------------ */

  const isValid =
    (step === 1 && form.businessName.trim().length >= 2) ||
    (step === 2 && form.description.trim().length >= 20) ||
    (step === 3 && !!form.category) ||
    (step === 4 && form.contactEmail.includes("@")) ||
    (step === 5 && !!form.primaryCode);

  /* ------------------------------------------------------------------------ */
  /* NAVIGATION                                                               */
  /* ------------------------------------------------------------------------ */

  async function next() {
    if (step < 5) {
      setStep((s) => (s + 1) as StepId);
      return;
    }

    if (!user) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/businesses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName.trim(),
          description: form.description.trim(),
          category: form.category,
          contactEmail: form.contactEmail.trim(),
          contactPhone: form.contactPhone || null,
          website: form.website || null,
          primaryCode: form.primaryCode,
          secondaryCode: form.secondaryCode || null,
          tertiaryCode: form.tertiaryCode || null,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Business creation failed");
        return;
      }

      router.replace("/business/dashboard");
    } catch {
      alert("Failed to create business profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!isLoaded) return null;

  const CurrentIcon =
    STEPS.find((s) => s.id === step)?.icon ?? Building2;

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#0B0D12] text-white">
      {/* LEFT — IMAGE */}
      <div className="hidden lg:block relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${STEP_IMAGES[step - 1]})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/20 via-transparent to-[#7CF5C8]/20" />
      </div>

      {/* RIGHT — FORM */}
      <div className="flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-lg space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between text-sm text-white/60">
            <span>Step {step} of 5</span>
            <span>Business onboarding</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
              <CurrentIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">
              {STEPS.find((s) => s.id === step)?.title}
            </h1>
          </div>

          {/* Progress */}
          <div className="flex gap-2">
            {STEPS.map((s) => (
              <div
                key={s.id}
                className={`h-1 flex-1 rounded-full ${
                  s.id <= step ? "bg-white" : "bg-white/15"
                }`}
              />
            ))}
          </div>

          {/* Card */}
          <div className="rounded-2xl p-[1px] bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8]">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-black/80 backdrop-blur-xl rounded-2xl p-6 space-y-4"
              >
                {step === 1 && (
                  <input
                    className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                    placeholder="Your business name"
                    value={form.businessName}
                    onChange={(e) =>
                      setForm({ ...form, businessName: e.target.value })
                    }
                  />
                )}

                {step === 2 && (
                  <textarea
                    className="w-full bg-black text-white p-4 rounded-xl border border-white/15 min-h-[140px]"
                    placeholder="What problem do you solve, and for whom?"
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                  />
                )}

                {step === 3 && (
                  <select
                    className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                    value={form.category}
                    onChange={(e) =>
                      setForm({ ...form, category: e.target.value })
                    }
                  >
                    <option value="">Select industry</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                )}

                {step === 4 && (
                  <>
                    <input
                      className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                      placeholder="hello@business.com"
                      value={form.contactEmail}
                      onChange={(e) =>
                        setForm({ ...form, contactEmail: e.target.value })
                      }
                    />
                    <input
                      className="w-full bg-black text-white p-4 rounded-xl border border-white/15"
                      placeholder="https://yourbusiness.com"
                      value={form.website}
                      onChange={(e) =>
                        setForm({ ...form, website: e.target.value })
                      }
                    />
                  </>
                )}

                {step === 5 &&
                  (["primaryCode", "secondaryCode", "tertiaryCode"] as const).map(
                    (key, idx) => (
                      <select
                        key={key}
                        className="w-full bg-black text-white p-3 rounded-xl border border-white/15"
                        value={form[key]}
                        onChange={(e) =>
                          setForm({ ...form, [key]: e.target.value })
                        }
                      >
                        <option value="">
                          {idx === 0
                            ? "Primary business code (required)"
                            : "Optional"}
                        </option>
                        {BUSINESS_CODES.filter(
                          (c) =>
                            !usedCodes.has(c.value) || c.value === form[key]
                        ).map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    )
                  )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            {step > 1 && (
              <button
                onClick={() => setStep((s) => (s - 1) as StepId)}
                className="flex-1 border border-white/20 rounded-xl p-4"
              >
                <ArrowLeft />
              </button>
            )}
            <button
              onClick={next}
              disabled={!isValid || isSubmitting}
              className="flex-1 bg-white text-black rounded-xl p-4 font-semibold flex items-center justify-center gap-2"
            >
              {step === 5 ? "Create business" : "Continue"}
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
