'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

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
    poetic: 'Calm movement. Quiet power.',
    heroCodeId: 'namsea',
    codeIds: ['namsea', 'siljoa'],
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    subtitle: 'Mountains / stillness / meaning',
    poetic: 'Silence as clarity.',
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
    poetic: 'Identity as relationship.',
    heroCodeId: 'karayni',
    codeIds: ['karayni', 'wohaka', 'skenari'],
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    subtitle: 'Agora / law / inquiry',
    poetic: 'Seek what is real — live by it.',
    heroCodeId: 'alethir',
    codeIds: ['alethir', 'yatevar', 'ashkara'],
  },
];

/* =========================
   Helpers
========================= */

function useCodeMap() {
  return useMemo(() => {
    const m = new Map<string, Code>();
    for (const c of CULTURAL_CODES) m.set(c.id, c);
    return m;
  }, []);
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function WaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* calm glow (constant) */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_18%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(1200px_circle_at_20%_80%,rgba(168,85,247,0.10),transparent_60%),radial-gradient(1200px_circle_at_85%_70%,rgba(59,130,246,0.08),transparent_60%)]" />

      {/* slow wave (constant, not tied to slider) */}
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
        width="1400"
        height="900"
        viewBox="0 0 1400 900"
        fill="none"
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M-50 520 C 200 430, 420 640, 700 520 C 980 400, 1120 610, 1450 500"
          stroke="rgba(255,255,255,0.34)"
          strokeWidth="1"
        />
        <path
          d="M-70 585 C 190 485, 430 710, 700 590 C 980 470, 1140 690, 1470 560"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1"
        />
        <path
          d="M-90 455 C 210 380, 410 570, 700 450 C 990 330, 1110 560, 1490 430"
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1"
        />
      </motion.svg>

      {/* gentlemanly grain */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/18 via-black/35 to-black" />
    </div>
  );
}

/* =========================
   Page
========================= */

