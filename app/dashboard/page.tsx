"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, Users, Compass, ArrowRight, Shield } from "lucide-react";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

type UserType = "BUSINESS" | "CONSUMER" | "PERSONAL" | "USER" | string;

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const [userType, setUserType] = useState<UserType | null>(null);
  const [loadingType, setLoadingType] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const displayName = useMemo(() => {
    if (!user) return "there";
    return user.firstName || user.username || "there";
  }, [user]);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/");
      return;
    }

    const clerkId = user.id;

    async function loadType() {
      setLoadingType(true);
      setErrorMsg(null);

      try {
        const res = await fetch(`/api/users/${clerkId}/type`, { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text();
          console.error("User type API error:", res.status, text.slice(0, 300));
          setErrorMsg(`Couldn’t load account type (${res.status}).`);
          setLoadingType(false);
          return;
        }

        const data = (await res.json()) as { type?: UserType };

        if (!data.type) {
          setErrorMsg("Account type missing from API response.");
          setLoadingType(false);
          return;
        }

        // Route business away from consumer dashboard
        if (data.type === "BUSINESS") {
          router.push("/business/dashboard");
          return;
        }

        setUserType(data.type);
      } catch (e) {
        console.error(e);
        setErrorMsg("Couldn’t load your profile. Try refresh.");
      } finally {
        setLoadingType(false);
      }
    }

    loadType();
  }, [user, isLoaded, router]);

  return (
    <div className="relative space-y-20">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
        <AnimatedBackdrop />

        <div className="relative z-10 px-10 py-16">
          {loadingType ? (
            <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
          ) : errorMsg ? (
            <div className="rounded-2xl border border-white/10 bg-black/40 p-6">
              <p className="text-white font-medium">We hit a profile issue.</p>
              <p className="text-white/60 mt-2">{errorMsg}</p>
              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => location.reload()}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition"
                >
                  Refresh
                </button>
                <Link
                  href="/onboarding"
                  className="rounded-full bg-white text-black px-4 py-2 text-sm font-medium hover:opacity-90 transition"
                >
                  Go to onboarding
                </Link>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm uppercase tracking-widest text-white/40">
                Your Universe
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold text-white">
                Welcome back, {displayName}
              </h1>

              <p className="text-lg text-white/70 max-w-2xl">
                This is your personal headquarters — where identity, people,
                and experiences align.
              </p>

              <p className="text-xs text-white/40 uppercase tracking-wider">
                Account: {userType}
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CORE GRID */}
      <section className="grid lg:grid-cols-3 gap-6">
        {/* YOUR CODE (visual anchor; wire to real code once you expose an endpoint) */}
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-blue-400" />
              <span className="text-sm uppercase tracking-wider text-white/60">
                Your Code
              </span>
            </div>

            <h2 className="text-3xl font-semibold text-white">
              Your Mythical Code
            </h2>

            <p className="text-white/70 max-w-xl">
              Your Mythical Code is the lens we use to match friends,
              experiences, and places that feel right.
            </p>

            <Link
              href="/codes"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
            >
              Explore your full profile <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>

        {/* SOCIAL */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-purple-400" />
            <span className="text-sm uppercase tracking-wider text-white/60">
              Social
            </span>
          </div>

          <p className="text-white/70 mb-6">
            You’re not alone. ETHOS connects you with people who move like you.
          </p>

          <Link
            href="/dashboard/friends"
            className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300"
          >
            View your circle <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CURATED */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-semibold text-white">Curated for You</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
            >
              <p className="text-sm text-white/50 mb-2">Experience Preview</p>
              <p className="text-white/80">
                Hand-selected moments aligned with your code.
              </p>
            </div>
          ))}
        </div>

        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white"
        >
          Explore Marketplace <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* TRUST */}
      <section className="flex items-center gap-3 text-sm text-white/40">
        <Shield className="w-4 h-4" />
        Your data, identity, and connections are protected by design.
      </section>
    </div>
  );
}
