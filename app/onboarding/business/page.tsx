"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  Building2,
  Target,
  Users,
  TrendingUp,
} from "lucide-react";

/**
 * Same code system as users
 * label = UI
 * value = DB slug
 */
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
];

const CATEGORIES = [
  { value: "coaching", label: "Coaching & Consulting" },
  { value: "wellness", label: "Wellness & Spa" },
  { value: "retreat", label: "Retreats & Workshops" },
  { value: "creative", label: "Creative Services" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "fitness", label: "Fitness & Training" },
  { value: "education", label: "Education & Learning" },
  { value: "other", label: "Other" },
];

export default function BusinessOnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

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

  /**
   * 🔒 HARD GUARD
   * If business already exists → skip onboarding
   */
  useEffect(() => {
    if (!isLoaded || !user) return;

    fetch(`/api/users/${user.id}/type`)
      .then(async (res) => {
        if (!res.ok) return;
        const data = await res.json();
        if (data.type === "BUSINESS") {
          router.replace("/business/dashboard");
        }
      })
      .catch(() => {});
  }, [isLoaded, user, router]);

  async function next() {
    if (step < 5) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/businesses/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          businessName: form.businessName,
          description: form.description,
          category: form.category,
          contactEmail: form.contactEmail,
          contactPhone: form.contactPhone || null,
          website: form.website || null,
          primaryCode: form.primaryCode,
          secondaryCode: form.secondaryCode || null,
          tertiaryCode: form.tertiaryCode || null,
        }),
      });

      if (!res.ok) throw new Error();

      router.push("/business/dashboard");
    } catch {
      alert("Failed to create business profile.");
    } finally {
      setIsLoading(false);
    }
  }

  const valid =
    (step === 1 && form.businessName) ||
    (step === 2 && form.description) ||
    (step === 3 && form.category) ||
    (step === 4 && form.contactEmail) ||
    (step === 5 && form.primaryCode);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="w-full max-w-xl space-y-8">
        <h1 className="text-3xl font-bold text-white">
          {step === 1 && "Business name"}
          {step === 2 && "What do you actually do?"}
          {step === 3 && "Industry"}
          {step === 4 && "Contact details"}
          {step === 5 && "Business personality"}
        </h1>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          {step === 1 && (
            <input
              value={form.businessName}
              onChange={(e) =>
                setForm({ ...form, businessName: e.target.value })
              }
              placeholder="Your Business"
              className="w-full bg-black text-white p-4 rounded-lg"
            />
          )}

          {step === 2 && (
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full bg-black text-white p-4 rounded-lg min-h-[120px]"
            />
          )}

          {step === 3 && (
            <select
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="w-full bg-black text-white p-4 rounded-lg"
            >
              <option value="">Select category</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>
                  {c.label}
                </option>
              ))}
            </select>
          )}

          {step === 4 && (
            <div className="space-y-3">
              <input
                value={form.contactEmail}
                onChange={(e) =>
                  setForm({ ...form, contactEmail: e.target.value })
                }
                placeholder="hello@business.com"
                className="w-full bg-black text-white p-4 rounded-lg"
              />
              <input
                value={form.website}
                onChange={(e) =>
                  setForm({ ...form, website: e.target.value })
                }
                placeholder="https://yourbusiness.com"
                className="w-full bg-black text-white p-4 rounded-lg"
              />
            </div>
          )}

          {step === 5 && (
            <div className="space-y-3">
              {["primaryCode", "secondaryCode", "tertiaryCode"].map((key) => (
                <select
                  key={key}
                  value={(form as any)[key]}
                  onChange={(e) =>
                    setForm({ ...form, [key]: e.target.value })
                  }
                  className="w-full bg-black text-white p-3 rounded-lg"
                >
                  <option value="">
                    {key === "primaryCode"
                      ? "Primary business code"
                      : "Optional"}
                  </option>
                  {BUSINESS_CODES.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-white/10 text-white p-4 rounded-lg"
            >
              <ArrowLeft />
            </button>
          )}
          <button
            onClick={next}
            disabled={!valid || isLoading}
            className="flex-1 bg-white text-black p-4 rounded-lg"
          >
            {step === 5 ? "Create Business" : "Continue"} <ArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}
