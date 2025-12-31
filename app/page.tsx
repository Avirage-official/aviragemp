'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, LogIn, UserPlus, ArrowRight } from 'lucide-react';

/* ======================================================
   CULTURAL CODES (keep your naming + image paths)
====================================================== */

type Code = {
  id: string;
  name: string;
  tagline: string;
  origin?: string;
  essence?: string;
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
  codeIds: string[];
  // choose 1–2 codes to use as background “texture”
  heroBgFromCode: string;
};

const ENVIRONMENTS: Environment[] = [
  {
    id: 'urban',
    title: 'Structured Intensity',
    subtitle: 'City / discipline / mastery',
    poetic: 'Where pressure becomes precision. Where craft earns respect.',
    codeIds: ['jaejin', 'shokunin', 'siyuane'],
    heroBgFromCode: 'shokunin',
  },
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    subtitle: 'Ocean / river / ease',
    poetic: 'You move like water: responsive, calm, unforced.',
    codeIds: ['namsea', 'siljoa'],
    heroBgFromCode: 'namsea',
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    subtitle: 'Mountains / stillness / meaning',
    poetic: 'Quiet isn’t empty. It’s where your mind finally speaks.',
    codeIds: ['lhumir'],
    heroBgFromCode: 'lhumir',
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    subtitle: 'Wilderness / freedom / land',
    poetic: 'You read the world in signals — wind, silence, distance.',
    codeIds: ['khoisan', 'khoruun', 'tjukari'],
    heroBgFromCode: 'khoisan',
  },
  {
    id: 'communal',
    title: 'Shared Meaning',
    subtitle: 'Village / ritual / belonging',
    poetic: 'Life is reciprocal. Identity is relationship, not isolation.',
    codeIds: ['karayni', 'wohaka', 'skenari'],
    heroBgFromCode: 'karayni',
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    subtitle: 'Agora / law / inquiry',
    poetic: 'You seek what is real — and you live as if it matters.',
    codeIds: ['alethir', 'yatevar', 'ashkara'],
    heroBgFromCode: 'alethir',
  },
];

/* ======================================================
   UI Helpers
====================================================== */

function useCodeIndex() {
  return useMemo(() => {
    const map = new Map<string, Code>();
    for (const c of CULTURAL_CODES) map.set(c.id, c);
    return map;
  }, []);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/* ======================================================
   Components
====================================================== */

function SpotlightLayer({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          'radial-gradient(600px circle at var(--mx, 50%) var(--my, 35%), rgba(168, 85, 247, 0.18), transparent 55%), radial-gradient(900px circle at 20% 10%, rgba(59, 130, 246, 0.12), transparent 55%), radial-gradient(900px circle at 80% 20%, rgba(236, 72, 153, 0.10), transparent 55%)',
      }}
    />
  );
}

