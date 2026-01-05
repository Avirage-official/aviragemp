'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  Sparkles,
  Waves,
  SunMedium,
  MapPinned,
  ShoppingBag,
} from 'lucide-react';

/* =========================================================
   CONFIG
========================================================= */

const HERO_BG_SRC = '/images/background/ethos-coastal-hero.webp'; // <-- place file in /public/images/background/
const BRAND_NAME = 'ETHOS';

/* =========================================================
   DATA (keep your IDs/images)
========================================================= */

type Code = {
  id: string;
  name: string;
  tagline: string;
  image: string;
};

const CULTURAL_CODES: Code[] = [
  { id: 'khoisan', name: 'KHOISAN', tagline: 'Instinctive Awareness', image: '/images/codes/KHOISAN-frontpage.jpeg' },
  { id: 'kayori', name: 'KÁYORI', tagline: 'Creative Expression', image: '/images/codes/KAYORI-frontpage.jpeg' },
  { id: 'sahen', name: 'SAHÉN', tagline: 'Solitude & Clarity', image: '/images/codes/SAHEN-frontpage.jpeg' },
  { id: 'enzuka', name: 'ENZUKA', tagline: 'Discipline & Strength', image: '/images/codes/ENZUKA-frontpage.jpeg' },
  { id: 'siyuane', name: 'SIYUANÉ', tagline: 'Generational Balance', image: '/images/codes/SIYUANE-frontpage.jpeg' },
  { id: 'jaejin', name: 'JAEJIN', tagline: 'Quiet Intensity', image: '/images/codes/JAEJIN-frontpage.jpeg' },
  { id: 'namsea', name: 'NAMSÉA', tagline: 'Flow & Adaptation', image: '/images/codes/NAMSEA-frontpage.jpeg' },
  { id: 'shokunin', name: 'SHOKUNIN', tagline: 'Focused Craft', image: '/images/codes/SHOKUNIN-frontpage.jpeg' },
  { id: 'khoruun', name: 'KHORUUN', tagline: 'Freedom & Movement', image: '/images/codes/KHORUUN-frontpage.jpeg' },
  { id: 'lhumir', name: 'LHUMIR', tagline: 'Stillness & Meaning', image: '/images/codes/LHUMIR-frontpage.jpeg' },
  { id: 'yatevar', name: 'YATEVAR', tagline: 'Truth Through Action', image: '/images/codes/YATEVAR-frontpage.jpeg' },
  { id: 'renara', name: 'RÉNARA', tagline: 'Subtle Refinement', image: '/images/codes/RENARA-frontpage.jpeg' },
  { id: 'karayni', name: 'KARAYNI', tagline: 'Belonging & Care', image: '/images/codes/KARAYNI-frontpage.jpeg' },
  { id: 'wohaka', name: 'WÓHAKA', tagline: 'All Life Connected', image: '/images/codes/WOHAKA-frontpage.jpeg' },
  { id: 'tjukari', name: 'TJUKARI', tagline: 'Deep Time Awareness', image: '/images/codes/TJUKARI-frontpage.jpeg' },
  { id: 'kinmora', name: 'KINMORA', tagline: 'Cycles & Rhythm', image: '/images/codes/KINMORA-frontpage.jpeg' },
  { id: 'siljoa', name: 'SILJOA', tagline: 'Cold Clarity', image: '/images/codes/SILJOA-frontpage.jpeg' },
  { id: 'skenari', name: 'SKÉNARI', tagline: 'Future Responsibility', image: '/images/codes/SKENARI-frontpage.jpeg' },
  { id: 'ashkara', name: 'ASHKARA', tagline: 'Integrity in Motion', image: '/images/codes/ASHKARA-frontpage.jpeg' },
  { id: 'alethir', name: 'ALÉTHIR', tagline: 'Inquiry & Ideas', image: '/images/codes/ALETHIR-frontpage.jpeg' },
];

type Environment = {
  id: string;
  title: string;
  subtitle: string;
  poetic: string;
  heroCodeId: string;
  codeIds: string[];
  vibeTags: string[];
  palette: { a: string; b: string; c: string };
};

