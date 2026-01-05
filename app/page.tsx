'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

/* =========================
   DATA (keep your IDs/images)
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
    subtitle: 'Focus • rhythm • precision',
    poetic: 'Clear mornings. Clean lines. Everything has a purpose.',
    heroCodeId: 'shokunin',
    codeIds: ['jaejin', 'shokunin', 'siyuane'],
  },
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    subtitle: 'Ocean air • barefoot pace • ease',
    poetic: 'Nothing rushed. Nothing forced. You move when it feels right.',
    heroCodeId: 'namsea',
    codeIds: ['namsea', 'siljoa'],
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    subtitle: 'Quiet • clarity • space to think',
    poetic: 'Less noise. More meaning. Silence that clears your head.',
    heroCodeId: 'lhumir',
    codeIds: ['lhumir'],
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    subtitle: 'Open land • freedom • instinct',
    poetic: 'Paths appear as you walk them.',
    heroCodeId: 'khoisan',
    codeIds: ['khoisan', 'khoruun', 'tjukari'],
  },
  {
    id: 'communal',
    title: 'Shared Meaning',
    subtitle: 'Belonging • ritual • warmth',
    poetic: 'Long tables. Familiar faces. Life makes sense together.',
    heroCodeId: 'karayni',
    codeIds: ['karayni', 'wohaka', 'skenari'],
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    subtitle: 'Ideas • honesty • structure',
    poetic: 'Ask better questions. Live by clearer answers.',
    heroCodeId: 'alethir',
    codeIds: ['alethir', 'yatevar', 'ashkara'],
  },
];

/* =========================
   HELPERS
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

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(' ');
}

/* =========================
   BACKGROUND (modern, travel-calm)
========================= */

function ConstantBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#06080f]" />

      {/* animated “ocean” blobs */}
      <motion.div
        className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-35"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(56,189,248,0.55), rgba(56,189,248,0.00) 60%)',
        }}
        animate={{ x: [0, 70, 0], y: [0, 30, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-48 top-10 h-[620px] w-[620px] rounded-full blur-3xl opacity-28"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(251,146,60,0.50), rgba(251,146,60,0.00) 60%)',
        }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 bottom-[-260px] h-[720px] w-[720px] -translate-x-1/2 rounded-full blur-3xl opacity-25"
        style={{
          background:
            'radial-gradient(circle at 50% 40%, rgba(167,139,250,0.40), rgba(167,139,250,0.00) 62%)',
        }}
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* subtle wave lines */}
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        width="1600"
        height="1000"
        viewBox="0 0 1600 1000"
        fill="none"
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M-80 560 C 260 460, 520 720, 820 560 C 1120 400, 1290 680, 1680 520"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <path
          d="M-100 640 C 220 540, 560 780, 840 650 C 1120 520, 1310 760, 1700 610"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="1"
        />
        <path
          d="M-120 480 C 260 400, 520 640, 820 470 C 1130 300, 1280 610, 1720 420"
          stroke="rgba(255,255,255,0.10)"
          strokeWidth="1"
        />
      </motion.svg>

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
        }}
      />

      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_38%,rgba(0,0,0,0.0),rgba(0,0,0,0.55)_70%,rgba(0,0,0,0.82))]" />
    </div>
  );
}

/* =========================
   CARD (modern motion)
========================= */

