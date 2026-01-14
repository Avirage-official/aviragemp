"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Compass,
  Users,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  async function handlePrimaryCTA() {
    if (!user) {
      router.push("/onboarding");
      return;
    }

    try {
      const res = await fetch(`/api/users/${user.id}`);
      const data = await res.json();

      if (!data.user || !data.user.primaryCode) {
        router.push("/onboarding");
      } else if (data.user.type === "BUSINESS") {
        router.push("/business/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch {
      router.push("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0d12] text-white overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f8cff]/20 via-[#b38cff]/20 to-[#7cf5c8]/20 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur"
          >
            <Sparkles className="w-4 h-4 text-[#7cf5c8]" />
            <span className="text-sm text-white/90">
              ETHOS · Identity-based social layer
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            Find people.
            <br />
            <span className="bg-gradient-to-r from-[#4f8cff] via-[#b38cff] to-[#7cf5c8] bg-clip-text text-transparent">
              Not noise.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-white/70 max-w-2xl mx-auto"
          >
            ETHOS maps how you think, feel, and move through the world —  
            then connects you to people, places, and experiences that actually fit.
          </motion.p>

          {/* SEGMENTED CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6"
          >
            <button
              onClick={handlePrimaryCTA}
              className="px-8 py-4 rounded-xl bg-white text-black font-semibold flex items-center gap-2 hover:scale-105 transition"
            >
              {user ? "Continue" : "Discover your Code"}
              <ArrowRight className="w-5 h-5" />
            </button>

            {!user && (
              <Link
                href="/sign-in"
                className="px-8 py-4 rounded-xl bg-white/10 border border-white/20 backdrop-blur hover:bg-white/20 transition font-semibold"
              >
                I already have an account
              </Link>
            )}
          </motion.div>

          <p className="text-sm text-white/40 pt-4">
            New here? Start curious. No pressure.
          </p>
        </div>
      </section>

      {/* WHAT IS ETHOS */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What is ETHOS?
            </h2>
            <p className="text-xl text-white/60 max-w-3xl mx-auto">
              ETHOS is not another social network.  
              It’s an identity layer — built to reduce mismatch, burnout, and social noise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Compass />}
              title="Understand yourself"
              text="A multi-framework system that maps how you naturally operate."
            />
            <Feature
              icon={<Users />}
              title="Meet aligned people"
              text="Connect without forcing chemistry or performance."
            />
            <Feature
              icon={<Zap />}
              title="Choose better experiences"
              text="Travel, events, and spaces that match how you feel."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-transparent to-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready when you are.
        </h2>
        <p className="text-xl text-white/60 mb-10">
          Start with curiosity.  
          The rest reveals itself.
        </p>

        <button
          onClick={handlePrimaryCTA}
          className="px-10 py-5 rounded-xl bg-white text-black font-semibold text-lg hover:scale-105 transition"
        >
          {user ? "Go to my space" : "Begin the journey"}
        </button>
      </section>

      <footer className="py-12 text-center text-white/40 text-sm">
        © 2026 ETHOS
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4f8cff] to-[#b38cff] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-white/60 leading-relaxed">{text}</p>
    </div>
  );
}
