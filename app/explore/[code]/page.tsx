'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, LayoutGroup, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  MapPin,
  Star,
  Heart,
  X,
  Clock,
  CreditCard,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Navigation,
  Accessibility,
  PawPrint,
  Trees,
  Utensils,
  Info,
  Sparkles,
  SlidersHorizontal,
  Music,
  Lightbulb,
  Volume2,
  Wifi,
  Zap,
  Baby,
  Car,
  Search,
  RotateCcw,
  BadgeCheck,
} from 'lucide-react';

/* =========================================================
   THEME (brighter, calmer, premium)
========================================================= */

const MARKET_BG_IMAGE = '/images/background/ethos-coastal-hero.webp'; // optional; if missing, still looks good
const PAGE_BG = '#05070B';
const SURFACE = 'rgba(255,255,255,0.08)';
const SURFACE_2 = 'rgba(255,255,255,0.06)';
const BORDER = 'rgba(255,255,255,0.16)';
const BORDER_SOFT = 'rgba(255,255,255,0.10)';

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(' ');
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function parseKm(distance: string) {
  // expects something like "1.2 km"
  const n = parseFloat(distance);
  return Number.isFinite(n) ? n : 9999;
}

/* =========================================================
   Cultural Code data (unchanged)
========================================================= */

const CULTURAL_CODES = {
  khoisan: { name: 'KHOISAN', tagline: 'Hyper-Acute Perception', gradient: 'from-amber-700/60 via-orange-500/35 to-amber-300/25', color: '#f59e0b' },
  kayori: { name: 'KÁYORI', tagline: 'Expressive Ritual Creativity', gradient: 'from-fuchsia-700/55 via-purple-500/35 to-fuchsia-300/20', color: '#d946ef' },
  sahen: { name: 'SAHÉN', tagline: 'Desert Wisdom', gradient: 'from-yellow-700/55 via-amber-500/35 to-yellow-300/20', color: '#fbbf24' },
  enzuka: { name: 'ENZUKA', tagline: 'Warrior Discipline', gradient: 'from-red-700/55 via-orange-500/35 to-red-300/20', color: '#fb7185' },
  siyuane: { name: 'SIYUANÉ', tagline: 'Generational Harmony', gradient: 'from-emerald-700/55 via-teal-500/35 to-emerald-300/20', color: '#34d399' },
  jaejin: { name: 'JAEJIN', tagline: 'Compressed Emotion (Han)', gradient: 'from-slate-600/55 via-blue-500/35 to-slate-300/20', color: '#94a3b8' },
  namsea: { name: 'NAMSÉA', tagline: 'Water-Based Cognition', gradient: 'from-cyan-700/55 via-sky-500/35 to-cyan-300/20', color: '#22d3ee' },
  shokunin: { name: 'SHOKUNIN', tagline: 'Perfectionist Craftsmanship', gradient: 'from-rose-700/55 via-pink-500/35 to-rose-300/20', color: '#fb7185' },
  khoruun: { name: 'KHORUUN', tagline: 'Nomadic Mobility', gradient: 'from-stone-600/55 via-neutral-500/35 to-stone-300/20', color: '#d6d3d1' },
  lhumir: { name: 'LHUMIR', tagline: 'Contemplative Consciousness', gradient: 'from-indigo-700/55 via-violet-500/35 to-indigo-300/20', color: '#a78bfa' },
  yatevar: { name: 'YATEVAR', tagline: 'Warrior-Philosopher', gradient: 'from-orange-700/55 via-amber-500/35 to-orange-300/20', color: '#fb923c' },
  renara: { name: 'RÉNARA', tagline: 'Refined Subtlety (Halus)', gradient: 'from-emerald-700/55 via-green-500/35 to-emerald-300/20', color: '#34d399' },
  karayni: { name: 'KARAYNI', tagline: 'Sacred Reciprocity', gradient: 'from-yellow-700/55 via-orange-500/35 to-yellow-300/20', color: '#fbbf24' },
  wohaka: { name: 'WÓHAKA', tagline: 'All Beings as Kin', gradient: 'from-teal-700/55 via-cyan-500/35 to-teal-300/20', color: '#2dd4bf' },
  tjukari: { name: 'TJUKARI', tagline: 'Dreamtime Cosmology', gradient: 'from-red-700/55 via-orange-500/35 to-red-300/20', color: '#fb7185' },
  kinmora: { name: 'KINMORA', tagline: 'Mathematical Cosmology', gradient: 'from-lime-700/55 via-green-500/35 to-lime-300/20', color: '#a3e635' },
  siljoa: { name: 'SILJOA', tagline: 'Arctic Intelligence', gradient: 'from-blue-700/55 via-cyan-500/35 to-blue-300/20', color: '#60a5fa' },
  skenari: { name: 'SKÉNARI', tagline: 'Seventh Generation', gradient: 'from-green-700/55 via-emerald-500/35 to-green-300/20', color: '#34d399' },
  ashkara: { name: 'ASHKARA', tagline: 'Truth as Sacred Action', gradient: 'from-orange-700/55 via-red-500/35 to-orange-300/20', color: '#fb923c' },
  alethir: { name: 'ALÉTHIR', tagline: 'Logos-Centered Inquiry', gradient: 'from-blue-700/55 via-indigo-500/35 to-blue-300/20', color: '#60a5fa' },
};