export default function LandingPage() {
  const codeMap = useCodeMap();

  const rootRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [activeIndex, setActiveIndex] = useState(2); // start centered nicely
  const [openEnvId, setOpenEnvId] = useState<string | null>(null);

  const openEnv = openEnvId ? ENVIRONMENTS.find((e) => e.id === openEnvId) : null;

  // Subtle spotlight on cards only (optional, feels “alive” but still minimalist)
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  // Snap-to-center + keep activeIndex in sync while user scrolls/swipes
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
    // initial
    computeActive();

    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener('scroll', onScroll as any);
    };
  }, []);

  const scrollToIndex = (i: number) => {
    const track = trackRef.current;
    const el = cardRefs.current[i];
    if (!track || !el) return;
    el.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  };

  const prev = () => scrollToIndex(Math.max(0, activeIndex - 1));
  const next = () => scrollToIndex(Math.min(ENVIRONMENTS.length - 1, activeIndex + 1));

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      className="relative min-h-screen bg-[#070710] text-white overflow-hidden"
    >
      <WaveBackground />

      {/* Corner UI (minimal, quiet) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* top-left brand */}
        <div className="absolute left-5 top-5 md:left-8 md:top-7 pointer-events-auto">
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="h-6 w-6 text-purple-300" />
            <span className="text-sm md:text-base font-semibold tracking-tight">AVIRAGE</span>
          </div>
        </div>

        {/* top-right auth */}
        <div className="absolute right-5 top-5 md:right-8 md:top-7 flex items-center gap-2 pointer-events-auto">
          <button className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.02] backdrop-blur-md text-white/80 hover:bg-white/[0.05] transition text-sm">
            Sign in
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition text-sm">
            Get started
          </button>
        </div>

        {/* bottom-left microcopy */}
        <div className="absolute left-5 bottom-6 md:left-8 md:bottom-8 max-w-[260px] md:max-w-[360px] pointer-events-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">Choose a lens</div>
          <div className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
            Curiosity-first.
            <span className="text-white/55"> Explore how different minds interpret the same world.</span>
          </div>
        </div>

        {/* bottom-right CTA */}
        <div className="absolute right-5 bottom-6 md:right-8 md:bottom-8 pointer-events-auto">
          <Link href="/quiz">
            <button className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.02] backdrop-blur-md text-white/80 hover:bg-white/[0.05] transition text-sm">
              Find my code
            </button>
          </Link>
        </div>
      </div>

      {/* Center Stage */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* Tiny top hint (centered) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-4 md:mb-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 text-white/70">
              <span className="text-[11px] uppercase tracking-[0.22em]">Swipe to choose • Click to enter</span>
            </div>
          </motion.div>

          {/* Slider controls (desktop) */}
          <div className="hidden md:flex items-center justify-between mb-3 px-2">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4 text-white/80" />
            </button>

            <div className="text-xs text-white/50">
              {ENVIRONMENTS[activeIndex]?.title}
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4 text-white/80" />
            </button>
          </div>

          {/* Track */}
          <div className="relative">
            {/* edge fades */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/55 to-transparent z-10" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/55 to-transparent z-10" />

            <div
              ref={trackRef}
              className="flex gap-5 md:gap-6 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {/* spacer to allow first card to center */}
              <div className="shrink-0 w-[8vw] md:w-[12vw]" aria-hidden />

              {ENVIRONMENTS.map((env, i) => {
                const hero = codeMap.get(env.heroCodeId);
                const heroImg = hero?.image ?? '/images/codes/ALETHIR-frontpage.jpeg';

                const isActive = i === activeIndex;
                const distance = Math.abs(i - activeIndex);

                // Side cards feel peripheral (like your reference)
                const scale = isActive ? 1 : distance === 1 ? 0.92 : 0.86;
                const opacity = isActive ? 1 : distance === 1 ? 0.72 : 0.55;
                const blurPx = isActive ? 0 : distance === 1 ? 0.8 : 1.6;

                return (
                  <motion.button
                    key={env.id}
                    ref={(el) => {
                      cardRefs.current[i] = el;
                    }}
                    type="button"
                    onClick={() => {
                      if (isActive) setOpenEnvId(env.id);
                      else scrollToIndex(i);
                    }}
                    className="snap-center shrink-0 w-[84%] sm:w-[520px] md:w-[560px] h-[420px] sm:h-[460px] rounded-[34px] overflow-hidden border border-white/12 bg-white/[0.03] shadow-[0_22px_90px_rgba(0,0,0,0.60)] text-left relative outline-none"
                    style={{
                      transform: `scale(${scale})`,
                      opacity,
                      filter: `blur(${blurPx}px)`,
                      transition: 'transform 320ms ease, opacity 320ms ease, filter 320ms ease',
                    }}
                    whileTap={{ scale: Math.max(0.98, scale - 0.02) }}
                  >
                    {/* image */}
                    <div className="absolute inset-0">
                      <Image
                        src={heroImg}
                        alt={env.title}
                        fill
                        className="object-cover scale-[1.06]"
                        sizes="(max-width: 768px) 84vw, 560px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                    </div>

                    {/* quiet hairline grid */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.13]"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                      }}
                    />

                    {/* subtle spotlight only on hover (cards feel alive, background stays constant) */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          'radial-gradient(520px circle at var(--mx, 50%) var(--my, 40%), rgba(255,255,255,0.16), transparent 62%)',
                      }}
                    />

                    {/* content */}
                    <div className="relative h-full p-7 md:p-8 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/35 border border-white/12 backdrop-blur-md">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">Environment</span>
                        </div>

                        {/* Only show subtitle clearly on active card */}
                        <div className={isActive ? 'text-xs text-white/55' : 'text-xs text-white/0'}>
                          {env.subtitle}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-2xl md:text-3xl font-semibold tracking-tight">{env.title}</div>
                        <div className="text-sm md:text-base text-white/75 max-w-[54ch]">{env.poetic}</div>

                        <div className="pt-2 text-xs text-white/55">
                          {isActive ? 'Click to reveal codes' : 'Click to focus'}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              {/* spacer to allow last card to center */}
              <div className="shrink-0 w-[8vw] md:w-[12vw]" aria-hidden />
            </div>

            <div className="mt-2 text-center text-xs text-white/50 md:hidden">
              Swipe sideways — the center card is the selection.
            </div>
          </div>
        </div>
      </main>

      {/* Modal: environment -> codes (still minimal) */}
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
              initial={{ opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-6xl rounded-[34px] overflow-hidden border border-white/12 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            >
              <div className="relative p-7 md:p-10">
                <div className="absolute inset-0">
                  <Image
                    src={(codeMap.get(openEnv.heroCodeId)?.image) ?? '/images/codes/ALETHIR-frontpage.jpeg'}
                    alt={openEnv.title}
                    fill
                    className="object-cover opacity-[0.22]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/15" />
                </div>

                <div className="relative">
                  <div className="text-xs uppercase tracking-[0.22em] text-white/70">Environment</div>
                  <div className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">{openEnv.title}</div>
                  <div className="mt-2 text-white/70 max-w-2xl">{openEnv.poetic}</div>

                  <div className="mt-6 flex items-center gap-2">
                    <button
                      onClick={() => setOpenEnvId(null)}
                      className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.03] hover:bg-white/[0.06] transition text-white/85 text-sm"
                    >
                      Close
                    </button>
                    <Link href="/quiz">
                      <button className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm">
                        Find my code
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-7 md:p-10 pt-0">
                <div className="text-sm text-white/65 mb-4">Codes in this space</div>

                {/* Horizontal code cards (consistent with template) */}
                <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {openEnv.codeIds.map((id) => {
                    const c = codeMap.get(id);
                    if (!c) return null;

                    return (
                      <Link key={c.id} href={`/explore/${c.id}`} className="snap-center shrink-0 w-[78%] sm:w-[340px]">
                        <motion.div
                          whileHover={{ y: -4 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          className="group relative overflow-hidden rounded-2xl border border-white/12 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)]"
                        >
                          <div className="relative h-[180px]">
                            <Image
                              src={c.image}
                              alt={c.name}
                              fill
                              className="object-cover opacity-[0.92] group-hover:scale-[1.06] transition-transform duration-700"
                              sizes="(max-width: 768px) 78vw, 340px"
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

                <div className="mt-2 text-xs text-white/55">Swipe sideways to browse.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
