'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  BadgeCheck,
  Baby,
  Car,
  Calendar,
  Clock,
  Compass,
  CreditCard,
  ExternalLink,
  Heart,
  Info,
  Lightbulb,
  Mail,
  MapPin,
  Music,
  Navigation,
  PawPrint,
  Phone,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
  Trees,
  Utensils,
  Volume2,
  Wifi,
  X,
  Zap,
} from 'lucide-react';

/* =========================================================
   ETHOS MARKETPLACE — LIGHT TRAVEL SYSTEM (NOT DARK SAAS)
========================================================= */

const MARKET_BG_IMAGE = '/images/background/ethos-coastal-hero.webp';

/** Light editorial base */
const THEME = {
  pageBg: '#F8FAFC', // sky white
  ink: '#0F172A', // slate-900
  inkSub: '#475569', // slate-600
  inkMuted: '#64748B', // slate-500
  border: 'rgba(15,23,42,0.08)',
  borderSoft: 'rgba(15,23,42,0.05)',
  surface: 'rgba(255,255,255,0.86)', // postcard
  surfaceSoft: 'rgba(255,255,255,0.68)', // guide panel
  surfaceGlass: 'rgba(255,255,255,0.52)', // airy glass (light, not cyber)
  shadow: '0 18px 55px rgba(15,23,42,0.10), 0 2px 10px rgba(15,23,42,0.06)',
  shadowSoft: '0 14px 40px rgba(15,23,42,0.08), 0 2px 8px rgba(15,23,42,0.05)',
};

/* =========================================================
   HELPERS
========================================================= */

function cn(...xs: Array<string | false | undefined | null>) {
  return xs.filter(Boolean).join(' ');
}

function parseKm(distance: string) {
  const n = parseFloat(distance);
  return Number.isFinite(n) ? n : 9999;
}

/* =========================================================
   CULTURAL CODE DATA (keep your IDs)
   - keep this map structure: used for accent color + heading
========================================================= */

const CULTURAL_CODES = {
  khoisan: { name: 'KHOISAN', tagline: 'Hyper-Acute Perception', color: '#F59E0B' },
  kayori: { name: 'KÁYORI', tagline: 'Expressive Ritual Creativity', color: '#D946EF' },
  sahen: { name: 'SAHÉN', tagline: 'Desert Wisdom', color: '#FBBF24' },
  enzuka: { name: 'ENZUKA', tagline: 'Warrior Discipline', color: '#FB7185' },
  siyuane: { name: 'SIYUANÉ', tagline: 'Generational Harmony', color: '#34D399' },
  jaejin: { name: 'JAEJIN', tagline: 'Compressed Emotion (Han)', color: '#94A3B8' },
  namsea: { name: 'NAMSÉA', tagline: 'Water-Based Cognition', color: '#22D3EE' },
  shokunin: { name: 'SHOKUNIN', tagline: 'Perfectionist Craftsmanship', color: '#FB7185' },
  khoruun: { name: 'KHORUUN', tagline: 'Nomadic Mobility', color: '#D6D3D1' },
  lhumir: { name: 'LHUMIR', tagline: 'Contemplative Consciousness', color: '#A78BFA' },
  yatevar: { name: 'YATEVAR', tagline: 'Warrior-Philosopher', color: '#FB923C' },
  renara: { name: 'RÉNARA', tagline: 'Refined Subtlety (Halus)', color: '#34D399' },
  karayni: { name: 'KARAYNI', tagline: 'Sacred Reciprocity', color: '#FBBF24' },
  wohaka: { name: 'WÓHAKA', tagline: 'All Beings as Kin', color: '#2DD4BF' },
  tjukari: { name: 'TJUKARI', tagline: 'Dreamtime Cosmology', color: '#FB7185' },
  kinmora: { name: 'KINMORA', tagline: 'Mathematical Cosmology', color: '#A3E635' },
  siljoa: { name: 'SILJOA', tagline: 'Arctic Intelligence', color: '#60A5FA' },
  skenari: { name: 'SKÉNARI', tagline: 'Seventh Generation', color: '#34D399' },
  ashkara: { name: 'ASHKARA', tagline: 'Truth as Sacred Action', color: '#FB923C' },
  alethir: { name: 'ALÉTHIR', tagline: 'Logos-Centered Inquiry', color: '#60A5FA' },
};

type Business = {
  id: string;
  name: string;
  category: string;
  location: string;
  city: string;
  images: { url: string; label: string }[];
  matchScore: number;
  priceRange: string;
  rating: number;
  reviews: number;
  tags: string[];
  openNow: boolean;
  distance: string;
  compatibleCodes: string[];
  musicStyle: string;
  atmosphere: string;
  lighting: string;
  noiseLevel: string;
  bestFor: string[];
  seating: number;
  ownerStory: string;
  amenities: {
    powerOutlets: boolean;
    wifi: string;
    kidsArea: boolean;
    outdoorSeating: boolean;
    wheelchairAccessible: boolean;
    parking: boolean;
    petFriendly: boolean;
  };
  menu: {
    hasDigitalMenu: boolean;
    menuLink: string;
    specialties: string[];
    dietary: string[];
  };
  practical: {
    payment: string[];
    hours: string;
    bookingRequired: boolean;
    phone: string;
    email: string;
  };
};