function EnvironmentCard({
  env,
  index,
  activeIndex,
  setOpenEnvId,
  scrollToIndex,
  codeMap,
  reduceMotion,
  registerRef,
}: {
  env: Environment;
  index: number;
  activeIndex: number;
  setOpenEnvId: (id: string) => void;
  scrollToIndex: (i: number) => void;
  codeMap: Map<string, Code>;
  reduceMotion: boolean;
  registerRef: (el: HTMLButtonElement | null) => void;
}) {
  const isActive = index === activeIndex;
  const distance = Math.abs(index - activeIndex);

  // keep depth but reduce “blurry museum glass”
  const scale = isActive ? 1 : distance === 1 ? 0.94 : 0.89;
  const opacity = isActive ? 1 : distance === 1 ? 0.76 : 0.56;
  const blur = isActive ? 0 : distance === 1 ? 0.35 : 0.85;
  const rotate = isActive ? 0 : index < activeIndex ? -2.2 : 2.2;

  // 3D tilt (per-card)
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 160, damping: 18 });

  const hero = codeMap.get(env.heroCodeId);
  const heroImg = hero?.image ?? '/images/codes/ALETHIR-frontpage.jpeg';

  const onMove = (e: React.PointerEvent) => {
    if (reduceMotion) return;
    const el = e.currentTarget as HTMLButtonElement;
    const r = el.getBoundingClientRect();
    mx.set(clamp((e.clientX - r.left) / r.width, 0, 1));
    my.set(clamp((e.clientY - r.top) / r.height, 0, 1));
  };

  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.button
      ref={registerRef}
      type="button"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      onClick={() => {
        if (isActive) setOpenEnvId(env.id);
        else scrollToIndex(index);
      }}
      className={cn(
        'snap-center shrink-0 outline-none text-left relative overflow-hidden',
        'w-[72%] sm:w-[420px] md:w-[460px]',
        'h-[540px] sm:h-[590px] md:h-[640px]',
        'rounded-[44px]',
        'bg-white/[0.025] backdrop-blur-xl',
        'border border-white/10',
        'shadow-[0_40px_160px_rgba(0,0,0,0.60)]',
        'ring-1 ring-white/[0.05]',
        'transition-[transform,opacity,filter] duration-300 ease-out'
      )}
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        filter: `blur(${blur}px)`,
        transformOrigin: 'center',
        perspective: 1200,
      }}
      whileTap={{ scale: Math.max(0.985, scale - 0.02) }}
      aria-label={`${env.title}. ${isActive ? 'Open' : 'Focus'}`}
    >
      {/* 3D wrapper */}
      <motion.div
        className="absolute inset-0"
        style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      >
        {/* image with shared layoutId for “morph” */}
        <motion.div className="absolute inset-0" layoutId={`env-${env.id}-hero`}>
          <Image
            src={heroImg}
            alt={env.title}
            fill
            className="object-cover scale-[1.08]"
            sizes="(max-width: 768px) 72vw, 460px"
            priority={isActive}
          />
        </motion.div>

        {/* cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/22 to-black/06" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
          }}
        />

        {/* specular “glass” sweep */}
        <motion.div
          aria-hidden
          className="absolute -inset-x-24 -top-40 h-[280px] rotate-12 opacity-0"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)',
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: isActive ? 0.55 : 0.25,
                  x: [-120, 280, -120],
                }
          }
          transition={{
            duration: 7.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* active aura */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 transition-opacity duration-500',
            isActive ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            background:
              'radial-gradient(900px circle at 18% 18%, rgba(56,189,248,0.18), transparent 58%), radial-gradient(900px circle at 86% 22%, rgba(251,146,60,0.16), transparent 58%)',
          }}
        />
      </motion.div>

      {/* content */}
      <div className="relative h-full px-7 md:px-9 pt-10 pb-9 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/35 border border-white/12 backdrop-blur-md">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/85">
              Vibe
            </span>
          </div>

          <div className={cn('text-xs text-right transition-opacity', isActive ? 'opacity-100 text-white/70' : 'opacity-0 text-white/0')}>
            {env.subtitle}
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <div className="text-[30px] md:text-[34px] font-medium tracking-tight leading-[1.03]">
            {env.title}
          </div>

          <div className="text-sm md:text-[15px] text-white/72 leading-[1.6] max-w-[36ch]">
            {env.poetic}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-white/60">
              {isActive ? 'Click to open • see what fits here' : 'Click to focus'}
            </div>

            {/* micro progress marker */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/45">
                {index + 1}/{ENVIRONMENTS.length}
              </span>
              <span
                className={cn(
                  'h-1.5 w-10 rounded-full overflow-hidden bg-white/10',
                  isActive ? 'bg-white/14' : ''
                )}
              >
                <span
                  className="block h-full rounded-full bg-white/55"
                  style={{
                    width: `${((index + 1) / ENVIRONMENTS.length) * 100}%`,
                  }}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

/* =========================
   PAGE
========================= */

export default function LandingPage() {
  const reduceMotion = useReducedMotion();
  const codeMap = useCodeMap();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(2);
  const [openEnvId, setOpenEnvId] = useState<string | null>(null);

  const openEnv = openEnvId ? ENVIRONMENTS.find((e) => e.id === openEnvId) : null;

  // spotlight that tracks cursor (global)
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  // keep activeIndex synced to whichever card is closest to center
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;

    const computeActive = () => {
      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;

      let best = 0;
      let bestDist = Number.POSITIVE_INFINITY;

      for (let i = 0; i < ENVIRONMENTS.length; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = Math.abs(cx - centerX);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      }

      setActiveIndex(best);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeActive);
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    computeActive();

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll as any);
    };
  }, []);

  const scrollToIndex = (i: number) => {
    const el = cardRefs.current[i];
    if (!el) return;
    el.scrollIntoView({
      behavior: reduceMotion ? 'auto' : 'smooth',
      inline: 'center',
      block: 'nearest',
    });
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(ENVIRONMENTS.length - 1, activeIndex + 1));

  // keyboard navigation (ArrowLeft/ArrowRight/Enter/Escape)
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Enter') {
        const env = ENVIRONMENTS[activeIndex];
        if (env) setOpenEnvId(env.id);
      }
      if (e.key === 'Escape') setOpenEnvId(null);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(900px circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.06), transparent 58%), #06080f',
      }}
    >
      <ConstantBackground />

      {/* TOP/CORNER UI */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* top-left brand */}
        <div className="absolute left-5 top-5 md:left-8 md:top-7 pointer-events-auto">
          <div className="flex items-center gap-3 text-white/90">
            <div className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md flex items-center justify-center shadow-[0_18px_60px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]">
              <Sparkles className="h-5 w-5 text-white/85" />
            </div>
            <span className="text-sm md:text-base font-medium tracking-tight">ETHOS</span>
          </div>
        </div>

        {/* top-right */}
        <div className="absolute right-5 top-5 md:right-8 md:top-7 flex items-center gap-2 pointer-events-auto">
          <button className="px-4 py-2 rounded-full border border-white/12 bg-white/[0.02] backdrop-blur-md text-white/78 hover:bg-white/[0.06] transition text-sm">
            Sign in
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition text-sm">
            Get started
          </button>
        </div>

        {/* bottom-left microcopy */}
        <div className="absolute left-5 bottom-6 md:left-8 md:bottom-8 max-w-[300px] md:max-w-[420px] pointer-events-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">A calmer way to choose</div>
          <div className="mt-2 text-sm md:text-base text-white/78 leading-[1.6]">
            Some places energize you. Some places drain you.
            <span className="text-white/55"> Ethos helps you find what fits — travel, spaces, experiences.</span>
          </div>
        </div>

        {/* bottom-right CTA */}
        <div className="absolute right-5 bottom-6 md:right-8 md:bottom-8 pointer-events-auto">
          <Link href="/quiz">
            <button className="px-4 py-2 rounded-full border border-white/12 bg-white/[0.02] backdrop-blur-md text-white/78 hover:bg-white/[0.06] transition text-sm">
              Find my places
            </button>
          </Link>
        </div>
      </div>

      {/* CENTER STAGE */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* HERO */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="text-center mb-4 md:mb-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-4 py-2 text-white/70 shadow-[0_16px_60px_rgba(0,0,0,0.35)]">
              <span className="text-[11px] uppercase tracking-[0.22em]">
                Swipe to choose • Enter to open • Esc to close
              </span>
            </div>

            <div className="mt-5 md:mt-6 max-w-2xl mx-auto">
              <div className="text-[28px] md:text-[38px] font-medium tracking-tight leading-[1.1]">
                Not every place is meant for you.
              </div>
              <div className="mt-2 text-sm md:text-base text-white/70 leading-[1.65]">
                Choose a vibe. We’ll show you spaces, journeys, and experiences that match your rhythm.
                <span className="text-white/50"> Calm, not hype.</span>
              </div>
            </div>
          </motion.div>

          {/* desktop controls */}
          <div className="hidden md:flex items-center justify-between mb-3 px-2">
            <button
              onClick={prev}
              className="h-11 w-11 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4 text-white/80" />
            </button>

            <div className="text-xs text-white/55">
              <span className="text-white/70">{ENVIRONMENTS[activeIndex]?.title}</span>
              <span className="text-white/30"> • </span>
              <span className="text-white/45">center card is selected</span>
            </div>

            <button
              onClick={next}
              className="h-11 w-11 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center shadow-[0_16px_60px_rgba(0,0,0,0.35)]"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4 text-white/80" />
            </button>
          </div>

          {/* slider */}
          <div className="relative">
            {/* edge fades */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-14 bg-gradient-to-r from-black/60 to-transparent z-10" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-14 bg-gradient-to-l from-black/60 to-transparent z-10" />

            {/* subtle “runway” glow under cards */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[76%] md:top-[79%] w-[520px] md:w-[620px] h-[150px] blur-2xl opacity-70"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(56,189,248,0.18), transparent 70%), radial-gradient(closest-side, rgba(251,146,60,0.12), transparent 70%)',
              }}
            />

            <div
              ref={trackRef}
              className="flex gap-6 md:gap-7 overflow-x-auto pb-7 scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="shrink-0 w-[10vw] md:w-[14vw]" aria-hidden />

              {ENVIRONMENTS.map((env, i) => (
                <EnvironmentCard
                  key={env.id}
                  env={env}
                  index={i}
                  activeIndex={activeIndex}
                  setOpenEnvId={(id) => setOpenEnvId(id)}
                  scrollToIndex={scrollToIndex}
                  codeMap={codeMap}
                  reduceMotion={!!reduceMotion}
                  registerRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                />
              ))}

              <div className="shrink-0 w-[10vw] md:w-[14vw]" aria-hidden />
            </div>

            {/* dots (upgraded) */}
            <div className="mt-2 flex items-center justify-center gap-2">
              {ENVIRONMENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${i + 1}`}
                  className={cn(
                    'h-2 rounded-full transition-all border border-white/10 bg-white/10 hover:bg-white/18',
                    i === activeIndex ? 'w-10 bg-white/55' : 'w-3'
                  )}
                />
              ))}
            </div>

            <div className="mt-3 text-center text-xs text-white/50 md:hidden">
              Swipe sideways — pause where it feels right.
            </div>
          </div>
        </div>
      </main>

      {/* MODAL (morph transition) */}
      <AnimatePresence mode="wait">
        {openEnv && (
          <motion.div
            className="fixed inset-0 z-[100] p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenEnvId(null)}
          >
            {/* backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/70 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto max-w-6xl rounded-[44px] overflow-hidden border border-white/12 bg-white/[0.04] shadow-[0_50px_200px_rgba(0,0,0,0.70)] ring-1 ring-white/[0.06]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 22, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              {/* HERO IMAGE morph */}
              <div className="relative h-[320px] md:h-[360px]">
                <motion.div className="absolute inset-0" layoutId={`env-${openEnv.id}-hero`}>
                  <Image
                    src={(codeMap.get(openEnv.heroCodeId)?.image) ?? '/images/codes/ALETHIR-frontpage.jpeg'}
                    alt={openEnv.title}
                    fill
                    className="object-cover"
                    sizes="100vw"
                    priority
                  />
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* header content */}
                <div className="relative p-7 md:p-10">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/75">Vibe</div>
                  <div className="mt-2 text-3xl md:text-5xl font-medium tracking-tight">
                    {openEnv.title}
                  </div>
                  <div className="mt-3 text-white/75 max-w-2xl leading-[1.6]">
                    {openEnv.poetic}
                  </div>

                  <div className="mt-4 text-sm text-white/62 max-w-2xl leading-[1.65]">
                    This is where things feel <span className="text-white/85">natural</span>.
                    <span className="text-white/45"> Less forcing. More flow.</span>
                  </div>

                  <div className="mt-7 flex items-center gap-2">
                    <button
                      onClick={() => setOpenEnvId(null)}
                      className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.03] hover:bg-white/[0.06] transition text-white/90 text-sm"
                    >
                      Close
                    </button>
                    <Link href="/quiz">
                      <button className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition">
                        Find my places
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* codes */}
              <div className="p-7 md:p-10 pt-0">
                <div className="flex items-end justify-between gap-4 mb-4">
                  <div>
                    <div className="text-sm text-white/70">Codes that shape this space</div>
                    <div className="text-xs text-white/45 mt-1">
                      Browse the cultural patterns behind this vibe.
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {openEnv.codeIds.map((id) => {
                    const c = codeMap.get(id);
                    if (!c) return null;

                    return (
                      <Link key={c.id} href={`/explore/${c.id}`} className="snap-center shrink-0 w-[78%] sm:w-[360px]">
                        <motion.div
                          whileHover={reduceMotion ? undefined : { y: -6 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                          className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.05]"
                        >
                          <div className="relative h-[210px]">
                            <Image
                              src={c.image}
                              alt={c.name}
                              fill
                              className="object-cover opacity-[0.92] group-hover:scale-[1.07] transition-transform duration-700"
                              sizes="(max-width: 768px) 78vw, 360px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div
                              aria-hidden
                              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                              style={{
                                background:
                                  'radial-gradient(520px circle at 30% 15%, rgba(255,255,255,0.16), transparent 60%)',
                              }}
                            />
                          </div>

                          <div className="p-5">
                            <div className="text-base font-medium tracking-tight">{c.name}</div>
                            <div className="text-xs text-white/65 mt-1 leading-[1.5]">{c.tagline}</div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 text-xs text-white/55">Swipe sideways to browse.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
