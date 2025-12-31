'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';

/* ======================================================
   EXISTING CULTURAL CODES (UNCHANGED)
====================================================== */

const CULTURAL_CODES = [
  { id: 'khoisan', name: 'KHOISAN', image: '/images/codes/KHOISAN-frontpage.jpeg', tagline: 'Hyper-Acute Perception' },
  { id: 'kayori', name: 'KÁYORI', image: '/images/codes/KAYORI-frontpage.jpeg', tagline: 'Expressive Ritual Creativity' },
  { id: 'sahen', name: 'SAHÉN', image: '/images/codes/SAHEN-frontpage.jpeg', tagline: 'Desert Wisdom' },
  { id: 'enzuka', name: 'ENZUKA', image: '/images/codes/ENZUKA-frontpage.jpeg', tagline: 'Warrior Discipline' },
  { id: 'siyuane', name: 'SIYUANÉ', image: '/images/codes/SIYUANE-frontpage.jpeg', tagline: 'Generational Harmony' },
  { id: 'jaejin', name: 'JAEJIN', image: '/images/codes/JAEJIN-frontpage.jpeg', tagline: 'Compressed Emotion' },
  { id: 'namsea', name: 'NAMSÉA', image: '/images/codes/NAMSEA-frontpage.jpeg', tagline: 'Water-Based Cognition' },
  { id: 'shokunin', name: 'SHOKUNIN', image: '/images/codes/SHOKUNIN-frontpage.jpeg', tagline: 'Craft Mastery' },
  { id: 'khoruun', name: 'KHORUUN', image: '/images/codes/KHORUUN-frontpage.jpeg', tagline: 'Nomadic Mobility' },
  { id: 'lhumir', name: 'LHUMIR', image: '/images/codes/LHUMIR-frontpage.jpeg', tagline: 'Stillness & Meaning' },
  { id: 'yatevar', name: 'YATEVAR', image: '/images/codes/YATEVAR-frontpage.jpeg', tagline: 'Warrior Philosopher' },
  { id: 'renara', name: 'RÉNARA', image: '/images/codes/RENARA-frontpage.jpeg', tagline: 'Refined Subtlety' },
  { id: 'karayni', name: 'KARAYNI', image: '/images/codes/KARAYNI-frontpage.jpeg', tagline: 'Sacred Reciprocity' },
  { id: 'wohaka', name: 'WÓHAKA', image: '/images/codes/WOHAKA-frontpage.jpeg', tagline: 'All Beings as Kin' },
  { id: 'tjukari', name: 'TJUKARI', image: '/images/codes/TJUKARI-frontpage.jpeg', tagline: 'Dreamtime Cosmology' },
  { id: 'kinmora', name: 'KINMORA', image: '/images/codes/KINMORA-frontpage.jpeg', tagline: 'Cosmic Cycles' },
  { id: 'siljoa', name: 'SILJOA', image: '/images/codes/SILJOA-frontpage.jpeg', tagline: 'Arctic Intelligence' },
  { id: 'skenari', name: 'SKÉNARI', image: '/images/codes/SKENARI-frontpage.jpeg', tagline: 'Seventh Generation' },
  { id: 'ashkara', name: 'ASHKARA', image: '/images/codes/ASHKARA-frontpage.jpeg', tagline: 'Truth as Action' },
  { id: 'alethir', name: 'ALÉTHIR', image: '/images/codes/ALETHIR-frontpage.jpeg', tagline: 'Logos Inquiry' }
];

/* ======================================================
   ENVIRONMENTS (NEW — CORE CHANGE)
====================================================== */

const ENVIRONMENTS = [
  {
    id: 'urban',
    title: 'Structured Intensity',
    description: 'Order, mastery, pressure, refinement.',
    codes: ['jaejin', 'shokunin', 'siyuane'],
  },
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    description: 'Movement, ease, resilience.',
    codes: ['namsea', 'siljoa'],
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    description: 'Stillness, contemplation, meaning.',
    codes: ['lhumir'],
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    description: 'Freedom, land, perception.',
    codes: ['khoisan', 'khoruun', 'tjukari'],
  },
  {
    id: 'communal',
    title: 'Shared Meaning',
    description: 'Ritual, belonging, responsibility.',
    codes: ['karayni', 'wohaka', 'skenari'],
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    description: 'Inquiry, law, ethics.',
    codes: ['alethir', 'yatevar', 'ashkara'],
  },
];

/* ======================================================
   PAGE
====================================================== */

export default function LandingPage() {
  const [activeEnv, setActiveEnv] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#0b0b14] text-white overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-8 py-6 bg-black/30 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-purple-400" />
          <span className="text-xl font-semibold">AVIRAGE</span>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full">
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600">
            <UserPlus className="w-4 h-4" /> Get Started
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-40 pb-20 text-center max-w-3xl mx-auto px-6">
        <h1 className="text-6xl font-bold mb-4">Your Personal Universe</h1>
        <p className="text-gray-400">
          Move through environments. Discover where you belong.
        </p>
      </section>

      {/* ENVIRONMENT CANVAS */}
      <section className="relative grid grid-cols-1 md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {ENVIRONMENTS.map((env) => (
          <motion.div
            key={env.id}
            onHoverStart={() => setActiveEnv(env.id)}
            onHoverEnd={() => setActiveEnv(null)}
            onClick={() => setActiveEnv(env.id)}
            className="relative h-[280px] rounded-3xl overflow-hidden cursor-pointer border border-white/10"
            whileHover={{ scale: 1.03 }}
          >
            {/* Ambient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-black/60" />

            {/* Text */}
            <div className="relative z-10 p-8 h-full flex flex-col justify-end">
              <h3 className="text-2xl font-semibold">{env.title}</h3>
              <p className="text-sm text-gray-400">{env.description}</p>
            </div>

            {/* Reveal codes */}
            <AnimatePresence>
              {activeEnv === env.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/70 backdrop-blur-md p-6 flex flex-col justify-center gap-4"
                >
                  {env.codes.map((codeId) => {
                    const code = CULTURAL_CODES.find(c => c.id === codeId);
                    if (!code) return null;
                    return (
                      <Link key={code.id} href={`/explore/${code.id}`}>
                        <motion.div
                          whileHover={{ x: 6 }}
                          className="flex items-center gap-4"
                        >
                          <div className="w-14 h-14 rounded-xl overflow-hidden">
                            <Image src={code.image} alt={code.name} width={56} height={56} />
                          </div>
                          <div>
                            <p className="font-semibold">{code.name}</p>
                            <p className="text-xs text-gray-400">{code.tagline}</p>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </section>

      {/* Footer CTA */}
      <div className="text-center mt-20 pb-24">
        <Link href="/quiz">
          <button className="px-10 py-4 rounded-full bg-white text-black font-semibold">
            Find My Code
          </button>
        </Link>
      </div>
    </div>
  );
}