// Extended demo data (unchanged)
const DEMO_BUSINESSES = [
  {
    id: '1',
    name: 'Minimalist Café Tokyo',
    category: 'Café',
    location: 'Shibuya, Tokyo',
    city: 'Tokyo',
    images: [
      { url: '/images/businesses/minimalist-cafe-space.jpg', label: 'Space' },
      { url: '/images/businesses/minimalist-cafe-counter.jpg', label: 'Counter' },
      { url: '/images/businesses/minimalist-cafe-seating.jpg', label: 'Seating' },
      { url: '/images/businesses/minimalist-cafe-details.jpg', label: 'Vibe' },
    ],
    matchScore: 94,
    priceRange: '$$',
    rating: 4.8,
    reviews: 127,
    tags: ['Quiet', 'Solo-friendly', 'Minimalist'],
    openNow: true,
    distance: '1.2 km',
    compatibleCodes: ['shokunin', 'jaejin', 'lhumir'],
    musicStyle: 'Lo-fi, Ambient, Minimal Techno',
    atmosphere: 'Minimal conversation, natural materials, indirect lighting',
    lighting: 'Soft natural light during day, warm Edison bulbs at night',
    noiseLevel: 'Very quiet (30-40 dB)',
    bestFor: ['Solo work', 'Reading', 'Quiet conversations'],
    seating: 18,
    ownerStory:
      'Founded by former architect Yuki Tanaka who believes coffee spaces should mirror meditation halls — designed for presence, not productivity.',
    amenities: {
      powerOutlets: true,
      wifi: '100 Mbps',
      kidsArea: false,
      outdoorSeating: false,
      wheelchairAccessible: true,
      parking: false,
      petFriendly: false,
    },
    menu: {
      hasDigitalMenu: true,
      menuLink: 'https://menu.example.com',
      specialties: ['Pour-over coffee', 'Matcha latte', 'Minimal pastries'],
      dietary: ['Vegan options', 'Gluten-free available'],
    },
    practical: {
      payment: ['Cash', 'Card', 'Mobile pay'],
      hours: 'Mon-Fri 7am-7pm, Sat-Sun 8am-6pm',
      bookingRequired: false,
      phone: '+81-3-1234-5678',
      email: 'hello@minimalistcafe.jp',
    },
  },
  {
    id: '2',
    name: 'Ubuntu Kitchen',
    category: 'Restaurant',
    location: 'Cape Town CBD',
    city: 'Cape Town',
    images: [
      { url: '/images/businesses/ubuntu-kitchen-dining.jpg', label: 'Dining' },
      { url: '/images/businesses/ubuntu-kitchen-kitchen.jpg', label: 'Kitchen' },
      { url: '/images/businesses/ubuntu-kitchen-table.jpg', label: 'Community' },
      { url: '/images/businesses/ubuntu-kitchen-atmosphere.jpg', label: 'Vibe' },
    ],
    matchScore: 91,
    priceRange: '$$$',
    rating: 4.9,
    reviews: 203,
    tags: ['Community', 'Family-style', 'Warm'],
    openNow: true,
    distance: '2.8 km',
    compatibleCodes: ['kayori', 'wohaka', 'karayni'],
    musicStyle: 'Afrobeats, Highlife, Amapiano, Live Jazz Thu-Sun',
    atmosphere: 'Shared tables, storytelling encouraged, communal dining',
    lighting: 'Warm pendant lights, candles',
    noiseLevel: 'Moderate to lively (65-75 dB)',
    bestFor: ['Group dinners', 'Meeting people', 'Celebrations'],
    seating: 48,
    ownerStory:
      'Chef Naledi grew up in a township where meals were never eaten alone. Ubuntu Kitchen recreates that spirit of radical togetherness.',
    amenities: {
      powerOutlets: false,
      wifi: '50 Mbps',
      kidsArea: true,
      outdoorSeating: true,
      wheelchairAccessible: true,
      parking: true,
      petFriendly: true,
    },
    menu: {
      hasDigitalMenu: true,
      menuLink: 'https://menu.example.com',
      specialties: ['Family-style platters', 'Traditional Cape cuisine', 'Communal desserts'],
      dietary: ['Vegetarian', 'Halal options'],
    },
    practical: {
      payment: ['Card', 'Mobile pay'],
      hours: 'Tue-Sun 5pm-11pm, Closed Mondays',
      bookingRequired: true,
      phone: '+27-21-123-4567',
      email: 'info@ubuntukitchen.co.za',
    },
  },
];

type Business = typeof DEMO_BUSINESSES[number];

const CITIES = ['All Cities', 'Tokyo', 'Cape Town'];
const CATEGORIES = ['All', 'Café', 'Restaurant', 'Workspace', 'Wellness'];
const PRICE_RANGES = ['All', '$', '$$', '$$$', '$$$$'];
const SORT_OPTIONS = ['Best Match', 'Highest Rated', 'Most Reviews', 'Nearest'] as const;

/* =========================================================
   Motion presets (forward, consistent, accessible)
========================================================= */

function motionSafe(reduce: boolean, value: any) {
  return reduce ? undefined : value;
}

const easeOut = [0.16, 1, 0.3, 1] as const;

const stagger = {
  hidden: { opacity: 0 },
  show: (reduce: boolean) => ({
    opacity: 1,
    transition: {
      staggerChildren: reduce ? 0 : 0.06,
      delayChildren: reduce ? 0 : 0.04,
    },
  }),
};

const cardIn = {
  hidden: { opacity: 0, y: 14, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } },
};

/* =========================================================
   UI: Filter Chip
========================================================= */

