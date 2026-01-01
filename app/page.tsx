'use client';

import { useMemo, useRef, useState } from 'react';
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
  hint: string;
  poetic: string;
  heroCodeId: string;
  codeIds: string[];
};

const ENVIRONMENTS: Environment[] = [
  {
    id: 'urban',
    title: 'Structured Intensity',
    hint: 'City / mastery / discipline',
    poetic: 'Where pressure becomes precision.',
    heroCodeId: 'shokunin',
    codeIds: ['jaejin', 'shokunin', 'siyuane'],
  },
  {
    id: 'coastal',
    title: 'Adaptive Flow',
    hint: 'Ocean / river / ease',
    poetic: 'Calm movement. Quiet power.',
    heroCodeId: 'namsea',
    codeIds: ['namsea', 'siljoa'],
  },
  {
    id: 'mountain',
    title: 'Inner Altitude',
    hint: 'Mountains / stillness / meaning',
    poetic: 'Silence as clarity.',
    heroCodeId: 'lhumir',
    codeIds: ['lhumir'],
  },
  {
    id: 'wild',
    title: 'Unbounded Awareness',
    hint: 'Wilderness / freedom / land',
    poetic: 'You read the world in signals.',
    heroCodeId: 'khoisan',
    codeIds: ['khoisan', 'khoruun', 'tjukari'],
  },
  {
    id: 'communal',
    title: 'Shared Meaning',
    hint: 'Village / ritual / belonging',
    poetic: 'Identity as relationship.',
    heroCodeId: 'karayni',
    codeIds: ['karayni', 'wohaka', 'skenari'],
  },
  {
    id: 'civic',
    title: 'Truth & Order',
    hint: 'Agora / law / inquiry',
    poetic: 'Seek what is real — live by it.',
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
  const card = container.querySelector('[data-card]') as HTMLElement | null;
  const step = card ? card.offsetWidth + 18 : 420;
  container.scrollBy({ left: dir * step, behavior: 'smooth' });
}

/* =========================
   Background: transcendent wave
========================= */

function WaveBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* soft glow */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_circle_at_50%_20%,rgba(255,255,255,0.08),transparent_55%),radial-gradient(1200px_circle_at_20%_80%,rgba(168,85,247,0.10),transparent_60%),radial-gradient(1200px_circle_at_85%_70%,rgba(59,130,246,0.08),transparent_60%)]" />

      {/* wave lines */}
      <motion.svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.22]"
        width="1400"
        height="900"
        viewBox="0 0 1400 900"
        fill="none"
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M-50 520 C 200 430, 420 640, 700 520 C 980 400, 1120 610, 1450 500"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1"
        />
        <path
          d="M-70 580 C 190 480, 430 710, 700 590 C 980 470, 1140 690, 1470 560"
          stroke="rgba(255,255,255,0.20)"
          strokeWidth="1"
        />
        <path
          d="M-90 460 C 210 380, 410 570, 700 450 C 990 330, 1110 560, 1490 430"
          stroke="rgba(255,255,255,0.18)"
          strokeWidth="1"
        />
      </motion.svg>

      {/* gentle grain */}
      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.55%27/%3E%3C/svg%3E")',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black" />
    </div>
  );
}

/* =========================
   Page
========================= */