function EnvironmentCard({
  env,
  bgImage,
  isDimmed,
  isActiveHover,
  onHover,
  onLeave,
  onClick,
}: {
  env: Environment;
  bgImage: string;
  isDimmed: boolean;
  isActiveHover: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onClick}
      className="relative w-full h-[360px] md:h-[420px] rounded-[28px] overflow-hidden text-left outline-none"
      style={{
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      {/* image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt={env.title}
          fill
          className={[
            'object-cover',
            'transition-transform duration-700',
            isActiveHover ? 'scale-[1.08]' : 'scale-[1.02]',
          ].join(' ')}
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
        {/* readability overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* glass + hairlines */}
      <div
        className={[
          'absolute inset-0 rounded-[28px]',
          'border border-white/12',
          'shadow-[0_20px_80px_rgba(0,0,0,0.55)]',
          'backdrop-blur-[2px]',
          isDimmed ? 'opacity-55' : 'opacity-100',
          'transition-opacity duration-300',
        ].join(' ')}
      />

      {/* subtle grid texture */}
      <div
        aria-hidden
        className={[
          'absolute inset-0 opacity-[0.18]',
          'bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.06)_1px,transparent_1px)]',
          'bg-[size:22px_22px]',
        ].join(' ')}
      />

      {/* content */}
      <div className="relative z-10 p-7 md:p-8 h-full flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/35 border border-white/12 backdrop-blur-md">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">
              Environment
            </span>
          </div>

          <motion.div
            className="h-10 w-10 rounded-full bg-black/35 border border-white/12 backdrop-blur-md flex items-center justify-center"
            animate={{ rotate: isActiveHover ? 6 : 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          >
            <ArrowRight className="h-4 w-4 text-white/80" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-2xl md:text-[28px] font-semibold tracking-tight">
              {env.title}
            </h3>
            <p className="text-sm text-white/70">{env.subtitle}</p>
          </div>

          <motion.p
            className="text-sm md:text-[15px] leading-relaxed text-white/78 max-w-[26ch]"
            initial={false}
            animate={{ opacity: isActiveHover ? 1 : 0.72 }}
            transition={{ duration: 0.25 }}
          >
            {env.poetic}
          </motion.p>

          <div className="pt-2 flex items-center gap-2 text-xs text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
            <span>Click to reveal codes</span>
          </div>
        </div>
      </div>

      {/* hover halo */}
      <div
        aria-hidden
        className={[
          'absolute inset-0',
          'transition-opacity duration-300',
          isActiveHover ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
        style={{
          background:
            'radial-gradient(520px circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.16), transparent 55%)',
        }}
      />
    </motion.button>
  );
}

function CodeTile({ code }: { code: Code }) {
  return (
    <Link href={`/explore/${code.id}`} className="block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
      >
        <div className="relative h-[150px]">
          <Image
            src={code.image}
            alt={code.name}
            fill
            className="object-cover opacity-[0.92] group-hover:scale-[1.06] transition-transform duration-700"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-base font-semibold tracking-tight">{code.name}</div>
              <div className="text-xs text-white/65 mt-1">{code.tagline}</div>
            </div>
            <div className="h-9 w-9 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white/75" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

/* ======================================================
   Page
====================================================== */

export default function LandingPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const codeIndex = useCodeIndex();

  const [hoveredEnv, setHoveredEnv] = useState<string | null>(null);
  const [openEnv, setOpenEnv] = useState<string | null>(null);

  // cursor spotlight coords → CSS vars on container
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  const openEnvironment = (id: string) => {
    setOpenEnv(id);
  };

  const closeEnvironment = () => {
    setOpenEnv(null);
  };

  const envForModal = openEnv ? ENVIRONMENTS.find((e) => e.id === openEnv) : null;

  return (
    <div className="min-h-screen bg-[#070710] text-white overflow-hidden">
      {/* Top ambient background */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_10%_10%,rgba(168,85,247,0.14),transparent_55%),radial-gradient(1000px_circle_at_90%_20%,rgba(59,130,246,0.10),transparent_55%),radial-gradient(900px_circle_at_50%_90%,rgba(236,72,153,0.08),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black" />
        {/* subtle grain (pure CSS, no asset) */}
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

      {/* Main */}
      <main
        ref={containerRef}
        onPointerMove={onPointerMove}
        className="relative z-10 pt-28 pb-24"
      >
        <SpotlightLayer containerRef={containerRef} />

        {/* Hero */}
        <section className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 text-white/75">
              <span className="text-[11px] uppercase tracking-[0.22em]">A Life Operating System</span>
            </div>

            <h1 className="mt-5 text-5xl md:text-6xl font-semibold tracking-tight leading-[1.02]">
              Your Personal Universe.
            </h1>

            <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
              Start with environments — then discover the Cultural Codes that feel like home.
            </p>

            <div className="mt-7 flex items-center gap-3">
              <Link href="/quiz">
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                  className="px-6 py-3 rounded-full bg-white text-black font-semibold shadow-[0_18px_70px_rgba(255,255,255,0.15)]"
                >
                  Take the Quiz
                </motion.button>
              </Link>

              <div className="text-sm text-white/55">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/35" />
                  Hover → feel the space. Click → reveal codes.
                </span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Card Gallery (like your references) */}
        <section className="mx-auto max-w-7xl px-6 mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ENVIRONMENTS.map((env) => {
              const bgCode = codeIndex.get(env.heroBgFromCode);
              const bgImage = bgCode?.image ?? '/images/codes/ALETHIR-frontpage.jpeg';

              const someoneHovered = hoveredEnv !== null;
              const isActiveHover = hoveredEnv === env.id;
              const isDimmed = someoneHovered && !isActiveHover;

              return (
                <EnvironmentCard
                  key={env.id}
                  env={env}
                  bgImage={bgImage}
                  isDimmed={isDimmed}
                  isActiveHover={isActiveHover}
                  onHover={() => setHoveredEnv(env.id)}
                  onLeave={() => setHoveredEnv(null)}
                  onClick={() => openEnvironment(env.id)}
                />
              );
            })}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="mx-auto max-w-7xl px-6 mt-14">
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="text-lg font-semibold">Not sure where you fit yet?</div>
              <div className="text-sm text-white/65 mt-1">
                The quiz maps your code — then the world filters itself for you.
              </div>
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

      {/* Environment Modal (reveals codes) */}
      <AnimatePresence>
        {envForModal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeEnvironment}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-5xl rounded-[32px] overflow-hidden border border-white/12 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            >
              {/* Header */}
              <div className="relative p-7 md:p-10">
                {/* background texture from env hero code */}
                <div className="absolute inset-0">
                  <Image
                    src={codeIndex.get(envForModal.heroBgFromCode)?.image ?? '/images/code

