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
/* BUSINESS CODES (DB SLUGS ONLY)                                              */
/* -------------------------------------------------------------------------- */

const BUSINESS_CODES = [
  { label: "Earthlistener", value: "khoisan" },
  { label: "Stillmind", value: "sahen" },
  { label: "Northstar", value: "namsea" },
  { label: "Echoheart", value: "kayori" },
  { label: "Sparkmaker", value: "enzuka" },
  { label: "Skyweaver", value: "khoruun" },
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

      if (!res.ok) throw new Error();

      // ✅ ONE-TIME REDIRECT — onboarding ends here
      router.replace("/business/dashboard");
    } catch {
      alert("Failed to create business profile.");
    } finally {
      setIsSubmitting(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  if (!isLoaded) return null;

  const CurrentIcon =
    STEPS.find((s) => s.id === step)?.icon ?? Building2;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-xl space-y-10"
      >
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
            <CurrentIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">
            {STEPS.find((s) => s.id === step)?.title}
          </h1>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full ${
                s.id <= step ? "bg-white" : "bg-white/10"
              }`}
            />
          ))}
        </div>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {step === 1 && (
                <input
                  className="w-full bg-black text-white p-4 rounded-lg"
                  placeholder="Your business name"
                  value={form.businessName}
                  onChange={(e) =>
                    setForm({ ...form, businessName: e.target.value })
                  }
                />
              )}

              {step === 2 && (
                <textarea
                  className="w-full bg-black text-white p-4 rounded-lg min-h-[140px]"
                  placeholder="What do you actually do?"
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              )}

              {step === 3 && (
                <select
                  className="w-full bg-black text-white p-4 rounded-lg"
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
                    className="w-full bg-black text-white p-4 rounded-lg"
                    placeholder="hello@business.com"
                    value={form.contactEmail}
                    onChange={(e) =>
                      setForm({ ...form, contactEmail: e.target.value })
                    }
                  />
                  <input
                    className="w-full bg-black text-white p-4 rounded-lg"
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
                      className="w-full bg-black text-white p-3 rounded-lg"
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
              className="flex-1 border border-white/10 text-white p-4 rounded-lg"
            >
              <ArrowLeft />
            </button>
          )}
          <button
            onClick={next}
            disabled={!isValid || isSubmitting}
            className="flex-1 bg-white text-black p-4 rounded-lg font-medium"
          >
            {step === 5 ? "Create business" : "Continue"} <ArrowRight />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