const ENVIRONMENTS: Environment[] = [
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    subtitle: 'Ocean air • barefoot pace • ease',
    poetic: 'Nothing rushed. Nothing forced. You move when it feels right.',
    heroCodeId: 'namsea',
    codeIds: ['namsea', 'siljoa'],
    vibeTags: ['Surf pace', 'Ease', 'Reset'],
    palette: { a: '#FDE68A', b: '#22D3EE', c: '#0B1220' },
  },
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
    id: 'communal',
    title: 'Shared Meaning',
    subtitle: 'Belonging • ritual • warmth',
    poetic: 'Long tables. Familiar faces. Life makes sense together.',
    heroCodeId: 'karayni',
    codeIds: ['karayni', 'wohaka', 'skenari'],
    vibeTags: ['Warmth', 'Ritual', 'Together'],
    palette: { a: '#FDBA74', b: '#A78BFA', c: '#0B1220' },
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    subtitle: 'Quiet • clarity • space to think',
    poetic: 'Less noise. More meaning. Silence that clears your head.',
    heroCodeId: 'lhumir',
    codeIds: ['lhumir'],
    vibeTags: ['Still', 'Perspective', 'Clean air'],
    palette: { a: '#A7F3D0', b: '#60A5FA', c: '#0B1220' },
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    subtitle: 'Open land • freedom • instinct',
    poetic: 'Paths appear as you walk them.',
    heroCodeId: 'khoisan',
    codeIds: ['khoisan', 'khoruun', 'tjukari'],
    vibeTags: ['Explore', 'Freedom', 'Instinct'],
    palette: { a: '#FCA5A5', b: '#34D399', c: '#0B1220' },
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    subtitle: 'Ideas • honesty • structure',
    poetic: 'Ask better questions. Live by clearer answers.',
    heroCodeId: 'alethir',
    codeIds: ['alethir', 'yatevar', 'ashkara'],
    vibeTags: ['Inquiry', 'Direction', 'Grounded'],
    palette: { a: '#FDE68A', b: '#93C5FD', c: '#0B1220' },
  },
];

/* =========================================================
   HELPERS
========================================================= */

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

/* =========================================================
   BACKGROUND: PHOTO + CALM VIBRANT GRADING
========================================================= */

