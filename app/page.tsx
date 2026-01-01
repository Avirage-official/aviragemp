'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, LogIn, Sparkles, UserPlus } from 'lucide-react';

/* =========================
   Data (keep your IDs/images)
========================= */

type Code = {
  id: string;
  name: string;
  tagline: string;
  image: string;
};

const CULTURAL_CODES: Code[] = [
  { id: 'khoisan', name: 'KHOISAN', tagline: 'Hyper-Acute Perception', image: '/images/codes/KHOISAN-frontpage.jpeg' },
  { id: 'kayori', name: 'KÁYORI', tagline: 'Expressive Ritual Creativity', image: '/images/codes/KAYORI-frontpage.jpeg' },
  { id: 'sahen', name: 'SAHÉN', tagline: 'Desert Wisdom', image: '/images/codes/SAHEN-frontpage.jpeg' },
  { id: 'enzuka', name: 'ENZUKA', tagline: 'Warrior Discipline', image: '/images/codes/ENZUKA-frontpage.jpeg' },
  { id: 'siyuane', name: 'SIYUANÉ', tagline: 'Generational Harmony', image: '/images/codes/SIYUANE-frontpage.jpeg' },
  { id: 'jaejin', name: 'JAEJIN', tagline: 'Compressed Emotion', image: '/images/codes/JAEJIN-frontpage.jpeg' },
  { id: 'namsea', name: 'NAMSÉA', tagline: 'Water-Based Cognition', image: '/images/codes/NAMSEA-frontpage.jpeg' },
  { id: 'shokunin', name: 'SHOKUNIN', tagline: 'Craft Mastery', image: '/images/codes/SHOKUNIN-frontpage.jpeg' },
  { id: 'khoruun', name: 'KHORUUN', tagline: 'Nomadic Mobility', image: '/images/codes/KHORUUN-frontpage.jpeg' },
  { id: 'lhumir', name: 'LHUMIR', tagline: 'Stillness & Meaning', image: '/images/codes/LHUMIR-frontpage.jpeg' },
  { id: 'yatevar', name: 'YATEVAR', tagline: 'Warrior-Philosopher', image: '/images/codes/YATEVAR-frontpage.jpeg' },
  { id: 'renara', name: 'RÉNARA', tagline: 'Refined Subtlety', image: '/images/codes/RENARA-frontpage.jpeg' },
  { id: 'karayni', name: 'KARAYNI', tagline: 'Sacred Reciprocity', image: '/images/codes/KARAYNI-frontpage.jpeg' },
  { id: 'wohaka', name: 'WÓHAKA', tagline: 'All Beings as Kin', image: '/images/codes/WOHAKA-frontpage.jpeg' },
  { id: 'tjukari', name: 'TJUKARI', tagline: 'Dreamtime Cosmology', image: '/images/codes/TJUKARI-frontpage.jpeg' },
  { id: 'kinmora', name: 'KINMORA', tagline: 'Cosmic Cycles', image: '/images/codes/KINMORA-frontpage.jpeg' },
  { id: 'siljoa', name: 'SILJOA', tagline: 'Arctic Intelligence', image: '/images/codes/SILJOA-frontpage.jpeg' },
  { id: 'skenari', name: 'SKÉNARI', tagline: 'Seventh Generation', image: '/images/codes/SKENARI-frontpage.jpeg' },
  { id: 'ashkara', name: 'ASHKARA', tagline: 'Truth as Action', image: '/images/codes/ASHKARA-frontpage.jpeg' },
  { id: 'alethir', name: 'ALÉTHIR', tagline: 'Logos Inquiry', image: '/images/codes/ALETHIR-frontpage.jpeg' },
];

type Environment = {
  id: string;
  title: string;
  subtitle: string;
  poetic: string;
  heroCodeId: string;
  codeIds: string[];
};

const ENVIRONMENTS: Environment[] = [
  {
    id: 'urban',
    title: 'Structured Intensity',
    subtitle: 'City / mastery / discipline',
    poetic: 'Where pressure becomes precision.',
    heroCodeId: 'shokunin',
    codeIds: ['jaejin', 'shokunin', 'siyuane'],
  },
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    subtitle: 'Ocean / river / ease',
    poetic: 'You move like water: calm and capable.',
    heroCodeId: 'namsea',
    codeIds: ['namsea', 'siljoa'],
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    subtitle: 'Mountains / stillness / meaning',
    poetic: 'Quiet isn’t empty. It’s clarity.',
    heroCodeId: 'lhumir',
    codeIds: ['lhumir'],
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    subtitle: 'Wilderness / freedom / land',
    poetic: 'You read the world in signals.',
    heroCodeId: 'khoisan',
    codeIds: ['khoisan', 'khoruun', 'tjukari'],
  },
  {
    id: 'communal',
    title: 'Shared Meaning',
    subtitle: 'Village / ritual / belonging',
    poetic: 'Life is reciprocal. Identity is relationship.',
    heroCodeId: 'karayni',
    codeIds: ['karayni', 'wohaka', 'skenari'],
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    subtitle: 'Agora / law / inquiry',
    poetic: 'You seek what is real — and live by it.',
    heroCodeId: 'alethir',
    codeIds: ['alethir', 'yatevar', 'ashkara'],
  },
];

