"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  ArrowRight,
  Shield,
  Zap,
  Users,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [checking, setChecking] = useState(true);

  /**
   * 🔒 HARD GUARD
   * If user already onboarded → skip this page entirely
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
    if (type === "business") {
      router.push("/onboarding/business");
    } else {
      router.push("/onboarding/personal");
    }
  }

  // Prevent flicker + accidental clicks
  if (checking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-500 text-sm">Checking your account…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-black">
      {/* Left Side */}
      <div className="hidden lg:block relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(/images/onboarding/account-selection.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      {/* Right Side */}
      <div className="flex items-center justify-center px-6 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/20 to-slate-950 -z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl w-full"
        >
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Welcome to ETHOS
            </h1>
            <p className="text-xl text-gray-400">
              Choose how you want to use the platform
            </p>
          </div>

          {/* Account Selection */}
          <div className="space-y-4">
            {/* Personal */}
            <button
              onClick={() => handleAccountTypeSelect("personal")}
              className="group w-full text-left bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition"
            >
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <User className="text-white" />
                </div>
                <ArrowRight className="text-gray-500 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Personal
              </h3>
              <p className="text-gray-400 text-sm">
                Discover people and experiences aligned to you
              </p>
            </button>

            {/* Business */}
            <button
              onClick={() => handleAccountTypeSelect("business")}
              className="group w-full text-left bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition"
            >
              <div className="flex justify-between mb-4">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center">
                  <Building2 className="text-white" />
                </div>
                <ArrowRight className="text-gray-500 group-hover:translate-x-1 transition" />
              </div>
              <h3 className="text-xl text-white font-semibold mb-2">
                Business
              </h3>
              <p className="text-gray-400 text-sm">
                Reach the right customers through personality matching
              </p>
            </button>
          </div>

          <div className="text-center mt-12 text-xs text-gray-600">
            You can switch later in settings
          </div>
        </motion.div>
      </div>
    </div>
  );
}