export default function LandingPage() {
  const codeMap = useCodeMap();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);

  const [openEnvId, setOpenEnvId] = useState<string | null>(null);
  const openEnv = openEnvId ? ENVIRONMENTS.find((e) => e.id === openEnvId) : null;

  // spotlight for “transcendent pull”
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clamp(((e.clientX - r.left) / r.width) * 100, 0, 100);
    const y = clamp(((e.clientY - r.top) / r.height) * 100, 0, 100);
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      className="relative min-h-screen bg-[#070710] text-white overflow-hidden"
      style={{
        background:
          'radial-gradient(700px circle at var(--mx, 50%) var(--my, 35%), rgba(168,85,247,0.14), transparent 55%), radial-gradient(900px circle at 80% 20%, rgba(59,130,246,0.10), transparent 55%), radial-gradient(900px circle at 15% 85%, rgba(236,72,153,0.08), transparent 55%), #070710',
      }}
    >
      <WaveBackground />

      {/* Corner UI (minimal) */}
      <div className="absolute inset-0 z-20">
        {/* top-left brand */}
        <div className="absolute left-5 top-5 md:left-8 md:top-7">
          <div className="flex items-center gap-2 text-white/90">
            <Sparkles className="h-6 w-6 text-purple-300" />
            <span className="text-sm md:text-base font-semibold tracking-tight">AVIRAGE</span>
          </div>
        </div>

        {/* top-right auth */}
        <div className="absolute right-5 top-5 md:right-8 md:top-7 flex items-center gap-2">
          <button className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.02] backdrop-blur-md text-white/80 hover:bg-white/[0.05] transition text-sm">
            Sign in
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition text-sm">
            Get started
          </button>
        </div>

        {/* bottom-left subtle explainer */}
        <div className="absolute left-5 bottom-6 md:left-8 md:bottom-8 max-w-[260px] md:max-w-[340px]">
          <div className="text-[11px] uppercase tracking-[0.22em] text-white/55">Choose a lens</div>
          <div className="mt-2 text-sm md:text-base text-white/80 leading-relaxed">
            Your Cultural Code is how you filter the world.
            <span className="text-white/55"> Explore out of curiosity — or find yours.</span>
          </div>
        </div>

        {/* bottom-right CTA (very minimal) */}
        <div className="absolute right-5 bottom-6 md:right-8 md:bottom-8 flex items-center gap-2">
          <Link href="/quiz">
            <button className="px-4 py-2 rounded-full border border-white/14 bg-white/[0.02] backdrop-blur-md text-white/80 hover:bg-white/[0.05] transition text-sm">
              Find my code
            </button>
          </Link>
        </div>
      </div>

      {/* CENTER: Card rail (main attention) */}
      <main className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          {/* tiny center title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center mb-6 md:mb-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-md px-3 py-1.5 text-white/70">
              <span className="text-[11px] uppercase tracking-[0.22em]">Enter through an environment</span>
            </div>
          </motion.div>

          {/* arrows (desktop) */}
          <div className="hidden md:flex items-center justify-between mb-3">
            <button
              onClick={() => scrollByCard(railRef.current, -1)}
              className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-4 w-4 text-white/80" />
            </button>

            <div className="text-xs text-white/50">Scroll horizontally • Click to reveal codes</div>

            <button
              onClick={() => scrollByCard(railRef.current, 1)}
              className="h-10 w-10 rounded-full border border-white/12 bg-white/[0.03] backdrop-blur-md hover:bg-white/[0.06] transition flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-4 w-4 text-white/80" />
            </button>
          </div>

          {/* rail */}
          <div className="relative">
            {/* edge fades (helps “pull” and looks premium) */}
            <div aria-hidden className="pointer-events-none absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black/55 to-transparent z-10" />
            <div aria-hidden className="pointer-events-none absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black/55 to-transparent z-10" />

            <div
              ref={railRef}
              className="flex gap-4 md:gap-5 overflow-x-auto pb-3 scroll-smooth snap-x snap-mandatory"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
              {ENVIRONMENTS.map((env) => {
                const hero = codeMap.get(env.heroCodeId);
                const heroImg = hero?.image ?? '/images/codes/ALETHIR-frontpage.jpeg';

                return (
                  <motion.button
                    key={env.id}
                    type="button"
                    data-card
                    onClick={() => setOpenEnvId(env.id)}
                    className="snap-center shrink-0 w-[84%] sm:w-[460px] md:w-[520px] h-[340px] md:h-[380px] rounded-[30px] overflow-hidden border border-white/12 bg-white/[0.03] shadow-[0_22px_90px_rgba(0,0,0,0.60)] text-left relative outline-none"
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                  >
                    {/* image */}
                    <div className="absolute inset-0">
                      <Image src={heroImg} alt={env.title} fill className="object-cover scale-[1.06]" sizes="(max-width: 768px) 84vw, 520px" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                    </div>

                    {/* subtle hairline grid */}
                    <div
                      aria-hidden
                      className="absolute inset-0 opacity-[0.14]"
                      style={{
                        backgroundImage:
                          'linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)',
                        backgroundSize: '22px 22px',
                      }}
                    />

                    {/* cursor halo */}
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
                        <div className="text-xs text-white/55 hidden sm:block">{env.hint}</div>
                      </div>

                      <div className="space-y-2">
                        <div className="text-2xl md:text-3xl font-semibold tracking-tight">{env.title}</div>
                        <div className="text-sm md:text-base text-white/75 max-w-[52ch]">{env.poetic}</div>
                        <div className="pt-2 text-xs text-white/55">Click to reveal codes</div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* mobile hint */}
            <div className="mt-2 text-center text-xs text-white/50 md:hidden">
              Swipe sideways — the next card is peeking by design.
            </div>
          </div>
        </div>
      </main>

      {/* Modal: environment -> codes */}
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
                      <button className="px-4 py-2 rounded-full bg-white text-black font-semibold text-sm">Find my code</button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="p-7 md:p-10 pt-0">
                <div className="text-sm text-white/65 mb-4">Codes in this space</div>

                {/* horizontal code tiles (phone-safe) */}
                <div className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory" style={{ WebkitOverflowScrolling: 'touch' }}>
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
                          <div className="relative h-[170px]">
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

                <div className="mt-2 text-xs text-white/55">Swipe sideways to browse.</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
