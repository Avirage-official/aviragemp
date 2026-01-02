'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Heart, 
  X,
  Clock,
  DollarSign,
  Users,
  Map,
  SlidersHorizontal,
  Music,
  Lightbulb,
  Volume2,
  BookOpen,
  ChevronRight
} from 'lucide-react';

// Cultural Code data
const CULTURAL_CODES = {
  khoisan: { name: 'KHOISAN', tagline: 'Hyper-Acute Perception', gradient: 'from-amber-900 via-orange-800 to-amber-700', color: '#d97706' },
  kayori: { name: 'KÁYORI', tagline: 'Expressive Ritual Creativity', gradient: 'from-purple-900 via-fuchsia-800 to-purple-700', color: '#a855f7' },
  sahen: { name: 'SAHÉN', tagline: 'Desert Wisdom', gradient: 'from-yellow-900 via-amber-800 to-yellow-700', color: '#f59e0b' },
  enzuka: { name: 'ENZUKA', tagline: 'Warrior Discipline', gradient: 'from-red-900 via-orange-800 to-red-700', color: '#dc2626' },
  siyuane: { name: 'SIYUANÉ', tagline: 'Generational Harmony', gradient: 'from-emerald-900 via-teal-800 to-emerald-700', color: '#059669' },
  jaejin: { name: 'JAEJIN', tagline: 'Compressed Emotion (Han)', gradient: 'from-slate-800 via-blue-900 to-slate-700', color: '#475569' },
  namsea: { name: 'NAMSÉA', tagline: 'Water-Based Cognition', gradient: 'from-cyan-900 via-blue-800 to-cyan-700', color: '#0891b2' },
  shokunin: { name: 'SHOKUNIN', tagline: 'Perfectionist Craftsmanship', gradient: 'from-rose-900 via-pink-800 to-rose-700', color: '#e11d48' },
  khoruun: { name: 'KHORUUN', tagline: 'Nomadic Mobility', gradient: 'from-stone-800 via-gray-700 to-stone-700', color: '#57534e' },
  lhumir: { name: 'LHUMIR', tagline: 'Contemplative Consciousness', gradient: 'from-indigo-900 via-purple-800 to-indigo-700', color: '#6366f1' },
  yatevar: { name: 'YATEVAR', tagline: 'Warrior-Philosopher', gradient: 'from-orange-900 via-amber-800 to-orange-700', color: '#ea580c' },
  renara: { name: 'RÉNARA', tagline: 'Refined Subtlety (Halus)', gradient: 'from-emerald-800 via-green-700 to-emerald-700', color: '#10b981' },
  karayni: { name: 'KARAYNI', tagline: 'Sacred Reciprocity', gradient: 'from-yellow-800 via-orange-700 to-yellow-700', color: '#f59e0b' },
  wohaka: { name: 'WÓHAKA', tagline: 'All Beings as Kin', gradient: 'from-teal-900 via-cyan-800 to-teal-700', color: '#14b8a6' },
  tjukari: { name: 'TJUKARI', tagline: 'Dreamtime Cosmology', gradient: 'from-red-800 via-orange-700 to-red-700', color: '#dc2626' },
  kinmora: { name: 'KINMORA', tagline: 'Mathematical Cosmology', gradient: 'from-lime-900 via-green-800 to-lime-700', color: '#65a30d' },
  siljoa: { name: 'SILJOA', tagline: 'Arctic Intelligence', gradient: 'from-blue-900 via-cyan-800 to-blue-700', color: '#2563eb' },
  skenari: { name: 'SKÉNARI', tagline: 'Seventh Generation', gradient: 'from-green-900 via-emerald-800 to-green-700', color: '#16a34a' },
  ashkara: { name: 'ASHKARA', tagline: 'Truth as Sacred Action', gradient: 'from-orange-800 via-red-700 to-orange-700', color: '#ea580c' },
  alethir: { name: 'ALÉTHIR', tagline: 'Logos-Centered Inquiry', gradient: 'from-blue-800 via-indigo-700 to-blue-700', color: '#3b82f6' },
};