function Chip({
  label,
  onRemove,
  accent,
}: {
  label: string;
  onRemove: () => void;
  accent: string;
}) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
      style={{
        backgroundColor: 'rgba(0,0,0,0.20)',
        borderColor: 'rgba(255,255,255,0.16)',
        color: 'rgba(255,255,255,0.90)',
      }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: accent, boxShadow: `0 0 0 3px ${accent}22` }}
      />
      {label}
      <X className="w-3.5 h-3.5 opacity-70" />
    </button>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function MarketplacePage() {
  const reduceMotion = useReducedMotion();
  const params = useParams();
  const router = useRouter();
  const codeId = params.code as string;

  const codeData = CULTURAL_CODES[codeId as keyof typeof CULTURAL_CODES];

  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'atmosphere' | 'amenities' | 'menu' | 'practical'>(
    'overview'
  );

  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState<(typeof SORT_OPTIONS)[number]>('Best Match');

  const [minMatch, setMinMatch] = useState(80);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');

  const filteredBusinesses = useMemo(() => {
    let results = DEMO_BUSINESSES.filter((b) => {
      const cityMatch = selectedCity === 'All Cities' || b.city === selectedCity;
      const categoryMatch = selectedCategory === 'All' || b.category === selectedCategory;
      const priceMatch = selectedPrice === 'All' || b.priceRange === selectedPrice;
      const matchScorePass = b.matchScore >= minMatch;
      const openMatch = !showOpenOnly || b.openNow;

      const q = query.trim().toLowerCase();
      const queryMatch =
        !q ||
        b.name.toLowerCase().includes(q) ||
        b.location.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q));

      return cityMatch && categoryMatch && priceMatch && matchScorePass && openMatch && queryMatch;
    });

    if (sortBy === 'Best Match') results.sort((a, b) => b.matchScore - a.matchScore);
    else if (sortBy === 'Highest Rated') results.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'Most Reviews') results.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === 'Nearest') results.sort((a, b) => parseKm(a.distance) - parseKm(b.distance));

    return results;
  }, [selectedCity, selectedCategory, selectedPrice, minMatch, showOpenOnly, sortBy, query]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const resetFilters = () => {
    setSelectedCity('All Cities');
    setSelectedCategory('All');
    setSelectedPrice('All');
    setMinMatch(80);
    setShowOpenOnly(false);
    setSortBy('Best Match');
    setQuery('');
  };

  const hasActiveFilters =
    selectedCity !== 'All Cities' ||
    selectedCategory !== 'All' ||
    selectedPrice !== 'All' ||
    minMatch !== 80 ||
    showOpenOnly ||
    query.trim().length > 0;

  const activeChips = useMemo(() => {
    const chips: Array<{ key: string; label: string; remove: () => void }> = [];
    if (query.trim()) chips.push({ key: 'q', label: `Search: ${query.trim()}`, remove: () => setQuery('') });
    if (selectedCity !== 'All Cities') chips.push({ key: 'city', label: selectedCity, remove: () => setSelectedCity('All Cities') });
    if (selectedCategory !== 'All') chips.push({ key: 'cat', label: selectedCategory, remove: () => setSelectedCategory('All') });
    if (selectedPrice !== 'All') chips.push({ key: 'price', label: `Price: ${selectedPrice}`, remove: () => setSelectedPrice('All') });
    if (minMatch !== 80) chips.push({ key: 'min', label: `Min match: ${minMatch}%`, remove: () => setMinMatch(80) });
    if (showOpenOnly) chips.push({ key: 'open', label: 'Open now', remove: () => setShowOpenOnly(false) });
    return chips;
  }, [query, selectedCity, selectedCategory, selectedPrice, minMatch, showOpenOnly]);

  if (!codeData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white" style={{ background: PAGE_BG }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Code not found</h1>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-full font-semibold"
            style={{ backgroundColor: 'white', color: 'black' }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <LayoutGroup>
      <div className="min-h-screen text-white relative" style={{ background: PAGE_BG }}>
        {/* Background image + calm grade */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image src={MARKET_BG_IMAGE} alt="" fill className="object-cover opacity-[0.22]" sizes="100vw" />
          <div
            className="absolute inset-0"
            style={{
              background: `
                radial-gradient(1200px circle at 18% 18%, ${codeData.color}22, transparent 60%),
                radial-gradient(1000px circle at 82% 12%, rgba(34,211,238,0.18), transparent 58%),
                linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.65))
              `,
            }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_28%,rgba(255,255,255,0.05),transparent_60%)]" />
        </div>

        {/* Top Bar */}
        <header
          className="sticky top-0 z-50 backdrop-blur-2xl"
          style={{ borderBottom: `1px solid ${BORDER_SOFT}`, background: 'rgba(5,7,11,0.65)' }}
        >
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Home</span>
                </button>

                <div className="h-6 w-px hidden sm:block" style={{ background: BORDER_SOFT }} />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: codeData.color, boxShadow: `0 0 0 3px ${codeData.color}22` }}
                    />
                    <h1 className="text-sm font-semibold truncate">{codeData.name}</h1>
                    <span className="hidden md:inline text-xs text-white/55 truncate">— {codeData.tagline}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden lg:flex items-center gap-2 rounded-xl px-3 py-2"
                     style={{ background: SURFACE_2, border: `1px solid ${BORDER_SOFT}` }}>
                  <Search className="w-4 h-4 text-white/60" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search places, tags, locations…"
                    className="bg-transparent outline-none text-sm placeholder:text-white/45 w-[260px]"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ border: `1px solid ${BORDER}`, background: SURFACE }}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>
              </div>
            </div>

            {/* Active filters chips row */}
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeChips.slice(0, 6).map((c) => (
                <Chip key={c.key} label={c.label} onRemove={c.remove} accent={codeData.color} />
              ))}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs border"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderColor: BORDER, color: 'rgba(255,255,255,0.90)' }}
                >
                  <RotateCcw className="w-3.5 h-3.5 opacity-80" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Code Info Banner */}
        <div className={cn('border-b')} style={{ borderColor: BORDER_SOFT }}>
          <div className={cn('bg-gradient-to-r', codeData.gradient)}>
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-7">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl sm:text-2xl font-semibold mb-1">
                    Marketplace for <span style={{ color: 'rgba(255,255,255,0.95)' }}>{codeData.name}</span>
                  </h2>
                  <p className="text-sm text-white/90 max-w-3xl leading-relaxed">
                    Curated environments where <span className="text-white/80">{codeData.tagline.toLowerCase()}</span> comes naturally — with vibe, practical details, and a match score that makes sense.
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-2xl font-bold">{filteredBusinesses.length}</div>
                  <div className="text-xs text-white/80">matches</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto flex relative z-10">
          {/* LEFT SIDEBAR (desktop) */}
          <aside className="hidden lg:block lg:sticky lg:top-[124px] h-[calc(100vh-124px)] overflow-y-auto w-80 border-r"
                 style={{ borderColor: BORDER_SOFT, background: 'rgba(0,0,0,0.14)' }}>
            <div className="p-4 space-y-6">
              <div className="rounded-2xl p-3" style={{ background: SURFACE_2, border: `1px solid ${BORDER_SOFT}` }}>
                <div className="flex items-center gap-2 mb-2 text-xs text-white/70 uppercase tracking-wider">
                  <Search className="w-4 h-4" /> Search
                </div>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Name, vibe tags, location…"
                  className="w-full px-3 py-2 rounded-xl bg-black/20 border text-sm outline-none placeholder:text-white/45"
                  style={{ borderColor: BORDER_SOFT }}
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">Location</label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                  style={{ background: SURFACE_2, border: `1px solid ${BORDER_SOFT}` }}
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city} className="bg-gray-900">
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">Category</label>
                <div className="space-y-1">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm transition"
                      style={{
                        background: selectedCategory === cat ? 'rgba(255,255,255,0.92)' : 'transparent',
                        color: selectedCategory === cat ? '#000' : 'rgba(255,255,255,0.82)',
                        border: `1px solid ${selectedCategory === cat ? 'transparent' : BORDER_SOFT}`,
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">Price</label>
                <div className="flex gap-2">
                  {PRICE_RANGES.map((price) => (
                    <button
                      key={price}
                      onClick={() => setSelectedPrice(price)}
                      className="flex-1 px-2 py-2 rounded-xl text-xs transition"
                      style={{
                        background: selectedPrice === price ? 'rgba(255,255,255,0.92)' : SURFACE_2,
                        color: selectedPrice === price ? '#000' : 'rgba(255,255,255,0.82)',
                        border: `1px solid ${BORDER_SOFT}`,
                      }}
                    >
                      {price}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl p-4" style={{ background: SURFACE_2, border: `1px solid ${BORDER_SOFT}` }}>
                <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">
                  Min Match: <span className="text-white/90">{minMatch}%</span>
                </label>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={minMatch}
                  onChange={(e) => setMinMatch(Number(e.target.value))}
                  className="w-full"
                  style={{ accentColor: codeData.color as any }}
                />
                <div className="mt-2 text-xs text-white/70 leading-relaxed">
                  Higher match = more aligned environments.
                </div>
              </div>

              <button
                onClick={() => setShowOpenOnly(!showOpenOnly)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-2xl transition"
                style={{ background: SURFACE_2, border: `1px solid ${BORDER_SOFT}` }}
              >
                <span className="text-sm text-white/90">Open now only</span>
                <div
                  className="w-11 h-6 rounded-full transition"
                  style={{ background: showOpenOnly ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.18)' }}
                >
                  <div
                    className="w-5 h-5 mt-0.5 rounded-full transition-transform"
                    style={{
                      background: showOpenOnly ? '#000' : 'rgba(0,0,0,0.55)',
                      transform: `translateX(${showOpenOnly ? 22 : 2}px)`,
                    }}
                  />
                </div>
              </button>

              <button
                onClick={resetFilters}
                className="w-full px-3 py-3 text-sm rounded-2xl transition"
                style={{ background: 'rgba(0,0,0,0.22)', border: `1px solid ${BORDER_SOFT}`, color: 'rgba(255,255,255,0.78)' }}
              >
                Reset filters
              </button>
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 min-w-0">
            {/* Sticky toolbar */}
            <div
              className="sticky z-30 px-4 sm:px-6 py-3"
              style={{
                top: 124,
                background: 'rgba(5,7,11,0.55)',
                borderBottom: `1px solid ${BORDER_SOFT}`,
                backdropFilter: 'blur(18px)',
              }}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="text-sm text-white/85 flex items-center gap-2">
                  <BadgeCheck className="w-4 h-4 text-white/70" />
                  <span>{filteredBusinesses.length} result{filteredBusinesses.length !== 1 ? 's' : ''}</span>
                  {hasActiveFilters && <span className="text-white/55 hidden sm:inline">• refined</span>}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-xl text-sm outline-none"
                    style={{ background: SURFACE, border: `1px solid ${BORDER_SOFT}` }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt} className="bg-gray-900">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="p-4 sm:p-6">
              <motion.div
                variants={stagger}
                initial="hidden"
                animate="show"
                custom={!!reduceMotion}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredBusinesses.map((business) => (
                  <motion.div key={business.id} variants={cardIn} className="group">
                    <button
                      onClick={() => {
                        setSelectedBusiness(business);
                        setSelectedTab('overview');
                        setSelectedImageIndex(0);
                      }}
                      className="w-full text-left"
                    >
                      <motion.div
                        layout
                        className="relative overflow-hidden rounded-2xl"
                        style={{
                          background: SURFACE_2,
                          border: `1px solid ${BORDER_SOFT}`,
                          boxShadow: '0 28px 120px rgba(0,0,0,0.35)',
                        }}
                        whileHover={motionSafe(!!reduceMotion, { y: -6 })}
                        transition={{ duration: 0.35, ease: easeOut }}
                      >
                        {/* Image */}
                        <div className="relative h-44 overflow-hidden">
                          <motion.div layoutId={`biz-${business.id}-hero`} className="absolute inset-0">
                            <Image
                              src={business.images[0].url}
                              alt={business.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 640px) 100vw, 25vw"
                            />
                          </motion.div>

                          {/* Gradient readability + calm tint */}
                          <div
                            className="absolute inset-0"
                            style={{
                              background:
                                `linear-gradient(180deg, rgba(0,0,0,0.10), rgba(0,0,0,0.55)), ` +
                                `radial-gradient(800px circle at 20% 18%, ${codeData.color}22, transparent 58%)`,
                            }}
                          />

                          {/* Match badge */}
                          <div
                            className="absolute top-3 left-3 px-2.5 py-1.5 rounded-xl text-xs font-bold backdrop-blur-md border"
                            style={{
                              backgroundColor: `${codeData.color}22`,
                              color: 'rgba(255,255,255,0.92)',
                              borderColor: `${codeData.color}55`,
                            }}
                          >
                            {business.matchScore}% match
                          </div>

                          {/* Favorite */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(business.id);
                            }}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-md border flex items-center justify-center transition"
                            style={{ background: 'rgba(0,0,0,0.35)', borderColor: BORDER_SOFT }}
                          >
                            <Heart
                              className={cn(
                                'w-4 h-4',
                                favorites.has(business.id) ? 'fill-red-500 text-red-500' : 'text-white'
                              )}
                            />
                          </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-2">
                          <div>
                            <h3 className="font-semibold text-[15px] mb-0.5 line-clamp-1 text-white">
                              {business.name}
                            </h3>
                            <div className="flex items-center gap-1.5 text-xs text-white/75">
                              <MapPin className="w-3.5 h-3.5 opacity-80" />
                              <span className="line-clamp-1">{business.location}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-xs">
                            <div className="flex items-center gap-1.5">
                              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-white">{business.rating}</span>
                              <span className="text-white/65">({business.reviews})</span>
                            </div>

                            <div className="flex items-center gap-2">
                              {business.openNow && <span className="text-emerald-300 font-semibold">Open</span>}
                              <span className="text-white/70">{business.priceRange}</span>
                            </div>
                          </div>

                          {/* Tags preview */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {business.tags.slice(0, 3).map((t) => (
                              <span
                                key={t}
                                className="px-2.5 py-1 rounded-full text-[11px] border"
                                style={{ background: 'rgba(0,0,0,0.18)', borderColor: BORDER_SOFT, color: 'rgba(255,255,255,0.82)' }}
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </main>
        </div>

        {/* MOBILE FILTER SHEET */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="fixed inset-0 z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            >
              <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-md" />
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 40, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 40, opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="absolute left-0 right-0 bottom-0 rounded-t-[28px] border-t border-white/15"
                style={{ background: 'rgba(10,12,18,0.92)' }}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="text-sm font-semibold">Filters</div>
                  <button onClick={() => setShowFilters(false)} className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="px-4 pb-5 space-y-5 max-h-[70vh] overflow-y-auto">
                  <div className="rounded-2xl p-3" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${BORDER_SOFT}` }}>
                    <div className="flex items-center gap-2 mb-2 text-xs text-white/70 uppercase tracking-wider">
                      <Search className="w-4 h-4" /> Search
                    </div>
                    <input
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Name, tags, location…"
                      className="w-full px-3 py-2 rounded-xl bg-black/20 border border-white/10 text-sm outline-none placeholder:text-white/45"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">Location</label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl text-sm outline-none"
                      style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${BORDER_SOFT}` }}
                    >
                      {CITIES.map((city) => (
                        <option key={city} value={city} className="bg-gray-900">
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">Category</label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className="px-3 py-2 rounded-full text-xs border transition"
                          style={{
                            background: selectedCategory === cat ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.07)',
                            color: selectedCategory === cat ? '#000' : 'rgba(255,255,255,0.84)',
                            borderColor: BORDER_SOFT,
                          }}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">Price</label>
                    <div className="flex gap-2">
                      {PRICE_RANGES.map((price) => (
                        <button
                          key={price}
                          onClick={() => setSelectedPrice(price)}
                          className="flex-1 px-2 py-2 rounded-xl text-xs border transition"
                          style={{
                            background: selectedPrice === price ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.07)',
                            color: selectedPrice === price ? '#000' : 'rgba(255,255,255,0.84)',
                            borderColor: BORDER_SOFT,
                          }}
                        >
                          {price}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl p-4" style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${BORDER_SOFT}` }}>
                    <label className="text-xs uppercase tracking-wider text-white/70 mb-2 block">
                      Min Match: <span className="text-white/90">{minMatch}%</span>
                    </label>
                    <input
                      type="range"
                      min="70"
                      max="100"
                      value={minMatch}
                      onChange={(e) => setMinMatch(Number(e.target.value))}
                      className="w-full"
                      style={{ accentColor: codeData.color as any }}
                    />
                  </div>

                  <button
                    onClick={() => setShowOpenOnly(!showOpenOnly)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-2xl border border-white/10 bg-white/5"
                  >
                    <span className="text-sm">Open now only</span>
                    <div className={cn('w-11 h-6 rounded-full transition', showOpenOnly ? 'bg-white' : 'bg-white/20')}>
                      <div
                        className="w-5 h-5 mt-0.5 rounded-full bg-black transition-transform"
                        style={{ transform: `translateX(${showOpenOnly ? 22 : 2}px)` }}
                      />
                    </div>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={resetFilters}
                      className="flex-1 px-4 py-3 rounded-2xl border border-white/12 bg-white/5 text-sm text-white/80"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 px-4 py-3 rounded-2xl bg-white text-black font-semibold text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* DETAIL MODAL (evolved, softer, shared-layout hero) */}
        <AnimatePresence>
          {selectedBusiness && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedBusiness(null)}
            >
              <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-xl" />

              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 14 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 14 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-[28px] border"
                style={{
                  borderColor: BORDER,
                  background: 'rgba(10,12,18,0.92)',
                  boxShadow: '0 80px 280px rgba(0,0,0,0.70)',
                }}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full border flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.35)', borderColor: BORDER_SOFT }}
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="relative">
                  <div className="relative h-[260px] sm:h-[320px]">
                    <motion.div layoutId={`biz-${selectedBusiness.id}-hero`} className="absolute inset-0">
                      <Image
                        src={selectedBusiness.images[0].url}
                        alt={selectedBusiness.name}
                        fill
                        className="object-cover"
                        sizes="100vw"
                        priority
                      />
                    </motion.div>

                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          `linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.78)), ` +
                          `radial-gradient(900px circle at 18% 20%, ${codeData.color}25, transparent 60%)`,
                      }}
                    />

                    <div className="relative p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <div
                              className="px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md"
                              style={{
                                backgroundColor: `${codeData.color}22`,
                                borderColor: `${codeData.color}55`,
                                color: 'rgba(255,255,255,0.92)',
                              }}
                            >
                              {selectedBusiness.matchScore}% MATCH
                            </div>

                            {selectedBusiness.openNow && (
                              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                                <span className="text-xs font-semibold text-emerald-200">OPEN NOW</span>
                              </div>
                            )}
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                            {selectedBusiness.name}
                          </h2>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-white/80">
                            <div className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4 opacity-80" />
                              <span>{selectedBusiness.location}</span>
                            </div>
                            <span className="opacity-60">•</span>
                            <span>{selectedBusiness.category}</span>
                            <span className="opacity-60">•</span>
                            <span>{selectedBusiness.distance}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="flex items-center gap-1 mb-1 justify-end">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="text-2xl font-bold">{selectedBusiness.rating}</span>
                            </div>
                            <div className="text-xs text-white/70">{selectedBusiness.reviews} reviews</div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(selectedBusiness.id);
                            }}
                            className="w-12 h-12 rounded-full border flex items-center justify-center transition"
                            style={{ background: 'rgba(255,255,255,0.08)', borderColor: BORDER_SOFT }}
                          >
                            <Heart
                              className={cn(
                                'w-6 h-6',
                                favorites.has(selectedBusiness.id) ? 'fill-red-500 text-red-500' : 'text-white'
                              )}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b" style={{ borderColor: BORDER_SOFT, background: 'rgba(0,0,0,0.22)' }}>
                    <div className="flex gap-1 px-4 sm:px-6 overflow-x-auto">
                      {[
                        { id: 'overview', label: 'Overview', icon: Info },
                        { id: 'atmosphere', label: 'Atmosphere', icon: Sparkles },
                        { id: 'amenities', label: 'Amenities', icon: Zap },
                        { id: 'menu', label: 'Menu', icon: Utensils },
                        { id: 'practical', label: 'Practical', icon: Phone },
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const active = selectedTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => setSelectedTab(tab.id as any)}
                            className={cn(
                              'relative px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 transition',
                              active ? 'text-white' : 'text-white/65 hover:text-white/90'
                            )}
                          >
                            <Icon className="w-4 h-4" />
                            {tab.label}
                            {active && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                                style={{
                                  background: `linear-gradient(90deg, transparent, ${codeData.color}, transparent)`,
                                }}
                                transition={{ type: 'spring', stiffness: 520, damping: 34 }}
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(95vh-260px-56px-84px)]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedTab}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.22, ease: easeOut }}
                      className="p-4 sm:p-6"
                    >
                      {/* OVERVIEW */}
                      {selectedTab === 'overview' && (
                        <div className="space-y-6">
                          {/* Image viewer */}
                          <div className="rounded-2xl overflow-hidden border" style={{ borderColor: BORDER_SOFT, background: 'rgba(0,0,0,0.22)' }}>
                            <div className="flex gap-2 p-3 border-b" style={{ borderColor: BORDER_SOFT, background: 'rgba(255,255,255,0.04)' }}>
                              {selectedBusiness.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedImageIndex(idx)}
                                  className={cn('px-3 py-2 rounded-xl text-xs font-semibold transition border',
                                    selectedImageIndex === idx ? 'text-white' : 'text-white/70 hover:text-white')}
                                  style={{
                                    background: selectedImageIndex === idx ? 'rgba(255,255,255,0.10)' : 'transparent',
                                    borderColor: selectedImageIndex === idx ? 'rgba(255,255,255,0.18)' : 'transparent',
                                  }}
                                >
                                  {img.label}
                                </button>
                              ))}
                            </div>

                            <div className="relative h-[320px] sm:h-[420px] bg-black">
                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={selectedImageIndex}
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 0.28, ease: easeOut }}
                                  className="absolute inset-0"
                                >
                                  <Image
                                    src={selectedBusiness.images[selectedImageIndex].url}
                                    alt={selectedBusiness.images[selectedImageIndex].label}
                                    fill
                                    className="object-contain"
                                    sizes="100vw"
                                    priority
                                  />
                                </motion.div>
                              </AnimatePresence>
                            </div>
                          </div>

                          {/* Cultural Identity */}
                          <div
                            className="p-5 rounded-2xl border"
                            style={{
                              backgroundColor: `${codeData.color}12`,
                              borderColor: `${codeData.color}30`,
                            }}
                          >
                            <div className="text-xs uppercase tracking-wider mb-3" style={{ color: 'rgba(255,255,255,0.80)' }}>
                              Cultural identity
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm text-white/85">This is a</span>
                              <span
                                className="px-4 py-2 rounded-full border text-lg font-bold"
                                style={{
                                  borderColor: `${codeData.color}66`,
                                  backgroundColor: `${codeData.color}20`,
                                  color: 'rgba(255,255,255,0.92)',
                                }}
                              >
                                {CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].name}
                              </span>
                              <span className="text-sm text-white/85">space</span>
                            </div>
                          </div>

                          {/* Also loved by */}
                          <div>
                            <h3 className="text-xs uppercase tracking-wider text-white/70 mb-3">Also loved by</h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.compatibleCodes.slice(1).map((code) => {
                                const c = CULTURAL_CODES[code as keyof typeof CULTURAL_CODES];
                                return (
                                  <span
                                    key={code}
                                    className="px-3 py-2 rounded-full border text-sm font-semibold"
                                    style={{ borderColor: `${c.color}40`, backgroundColor: `${c.color}12`, color: 'rgba(255,255,255,0.90)' }}
                                  >
                                    {c.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Owner story */}
                          <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                            <div className="text-xs uppercase tracking-wider text-white/70 mb-3">Story</div>
                            <p className="text-sm text-white/90 leading-relaxed italic">{selectedBusiness.ownerStory}</p>
                          </div>
                        </div>
                      )}

                      {/* ATMOSPHERE */}
                      {selectedTab === 'atmosphere' && (
                        <div className="grid sm:grid-cols-2 gap-4">
                          {[
                            { icon: Music, label: 'Music', value: selectedBusiness.musicStyle },
                            { icon: Lightbulb, label: 'Lighting', value: selectedBusiness.lighting },
                            { icon: Volume2, label: 'Noise level', value: selectedBusiness.noiseLevel },
                            { icon: Zap, label: 'Capacity', value: `${selectedBusiness.seating} seats` },
                          ].map((x) => {
                            const Icon = x.icon;
                            return (
                              <div key={x.label} className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                                <div className="flex items-center gap-2 mb-3">
                                  <Icon className="w-5 h-5" style={{ color: codeData.color }} />
                                  <h4 className="text-xs uppercase tracking-wider text-white/70">{x.label}</h4>
                                </div>
                                <p className="text-sm text-white/90">{x.value}</p>
                              </div>
                            );
                          })}

                          <div className="sm:col-span-2 p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                            <div className="text-xs uppercase tracking-wider text-white/70 mb-3">Best for</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.bestFor.map((item) => (
                                <span key={item} className="px-3 py-2 rounded-full bg-white/10 border border-white/10 text-sm text-white/90">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* AMENITIES */}
                      {selectedTab === 'amenities' && (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <AmenityCard
                            title="Power outlets"
                            ok={selectedBusiness.amenities.powerOutlets}
                            sub={selectedBusiness.amenities.powerOutlets ? 'Available' : 'Not available'}
                            icon={Zap}
                            okColor="rgba(52,211,153,0.22)"
                          />
                          <AmenityCard
                            title="WiFi"
                            ok={!!selectedBusiness.amenities.wifi}
                            sub={selectedBusiness.amenities.wifi || 'Not available'}
                            icon={Wifi}
                            okColor="rgba(96,165,250,0.22)"
                          />
                          <AmenityCard
                            title="Kids area"
                            ok={selectedBusiness.amenities.kidsArea}
                            sub={selectedBusiness.amenities.kidsArea ? 'Available' : 'Not available'}
                            icon={Baby}
                            okColor="rgba(216,180,254,0.22)"
                          />
                          <AmenityCard
                            title="Outdoor seating"
                            ok={selectedBusiness.amenities.outdoorSeating}
                            sub={selectedBusiness.amenities.outdoorSeating ? 'Available' : 'Not available'}
                            icon={Trees}
                            okColor="rgba(52,211,153,0.22)"
                          />
                          <AmenityCard
                            title="Accessible"
                            ok={selectedBusiness.amenities.wheelchairAccessible}
                            sub={selectedBusiness.amenities.wheelchairAccessible ? 'Wheelchair friendly' : 'Not accessible'}
                            icon={Accessibility}
                            okColor="rgba(96,165,250,0.22)"
                          />
                          <AmenityCard
                            title="Parking"
                            ok={selectedBusiness.amenities.parking}
                            sub={selectedBusiness.amenities.parking ? 'Available' : 'Not available'}
                            icon={Car}
                            okColor="rgba(251,191,36,0.22)"
                          />
                          <AmenityCard
                            title="Pet friendly"
                            ok={selectedBusiness.amenities.petFriendly}
                            sub={selectedBusiness.amenities.petFriendly ? 'Pets welcome' : 'No pets'}
                            icon={PawPrint}
                            okColor="rgba(251,113,133,0.22)"
                          />
                        </div>
                      )}

                      {/* MENU */}
                      {selectedTab === 'menu' && (
                        <div className="space-y-4">
                          {selectedBusiness.menu.hasDigitalMenu && (
                            <a
                              href={selectedBusiness.menu.menuLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block p-5 rounded-2xl border transition group"
                              style={{
                                background: 'rgba(255,255,255,0.06)',
                                borderColor: 'rgba(96,165,250,0.35)',
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.18)' }}>
                                    <ExternalLink className="w-6 h-6 text-blue-300" />
                                  </div>
                                  <div>
                                    <div className="font-semibold mb-1">View Digital Menu</div>
                                    <div className="text-xs text-white/70">Full menu with prices</div>
                                  </div>
                                </div>
                                <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white/70 transition" />
                              </div>
                            </a>
                          )}

                          <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                            <div className="text-xs uppercase tracking-wider text-white/70 mb-3">Specialties</div>
                            <div className="space-y-2">
                              {selectedBusiness.menu.specialties.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: codeData.color }} />
                                  <span className="text-sm text-white/90">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                            <div className="text-xs uppercase tracking-wider text-white/70 mb-3">Dietary options</div>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.menu.dietary.map((item) => (
                                <span key={item} className="px-3 py-2 rounded-full border text-sm"
                                      style={{ background: 'rgba(52,211,153,0.14)', borderColor: 'rgba(52,211,153,0.35)', color: 'rgba(255,255,255,0.90)' }}>
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PRACTICAL */}
                      {selectedTab === 'practical' && (
                        <div className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                              <div className="flex items-center gap-2 mb-3">
                                <CreditCard className="w-5 h-5" style={{ color: codeData.color }} />
                                <h4 className="text-xs uppercase tracking-wider text-white/70">Payment</h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedBusiness.practical.payment.map((method) => (
                                  <span key={method} className="px-3 py-2 rounded-full bg-white/10 border border-white/10 text-xs text-white/90">
                                    {method}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                              <div className="flex items-center gap-2 mb-3">
                                <Clock className="w-5 h-5" style={{ color: codeData.color }} />
                                <h4 className="text-xs uppercase tracking-wider text-white/70">Hours</h4>
                              </div>
                              <p className="text-sm text-white/90">{selectedBusiness.practical.hours}</p>
                            </div>
                          </div>

                          <div className="p-5 rounded-2xl border" style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}>
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar className="w-5 h-5" style={{ color: codeData.color }} />
                              <h4 className="text-xs uppercase tracking-wider text-white/70">Booking</h4>
                            </div>
                            <p className="text-sm text-white/90">
                              {selectedBusiness.practical.bookingRequired ? 'Reservation required' : 'Walk-ins welcome'}
                            </p>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <a
                              href={`tel:${selectedBusiness.practical.phone}`}
                              className="p-5 rounded-2xl border transition"
                              style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}
                            >
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-white/70" />
                                <div>
                                  <div className="text-xs text-white/65 mb-1">Phone</div>
                                  <div className="text-sm text-white/90">{selectedBusiness.practical.phone}</div>
                                </div>
                              </div>
                            </a>

                            <a
                              href={`mailto:${selectedBusiness.practical.email}`}
                              className="p-5 rounded-2xl border transition"
                              style={{ background: 'rgba(255,255,255,0.06)', borderColor: BORDER_SOFT }}
                            >
                              <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-white/70" />
                                <div>
                                  <div className="text-xs text-white/65 mb-1">Email</div>
                                  <div className="text-sm text-white/90">{selectedBusiness.practical.email}</div>
                                </div>
                              </div>
                            </a>
                          </div>

                          <button
                            className="w-full p-5 rounded-2xl border transition group"
                            style={{ background: 'rgba(96,165,250,0.10)', borderColor: 'rgba(96,165,250,0.30)' }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Navigation className="w-6 h-6 text-blue-300" />
                                <div className="text-left">
                                  <div className="font-semibold mb-1">Get directions</div>
                                  <div className="text-xs text-white/70">{selectedBusiness.distance} away</div>
                                </div>
                              </div>
                              <ExternalLink className="w-5 h-5 text-white/40 group-hover:text-white/70 transition" />
                            </div>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom actions */}
                <div className="p-4 sm:p-6 border-t flex gap-3"
                     style={{ borderColor: BORDER_SOFT, background: 'rgba(0,0,0,0.22)' }}>
                  <button className="flex-1 px-6 py-3 rounded-2xl font-semibold transition"
                          style={{ background: 'rgba(255,255,255,0.92)', color: '#000' }}>
                    Book Now
                  </button>
                  <button className="px-6 py-3 rounded-2xl font-semibold border transition"
                          style={{ borderColor: BORDER, background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.92)' }}>
                    Share
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}

/* =========================================================
   Amenity Card component
========================================================= */

function AmenityCard({
  title,
  ok,
  sub,
  icon: Icon,
  okColor,
}: {
  title: string;
  ok: boolean;
  sub: string;
  icon: any;
  okColor: string;
}) {
  return (
    <div
      className="p-4 rounded-2xl border"
      style={{
        background: ok ? okColor : 'rgba(255,255,255,0.06)',
        borderColor: ok ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.10)',
      }}
    >
      <div className="flex items-center gap-3">
        <Icon className={cn('w-5 h-5', ok ? 'text-white' : 'text-white/45')} />
        <div>
          <div className="text-sm font-semibold text-white">{title}</div>
          <div className="text-xs text-white/75">{sub}</div>
        </div>
      </div>
    </div>
  );
}
