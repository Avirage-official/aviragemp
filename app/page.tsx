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
import { ArrowLeft, ArrowRight, Sparkles, Compass, Waves, SunMedium } from 'lucide-react';

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
  vibeTags: string[];
  palette: {
    a: string; // warm
    b: string; // ocean
    c: string; // dusk
  };
};

const ENVIRONMENTS: Environment[] = [
  {
    id: 'urban',
    title: 'Structured Intensity',
    subtitle: 'Focus • rhythm • precision',
    poetic: 'Clear mornings. Clean lines. Everything has a purpose.',
    heroCodeId: 'shokunin',
    codeIds: ['jaejin', 'shokunin', 'siyuane'],
    vibeTags: ['Craft', 'Momentum', 'Clarity'],
    palette: { a: '#FDBA74', b: '#38BDF8', c: '#0B1220' },
  },
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    subtitle: 'Ocean air • barefoot pace • ease',
    poetic: 'Nothing rushed. Nothing forced. You move when it feels right.',
    heroCodeId: 'namsea',
    codeIds: ['namsea', 'siljoa'],
    vibeTags: ['Surf pace', 'Ease', 'Reset'],
    palette: { a: '#FDE68A', b: '#22D3EE', c: '#07111E' },
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    subtitle: 'Quiet • clarity • space to think',
    poetic: 'Less noise. More meaning. Silence that clears your head.',
    heroCodeId: 'lhumir',
    codeIds: ['lhumir'],
    vibeTags: ['Still', 'Perspective', 'Clean air'],
    palette: { a: '#A7F3D0', b: '#60A5FA', c: '#07101D' },
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    subtitle: 'Open land • freedom • instinct',
    poetic: 'Paths appear as you walk them.',
    heroCodeId: 'khoisan',
    codeIds: ['khoisan', 'khoruun', 'tjukari'],
    vibeTags: ['Explore', 'Freedom', 'Instinct'],
    palette: { a: '#FCA5A5', b: '#34D399', c: '#071015' },
  },
  {
    id: 'communal',
    title: 'Shared Meaning',
    subtitle: 'Belonging • ritual • warmth',
    poetic: 'Long tables. Familiar faces. Life makes sense together.',
    heroCodeId: 'karayni',
    codeIds: ['karayni', 'wohaka', 'skenari'],
    vibeTags: ['Warmth', 'Ritual', 'Together'],
    palette: { a: '#FDBA74', b: '#A78BFA', c: '#0A0F18' },
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    subtitle: 'Ideas • honesty • structure',
    poetic: 'Ask better questions. Live by clearer answers.',
    heroCodeId: 'alethir',
    codeIds: ['alethir', 'yatevar', 'ashkara'],
    vibeTags: ['Inquiry', 'Direction', 'Grounded'],
    palette: { a: '#FDE68A', b: '#93C5FD', c: '#070A12' },
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
   BACKGROUND (travel/surf/calm)
========================= */

function CoastalBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base */}
      <div className="absolute inset-0 bg-[#05070B]" />

      {/* “sky → sea” gradient */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0.00)_22%,rgba(0,0,0,0.70)_100%)]" />

      {/* drifting color fields (subtle, not neon) */}
      <motion.div
        className="absolute -left-48 -top-56 h-[720px] w-[720px] rounded-full blur-3xl opacity-30"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.65), rgba(34,211,238,0.00) 62%)',
        }}
        animate={{ x: [0, 70, 0], y: [0, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-56 top-8 h-[820px] w-[820px] rounded-full blur-3xl opacity-26"
        style={{
          background:
            'radial-gradient(circle at 40% 30%, rgba(253,186,116,0.62), rgba(253,186,116,0.00) 62%)',
        }}
        animate={{ x: [0, -80, 0], y: [0, 55, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute left-1/2 bottom-[-320px] h-[980px] w-[980px] -translate-x-1/2 rounded-full blur-3xl opacity-18"
        style={{
          background:
            'radial-gradient(circle at 50% 42%, rgba(99,102,241,0.50), rgba(99,102,241,0.00) 64%)',
        }}
        animate={{ y: [0, -55, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* wave linework */}
      <motion.svg
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]"
        width="1700"
        height="700"
        viewBox="0 0 1700 700"
        fill="none"
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M-80 380 C 260 280, 520 520, 820 370 C 1120 220, 1290 490, 1780 330"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1"
        />
        <path
          d="M-90 450 C 240 350, 560 560, 850 455 C 1140 350, 1330 565, 1790 430"
          stroke="rgba(255,255,255,0.12)"
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
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_38%,rgba(0,0,0,0.0),rgba(0,0,0,0.52)_70%,rgba(0,0,0,0.85))]" />
    </div>
  );
}

/* =========================
   CARD (postcard / modern)
========================= */

function PostcardCard({
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

  // depth without “blurry museum”
  const scale = isActive ? 1 : distance === 1 ? 0.935 : 0.89;
  const opacity = isActive ? 1 : distance === 1 ? 0.78 : 0.58;
  const blur = isActive ? 0 : distance === 1 ? 0.25 : 0.7;
  const rotate = isActive ? 0 : index < activeIndex ? -1.8 : 1.8;
  const lift = isActive ? -2 : 0;

  // tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 160, damping: 18 });
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
        'w-[78%] sm:w-[460px] md:w-[520px]',
        'h-[520px] sm:h-[570px] md:h-[610px]',
        'rounded-[36px]',
        'border border-white/10',
        'shadow-[0_40px_160px_rgba(0,0,0,0.60)]',
        'ring-1 ring-white/[0.05]',
        'bg-white/[0.02]',
        'transition-[transform,opacity,filter] duration-300 ease-out'
      )}
      style={{
        transform: `translateY(${lift}px) scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        filter: `blur(${blur}px)`,
        transformOrigin: 'center',
        perspective: 1200,
      }}
      whileTap={{ scale: Math.max(0.985, scale - 0.02) }}
      aria-label={`${env.title}. ${isActive ? 'Open' : 'Focus'}`}
    >
      {/* 3D wrapper */}
      <motion.div className="absolute inset-0" style={reduceMotion ? undefined : { rotateX: rx, rotateY: ry }}>
        {/* image: shared layout for morph */}
        <motion.div className="absolute inset-0" layoutId={`env-${env.id}-hero`}>
          <Image
            src={heroImg}
            alt={env.title}
            fill
            className="object-cover scale-[1.06]"
            sizes="(max-width: 768px) 78vw, 520px"
            priority={isActive}
          />
        </motion.div>

        {/* warm + ocean tint (commercial, not sci-fi) */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.40) 45%, rgba(0,0,0,0.88)), radial-gradient(900px circle at 18% 18%, ${env.palette.b}2A, transparent 60%), radial-gradient(900px circle at 86% 22%, ${env.palette.a}24, transparent 60%)`,
          }}
        />

        {/* “postcard paper” edge */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-100"
          style={{
            boxShadow:
              'inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 2px rgba(0,0,0,0.25)',
          }}
        />

        {/* specular sweep */}
        <motion.div
          aria-hidden
          className="absolute -inset-x-24 -top-44 h-[260px] rotate-12"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)',
            opacity: isActive ? 0.55 : 0.25,
          }}
          animate={reduceMotion ? undefined : { x: [-140, 320, -140] }}
          transition={{ duration: 7.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* tiny salt/grit */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.18) 1px, transparent 2px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.14) 1px, transparent 2px)',
            backgroundSize: '120px 120px',
          }}
        />
      </motion.div>

      {/* content */}
      <div className="relative h-full px-7 md:px-8 pt-9 pb-8 flex flex-col">
        {/* top row */}
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/10 border border-white/12 backdrop-blur-md">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/90">Vibe</span>
          </div>

          <div className={cn('text-xs text-right transition-opacity', isActive ? 'opacity-100 text-white/75' : 'opacity-0')}>
            {env.subtitle}
          </div>
        </div>

        {/* mid: tags (reveals only when active) */}
        <motion.div
          className="mt-5 flex flex-wrap gap-2"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
          transition={{ duration: 0.28, ease: 'easeOut' }}
        >
          {env.vibeTags.map((t) => (
            <span
              key={t}
              className="text-[11px] px-3 py-1 rounded-full bg-black/35 border border-white/12 text-white/75 backdrop-blur-md"
            >
              {t}
            </span>
          ))}
        </motion.div>

        {/* bottom */}
        <div className="mt-auto space-y-3">
          <div className="text-[30px] md:text-[36px] font-medium tracking-tight leading-[1.02]">
            {env.title}
          </div>

          <div className="text-sm md:text-[15px] text-white/75 leading-[1.6] max-w-[38ch]">
            {env.poetic}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-white/62">
              {isActive ? 'Open this vibe' : 'Focus this vibe'}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/48">{index + 1}/{ENVIRONMENTS.length}</span>
              <span className="h-1.5 w-12 rounded-full bg-white/12 overflow-hidden">
                <span
                  className="block h-full rounded-full"
                  style={{
                    width: `${((index + 1) / ENVIRONMENTS.length) * 100}%`,
                    background: `linear-gradient(90deg, ${env.palette.b}, ${env.palette.a})`,
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

  const [activeIndex, setActiveIndex] = useState(1);
  const [openEnvId, setOpenEnvId] = useState<string | null>(null);

  const openEnv = openEnvId ? ENVIRONMENTS.find((e) => e.id === openEnvId) : null;

  // global cursor spotlight (very subtle)
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  // active card detection (same standard)
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

  // keyboard (same standard)
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

  const activeEnv = ENVIRONMENTS[activeIndex];

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(1000px circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.07), transparent 60%), #05070B',
      }}
    >
      <CoastalBackground />

      {/* TOP BAR (commercial, travel brand) */}
      <header className="relative z-20 px-5 md:px-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.06] backdrop-blur-md flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.55)]">
              <Sparkles className="h-5 w-5 text-white/85" />
            </div>
            <div className="leading-tight">
              <div className="text-sm md:text-base font-medium tracking-tight">ETHOS</div>
              <div className="text-[11px] md:text-xs text-white/55">travel your inner universe</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md text-white/80 hover:bg-white/[0.08] transition text-sm">
              Sign in
            </button>
            <button className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition text-sm">
              Get started
            </button>
          </div>
        </div>
      </header>

      {/* HERO + “travel tools” strip */}
      <section className="relative z-10 px-5 md:px-8 pt-10 md:pt-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-end">
          <div>
            <motion.h1
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-[34px] md:text-[52px] font-medium tracking-tight leading-[1.04]"
            >
              Find places that feel like you.
            </motion.h1>
            <motion.p
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: 'easeOut' }}
              className="mt-3 text-white/72 text-sm md:text-base leading-[1.7] max-w-2xl"
            >
              Not every space is meant for your nervous system.
              <span className="text-white/55"> Choose a vibe — we’ll guide you to travel, cafés, and experiences that match your rhythm.</span>
            </motion.p>

            {/* tool chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full bg-white/10 border border-white/12 backdrop-blur-md text-white/80">
                <Waves className="h-4 w-4 text-white/75" /> calm + vibrant
              </span>
              <span className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full bg-white/10 border border-white/12 backdrop-blur-md text-white/80">
                <Compass className="h-4 w-4 text-white/75" /> discover your vibe
              </span>
              <span className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full bg-white/10 border border-white/12 backdrop-blur-md text-white/80">
                <SunMedium className="h-4 w-4 text-white/75" /> no hype, just fit
              </span>
            </div>
          </div>

          {/* right: active vibe readout (commercial “now playing” feel) */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: 'easeOut' }}
            className="rounded-3xl border border-white/12 bg-white/[0.05] backdrop-blur-xl p-5 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">selected vibe</div>
            <div className="mt-2 text-lg font-medium tracking-tight">{activeEnv?.title}</div>
            <div className="mt-1 text-sm text-white/70">{activeEnv?.subtitle}</div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${((activeIndex + 1) / ENVIRONMENTS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${activeEnv?.palette.b ?? '#22D3EE'}, ${activeEnv?.palette.a ?? '#FDBA74'})`,
                }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-xs text-white/55">Arrow keys to navigate</div>
              <div className="text-xs text-white/45">Enter to open</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* MAIN: postcard carousel + tide rail */}
      <main className="relative z-10 px-5 md:px-8 pt-10 md:pt-12 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* desktop controls */}
          <div className="hidden md:flex items-center justify-between mb-4">
            <button
              onClick={prev}
              className="h-11 w-11 rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-xl hover:bg-white/[0.09] transition flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.40)]"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4 text-white/80" />
            </button>

            <div className="text-xs text-white/55">
              Swipe to explore • pause where it feels right • click to open
            </div>

            <button
              onClick={next}
              className="h-11 w-11 rounded-full border border-white/12 bg-white/[0.05] backdrop-blur-xl hover:bg-white/[0.09] transition flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.40)]"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4 text-white/80" />
            </button>
          </div>

          {/* tide rail under carousel */}
          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 w-[760px] max-w-[92vw] h-[70px] opacity-70 blur-xl"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(34,211,238,0.18), transparent 72%), radial-gradient(closest-side, rgba(253,186,116,0.12), transparent 72%)',
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute left-0 right-0 top-2 h-[2px] opacity-60"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)',
              }}
            />

            <div
              ref={trackRef}
              className="flex gap-6 md:gap-7 overflow-x-auto pb-7 scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="shrink-0 w-[8vw] md:w-[14vw]" aria-hidden />

              {ENVIRONMENTS.map((env, i) => (
                <PostcardCard
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

              <div className="shrink-0 w-[8vw] md:w-[14vw]" aria-hidden />
            </div>

            {/* modern dots */}
            <div className="mt-2 flex items-center justify-center gap-2">
              {ENVIRONMENTS.map((env, i) => (
                <button
                  key={env.id}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${env.title}`}
                  className={cn(
                    'h-2 rounded-full transition-all border border-white/10 bg-white/10 hover:bg-white/20',
                    i === activeIndex ? 'w-12' : 'w-3'
                  )}
                  style={
                    i === activeIndex
                      ? {
                          background: `linear-gradient(90deg, ${env.palette.b}, ${env.palette.a})`,
                          borderColor: 'rgba(255,255,255,0.16)',
                        }
                      : undefined
                  }
                />
              ))}
            </div>

            <div className="mt-3 text-center text-xs text-white/55 md:hidden">
              Swipe sideways — tap the centered vibe to open.
            </div>
          </div>

          {/* bottom CTA (commercial) */}
          <div className="mt-10 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-white/70">
              Ready to make this personal?
              <span className="text-white/50"> Take the quick quiz to match your rhythm.</span>
            </div>

            <Link href="/quiz">
              <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
                Find my places
              </button>
            </Link>
          </div>
        </div>
      </main>

      {/* MODAL (morph from selected card, modern sheet) */}
      <AnimatePresence mode="wait">
        {openEnv && (
          <motion.div
            className="fixed inset-0 z-[100] p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenEnvId(null)}
          >
            <motion.div
              className="absolute inset-0 bg-black/65 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto max-w-6xl rounded-[36px] overflow-hidden border border-white/12 bg-white/[0.06] shadow-[0_60px_240px_rgba(0,0,0,0.75)] ring-1 ring-white/[0.06]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              {/* hero */}
              <div className="relative h-[320px] md:h-[380px]">
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

                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/28 to-black/08" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="relative p-7 md:p-10">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-white/75">Vibe</div>
                  <div className="mt-2 text-3xl md:text-5xl font-medium tracking-tight">{openEnv.title}</div>
                  <div className="mt-3 text-white/78 max-w-2xl leading-[1.6]">{openEnv.poetic}</div>

                  <div className="mt-4 text-sm text-white/65 max-w-2xl leading-[1.65]">
                    This is where things feel <span className="text-white/90">natural</span>.
                    <span className="text-white/50"> Vibrant, but calm.</span>
                  </div>

                  <div className="mt-7 flex items-center gap-2">
                    <button
                      onClick={() => setOpenEnvId(null)}
                      className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.05] hover:bg-white/[0.10] transition text-white/90 text-sm"
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
                    <div className="text-sm text-white/75">Codes that shape this vibe</div>
                    <div className="text-xs text-white/50 mt-1">
                      Tap a code to step into its world.
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
                          className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.05] shadow-[0_28px_90px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.05]"
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