// Extended demo data
const DEMO_BUSINESSES = [
  {
    id: '1',
    name: 'Minimalist Café Tokyo',
    category: 'Café',
    location: 'Shibuya, Tokyo',
    city: 'Tokyo',
    images: [
      { url: '/images/businesses/minimalist-cafe-space.jpg', label: 'Main Space' },
      { url: '/images/businesses/minimalist-cafe-counter.jpg', label: 'Counter' },
      { url: '/images/businesses/minimalist-cafe-seating.jpg', label: 'Seating' },
      { url: '/images/businesses/minimalist-cafe-details.jpg', label: 'Details' },
    ],
    matchScore: 94,
    priceRange: '$$',
    rating: 4.8,
    reviews: 127,
    tags: ['Quiet', 'Solo-friendly', 'Minimalist'],
    vibe: ['Contemplative', 'Focused', 'Clean'],
    openNow: true,
    distance: '1.2 km',
    compatibleCodes: ['shokunin', 'jaejin', 'lhumir'],
    musicStyle: 'Lo-fi, Ambient, Minimal Techno',
    atmosphere: 'Minimal conversation, natural materials, indirect lighting',
    lighting: 'Soft natural light during day, warm Edison bulbs at night',
    noiseLevel: 'Very quiet (30-40 dB)',
    bestFor: ['Solo work', 'Reading', 'Quiet conversations'],
    seating: '18 seats, mostly solo tables',
    ownerStory: 'Founded by former architect Yuki Tanaka who believes coffee spaces should mirror meditation halls — designed for presence, not productivity.',
  },
  {
    id: '2',
    name: 'Ubuntu Kitchen',
    category: 'Restaurant',
    location: 'Cape Town CBD',
    city: 'Cape Town',
    images: [
      { url: '/images/businesses/ubuntu-kitchen-dining.jpg', label: 'Dining Room' },
      { url: '/images/businesses/ubuntu-kitchen-kitchen.jpg', label: 'Kitchen' },
      { url: '/images/businesses/ubuntu-kitchen-table.jpg', label: 'Community Table' },
      { url: '/images/businesses/ubuntu-kitchen-atmosphere.jpg', label: 'Atmosphere' },
    ],
    matchScore: 91,
    priceRange: '$$$',
    rating: 4.9,
    reviews: 203,
    tags: ['Community', 'Family-style', 'Warm'],
    vibe: ['Communal', 'Lively', 'Welcoming'],
    openNow: true,
    distance: '2.8 km',
    compatibleCodes: ['kayori', 'wohaka', 'karayni'],
    musicStyle: 'Afrobeats, Highlife, Amapiano, Live Jazz Thu-Sun',
    atmosphere: 'Shared tables, storytelling encouraged, communal dining experience',
    lighting: 'Warm pendant lights over shared tables, candles',
    noiseLevel: 'Moderate to lively (65-75 dB)',
    bestFor: ['Group dinners', 'Meeting new people', 'Celebrations'],
    seating: '48 seats, mostly communal tables of 8-12',
    ownerStory: 'Chef Naledi grew up in a township where meals were never eaten alone. Ubuntu Kitchen recreates that spirit of radical togetherness.',
  },
  {
    id: '3',
    name: 'Desert Silence Retreat',
    category: 'Wellness',
    location: 'Merzouga, Morocco',
    city: 'Merzouga',
    images: [
      { url: '/images/businesses/desert-retreat-view.jpg', label: 'Desert View' },
      { url: '/images/businesses/desert-retreat-meditation.jpg', label: 'Meditation Space' },
      { url: '/images/businesses/desert-retreat-tent.jpg', label: 'Tent Interior' },
      { url: '/images/businesses/desert-retreat-sunset.jpg', label: 'Sunset' },
    ],
    matchScore: 96,
    priceRange: '$$$$',
    rating: 5.0,
    reviews: 89,
    tags: ['Contemplative', 'Remote', 'Transformative'],
    vibe: ['Silent', 'Introspective', 'Sacred'],
    openNow: false,
    distance: '45 km',
    compatibleCodes: ['sahen', 'lhumir', 'siljoa'],
    musicStyle: 'Silence only, Occasional traditional Tuareg singing bowls',
    atmosphere: 'Noble silence practice, minimal eye contact, solitude honored',
    lighting: 'Sunrise/sunset natural light, no artificial lighting after dark',
    noiseLevel: 'Near-silent (10-20 dB), wind and natural sounds only',
    bestFor: ['Solo retreat', 'Deep contemplation', 'Digital detox'],
    seating: 'Private tents, 12 guests maximum',
    ownerStory: 'Aziz, a former trader, walked into the desert at 40 and never came back to the city. He built this space for others seeking the same radical quiet.',
  },
  {
    id: '4',
    name: 'Flow State Studio',
    category: 'Workspace',
    location: 'Old Quarter, Hanoi',
    city: 'Hanoi',
    images: [
      { url: '/images/businesses/flow-studio-main.jpg', label: 'Main Floor' },
      { url: '/images/businesses/flow-studio-work.jpg', label: 'Work Areas' },
      { url: '/images/businesses/flow-studio-light.jpg', label: 'Natural Light' },
      { url: '/images/businesses/flow-studio-seating.jpg', label: 'Flexible Seating' },
    ],
    matchScore: 89,
    priceRange: '$',
    rating: 4.7,
    reviews: 156,
    tags: ['Calm', 'Natural light', 'Flexible'],
    vibe: ['Flowing', 'Peaceful', 'Adaptive'],
    openNow: true,
    distance: '0.8 km',
    compatibleCodes: ['namsea', 'renara', 'karayni'],
    musicStyle: 'Chillhop, Trip-hop, Downtempo',
    atmosphere: 'No fixed seats, cushions and low tables, movement encouraged',
    lighting: 'Floor-to-ceiling windows, rice paper diffusers, daylight-focused',
    noiseLevel: 'Soft background (40-50 dB)',
    bestFor: ['Creative work', 'Flexible schedules', 'Movement breaks'],
    seating: '30 flexible positions, no assigned desks',
    ownerStory: 'Linh designed this space after realizing she worked best when she could move like water — flowing between sitting, standing, and walking.',
  },
];

