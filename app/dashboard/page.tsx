"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  Users,
  Compass,
  ArrowRight,
  Shield,
} from "lucide-react";
import { AnimatedBackdrop } from "@/components/ui/AnimatedBackdrop";

type UserProfile = {
  id: string;
  name: string;
  primaryCode: {
    label: string;
    essence: string;
    tone: string;
  };
};

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    if (!user) {
      router.push("/");
      return;
    }

    async function loadProfile() {
      try {
        const res = await fetch(`/api/users/${user.id}`);
        const data = await res.json();

        if (!data.user || !data.user.primaryCode) {
          router.push("/onboarding");
          return;
        }

        setProfile(data.user);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [user, isLoaded, router]);

  return (
    <div className="relative space-y-20">
      {/* HERO / IDENTITY */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02]">
        <AnimatedBackdrop />

        <div className="relative z-10 px-10 py-16">
          {loading || !profile ? (
            <div className="h-32 rounded-xl bg-white/5 animate-pulse" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <p className="text-sm uppercase tracking-widest text-white/40">
                Your Universe
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold text-white">
                Welcome back, {profile.name}
              </h1>

              <p className="text-lg text-white/70 max-w-2xl">
                This is your personal headquarters — where identity, people,
                and experiences align.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* YOUR CODE – CORE ANCHOR */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-white/[0.02] p-8">
          {loading || !profile ? (
            <div className="h-48 rounded-xl bg-white/5 animate-pulse" />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
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
                {profile.primaryCode.label}
              </h2>

              <p className="text-white/70 max-w-xl">
                {profile.primaryCode.essence}
              </p>

              <Link
                href="/codes"
                className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300"
              >
                Explore your full profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>

        {/* SOCIAL SIGNAL */}
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
            View your circle
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CURATED EXPERIENCES */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-semibold text-white">
            Curated for You
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition"
            >
              <p className="text-sm text-white/50 mb-2">
                Experience Preview
              </p>
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
          Explore Marketplace
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* TRUST FOOTER */}
      <section className="flex items-center gap-3 text-sm text-white/40">
        <Shield className="w-4 h-4" />
        Your data, identity, and connections are protected by design.
      </section>
    </div>
  );
}