/** Replace with your real dataset later; this keeps your structure intact. */
const DEMO_BUSINESSES: Business[] = [
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
    compatibleCodes: ['siljoa', 'shokunin', 'jaejin'],
    musicStyle: 'Lo-fi, Ambient, Minimal Techno',
    atmosphere: 'Minimal conversation, natural materials, indirect lighting',
    lighting: 'Soft natural light during day, warm lamps at night',
    noiseLevel: 'Very quiet (30–40 dB)',
    bestFor: ['Solo work', 'Reading', 'Quiet conversations'],
    seating: 18,
    ownerStory:
      'Founded by a former architect who believes coffee spaces should mirror meditation halls — designed for presence, not performance.',
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
      hours: 'Mon–Fri 7am–7pm, Sat–Sun 8am–6pm',
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
    compatibleCodes: ['siljoa', 'wohaka', 'karayni'],
    musicStyle: 'Afrobeats, Highlife, Amapiano, Live Jazz',
    atmosphere: 'Shared tables, storytelling encouraged, communal dining',
    lighting: 'Warm pendants, candles',
    noiseLevel: 'Moderate to lively (65–75 dB)',
    bestFor: ['Group dinners', 'Meeting people', 'Celebrations'],
    seating: 48,
    ownerStory:
      'Built around radical togetherness — the kind where strangers leave feeling like family.',
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
      specialties: ['Family platters', 'Cape cuisine', 'Communal desserts'],
      dietary: ['Vegetarian', 'Halal options'],
    },
    practical: {
      payment: ['Card', 'Mobile pay'],
      hours: 'Tue–Sun 5pm–11pm, Closed Mondays',
      bookingRequired: true,
      phone: '+27-21-123-4567',
      email: 'info@ubuntukitchen.co.za',
    },
  },
];

const CITIES = ['All Cities', 'Tokyo', 'Cape Town'];
const CATEGORIES = ['All', 'Café', 'Restaurant', 'Workspace', 'Wellness'];
const PRICE_RANGES = ['All', '$', '$$', '$$$', '$$$$'];
const SORT_OPTIONS = ['Best Match', 'Highest Rated', 'Most Reviews', 'Nearest'] as const;

/* =========================================================
   MOTION (more evolved, not flashier)
========================================================= */

const easeOut = [0.16, 1, 0.3, 1] as const;

const staggerGrid = {
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
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: easeOut } },
};

/* =========================================================
   CHIP (active filters)
========================================================= */