type Business = typeof DEMO_BUSINESSES[0];

const CITIES = ['All Cities', 'Tokyo', 'Cape Town', 'Hanoi', 'Merzouga'];
const CATEGORIES = ['All', 'Café', 'Restaurant', 'Workspace', 'Wellness', 'Experience', 'Accommodation', 'Fitness'];
const PRICE_RANGES = ['All', '$', '$$', '$$$', '$$$$'];
const SORT_OPTIONS = ['Best Match', 'Highest Rated', 'Most Reviews', 'Nearest'];

export default function MarketplacePage() {
  const params = useParams();
  const router = useRouter();
  const codeId = params.code as string;
  
  const codeData = CULTURAL_CODES[codeId as keyof typeof CULTURAL_CODES];
  
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('Best Match');
  const [minMatch, setMinMatch] = useState(80);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter and sort businesses
  const filteredBusinesses = useMemo(() => {
    let results = DEMO_BUSINESSES.filter(b => {
      const cityMatch = selectedCity === 'All Cities' || b.city === selectedCity;
      const categoryMatch = selectedCategory === 'All' || b.category === selectedCategory;
      const priceMatch = selectedPrice === 'All' || b.priceRange === selectedPrice;
      const matchScorePass = b.matchScore >= minMatch;
      const openMatch = !showOpenOnly || b.openNow;
      
      return cityMatch && categoryMatch && priceMatch && matchScorePass && openMatch;
    });
    
    if (sortBy === 'Best Match') {
      results.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortBy === 'Highest Rated') {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'Most Reviews') {
      results.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === 'Nearest') {
      results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    }
    
    return results;
  }, [selectedCity, selectedCategory, selectedPrice, minMatch, showOpenOnly, sortBy]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };
  
  if (!codeData) {
    return (
      <div className="min-h-screen bg-[#0a0a14] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Code not found</h1>
          <button onClick={() => router.push('/')} className="px-6 py-3 bg-white text-black rounded-full font-semibold">
            Back to Home
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-[#0a0a14] text-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-white/10">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/')}
                className="flex items-center gap-2 text-white/70 hover:text-white transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="text-sm hidden sm:inline">Home</span>
              </button>
              
              <div className="h-6 w-px bg-white/10" />
              
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: codeData.color }} />
                  <h1 className="text-sm font-semibold">{codeData.name}</h1>
                </div>
                <p className="text-xs text-white/50 hidden sm:block">{codeData.tagline}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm">Filters</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Code Info Banner */}
      <div className={`bg-gradient-to-r ${codeData.gradient} border-b border-white/10`}>
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-lg font-semibold mb-1">Why {codeData.name} matches these places</h2>
              <p className="text-sm text-white/80 max-w-3xl leading-relaxed">
                Every space here resonates with {codeData.tagline.toLowerCase()}. We've analyzed atmosphere, values, 
                and cultural alignment to find places where you'll feel understood — not just accommodated.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{filteredBusinesses.length}</div>
              <div className="text-xs text-white/70">places match</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1800px] mx-auto flex">
        {/* Left Sidebar Filters */}
        <aside className={`
          lg:sticky lg:top-[73px] lg:block h-[calc(100vh-73px)] overflow-y-auto
          border-r border-white/10 bg-black/20
          ${showFilters ? 'fixed inset-0 z-40 block' : 'hidden'}
          lg:w-72 w-full
        `}>
          <div className="p-4 space-y-6">
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Location</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-white/30"
              >
                {CITIES.map(city => (
                  <option key={city} value={city} className="bg-gray-900">{city}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Category</label>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedCategory === cat
                        ? 'bg-white text-black font-medium'
                        : 'text-white/70 hover:bg-white/5'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Price Range</label>
              <div className="flex gap-2">
                {PRICE_RANGES.map(price => (
                  <button
                    key={price}
                    onClick={() => setSelectedPrice(price)}
                    className={`flex-1 px-2 py-1.5 rounded-lg text-xs transition ${
                      selectedPrice === price
                        ? 'bg-white text-black font-medium'
                        : 'bg-white/5 text-white/70 hover:bg-white/10'
                    }`}
                  >
                    {price}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">
                Min Match: {minMatch}%
              </label>
              <input
                type="range"
                min="70"
                max="100"
                value={minMatch}
                onChange={(e) => setMinMatch(Number(e.target.value))}
                className="w-full accent-white"
                style={{ accentColor: codeData.color }}
              />
            </div>
            
            <div>
              <button
                onClick={() => setShowOpenOnly(!showOpenOnly)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                <span className="text-sm">Open now only</span>
                <div className={`w-10 h-5 rounded-full transition ${showOpenOnly ? 'bg-white' : 'bg-white/20'}`}>
                  <div className={`w-4 h-4 mt-0.5 rounded-full bg-black transition-transform ${showOpenOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
              </button>
            </div>
            
            <button
              onClick={() => {
                setSelectedCity('All Cities');
                setSelectedCategory('All');
                setSelectedPrice('All');
                setMinMatch(80);
                setShowOpenOnly(false);
              }}
              className="w-full px-3 py-2 text-sm text-white/50 hover:text-white transition"
            >
              Reset all filters
            </button>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="sticky top-[73px] z-30 bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-white/60">
                {filteredBusinesses.length} result{filteredBusinesses.length !== 1 ? 's' : ''}
              </p>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-white/30"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt} value={opt} className="bg-gray-900">{opt}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBusinesses.map((business) => (
                <motion.div
                  key={business.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="group relative"
                >
                  <button
                    onClick={() => setSelectedBusiness(business)}
                    className="w-full text-left"
                  >
                    <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <div className="relative h-40 overflow-hidden">
                        <Image
                          src={business.images[0].url}
                          alt={business.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        
                        <div 
                          className="absolute top-2 left-2 px-2 py-1 rounded-lg backdrop-blur-md text-xs font-bold"
                          style={{ backgroundColor: `${codeData.color}20`, color: codeData.color, border: `1px solid ${codeData.color}40` }}
                        >
                          {business.matchScore}%
                        </div>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(business.id);
                          }}
                          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:scale-110 transition"
                        >
                          <Heart className={`w-4 h-4 ${favorites.has(business.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                        </button>
                      </div>
                      
                      <div className="p-3 space-y-2">
                        <div>
                          <h3 className="font-semibold text-sm mb-0.5 line-clamp-1">{business.name}</h3>
                          <div className="flex items-center gap-1 text-xs text-white/50">
                            <MapPin className="w-3 h-3" />
                            <span className="line-clamp-1">{business.location}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium">{business.rating}</span>
                            <span className="text-white/50">({business.reviews})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {business.openNow && (
                              <span className="text-green-400 font-medium">Open</span>
                            )}
                            <span className="text-white/50">{business.priceRange}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {business.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/60">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
            
            {filteredBusinesses.length === 0 && (
              <div className="text-center py-20">
                <div className="text-white/40 mb-4">
                  <Map className="w-12 h-12 mx-auto mb-2" />
                  <p>No matches found</p>
                  <p className="text-sm mt-1">Try adjusting your filters</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      
      {/* Business Detail Modal */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedBusiness(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onAnimationStart={() => setSelectedImageIndex(0)}
              className="relative w-full max-w-5xl my-8 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-white/20 overflow-hidden"
            >
              <button
                onClick={() => setSelectedBusiness(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black transition"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Tabbed Image Viewer */}
              <div className="bg-black/40 border-b border-white/10">
                {/* Tabs */}
                <div className="flex gap-2 px-4 pt-4 overflow-x-auto">
                  {selectedBusiness.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImageIndex(idx);
                      }}
                      className={`px-4 py-2 rounded-t-lg text-sm font-medium transition whitespace-nowrap ${
                        selectedImageIndex === idx
                          ? 'bg-white/10 text-white border-t border-x border-white/20'
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {img.label}
                    </button>
                  ))}
                </div>
                
                {/* Image Display */}
                <div className="relative h-96 bg-black">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
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
                  
                  {/* Image label overlay */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/20">
                    <span className="text-sm font-medium">{selectedBusiness.images[selectedImageIndex].label}</span>
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div
                      className="inline-block px-3 py-1 rounded-lg backdrop-blur-md text-sm font-bold mb-3"
                      style={{ backgroundColor: `${codeData.color}30`, color: codeData.color, border: `1px solid ${codeData.color}60` }}
                    >
                      {selectedBusiness.matchScore}% match with {codeData.name}
                    </div>
                    <h2 className="text-3xl font-bold mb-2">{selectedBusiness.name}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedBusiness.location}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedBusiness.category}</span>
                      <span>•</span>
                      <span>{selectedBusiness.distance}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(selectedBusiness.id);
                    }}
                    className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:scale-110 transition"
                  >
                    <Heart className={`w-6 h-6 ${favorites.has(selectedBusiness.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </button>
                </div>
                
                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mx-auto mb-1" />
                    <div className="text-xl font-bold">{selectedBusiness.rating}</div>
                    <div className="text-xs text-white/50">{selectedBusiness.reviews} reviews</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <DollarSign className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-xl font-bold">{selectedBusiness.priceRange}</div>
                    <div className="text-xs text-white/50">Price</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <Users className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-sm font-bold">{selectedBusiness.seating}</div>
                    <div className="text-xs text-white/50">Capacity</div>
                  </div>
                  <div className="text-center p-3 rounded-xl bg-white/5 border border-white/10">
                    <Clock className="w-5 h-5 mx-auto mb-1 text-white/70" />
                    <div className="text-lg font-bold">{selectedBusiness.openNow ? 'Open' : 'Closed'}</div>
                    <div className="text-xs text-white/50">Status</div>
                  </div>
                </div>
                
                {/* Business Main Code */}
                <div className="p-4 rounded-xl border border-white/10" style={{ backgroundColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}10` }}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider mb-2 text-white/50">Cultural Identity</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white/70">This is a</span>
                    <span 
                      className="px-3 py-1.5 rounded-full border text-base font-bold"
                      style={{ 
                        borderColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}60`, 
                        backgroundColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}20`,
                        color: CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color 
                      }}
                    >
                      {CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].name}
                    </span>
                    <span className="text-sm text-white/70">space</span>
                  </div>
                </div>
                
                {/* Also Loved By */}
                {/* Also Loved By */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Also loved by</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBusiness.compatibleCodes.slice(1).map(code => {
                      const c = CULTURAL_CODES[code as keyof typeof CULTURAL_CODES];
                      return (
                        <span 
                          key={code} 
                          className="px-3 py-1.5 rounded-full border text-sm font-medium"
                          style={{ 
                            borderColor: `${c.color}40`, 
                            backgroundColor: `${c.color}10`,
                            color: c.color 
                          }}
                        >
                          {c.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
                
                {/* Atmosphere Details */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Music className="w-4 h-4 text-white/70" />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">Music</h4>
                    </div>
                    <p className="text-sm text-white/80">{selectedBusiness.musicStyle}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Lightbulb className="w-4 h-4 text-white/70" />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">Lighting</h4>
                    </div>
                    <p className="text-sm text-white/80">{selectedBusiness.lighting}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Volume2 className="w-4 h-4 text-white/70" />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">Noise Level</h4>
                    </div>
                    <p className="text-sm text-white/80">{selectedBusiness.noiseLevel}</p>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-white/70" />
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">Atmosphere</h4>
                    </div>
                    <p className="text-sm text-white/80">{selectedBusiness.atmosphere}</p>
                  </div>
                </div>
                
                {/* Best For */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Best for</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBusiness.bestFor.map(item => (
                      <span key={item} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Owner Story */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-white/70" />
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50">Story</h4>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed italic">
                    {selectedBusiness.ownerStory}
                  </p>
                </div>
                
                {/* Vibe Tags */}
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-3">Vibe</h3>
                  <div className="flex flex-wrap gap-2">
                    {[...selectedBusiness.tags, ...selectedBusiness.vibe].map(tag => (
                      <span key={tag} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex gap-3 pt-4">
                  <button className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition">
                    Book / Reserve
                  </button>
                  <button className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition">
                    Directions
                  </button>
                  <button className="px-6 py-3 border border-white/20 rounded-xl font-semibold hover:bg-white/10 transition">
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
