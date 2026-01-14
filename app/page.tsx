"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Users, Compass, Zap } from "lucide-react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 140]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  async function handleGetStarted() {
    if (!user) {
      router.push("/sign-up");
      return;
    }

    try {
      const response = await fetch(`/api/users/${user.id}`);
      const data = await response.json();

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
    <div className="min-h-screen bg-[#0B0D12] text-white">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image (FULL, untouched) */}
        <motion.div style={{ y }} className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(/images/backgrounds/Landing-page-background.jpg)",
            }}
          />
          {/* Very light neon wash — image stays visible */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#4F8CFF]/25 via-[#C7B9FF]/15 to-[#7CF5C8]/25" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        {/* HERO CONTENT */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center px-6"
        >
          <div className="max-w-5xl mx-auto text-center space-y-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur border border-white/20"
            >
              <Sparkles className="w-4 h-4 text-[#7CF5C8]" />
              <span className="text-sm text-white/90">
                ETHOS · Identity-based social layer
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight"
            >
              Find your people.
              <br />
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
                Not the noise.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-white/75 max-w-2xl mx-auto"
            >
              ETHOS helps you discover how you naturally move through the world —
              then connects you to people, places, and experiences that actually
              fit.
            </motion.p>

            {/* CTAs — CLEAR SEGMENTATION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <button
                onClick={handleGetStarted}
                className="group px-8 py-4 rounded-xl bg-white text-black font-semibold flex items-center gap-2 hover:scale-105 transition"
              >
                {user ? "Continue" : "Discover your Code"}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition" />
              </button>

              {!user && (
                <Link
                  href="/sign-in"
                  className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition font-semibold"
                >
                  I already have an account
                </Link>
              )}
            </motion.div>

            <p className="text-sm text-white/50 pt-4">
              New here? Start curious. No pressure.
            </p>
          </div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-white/50">
            <span className="text-xs uppercase tracking-wider">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-white/60 rounded-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* WHAT IS ETHOS */}
      <section className="py-32 px-6 bg-[#0B0D12]">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What is ETHOS?
            </h2>
            <p className="text-xl text-white/65 max-w-3xl mx-auto">
              Not a social app. Not a marketplace.
              <br />
              ETHOS is an identity layer that helps people find alignment —
              socially, emotionally, and experientially.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Feature
              icon={<Compass />}
              title="Understand yourself"
              text="A multi-framework system that reveals how you think, feel, and decide."
            />
            <Feature
              icon={<Users />}
              title="Meet aligned people"
              text="Connect without forcing chemistry or performing online."
            />
            <Feature
              icon={<Zap />}
              title="Choose better experiences"
              text="Travel, events, and spaces that match your inner rhythm."
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-6 text-center bg-gradient-to-b from-[#0B0D12] to-black">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready when you are.
        </h2>
        <p className="text-xl text-white/65 mb-10">
          Start with curiosity.
          <br />
          The rest unfolds naturally.
        </p>

        <button
          onClick={handleGetStarted}
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3">{title}</h3>
      <p className="text-white/65 leading-relaxed">{text}</p>
    </div>
  );
}