/* =========================
   Helpers
========================= */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function useCodeMap() {
  return useMemo(() => {
    const m = new Map<string, Code>();
    for (const c of CULTURAL_CODES) m.set(c.id, c);
    return m;
  }, []);
}

function scrollByCard(container: HTMLDivElement | null, dir: 1 | -1) {
  if (!container) return;
  const firstCard = container.querySelector('[data-card]') as HTMLElement | null;
  const step = firstCard ? firstCard.offsetWidth + 16 : 360;
  container.scrollBy({ left: dir * step, behavior: 'smooth' });
}

/* =========================
   Page
========================= */

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const envRailRef = useRef<HTMLDivElement | null>(null);
  const codeMap = useCodeMap();

  const [openEnvId, setOpenEnvId] = useState<string | null>(null);
  const openEnv = openEnvId ? ENVIRONMENTS.find(e => e.id === openEnvId) : null;

  // mouse spotlight vars
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  // Optional: allow mouse wheel to scroll the horizontal rail when hovered (desktop familiarity)
  useEffect(() => {
    const rail = envRailRef.current;
    if (!rail) return;

    const onWheel = (e: WheelEvent) => {
      // If user is trying to scroll vertically, convert some of it to horizontal while cursor is over rail.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        rail.scrollBy({ left: e.deltaY, behavior: 'auto' });
        e.preventDefault();
      }
    };

    rail.addEventListener('wheel', onWheel, { passive: false });
    return () => rail.removeEventListener('wheel', onWheel as any);
  }, []);

  return (
    <div ref={rootRef} onPointerMove={onPointerMove} className="min-h-screen bg-[#070710] text-white overflow-hidden">
      {/* Ambient background (keep premium vibe) */}
      <div className="fixed inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(700px circle at var(--mx, 50%) var(--my, 35%), rgba(168,85,247,0.20), transparent 55%), radial-gradient(1100px circle at 15% 10%, rgba(59,130,246,0.12), transparent 55%), radial-gradient(1100px circle at 85% 18%, rgba(236,72,153,0.10), transparent 55%)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.6%27/%3E%3C/svg%3E")',
          }}
        />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-7xl px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-purple-400" />
            <span className="text-lg font-semibold tracking-tight">AVIRAGE</span>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.02] backdrop-blur-md text-white/85 hover:bg-white/[0.05] transition">
              <span className="inline-flex items-center gap-2">
                <LogIn className="w-4 h-4" />
                Sign In
              </span>
            </button>

            <button className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition shadow-[0_16px_60px_rgba(168,85,247,0.25)]">
              <span className="inline-flex items-center gap-2">
                <UserPlus className="w-4 h-4" />
                Get Started
              </span>
            </button>
          </div>
        </div>
        <div className="h-px bg-white/10" />
      </header>

      <main className="relative z-10 pt-28 pb-24">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: 'easeOut' }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 text-white/75">
              <span className="text-[11px] uppercase tracking-[0.22em]">Choose your lens</span>
            </div>

            <h1 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
              A marketplace that feels like <span className="text-white/70">you</span>.
            </h1>

            <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
              Start with environments — then reveal the Cultural Codes that shape how you see the world.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <Link href="/quiz">
                <motion.button whileHover={{ y: -2 }} whileTap={{ y: 0 }} className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow-[0_18px_70px_rgba(255,255,255,0.15)]">
                  Take the Quiz
                </motion.button>
              </Link>
              <div className="text-sm text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  Scroll horizontally • Click to reveal codes
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Environment rail header */}
        <section className="mx-auto max-w-7xl px-6 mt-10">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-lg font-semibold">Choose an environment</div>
              <div className="text-sm text-white/60 mt-1">Familiar feed pattern — but with a game-like reveal.</div>
            </div>

            {/* Arrows (discoverable controls) */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scrollByCard(envRailRef.current, -1)}
                className="h-10 w-10 rounded-full border border-white/14 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
                aria-label="Scroll left"
              >
                <ArrowLeft className="h-4 w-4 text-white/80" />
              </button>
              <button
                onClick={() => scrollByCard(envRailRef.current, 1)}
                className="h-10 w-10 rounded-full border border-white/14 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
                aria-label="Scroll right"
              >
                <ArrowRight className="h-4 w-4 text-white/80" />
              </button>
            </div>
          </div>
        </section>

        {/* Horizontal rail */}
        <section className="mx-auto max-w-7xl px-6 mt-5">
          <div
            ref={envRailRef}
            className="relative flex gap-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }}
          >
            {/* edge fade */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/70 to-transparent z-10" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black/70 to-transparent z-10" />

            {ENVIRONMENTS.map((env) => {
              const hero = codeMap.get(env.heroCodeId);
              const heroImage = hero?.image ?? '/images/codes/ALETHIR-frontpage.jpeg';

              return (
                <motion.button
                  key={env.id}
                  type="button"
                  data-card
                  onClick={() => setOpenEnvId(env.id)}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  className="snap-start shrink-0 w-[82%] sm:w-[420px] md:w-[460px] h-[320px] rounded-[28px] overflow-hidden border border-white/12 bg-white/[0.03] shadow-[0_20px_80px_rgba(0,0,0,0.55)] text-left relative"
                >
                  {/* image */}
                  <div className="absolute inset-0">
                    <Image src={heroImage} alt={env.title} fill className="object-cover scale-[1.06]" sizes="(max-width: 768px) 82vw, 460px" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
                  </div>

                  {/* subtle grid */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                      backgroundSize: '22px 22px',
                    }}
                  />

                  {/* content */}
                  <div className="relative h-full p-7 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/35 border border-white/12 backdrop-blur-md">
                        <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">Environment</span>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-black/35 border border-white/12 backdrop-blur-md flex items-center justify-center">
                        <ArrowRight className="h-4 w-4 text-white/80" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-2xl font-semibold tracking-tight">{env.title}</div>
                      <div className="text-sm text-white/70">{env.subtitle}</div>
                      <div className="text-sm text-white/75 max-w-[46ch]">{env.poetic}</div>
                      <div className="text-xs text-white/55 pt-2">Click to reveal codes</div>
                    </div>
                  </div>

                  {/* hover spotlight on card */}
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(420px circle at var(--mx, 50%) var(--my, 40%), rgba(255,255,255,0.18), transparent 60%)',
                    }}
                  />
                </motion.button>
              );
            })}
          </div>

          {/* mobile hint */}
          <div className="mt-2 text-xs text-white/55 md:hidden">
            Tip: swipe sideways — the next card is intentionally peeking.
          </div>
        </section>

        {/* Secondary section like a social feed (optional but very “marketplace”) */}
        <section className="mx-auto max-w-7xl px-6 mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-lg font-semibold">Want the fastest match?</div>
              <div className="text-sm text-white/65 mt-1">Take the quiz — your world filters itself instantly.</div>
            </div>
            <Link href="/quiz">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition shadow-[0_16px_60px_rgba(236,72,153,0.18)] font-semibold"
              >
                Find My Code
              </motion.button>
            </Link>
          </div>
        </section>
      </main>

      {/* Environment modal with horizontal code rail */}
      <AnimatePresence>
        {openEnv && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenEnvId(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-6xl rounded-[32px] overflow-hidden border border-white/12 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            >
              {/* modal header */}
              <div className="relative p-7 md:p-10">
                <div className="absolute inset-0">
                  <Image
                    src={(codeMap.get(openEnv.heroCodeId)?.image) ?? '/images/codes/ALETHIR-frontpage.jpeg'}
                    alt={openEnv.title}
                    fill
                    className="object-cover opacity-[0.22]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/15" />
                </div>

                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/70">Environment</div>
                  <div className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{openEnv.title}</div>
                  <div className="mt-2 text-white/70 max-w-2xl">{openEnv.poetic}</div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => setOpenEnvId(null)}
                      className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.03] hover:bg-white/[0.06] transition text-white/85"
                    >
                      Close
                    </button>
                    <Link href="/quiz">
                      <button className="px-4 py-2 rounded-full bg-white text-black font-semibold">Take Quiz</button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* code rail */}
              <div className="p-7 md:p-10 pt-0">
                <div className="text-sm text-white/65 mb-4">Codes in this space</div>

                <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
                  {openEnv.codeIds.map((id) => {
                    const c = codeMap.get(id);
                    if (!c) return null;
                    return (
                      <Link key={c.id} href={`/explore/${c.id}`} className="snap-start shrink-0 w-[78%] sm:w-[320px]">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                        >
                          <div className="relative h-[160px]">
                            <Image
                              src={c.image}
                              alt={c.name}
                              fill
                              className="object-cover opacity-[0.92] group-hover:scale-[1.06] transition-transform duration-700"
                              sizes="(max-width: 768px) 78vw, 320px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                          </div>
                          <div className="p-4">
                            <div className="text-base font-semibold tracking-tight">{c.name}</div>
                            <div className="text-xs text-white/65 mt-1">{c.tagline}</div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 text-xs text-white/55">Tip: swipe sideways to browse codes.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