function FilterChip({
  label,
  onRemove,
  accent,
}: {
  label: string;
  onRemove: () => void;
  accent: string;
}) {
  return (
    <motion.button
      layout
      onClick={onRemove}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
      style={{
        background: THEME.surfaceSoft,
        border: `1px solid ${THEME.border}`,
        color: THEME.ink,
        boxShadow: '0 6px 18px rgba(15,23,42,0.06)',
      }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
    >
      <span
        className="h-2 w-2 rounded-full"
        style={{ background: accent, boxShadow: `0 0 0 4px ${accent}22` }}
      />
      {label}
      <X className="w-3.5 h-3.5 opacity-60" />
    </motion.button>
  );
}

/* =========================================================
   AMENITY CARD
========================================================= */

function AmenityCard({
  title,
  ok,
  sub,
  icon: Icon,
  accent,
}: {
  title: string;
  ok: boolean;
  sub: string;
  icon: any;
  accent: string;
}) {
  return (
    <div
      className="p-4 rounded-2xl"
      style={{
        background: ok ? `${accent}12` : THEME.surface,
        border: `1px solid ${ok ? `${accent}24` : THEME.border}`,
        boxShadow: THEME.shadowSoft,
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{
            background: ok ? `${accent}18` : 'rgba(15,23,42,0.06)',
            border: `1px solid ${ok ? `${accent}24` : THEME.border}`,
          }}
        >
          <Icon className={cn('w-5 h-5', ok ? '' : 'opacity-60')} style={{ color: ok ? accent : THEME.inkSub }} />
        </div>
        <div>
          <div className="text-sm font-semibold" style={{ color: THEME.ink }}>
            {title}
          </div>
          <div className="text-xs" style={{ color: THEME.inkSub }}>
            {sub}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function MarketplacePage() {
  const reduceMotion = useReducedMotion();
  const params = useParams();
  const router = useRouter();
  const codeId = (params.code as string) || 'siljoa';

  const codeData =
    CULTURAL_CODES[codeId as keyof typeof CULTURAL_CODES] ?? CULTURAL_CODES.siljoa;

  const accent = codeData.color;

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

  // Search (debounced-ish without dependency)
  const [query, setQuery] = useState('');
  const [queryLive, setQueryLive] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setQuery(queryLive), 120);
    return () => clearTimeout(t);
  }, [queryLive]);

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
    setQueryLive('');
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
    if (query.trim()) chips.push({ key: 'q', label: `Search: ${query.trim()}`, remove: () => setQueryLive('') });
    if (selectedCity !== 'All Cities') chips.push({ key: 'city', label: selectedCity, remove: () => setSelectedCity('All Cities') });
    if (selectedCategory !== 'All') chips.push({ key: 'cat', label: selectedCategory, remove: () => setSelectedCategory('All') });
    if (selectedPrice !== 'All') chips.push({ key: 'price', label: `Price: ${selectedPrice}`, remove: () => setSelectedPrice('All') });
    if (minMatch !== 80) chips.push({ key: 'min', label: `Min match: ${minMatch}%`, remove: () => setMinMatch(80) });
    if (showOpenOnly) chips.push({ key: 'open', label: 'Open now', remove: () => setShowOpenOnly(false) });
    return chips;
  }, [query, selectedCity, selectedCategory, selectedPrice, minMatch, showOpenOnly]);

  return (
    <LayoutGroup>
      <div className="min-h-screen relative" style={{ background: THEME.pageBg }}>
        {/* =====================================================
           BACKGROUND — bright travel + calm grade (NOT DARK)
        ====================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Image
            src={MARKET_BG_IMAGE}
            alt=""
            fill
            priority
            className="object-cover opacity-[0.88]"
            sizes="100vw"
          />
          {/* Coastal editorial wash */}
          <div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(180deg, rgba(248,250,252,0.40) 0%, rgba(248,250,252,0.88) 55%, rgba(248,250,252,0.98) 100%),
                radial-gradient(1200px circle at 18% 12%, rgba(56,189,248,0.22), transparent 60%),
                radial-gradient(1000px circle at 82% 14%, rgba(251,191,36,0.20), transparent 55%),
                radial-gradient(1100px circle at 50% 40%, ${accent}14, transparent 62%)
              `,
            }}
          />
          {/* subtle grain */}
          <div
            className="absolute inset-0 opacity-[0.10]"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27240%27 height=%27240%27%3E%3Cfilter id=%27n%27 x=%270%27 y=%270%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.85%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27240%27 height=%27240%27 filter=%27url(%23n)%27 opacity=%270.50%27/%3E%3C/svg%3E")',
            }}
          />
        </div>

        {/* =====================================================
           TOP BAR — airy + sticky + premium
        ====================================================== */}
        <header
          className="sticky top-0 z-50"
          style={{
            backdropFilter: 'blur(14px)',
            background: 'rgba(248,250,252,0.68)',
            borderBottom: `1px solid ${THEME.borderSoft}`,
          }}
        >
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-4 min-w-0">
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 hover:opacity-80 transition shrink-0"
                  style={{ color: THEME.ink }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm hidden sm:inline">Home</span>
                </button>

                <div className="h-6 w-px hidden sm:block" style={{ background: THEME.borderSoft }} />

                <div className="min-w-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}22` }}
                    />
                    <h1 className="text-sm font-semibold truncate" style={{ color: THEME.ink }}>
                      {codeData.name}
                    </h1>
                    <span className="hidden md:inline text-xs truncate" style={{ color: THEME.inkSub }}>
                      — {codeData.tagline}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div
                  className="hidden lg:flex items-center gap-2 rounded-full px-3 py-2"
                  style={{ background: THEME.surfaceSoft, border: `1px solid ${THEME.border}` }}
                >
                  <Search className="w-4 h-4" style={{ color: THEME.inkMuted }} />
                  <input
                    value={queryLive}
                    onChange={(e) => setQueryLive(e.target.value)}
                    placeholder="Search places, tags, locations…"
                    className="bg-transparent outline-none text-sm w-[290px]"
                    style={{ color: THEME.ink }}
                  />
                </div>

                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-full"
                  style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
                >
                  <SlidersHorizontal className="w-4 h-4" style={{ color: THEME.ink }} />
                  <span className="text-sm" style={{ color: THEME.ink }}>
                    Filters
                  </span>
                </button>
              </div>
            </div>

            {/* Active chips */}
            <motion.div layout className="mt-3 flex flex-wrap items-center gap-2">
              {activeChips.slice(0, 8).map((c) => (
                <FilterChip key={c.key} label={c.label} onRemove={c.remove} accent={accent} />
              ))}

              {hasActiveFilters && (
                <motion.button
                  layout
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs"
                  style={{
                    background: 'rgba(15,23,42,0.04)',
                    border: `1px solid ${THEME.border}`,
                    color: THEME.ink,
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <RotateCcw className="w-3.5 h-3.5 opacity-70" />
                  Clear all
                </motion.button>
              )}
            </motion.div>
          </div>
        </header>

        {/* =====================================================
           CODE BANNER — travel editorial, bright, calm
        ====================================================== */}
        <section className="relative z-10">
          <div className="max-w-[1800px] mx-auto px-4 sm:px-6 pt-7 pb-5">
            <div
              className="rounded-[28px] overflow-hidden"
              style={{
                background: THEME.surfaceGlass,
                border: `1px solid ${THEME.borderSoft}`,
                boxShadow: THEME.shadowSoft,
                backdropFilter: 'blur(10px)',
              }}
            >
              <div className="p-6 sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                      Marketplace
                    </div>
                    <h2 className="mt-2 text-xl sm:text-2xl font-semibold" style={{ color: THEME.ink }}>
                      Marketplace for <span style={{ color: accent }}>{codeData.name}</span>
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed max-w-3xl" style={{ color: THEME.inkSub }}>
                      Curated environments where <span style={{ color: THEME.ink }}>{codeData.tagline.toLowerCase()}</span>{' '}
                      comes naturally — with vibe, practical details, and a match score that actually makes sense.
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-2xl font-bold" style={{ color: THEME.ink }}>
                      {filteredBusinesses.length}
                    </div>
                    <div className="text-xs" style={{ color: THEME.inkSub }}>
                      matches
                    </div>
                  </div>
                </div>

                {/* subtle accent rule */}
                <div className="mt-5 h-[2px] rounded-full" style={{ background: `linear-gradient(90deg, transparent, ${accent}70, transparent)` }} />
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
           MAIN LAYOUT — sidebar + results
        ====================================================== */}
        <div className="max-w-[1800px] mx-auto flex relative z-10">
          {/* Sidebar (desktop) */}
          <aside
            className="hidden lg:block lg:sticky lg:top-[118px] h-[calc(100vh-118px)] overflow-y-auto w-80 px-4 pb-10"
          >
            <div
              className="rounded-[28px] p-4 space-y-6"
              style={{
                background: THEME.surfaceGlass,
                border: `1px solid ${THEME.borderSoft}`,
                boxShadow: THEME.shadowSoft,
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Search */}
              <div className="space-y-2">
                <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                  Search
                </div>
                <div
                  className="flex items-center gap-2 rounded-2xl px-3 py-2"
                  style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
                >
                  <Search className="w-4 h-4" style={{ color: THEME.inkMuted }} />
                  <input
                    value={queryLive}
                    onChange={(e) => setQueryLive(e.target.value)}
                    placeholder="Name, vibe tags, location…"
                    className="bg-transparent outline-none text-sm w-full"
                    style={{ color: THEME.ink }}
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                  Location
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="mt-2 w-full px-3 py-2 rounded-2xl text-sm outline-none"
                  style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, color: THEME.ink }}
                >
                  {CITIES.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                  Category
                </label>
                <div className="mt-2 space-y-1">
                  {CATEGORIES.map((cat) => {
                    const active = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className="w-full text-left px-3 py-2 rounded-2xl text-sm transition"
                        style={{
                          background: active ? `${accent}14` : 'transparent',
                          border: `1px solid ${active ? `${accent}22` : THEME.borderSoft}`,
                          color: active ? THEME.ink : THEME.inkSub,
                        }}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                  Price
                </label>
                <div className="mt-2 flex gap-2">
                  {PRICE_RANGES.map((price) => {
                    const active = selectedPrice === price;
                    return (
                      <button
                        key={price}
                        onClick={() => setSelectedPrice(price)}
                        className="flex-1 px-2 py-2 rounded-2xl text-xs transition"
                        style={{
                          background: active ? `${accent}16` : THEME.surface,
                          border: `1px solid ${active ? `${accent}22` : THEME.border}`,
                          color: active ? THEME.ink : THEME.inkSub,
                        }}
                      >
                        {price}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Min match */}
              <div
                className="rounded-[22px] p-4"
                style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
              >
                <div className="flex items-center justify-between">
                  <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                    Min match
                  </label>
                  <div className="text-sm font-semibold" style={{ color: THEME.ink }}>
                    {minMatch}%
                  </div>
                </div>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={minMatch}
                  onChange={(e) => setMinMatch(Number(e.target.value))}
                  className="w-full mt-3"
                  style={{ accentColor: accent as any }}
                />
                <div className="mt-2 text-xs" style={{ color: THEME.inkMuted }}>
                  Higher match = more aligned environments.
                </div>
              </div>

              {/* Open now */}
              <button
                onClick={() => setShowOpenOnly(!showOpenOnly)}
                className="flex items-center justify-between w-full px-3 py-3 rounded-[22px] transition"
                style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
              >
                <span className="text-sm" style={{ color: THEME.ink }}>
                  Open now only
                </span>
                <div
                  className="w-11 h-6 rounded-full transition"
                  style={{ background: showOpenOnly ? `${accent}55` : 'rgba(15,23,42,0.10)' }}
                >
                  <div
                    className="w-5 h-5 mt-0.5 rounded-full transition-transform"
                    style={{
                      background: '#fff',
                      boxShadow: '0 10px 20px rgba(15,23,42,0.12)',
                      transform: `translateX(${showOpenOnly ? 22 : 2}px)`,
                    }}
                  />
                </div>
              </button>

              {/* Reset */}
              <button
                onClick={resetFilters}
                className="w-full px-3 py-3 text-sm rounded-[22px] transition"
                style={{
                  background: 'rgba(15,23,42,0.04)',
                  border: `1px solid ${THEME.border}`,
                  color: THEME.ink,
                }}
              >
                Reset filters
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="flex-1 min-w-0 px-4 sm:px-6 pb-16">
            {/* Sticky toolbar */}
            <div
              className="sticky z-30"
              style={{
                top: 118,
                paddingTop: 14,
                paddingBottom: 10,
                background: 'linear-gradient(180deg, rgba(248,250,252,0.90), rgba(248,250,252,0.72))',
                backdropFilter: 'blur(10px)',
              }}
            >
              <div
                className="flex items-center justify-between gap-3 rounded-[22px] px-4 py-3"
                style={{ background: THEME.surfaceGlass, border: `1px solid ${THEME.borderSoft}`, boxShadow: THEME.shadowSoft }}
              >
                <div className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="w-4 h-4" style={{ color: THEME.inkMuted }} />
                  <span style={{ color: THEME.ink }}>
                    {filteredBusinesses.length} result{filteredBusinesses.length !== 1 ? 's' : ''}
                  </span>
                  {hasActiveFilters && <span style={{ color: THEME.inkSub }}>• refined</span>}
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 rounded-full text-sm outline-none"
                    style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, color: THEME.ink }}
                  >
                    {SORT_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => router.push('/quiz')}
                    className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
                    style={{ background: THEME.ink, color: '#fff' }}
                  >
                    <Compass className="w-4 h-4" />
                    Take quiz
                  </button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <motion.div
              variants={staggerGrid}
              initial="hidden"
              animate="show"
              custom={!!reduceMotion}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4"
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
                      className="relative overflow-hidden rounded-[28px]"
                      style={{
                        background: THEME.surface,
                        border: `1px solid ${THEME.border}`,
                        boxShadow: THEME.shadow,
                      }}
                      whileHover={reduceMotion ? undefined : { y: -8 }}
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

                        {/* soft readability */}
                        <div
                          className="absolute inset-0"
                          style={{
                            background:
                              'linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.30))',
                          }}
                        />

                        {/* Match pill */}
                        <div
                          className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-xs font-bold"
                          style={{
                            background: 'rgba(255,255,255,0.86)',
                            border: `1px solid ${THEME.borderSoft}`,
                            color: THEME.ink,
                            boxShadow: '0 10px 30px rgba(15,23,42,0.10)',
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
                          className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition"
                          style={{
                            background: 'rgba(255,255,255,0.86)',
                            border: `1px solid ${THEME.borderSoft}`,
                            boxShadow: '0 10px 30px rgba(15,23,42,0.10)',
                          }}
                        >
                          <Heart
                            className={cn(
                              'w-4 h-4',
                              favorites.has(business.id) ? 'fill-red-500 text-red-500' : ''
                            )}
                            style={{ color: favorites.has(business.id) ? undefined : THEME.ink }}
                          />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div>
                          <h3 className="font-semibold text-[15px] line-clamp-1" style={{ color: THEME.ink }}>
                            {business.name}
                          </h3>

                          <div className="flex items-center gap-1.5 text-xs mt-1" style={{ color: THEME.inkSub }}>
                            <MapPin className="w-3.5 h-3.5 opacity-80" />
                            <span className="line-clamp-1">{business.location}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1.5">
                            <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                            <span className="font-semibold" style={{ color: THEME.ink }}>
                              {business.rating}
                            </span>
                            <span style={{ color: THEME.inkMuted }}>({business.reviews})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            {business.openNow && (
                              <span className="font-semibold" style={{ color: '#059669' }}>
                                Open
                              </span>
                            )}
                            <span style={{ color: THEME.inkSub }}>{business.priceRange}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {business.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-full text-[11px]"
                              style={{
                                background: 'rgba(15,23,42,0.05)',
                                border: `1px solid ${THEME.borderSoft}`,
                                color: THEME.inkSub,
                              }}
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
          </main>
        </div>

        {/* =====================================================
           MOBILE FILTER SHEET — light bottom sheet (not dark)
        ====================================================== */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              className="fixed inset-0 z-[90]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFilters(false)}
            >
              <motion.div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ y: 44, opacity: 0, scale: 0.99 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 44, opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.35, ease: easeOut }}
                className="absolute left-0 right-0 bottom-0 rounded-t-[28px] overflow-hidden"
                style={{
                  background: 'rgba(248,250,252,0.92)',
                  borderTop: `1px solid ${THEME.borderSoft}`,
                }}
              >
                <div className="p-4 flex items-center justify-between">
                  <div className="text-sm font-semibold" style={{ color: THEME.ink }}>
                    Filters
                  </div>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
                  >
                    <X className="w-4 h-4" style={{ color: THEME.ink }} />
                  </button>
                </div>

                <div className="px-4 pb-5 space-y-5 max-h-[72vh] overflow-y-auto">
                  <div className="space-y-2">
                    <div className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                      Search
                    </div>
                    <div
                      className="flex items-center gap-2 rounded-2xl px-3 py-2"
                      style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
                    >
                      <Search className="w-4 h-4" style={{ color: THEME.inkMuted }} />
                      <input
                        value={queryLive}
                        onChange={(e) => setQueryLive(e.target.value)}
                        placeholder="Name, tags, location…"
                        className="bg-transparent outline-none text-sm w-full"
                        style={{ color: THEME.ink }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                      Location
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="mt-2 w-full px-3 py-2 rounded-2xl text-sm outline-none"
                      style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, color: THEME.ink }}
                    >
                      {CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                      Category
                    </label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => {
                        const active = selectedCategory === cat;
                        return (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className="px-3 py-2 rounded-full text-xs transition"
                            style={{
                              background: active ? `${accent}14` : THEME.surface,
                              border: `1px solid ${active ? `${accent}22` : THEME.border}`,
                              color: active ? THEME.ink : THEME.inkSub,
                            }}
                          >
                            {cat}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                      Price
                    </label>
                    <div className="mt-2 flex gap-2">
                      {PRICE_RANGES.map((price) => {
                        const active = selectedPrice === price;
                        return (
                          <button
                            key={price}
                            onClick={() => setSelectedPrice(price)}
                            className="flex-1 px-2 py-2 rounded-2xl text-xs transition"
                            style={{
                              background: active ? `${accent}16` : THEME.surface,
                              border: `1px solid ${active ? `${accent}22` : THEME.border}`,
                              color: active ? THEME.ink : THEME.inkSub,
                            }}
                          >
                            {price}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div
                    className="rounded-[22px] p-4"
                    style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
                  >
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                        Min match
                      </label>
                      <div className="text-sm font-semibold" style={{ color: THEME.ink }}>
                        {minMatch}%
                      </div>
                    </div>
                    <input
                      type="range"
                      min="70"
                      max="100"
                      value={minMatch}
                      onChange={(e) => setMinMatch(Number(e.target.value))}
                      className="w-full mt-3"
                      style={{ accentColor: accent as any }}
                    />
                  </div>

                  <button
                    onClick={() => setShowOpenOnly(!showOpenOnly)}
                    className="flex items-center justify-between w-full px-3 py-3 rounded-[22px] transition"
                    style={{ background: THEME.surface, border: `1px solid ${THEME.border}` }}
                  >
                    <span className="text-sm" style={{ color: THEME.ink }}>
                      Open now only
                    </span>
                    <div
                      className="w-11 h-6 rounded-full transition"
                      style={{ background: showOpenOnly ? `${accent}55` : 'rgba(15,23,42,0.10)' }}
                    >
                      <div
                        className="w-5 h-5 mt-0.5 rounded-full transition-transform"
                        style={{
                          background: '#fff',
                          boxShadow: '0 10px 20px rgba(15,23,42,0.12)',
                          transform: `translateX(${showOpenOnly ? 22 : 2}px)`,
                        }}
                      />
                    </div>
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={resetFilters}
                      className="flex-1 px-4 py-3 rounded-2xl text-sm transition"
                      style={{ background: 'rgba(15,23,42,0.04)', border: `1px solid ${THEME.border}`, color: THEME.ink }}
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="flex-1 px-4 py-3 rounded-2xl text-sm font-semibold transition"
                      style={{ background: THEME.ink, color: '#fff' }}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =====================================================
           DETAIL MODAL — shared-layout hero, light surfaces
        ====================================================== */}
        <AnimatePresence>
          {selectedBusiness && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4"
              onClick={() => setSelectedBusiness(null)}
            >
              <motion.div className="absolute inset-0 bg-black/25 backdrop-blur-sm" />

              <motion.div
                initial={{ scale: 0.97, opacity: 0, y: 14 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.97, opacity: 0, y: 14 }}
                transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-[30px]"
                style={{
                  background: THEME.surface,
                  border: `1px solid ${THEME.border}`,
                  boxShadow: '0 90px 320px rgba(15,23,42,0.22)',
                }}
              >
                {/* Close */}
                <button
                  onClick={() => setSelectedBusiness(null)}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.92)', border: `1px solid ${THEME.borderSoft}` }}
                >
                  <X className="w-5 h-5" style={{ color: THEME.ink }} />
                </button>

                {/* Header hero */}
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

                    {/* soft overlay for text */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          'linear-gradient(180deg, rgba(0,0,0,0.08), rgba(0,0,0,0.45))',
                      }}
                    />

                    <div className="relative p-6 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <div
                              className="px-3 py-1.5 rounded-full text-xs font-bold"
                              style={{
                                background: 'rgba(255,255,255,0.90)',
                                border: `1px solid ${THEME.borderSoft}`,
                                color: THEME.ink,
                              }}
                            >
                              {selectedBusiness.matchScore}% MATCH
                            </div>

                            {selectedBusiness.openNow && (
                              <div
                                className="flex items-center gap-1.5 px-2 py-1 rounded-full"
                                style={{
                                  background: 'rgba(16,185,129,0.18)',
                                  border: '1px solid rgba(16,185,129,0.28)',
                                  color: '#065F46',
                                }}
                              >
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                                <span className="text-xs font-semibold">OPEN NOW</span>
                              </div>
                            )}
                          </div>

                          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-2">
                            {selectedBusiness.name}
                          </h2>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-white/85">
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
                              <span className="text-2xl font-bold text-white">{selectedBusiness.rating}</span>
                            </div>
                            <div className="text-xs text-white/80">{selectedBusiness.reviews} reviews</div>
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(selectedBusiness.id);
                            }}
                            className="w-12 h-12 rounded-full flex items-center justify-center transition"
                            style={{ background: 'rgba(255,255,255,0.86)', border: `1px solid ${THEME.borderSoft}` }}
                          >
                            <Heart
                              className={cn(
                                'w-6 h-6',
                                favorites.has(selectedBusiness.id) ? 'fill-red-500 text-red-500' : ''
                              )}
                              style={{ color: favorites.has(selectedBusiness.id) ? undefined : THEME.ink }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div
                    className="border-b"
                    style={{
                      borderColor: THEME.borderSoft,
                      background: 'rgba(248,250,252,0.86)',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
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
                              'relative px-4 py-3 text-sm font-medium whitespace-nowrap flex items-center gap-2 transition'
                            )}
                            style={{ color: active ? THEME.ink : THEME.inkSub }}
                          >
                            <Icon className="w-4 h-4" style={{ color: active ? accent : THEME.inkMuted }} />
                            {tab.label}
                            {active && (
                              <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-2 right-2 h-[2px] rounded-full"
                                style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
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
                <div className="overflow-y-auto max-h-[calc(95vh-320px-54px-92px)]">
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
                          <div
                            className="rounded-[26px] overflow-hidden"
                            style={{ border: `1px solid ${THEME.border}`, background: THEME.surfaceSoft, boxShadow: THEME.shadowSoft }}
                          >
                            <div
                              className="flex gap-2 p-3"
                              style={{ borderBottom: `1px solid ${THEME.borderSoft}`, background: 'rgba(255,255,255,0.55)' }}
                            >
                              {selectedBusiness.images.map((img, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => setSelectedImageIndex(idx)}
                                  className="px-3 py-2 rounded-full text-xs font-semibold transition"
                                  style={{
                                    background: selectedImageIndex === idx ? `${accent}16` : 'rgba(15,23,42,0.04)',
                                    border: `1px solid ${selectedImageIndex === idx ? `${accent}22` : THEME.borderSoft}`,
                                    color: selectedImageIndex === idx ? THEME.ink : THEME.inkSub,
                                  }}
                                >
                                  {img.label}
                                </button>
                              ))}
                            </div>

                            <div className="relative h-[320px] sm:h-[440px] bg-white">
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
                            className="p-5 rounded-[26px]"
                            style={{
                              background: `${accent}10`,
                              border: `1px solid ${accent}22`,
                              boxShadow: THEME.shadowSoft,
                            }}
                          >
                            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: THEME.inkSub }}>
                              Cultural identity
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm" style={{ color: THEME.inkSub }}>
                                This is a
                              </span>
                              <span
                                className="px-4 py-2 rounded-full text-base font-bold"
                                style={{
                                  background: `${accent}18`,
                                  border: `1px solid ${accent}28`,
                                  color: THEME.ink,
                                }}
                              >
                                {CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES]?.name ??
                                  codeData.name}
                              </span>
                              <span className="text-sm" style={{ color: THEME.inkSub }}>
                                space
                              </span>
                            </div>
                          </div>

                          {/* Also loved by */}
                          <div>
                            <h3 className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: THEME.inkSub }}>
                              Also loved by
                            </h3>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.compatibleCodes.slice(1).map((code) => {
                                const c = CULTURAL_CODES[code as keyof typeof CULTURAL_CODES];
                                if (!c) return null;
                                return (
                                  <span
                                    key={code}
                                    className="px-3 py-2 rounded-full text-sm font-semibold"
                                    style={{
                                      background: `${c.color}12`,
                                      border: `1px solid ${c.color}22`,
                                      color: THEME.ink,
                                    }}
                                  >
                                    {c.name}
                                  </span>
                                );
                              })}
                            </div>
                          </div>

                          {/* Story */}
                          <div
                            className="p-5 rounded-[26px]"
                            style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}
                          >
                            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: THEME.inkSub }}>
                              Story
                            </div>
                            <p className="text-sm leading-relaxed italic" style={{ color: THEME.ink }}>
                              {selectedBusiness.ownerStory}
                            </p>
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
                              <div
                                key={x.label}
                                className="p-5 rounded-[26px]"
                                style={{
                                  background: THEME.surface,
                                  border: `1px solid ${THEME.border}`,
                                  boxShadow: THEME.shadowSoft,
                                }}
                              >
                                <div className="flex items-center gap-2 mb-3">
                                  <Icon className="w-5 h-5" style={{ color: accent }} />
                                  <h4 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                                    {x.label}
                                  </h4>
                                </div>
                                <p className="text-sm" style={{ color: THEME.ink }}>
                                  {x.value}
                                </p>
                              </div>
                            );
                          })}

                          <div
                            className="sm:col-span-2 p-5 rounded-[26px]"
                            style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}
                          >
                            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: THEME.inkSub }}>
                              Best for
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.bestFor.map((item) => (
                                <span
                                  key={item}
                                  className="px-3 py-2 rounded-full text-sm"
                                  style={{
                                    background: 'rgba(15,23,42,0.05)',
                                    border: `1px solid ${THEME.borderSoft}`,
                                    color: THEME.ink,
                                  }}
                                >
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
                          <AmenityCard title="Power outlets" ok={selectedBusiness.amenities.powerOutlets} sub={selectedBusiness.amenities.powerOutlets ? 'Available' : 'Not available'} icon={Zap} accent={accent} />
                          <AmenityCard title="WiFi" ok={!!selectedBusiness.amenities.wifi} sub={selectedBusiness.amenities.wifi || 'Not available'} icon={Wifi} accent={accent} />
                          <AmenityCard title="Kids area" ok={selectedBusiness.amenities.kidsArea} sub={selectedBusiness.amenities.kidsArea ? 'Available' : 'Not available'} icon={Baby} accent={accent} />
                          <AmenityCard title="Outdoor seating" ok={selectedBusiness.amenities.outdoorSeating} sub={selectedBusiness.amenities.outdoorSeating ? 'Available' : 'Not available'} icon={Trees} accent={accent} />
                          <AmenityCard title="Accessible" ok={selectedBusiness.amenities.wheelchairAccessible} sub={selectedBusiness.amenities.wheelchairAccessible ? 'Wheelchair friendly' : 'Not accessible'} icon={Navigation} accent={accent} />
                          <AmenityCard title="Parking" ok={selectedBusiness.amenities.parking} sub={selectedBusiness.amenities.parking ? 'Available' : 'Not available'} icon={Car} accent={accent} />
                          <AmenityCard title="Pet friendly" ok={selectedBusiness.amenities.petFriendly} sub={selectedBusiness.amenities.petFriendly ? 'Pets welcome' : 'No pets'} icon={PawPrint} accent={accent} />
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
                              className="block p-5 rounded-[26px] transition"
                              style={{
                                background: 'rgba(96,165,250,0.10)',
                                border: '1px solid rgba(96,165,250,0.20)',
                                boxShadow: THEME.shadowSoft,
                                color: THEME.ink,
                              }}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.18)' }}>
                                    <ExternalLink className="w-6 h-6" style={{ color: '#2563EB' }} />
                                  </div>
                                  <div>
                                    <div className="font-semibold mb-1">View Digital Menu</div>
                                    <div className="text-xs" style={{ color: THEME.inkSub }}>
                                      Full menu with prices
                                    </div>
                                  </div>
                                </div>
                                <ExternalLink className="w-5 h-5 opacity-60" />
                              </div>
                            </a>
                          )}

                          <div className="p-5 rounded-[26px]" style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}>
                            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: THEME.inkSub }}>
                              Specialties
                            </div>
                            <div className="space-y-2">
                              {selectedBusiness.menu.specialties.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accent }} />
                                  <span className="text-sm" style={{ color: THEME.ink }}>
                                    {item}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="p-5 rounded-[26px]" style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}>
                            <div className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: THEME.inkSub }}>
                              Dietary options
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.menu.dietary.map((item) => (
                                <span
                                  key={item}
                                  className="px-3 py-2 rounded-full text-sm"
                                  style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.18)', color: THEME.ink }}
                                >
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
                            <div className="p-5 rounded-[26px]" style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}>
                              <div className="flex items-center gap-2 mb-3">
                                <CreditCard className="w-5 h-5" style={{ color: accent }} />
                                <h4 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                                  Payment
                                </h4>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {selectedBusiness.practical.payment.map((method) => (
                                  <span key={method} className="px-3 py-2 rounded-full text-xs" style={{ background: 'rgba(15,23,42,0.05)', border: `1px solid ${THEME.borderSoft}`, color: THEME.ink }}>
                                    {method}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div className="p-5 rounded-[26px]" style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}>
                              <div className="flex items-center gap-2 mb-3">
                                <Clock className="w-5 h-5" style={{ color: accent }} />
                                <h4 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                                  Hours
                                </h4>
                              </div>
                              <p className="text-sm" style={{ color: THEME.ink }}>
                                {selectedBusiness.practical.hours}
                              </p>
                            </div>
                          </div>

                          <div className="p-5 rounded-[26px]" style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft }}>
                            <div className="flex items-center gap-2 mb-3">
                              <Calendar className="w-5 h-5" style={{ color: accent }} />
                              <h4 className="text-[11px] uppercase tracking-[0.22em]" style={{ color: THEME.inkSub }}>
                                Booking
                              </h4>
                            </div>
                            <p className="text-sm" style={{ color: THEME.ink }}>
                              {selectedBusiness.practical.bookingRequired ? 'Reservation required' : 'Walk-ins welcome'}
                            </p>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-4">
                            <a
                              href={`tel:${selectedBusiness.practical.phone}`}
                              className="p-5 rounded-[26px] transition"
                              style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft, color: THEME.ink }}
                            >
                              <div className="flex items-center gap-3">
                                <Phone className="w-5 h-5" style={{ color: THEME.inkSub }} />
                                <div>
                                  <div className="text-xs" style={{ color: THEME.inkMuted }}>
                                    Phone
                                  </div>
                                  <div className="text-sm">{selectedBusiness.practical.phone}</div>
                                </div>
                              </div>
                            </a>

                            <a
                              href={`mailto:${selectedBusiness.practical.email}`}
                              className="p-5 rounded-[26px] transition"
                              style={{ background: THEME.surface, border: `1px solid ${THEME.border}`, boxShadow: THEME.shadowSoft, color: THEME.ink }}
                            >
                              <div className="flex items-center gap-3">
                                <Mail className="w-5 h-5" style={{ color: THEME.inkSub }} />
                                <div>
                                  <div className="text-xs" style={{ color: THEME.inkMuted }}>
                                    Email
                                  </div>
                                  <div className="text-sm">{selectedBusiness.practical.email}</div>
                                </div>
                              </div>
                            </a>
                          </div>

                          <button
                            className="w-full p-5 rounded-[26px] transition"
                            style={{ background: `${accent}10`, border: `1px solid ${accent}22`, boxShadow: THEME.shadowSoft, color: THEME.ink }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Navigation className="w-6 h-6" style={{ color: accent }} />
                                <div className="text-left">
                                  <div className="font-semibold mb-1">Get directions</div>
                                  <div className="text-xs" style={{ color: THEME.inkSub }}>
                                    {selectedBusiness.distance} away
                                  </div>
                                </div>
                              </div>
                              <ExternalLink className="w-5 h-5 opacity-60" />
                            </div>
                          </button>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom actions */}
                <div
                  className="p-4 sm:p-6 border-t flex gap-3"
                  style={{
                    borderColor: THEME.borderSoft,
                    background: 'rgba(248,250,252,0.86)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <button
                    className="flex-1 px-6 py-3 rounded-2xl font-semibold transition"
                    style={{ background: THEME.ink, color: '#fff' }}
                  >
                    Book Now
                  </button>
                  <button
                    className="px-6 py-3 rounded-2xl font-semibold transition"
                    style={{ background: 'rgba(15,23,42,0.04)', border: `1px solid ${THEME.border}`, color: THEME.ink }}
                  >
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
