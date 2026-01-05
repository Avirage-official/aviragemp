'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
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
   BACKGROUND (constant, travel-calm)
========================= */

function ConstantBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ocean-night ambient + warm sunrise accents (still calm) */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_18%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(1100px_circle_at_18%_82%,rgba(56,189,248,0.10),transparent_60%),radial-gradient(1100px_circle_at_88%_70%,rgba(251,146,60,0.08),transparent_60%)]" />

      {/* slow wave lines */}
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
        width="1400"
        height="900"
        viewBox="0 0 1400 900"
        fill="none"
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path d="M-50 520 C 200 430, 420 640, 700 520 C 980 400, 1120 610, 1450 500" stroke="rgba(255,255,255,0.30)" strokeWidth="1" />
        <path d="M-70 585 C 190 485, 430 710, 700 590 C 980 470, 1140 690, 1470 560" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <path d="M-90 455 C 210 380, 410 570, 700 450 C 990 330, 1110 560, 1490 430" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      </motion.svg>

      {/* grain */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/14 via-black/35 to-black" />
    </div>
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

  // spotlight tracks cursor
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
      className="relative min-h-screen bg-[#070710] text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(700px circle at var(--mx, 50%) var(--my, 35%), rgba(255,255,255,0.05), transparent 55%), #070710',
      }}
    >
      <ConstantBackground />

      {/* CORNER UI */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {/* top-left brand */}
        <div className="absolute left-5 top-5 md:left-8 md:top-7 pointer-events-auto">
          <div className="flex items-center gap-3 text-white/90">
            <div className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.04] backdrop-blur-md flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.06]">
              <Sparkles className="h-5 w-5 text-white/85" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm md:text-base font-medium tracking-tight">ETHOS</span>
              <span className="text-[11px] md:text-xs text-white/55 tracking-tight mt-0.5">Your personal universe</span>
            </div>
          </div>
        </div>

        {/* top-right */}
        <div className="absolute right-5 top-5 md:right-8 md:top-7 flex items-center gap-2 pointer-events-auto">
          <button className="px-4 py-2 rounded-full border border-white/12 bg-white/[0.02] backdrop-blur-md text-white/78 hover:bg-white/[0.05] transition text-sm">
            Sign in
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition text-sm">
            Get started
          </button>
        </div>

        {/* bottom-left microcopy */}
        <div className="absolute left-5 bottom-6 md:left-8 md:bottom-8 max-w-[280px] md:max-w-[420px] pointer-events-auto">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/50">A simple truth</div>
          <div className="mt-2 text-sm md:text-base text-white/78 leading-[1.55]">
            Some places energize you. Some places drain you.
            <span className="text-white/52"> Ethos helps you find what fits — calm, not hype.</span>
          </div>
        </div>

        {/* bottom-right CTA */}
        <div className="absolute right-5 bottom-6 md:right-8 md:bottom-8 pointer-events-auto">
          <Link href="/quiz">
            <button className="px-4 py-2 rounded-full border border-white/12 bg-white/[0.02] backdrop-blur-md text-white/78 hover:bg-white/[0.05] transition text-sm">
              Find my places
            </button>
          </Link>
        </div>
      </div>

      {/* CENTER STAGE */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* Hero copy (adds commercial clarity, keeps vibe) */}
          <motion.div
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-4 md:mb-6"
          >
            <div className="inline-flex flex-col items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 text-white/70">
                <span className="text-[11px] uppercase tracking-[0.22em]">Swipe to choose • Enter to open</span>
              </div>

              <div className="mt-3 md:mt-4 max-w-2xl">
                <div className="text-2xl md:text-3xl font-medium tracking-tight leading-[1.12]">
                  Not every place is meant for you.
                </div>
                <div className="mt-2 text-sm md:text-base text-white/70 leading-[1.6]">
                  Travel, cafés, environments, experiences — filtered by how you naturally live.
                  <span className="text-white/55"> Less forcing. More flow.</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* desktop controls */}
          <div className="hidden md:flex items-center justify-between mb-3 px-2">
            <button
              onClick={prev}
              className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4 text-white/80" />
            </button>

            <div className="text-xs text-white/55">
              {ENVIRONMENTS[activeIndex]?.title} <span className="text-white/35">•</span>{' '}
              <span className="text-white/40">pause where it feels right</span>
            </div>

            <button
              onClick={next}
              className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4 text-white/80" />
            </button>
          </div>

          {/* slider */}
          <div className="relative">
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/55 to-transparent z-10" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/55 to-transparent z-10" />

            {/* shelf shadow */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-[74%] md:top-[78%] w-[460px] md:w-[520px] h-[130px] blur-2xl opacity-70"
              style={{ background: 'radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 72%)' }}
            />

            <div
              ref={trackRef}
              className="flex gap-5 md:gap-6 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              <div className="shrink-0 w-[10vw] md:w-[14vw]" aria-hidden />

              {ENVIRONMENTS.map((env, i) => {
                const hero = codeMap.get(env.heroCodeId);
                const heroImg = hero?.image ?? '/images/codes/ALETHIR-frontpage.jpeg';

                const isActive = i === activeIndex;
                const distance = Math.abs(i - activeIndex);

                // Less blur than original (more premium clarity), still depth
                const scale = isActive ? 1 : distance === 1 ? 0.93 : 0.88;
                const opacity = isActive ? 1 : distance === 1 ? 0.72 : 0.54;
                const blur = isActive ? 0 : distance === 1 ? 0.4 : 1.0;

                const rotate = isActive ? 0 : i < activeIndex ? -2.0 : 2.0;

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
                    className={cn(
                      'snap-center shrink-0 outline-none text-left relative overflow-hidden',
                      'w-[72%] sm:w-[420px] md:w-[440px]',
                      'h-[520px] sm:h-[560px] md:h-[600px]',
                      'rounded-[40px]',
                      'bg-white/[0.03] backdrop-blur-md',
                      'border border-white/12',
                      'shadow-[0_30px_120px_rgba(0,0,0,0.55)]',
                      'ring-1 ring-white/[0.06]',
                      'transition-[transform,opacity,filter] duration-300 ease-out'
                    )}
                    style={{
                      transform: `scale(${scale}) rotate(${rotate}deg)`,
                      opacity,
                      filter: `blur(${blur}px)`,
                    }}
                    whileTap={{ scale: Math.max(0.98, scale - 0.02) }}
                    aria-label={`${env.title}. ${isActive ? 'Open details' : 'Focus this card'}`}
                  >
                    <div className="absolute inset-0">
                      <Image src={heroImg} alt={env.title} fill className="object-cover scale-[1.06]" sizes="(max-width: 768px) 72vw, 440px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/28 to-black/08" />
                    </div>

                    {/* subtle grid */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.10]"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                      }}
                    />

                    {/* rim highlight (warm when active, calm when not) */}
                    <div
                      aria-hidden
                      className="absolute inset-0"
                      style={{
                        background: isActive
                          ? 'radial-gradient(900px circle at 22% 12%, rgba(251,146,60,0.18), transparent 62%), radial-gradient(900px circle at 85% 18%, rgba(56,189,248,0.14), transparent 60%)'
                          : 'radial-gradient(800px circle at 20% 10%, rgba(255,255,255,0.10), transparent 60%), radial-gradient(800px circle at 85% 20%, rgba(255,255,255,0.06), transparent 60%)',
                        opacity: 0.75,
                      }}
                    />

                    {/* hover spotlight */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'radial-gradient(520px circle at var(--mx, 50%) var(--my, 40%), rgba(255,255,255,0.14), transparent 62%)',
                      }}
                    />

                    <div className="relative h-full px-7 md:px-8 pt-10 pb-8 flex flex-col">
                      <div className="flex items-center justify-between gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 bg-black/35 border border-white/12 backdrop-blur-md">
                          <span className="text-[11px] uppercase tracking-[0.22em] text-white/80">Vibe</span>
                        </div>

                        <div className={cn('text-xs text-right', isActive ? 'text-white/60' : 'text-white/0')}>{env.subtitle}</div>
                      </div>

                      <div className="mt-auto space-y-2">
                        <div className="text-[28px] md:text-[32px] font-medium tracking-tight leading-[1.05]">{env.title}</div>
                        <div className="text-sm md:text-[15px] text-white/70 leading-[1.55] max-w-[34ch]">{env.poetic}</div>
                        <div className="pt-3 text-xs text-white/58">
                          {isActive ? 'Click to open • see what fits here' : 'Click to focus'}
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}

              <div className="shrink-0 w-[10vw] md:w-[14vw]" aria-hidden />
            </div>

            {/* dots */}
            <div className="mt-2 flex items-center justify-center gap-2">
              {ENVIRONMENTS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to ${i + 1}`}
                  className={cn('h-1.5 rounded-full transition-all', i === activeIndex ? 'w-8 bg-white/70' : 'w-3 bg-white/25 hover:bg-white/40')}
                />
              ))}
            </div>

            <div className="mt-3 text-center text-xs text-white/50 md:hidden">
              Swipe sideways — pause where it feels right.
            </div>
          </div>
        </div>
      </main>

      {/* MODAL */}
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
              initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              onClick={(e) => e.stopPropagation()}
              className="mx-auto max-w-6xl rounded-[40px] overflow-hidden border border-white/12 bg-white/[0.04] shadow-[0_30px_120px_rgba(0,0,0,0.65)] ring-1 ring-white/[0.06]"
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
                  <div className="text-xs uppercase tracking-[0.22em] text-white/70">Vibe</div>
                  <div className="mt-2 text-3xl md:text-4xl font-medium tracking-tight">{openEnv.title}</div>
                  <div className="mt-2 text-white/70 max-w-2xl leading-[1.55]">{openEnv.poetic}</div>

                  <div className="mt-4 text-sm text-white/62 max-w-2xl leading-[1.6]">
                    This is a space where things feel <span className="text-white/80">natural</span>.
                    <span className="text-white/45"> Less forcing. More flow.</span>
                  </div>

                  <div className="mt-6 flex items-center gap-2">
                    <button
                      onClick={() => setOpenEnvId(null)}
                      className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.03] hover:bg-white/[0.06] transition text-white/85 text-sm"
                    >
                      Close
                    </button>
                    <Link href="/quiz">
                      <button className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm">
                        Find my places
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-7 md:p-10 pt-0">
                <div className="text-sm text-white/65 mb-4">Codes that shape this space</div>

                <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
                  {openEnv.codeIds.map((id) => {
                    const c = codeMap.get(id);
                    if (!c) return null;

                    return (
                      <Link key={c.id} href={`/explore/${c.id}`} className="snap-center shrink-0 w-[78%] sm:w-[340px]">
                        <motion.div
                          whileHover={reduceMotion ? undefined : { y: -4 }}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                          className="group relative overflow-hidden rounded-3xl border border-white/12 bg-white/[0.03] shadow-[0_18px_60px_rgba(0,0,0,0.45)] ring-1 ring-white/[0.05]"
                        >
                          <div className="relative h-[200px]">
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
                            <div className="text-base font-medium tracking-tight">{c.name}</div>
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