function HeroPhotoBackground({ accentA, accentB }: { accentA: string; accentB: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Image
        src={HERO_BG_SRC}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* bright + calm color grading (ocean + sun) */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(1200px circle at 18% 22%, ${accentB}33, transparent 58%),
            radial-gradient(1000px circle at 82% 16%, ${accentA}2E, transparent 56%),
            linear-gradient(180deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.28) 35%, rgba(0,0,0,0.62) 100%)
          `,
        }}
      />

      {/* gentle “tide line” */}
      <motion.svg
        className="absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2 opacity-[0.20]"
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
          d="M-90 380 C 260 280, 520 520, 820 370 C 1120 220, 1290 490, 1780 330"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="1"
        />
        <path
          d="M-100 450 C 240 350, 560 560, 850 455 C 1140 350, 1330 565, 1790 430"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      </motion.svg>

      {/* film grain */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
        }}
      />

      {/* vignette for readability */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_30%,rgba(0,0,0,0.00),rgba(0,0,0,0.35)_65%,rgba(0,0,0,0.70))]" />
    </div>
  );
}

/* =========================================================
   CARD: COMPLEX, MODERN, POSTCARD-LIKE
========================================================= */

function PostcardCard({
  env,
  index,
  activeIndex,
  registerRef,
  scrollToIndex,
  open,
}: {
  env: Environment;
  index: number;
  activeIndex: number;
  registerRef: (el: HTMLButtonElement | null) => void;
  scrollToIndex: (i: number) => void;
  open: (id: string) => void;
}) {
  const isActive = index === activeIndex;
  const distance = Math.abs(index - activeIndex);

  const scale = isActive ? 1 : distance === 1 ? 0.94 : 0.90;
  const opacity = isActive ? 1 : distance === 1 ? 0.78 : 0.58;
  const blur = isActive ? 0 : distance === 1 ? 0.2 : 0.65;
  const rotate = isActive ? 0 : index < activeIndex ? -1.6 : 1.6;

  return (
    <motion.button
      ref={registerRef}
      type="button"
      onClick={() => (isActive ? open(env.id) : scrollToIndex(index))}
      className={cn(
        'snap-center shrink-0 outline-none text-left relative overflow-hidden',
        'w-[78%] sm:w-[460px] md:w-[520px]',
        'h-[520px] sm:h-[570px] md:h-[610px]',
        'rounded-[36px]',
        'border border-white/18',
        'bg-white/10 backdrop-blur-xl',
        'shadow-[0_30px_140px_rgba(0,0,0,0.45)]',
        'ring-1 ring-white/10',
        'transition-[transform,opacity,filter] duration-300 ease-out'
      )}
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        opacity,
        filter: `blur(${blur}px)`,
      }}
      whileTap={{ scale: Math.max(0.985, scale - 0.02) }}
      aria-label={`${env.title}. ${isActive ? 'Open' : 'Focus'}`}
    >
      {/* gradient aura */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(900px circle at 18% 20%, ${env.palette.b}30, transparent 58%),
            radial-gradient(900px circle at 82% 18%, ${env.palette.a}28, transparent 58%),
            linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.02) 40%, rgba(0,0,0,0.35))
          `,
        }}
      />

      {/* “paper edge” */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 0 2px rgba(0,0,0,0.15)',
        }}
      />

      {/* content */}
      <div className="relative h-full px-7 md:px-8 pt-9 pb-8 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-white/15 border border-white/18 backdrop-blur-md">
            <span className="text-[11px] uppercase tracking-[0.22em] text-white/90">Vibe</span>
          </div>

          <div className={cn('text-xs text-right transition-opacity', isActive ? 'opacity-100 text-white/85' : 'opacity-0')}>
            {env.subtitle}
          </div>
        </div>

        <motion.div
          className="mt-5 flex flex-wrap gap-2"
          initial={false}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {env.vibeTags.map((t) => (
            <span key={t} className="text-[11px] px-3 py-1 rounded-full bg-black/25 border border-white/16 text-white/85 backdrop-blur-md">
              {t}
            </span>
          ))}
        </motion.div>

        <div className="mt-auto space-y-3">
          <div className="text-[30px] md:text-[36px] font-medium tracking-tight leading-[1.02] text-white">
            {env.title}
          </div>

          <div className="text-sm md:text-[15px] text-white/85 leading-[1.6] max-w-[38ch]">
            {env.poetic}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="text-xs text-white/80">
              {isActive ? 'Open this vibe' : 'Focus this vibe'}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/70">{index + 1}/{ENVIRONMENTS.length}</span>
              <span className="h-1.5 w-12 rounded-full bg-white/20 overflow-hidden">
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

/* =========================================================
   MARKETPLACE PREVIEW: FUN BUT PROFESSIONAL
========================================================= */

type MarketPreview = {
  title: string;
  location: string;
  price: string;
  vibe: string;
};

const MARKET_PREVIEW: MarketPreview[] = [
  { title: 'Sunrise Surf Reset', location: 'Coastal • 2 hrs', price: 'from $39', vibe: 'calm + bright' },
  { title: 'Golden Hour Café Crawl', location: 'City • 1 evening', price: 'from $22', vibe: 'warm + social' },
  { title: 'Quiet Altitude Day', location: 'Hills • full day', price: 'from $55', vibe: 'clear + grounded' },
];

/* =========================================================
   PAGE
========================================================= */

export default function LandingPage() {
  const reduceMotion = useReducedMotion();
  const codeMap = useCodeMap();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [openEnvId, setOpenEnvId] = useState<string | null>(null);

  const openEnv = openEnvId ? ENVIRONMENTS.find((e) => e.id === openEnvId) : null;
  const activeEnv = ENVIRONMENTS[activeIndex] ?? ENVIRONMENTS[0];

  // cursor spotlight: very subtle (keeps “premium” feel)
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

  // keyboard navigation
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

  // featured codes for landing (fast entry)
  const featuredCodes = useMemo(() => CULTURAL_CODES.slice(0, 6), []);

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background: `radial-gradient(900px circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.06), transparent 60%), #000`,
      }}
    >
      <HeroPhotoBackground accentA={activeEnv.palette.a} accentB={activeEnv.palette.b} />

      {/* TOP BAR */}
      <header className="relative z-20 px-5 md:px-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full border border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.35)]">
              <Sparkles className="h-5 w-5 text-white/90" />
            </div>
            <div className="leading-tight">
              <div className="text-sm md:text-base font-medium tracking-tight">{BRAND_NAME}</div>
              <div className="text-[11px] md:text-xs text-white/75">bright • calm • personal travel</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white/90 hover:bg-white/15 transition text-sm">
              Sign in
            </button>
            <Link href="/quiz">
              <button className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition text-sm shadow-[0_18px_70px_rgba(0,0,0,0.25)]">
                Get started
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative z-10 px-5 md:px-8 pt-10 md:pt-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1.25fr_0.75fr] gap-8 items-end">
          <div>
            <motion.h1
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="text-[34px] md:text-[56px] font-medium tracking-tight leading-[1.04]"
            >
              Find places that feel like you.
            </motion.h1>

            <motion.p
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.05, ease: 'easeOut' }}
              className="mt-3 text-white/90 text-sm md:text-base leading-[1.7] max-w-2xl"
            >
              Ethos helps you choose travel, spaces, and experiences that match your rhythm —
              <span className="text-white/75"> vibrant but calm, fun but professional.</span>
            </motion.p>

            {/* Primary CTAs (3 clear options) */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/quiz">
                <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition shadow-[0_18px_70px_rgba(0,0,0,0.25)] inline-flex items-center gap-2">
                  <Compass className="h-4 w-4" />
                  Take the quiz
                </button>
              </Link>

              <a href="#explore-codes">
                <button className="px-5 py-2.5 rounded-full border border-white/22 bg-white/10 backdrop-blur-md text-white/95 hover:bg-white/15 transition inline-flex items-center gap-2">
                  <Waves className="h-4 w-4" />
                  Explore codes
                </button>
              </a>

              <a href="#marketplace-preview">
                <button className="px-5 py-2.5 rounded-full border border-white/22 bg-white/10 backdrop-blur-md text-white/95 hover:bg-white/15 transition inline-flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4" />
                  See marketplace
                </button>
              </a>
            </div>

            {/* Tone chips */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full bg-white/10 border border-white/18 backdrop-blur-md text-white/90">
                <SunMedium className="h-4 w-4 text-white/85" /> bright + relaxing
              </span>
              <span className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full bg-white/10 border border-white/18 backdrop-blur-md text-white/90">
                <MapPinned className="h-4 w-4 text-white/85" /> travel + local discovery
              </span>
              <span className="inline-flex items-center gap-2 text-[12px] px-3 py-2 rounded-full bg-white/10 border border-white/18 backdrop-blur-md text-white/90">
                <Waves className="h-4 w-4 text-white/85" /> calm, not hype
              </span>
            </div>
          </div>

          {/* Right: Selected vibe widget */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: 'easeOut' }}
            className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 shadow-[0_30px_120px_rgba(0,0,0,0.35)]"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-white/75">selected vibe</div>
            <div className="mt-2 text-lg font-medium tracking-tight">{activeEnv.title}</div>
            <div className="mt-1 text-sm text-white/85">{activeEnv.subtitle}</div>

            <div className="mt-4 flex flex-wrap gap-2">
              {activeEnv.vibeTags.map((t) => (
                <span key={t} className="text-[11px] px-3 py-1 rounded-full bg-black/20 border border-white/16 text-white/90 backdrop-blur-md">
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-4 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${((activeIndex + 1) / ENVIRONMENTS.length) * 100}%`,
                  background: `linear-gradient(90deg, ${activeEnv.palette.b}, ${activeEnv.palette.a})`,
                }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-white/75">
              <span>Arrow keys to navigate</span>
              <span>Enter to open</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CAROUSEL */}
      <main className="relative z-10 px-5 md:px-8 pt-10 md:pt-12 pb-10">
        <div className="max-w-6xl mx-auto">
          <div className="hidden md:flex items-center justify-between mb-4">
            <button
              onClick={prev}
              className="h-11 w-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.25)]"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4 text-white/90" />
            </button>

            <div className="text-xs text-white/80">
              Swipe to explore • pause where it feels right • click centered card to open
            </div>

            <button
              onClick={next}
              className="h-11 w-11 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl hover:bg-white/15 transition flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.25)]"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4 text-white/90" />
            </button>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-6 w-[760px] max-w-[92vw] h-[70px] opacity-70 blur-xl"
              style={{
                background: `radial-gradient(closest-side, ${activeEnv.palette.b}1E, transparent 72%), radial-gradient(closest-side, ${activeEnv.palette.a}18, transparent 72%)`,
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
                  registerRef={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  scrollToIndex={scrollToIndex}
                  open={(id) => setOpenEnvId(id)}
                />
              ))}

              <div className="shrink-0 w-[8vw] md:w-[14vw]" aria-hidden />
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              {ENVIRONMENTS.map((env, i) => (
                <button
                  key={env.id}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${env.title}`}
                  className={cn(
                    'h-2 rounded-full transition-all border border-white/16 bg-white/12 hover:bg-white/20',
                    i === activeIndex ? 'w-12' : 'w-3'
                  )}
                  style={
                    i === activeIndex
                      ? { background: `linear-gradient(90deg, ${env.palette.b}, ${env.palette.a})` }
                      : undefined
                  }
                />
              ))}
            </div>

            <div className="mt-3 text-center text-xs text-white/80 md:hidden">
              Swipe sideways — tap the centered vibe to open.
            </div>
          </div>
        </div>
      </main>

      {/* EXPLORE CODES */}
      <section id="explore-codes" className="relative z-10 px-5 md:px-8 pb-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/80">Explore</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white">
                Cultural codes
              </h2>
              <p className="mt-2 text-white/85 max-w-2xl leading-[1.6] text-sm md:text-base">
                Tap a code to see its meaning, its vibe, and how it shows up in real places.
              </p>
            </div>

            <Link href="/explore/alethir" className="text-sm text-white/90 hover:text-white transition">
              View all →
            </Link>
          </div>

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredCodes.map((c) => (
              <Link key={c.id} href={`/explore/${c.id}`}>
                <motion.div
                  whileHover={reduceMotion ? undefined : { y: -6 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative h-[190px]">
                    <Image
                      src={c.image}
                      alt={c.name}
                      fill
                      className="object-cover opacity-[0.95] group-hover:scale-[1.06] transition-transform duration-700"
                      sizes="(max-width: 768px) 90vw, 420px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  </div>

                  <div className="p-5">
                    <div className="text-base font-medium tracking-tight text-white">{c.name}</div>
                    <div className="text-xs text-white/85 mt-1 leading-[1.5]">{c.tagline}</div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MARKETPLACE PREVIEW */}
      <section id="marketplace-preview" className="relative z-10 px-5 md:px-8 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[11px] uppercase tracking-[0.22em] text-white/80">Marketplace preview</div>
              <h2 className="mt-2 text-2xl md:text-3xl font-medium tracking-tight text-white">
                Fun experiences, curated by vibe
              </h2>
              <p className="mt-2 text-white/85 max-w-2xl leading-[1.6] text-sm md:text-base">
                This is what the Ethos marketplace feels like — bright, relaxing, and aligned.
              </p>
            </div>

            <Link href="/marketplace" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition shadow-[0_18px_70px_rgba(0,0,0,0.20)]">
              <ShoppingBag className="h-4 w-4" />
              View marketplace
            </Link>
          </div>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {MARKET_PREVIEW.map((m) => (
              <motion.div
                key={m.title}
                whileHover={reduceMotion ? undefined : { y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_24px_90px_rgba(0,0,0,0.25)] p-5"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-white">{m.title}</div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-black/20 border border-white/16 text-white/85">
                    {m.vibe}
                  </span>
                </div>

                <div className="mt-3 text-sm text-white/85 flex items-center gap-2">
                  <MapPinned className="h-4 w-4 text-white/75" />
                  {m.location}
                </div>

                <div className="mt-3 text-white/90 text-sm">
                  <span className="font-semibold text-white">{m.price}</span>
                  <span className="text-white/75"> • curated picks</span>
                </div>

                <div className="mt-4 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: '78%',
                      background: `linear-gradient(90deg, ${activeEnv.palette.b}, ${activeEnv.palette.a})`,
                    }}
                  />
                </div>

                <div className="mt-4 text-xs text-white/80">
                  Preview only — full experience inside the marketplace.
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-between flex-wrap gap-3">
            <div className="text-sm text-white/85">
              Want it personalised?
              <span className="text-white/75"> Take the quiz and we’ll match your rhythm.</span>
            </div>

            <Link href="/quiz">
              <button className="px-5 py-2.5 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition shadow-[0_18px_70px_rgba(0,0,0,0.20)] inline-flex items-center gap-2">
                <Compass className="h-4 w-4" />
                Take the quiz
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* MODAL (Codes inside Vibe) */}
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
              className="absolute inset-0 bg-black/50 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              onClick={(e) => e.stopPropagation()}
              className="relative mx-auto max-w-6xl rounded-[36px] overflow-hidden border border-white/22 bg-white/12 backdrop-blur-2xl shadow-[0_60px_240px_rgba(0,0,0,0.55)]"
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            >
              <div className="relative p-7 md:p-10">
                <div className="text-[11px] uppercase tracking-[0.22em] text-white/85">Vibe</div>
                <div className="mt-2 text-3xl md:text-5xl font-medium tracking-tight text-white">{openEnv.title}</div>
                <div className="mt-3 text-white/90 max-w-2xl leading-[1.6]">{openEnv.poetic}</div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {openEnv.vibeTags.map((t) => (
                    <span key={t} className="text-[11px] px-3 py-1 rounded-full bg-black/20 border border-white/16 text-white/90 backdrop-blur-md">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center gap-2">
                  <button
                    onClick={() => setOpenEnvId(null)}
                    className="px-4 py-2 rounded-full border border-white/22 bg-white/10 hover:bg-white/15 transition text-white/95 text-sm"
                  >
                    Close
                  </button>

                  <Link href="/quiz">
                    <button className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition">
                      Take the quiz
                    </button>
                  </Link>
                </div>
              </div>

              <div className="px-7 md:px-10 pb-8">
                <div className="text-sm text-white/90 mb-4">Codes that shape this vibe</div>

                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {openEnv.codeIds.map((id) => {
                    const c = codeMap.get(id);
                    if (!c) return null;

                    return (
                      <Link key={c.id} href={`/explore/${c.id}`} className="snap-center shrink-0 w-[78%] sm:w-[360px]">
                        <motion.div
                          whileHover={reduceMotion ? undefined : { y: -6 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                          className="group relative overflow-hidden rounded-3xl border border-white/22 bg-white/10 backdrop-blur-xl shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
                        >
                          <div className="relative h-[210px]">
                            <Image
                              src={c.image}
                              alt={c.name}
                              fill
                              className="object-cover opacity-[0.95] group-hover:scale-[1.07] transition-transform duration-700"
                              sizes="(max-width: 768px) 78vw, 360px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                          </div>

                          <div className="p-5">
                            <div className="text-base font-medium tracking-tight text-white">{c.name}</div>
                            <div className="text-xs text-white/85 mt-1 leading-[1.5]">{c.tagline}</div>
                          </div>
                        </motion.div>
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-2 text-xs text-white/80">Swipe sideways to browse.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
