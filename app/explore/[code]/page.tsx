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
  Wifi,
  Zap,
  Baby,
  Car,
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
  Sparkles
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
    ownerStory: 'Founded by former architect Yuki Tanaka who believes coffee spaces should mirror meditation halls — designed for presence, not productivity.',
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
    ownerStory: 'Chef Naledi grew up in a township where meals were never eaten alone. Ubuntu Kitchen recreates that spirit of radical togetherness.',
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

type Business = typeof DEMO_BUSINESSES[0];

const CITIES = ['All Cities', 'Tokyo', 'Cape Town'];
const CATEGORIES = ['All', 'Café', 'Restaurant', 'Workspace', 'Wellness'];
const PRICE_RANGES = ['All', '$', '$$', '$$$', '$$$$'];
const SORT_OPTIONS = ['Best Match', 'Highest Rated', 'Most Reviews', 'Nearest'];

export default function MarketplacePage() {
  const params = useParams();
  const router = useRouter();
  const codeId = params.code as string;
  
  const codeData = CULTURAL_CODES[codeId as keyof typeof CULTURAL_CODES];
  
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'atmosphere' | 'amenities' | 'menu' | 'practical'>('overview');
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPrice, setSelectedPrice] = useState('All');
  const [sortBy, setSortBy] = useState('Best Match');
  const [minMatch, setMinMatch] = useState(80);
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [showFilters, setShowFilters] = useState(false);
  
  const filteredBusinesses = useMemo(() => {
    let results = DEMO_BUSINESSES.filter(b => {
      const cityMatch = selectedCity === 'All Cities' || b.city === selectedCity;
      const categoryMatch = selectedCategory === 'All' || b.category === selectedCategory;
      const priceMatch = selectedPrice === 'All' || b.priceRange === selectedPrice;
      const matchScorePass = b.matchScore >= minMatch;
      const openMatch = !showOpenOnly || b.openNow;
      
      return cityMatch && categoryMatch && priceMatch && matchScorePass && openMatch;
    });
    
    if (sortBy === 'Best Match') results.sort((a, b) => b.matchScore - a.matchScore);
    else if (sortBy === 'Highest Rated') results.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'Most Reviews') results.sort((a, b) => b.reviews - a.reviews);
    else if (sortBy === 'Nearest') results.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    
    return results;
  }, [selectedCity, selectedCategory, selectedPrice, minMatch, showOpenOnly, sortBy]);
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
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
              <button onClick={() => router.push('/')} className="flex items-center gap-2 text-white/70 hover:text-white transition">
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
            
            <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/5">
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
              <h2 className="text-lg font-semibold mb-1">Spaces for {codeData.name}</h2>
              <p className="text-sm text-white/80 max-w-3xl leading-relaxed">
                Curated environments where {codeData.tagline.toLowerCase()} comes naturally.
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">{filteredBusinesses.length}</div>
              <div className="text-xs text-white/70">matches</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1800px] mx-auto flex">
        {/* Left Sidebar */}
        <aside className={`lg:sticky lg:top-[73px] lg:block h-[calc(100vh-73px)] overflow-y-auto border-r border-white/10 bg-black/20 ${showFilters ? 'fixed inset-0 z-40 block' : 'hidden'} lg:w-72 w-full`}>
          <div className="p-4 space-y-6">
            <div className="lg:hidden flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Location</label>
              <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-white/30">
                {CITIES.map(city => <option key={city} value={city} className="bg-gray-900">{city}</option>)}
              </select>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Category</label>
              <div className="space-y-1">
                {CATEGORIES.map(cat => (
                  <button key={cat} onClick={() => setSelectedCategory(cat)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${selectedCategory === cat ? 'bg-white text-black font-medium' : 'text-white/70 hover:bg-white/5'}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Price</label>
              <div className="flex gap-2">
                {PRICE_RANGES.map(price => (
                  <button key={price} onClick={() => setSelectedPrice(price)} className={`flex-1 px-2 py-1.5 rounded-lg text-xs transition ${selectedPrice === price ? 'bg-white text-black font-medium' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}>
                    {price}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50 mb-2 block">Min Match: {minMatch}%</label>
              <input type="range" min="70" max="100" value={minMatch} onChange={(e) => setMinMatch(Number(e.target.value))} className="w-full accent-white" style={{ accentColor: codeData.color }} />
            </div>
            
            <button onClick={() => setShowOpenOnly(!showOpenOnly)} className="flex items-center justify-between w-full px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition">
              <span className="text-sm">Open now only</span>
              <div className={`w-10 h-5 rounded-full transition ${showOpenOnly ? 'bg-white' : 'bg-white/20'}`}>
                <div className={`w-4 h-4 mt-0.5 rounded-full bg-black transition-transform ${showOpenOnly ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </div>
            </button>
            
            <button onClick={() => { setSelectedCity('All Cities'); setSelectedCategory('All'); setSelectedPrice('All'); setMinMatch(80); setShowOpenOnly(false); }} className="w-full px-3 py-2 text-sm text-white/50 hover:text-white transition">
              Reset filters
            </button>
          </div>
        </aside>
        
        {/* Main */}
        <main className="flex-1 min-w-0">
          <div className="sticky top-[73px] z-30 bg-black/40 backdrop-blur-xl border-b border-white/10 px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm text-white/60">{filteredBusinesses.length} result{filteredBusinesses.length !== 1 ? 's' : ''}</p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-white/30">
                {SORT_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-gray-900">{opt}</option>)}
              </select>
            </div>
          </div>
          
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredBusinesses.map((business) => (
                <motion.div key={business.id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="group">
                  <button onClick={() => { setSelectedBusiness(business); setSelectedTab('overview'); setSelectedImageIndex(0); }} className="w-full text-left">
                    <div className="relative overflow-hidden rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02]">
                      <div className="relative h-40 overflow-hidden">
                        <Image src={business.images[0].url} alt={business.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, 25vw" />
                        <div className="absolute top-2 left-2 px-2 py-1 rounded-lg backdrop-blur-md text-xs font-bold" style={{ backgroundColor: `${codeData.color}20`, color: codeData.color, border: `1px solid ${codeData.color}40` }}>
                          {business.matchScore}%
                        </div>
                        <button onClick={(e) => { e.stopPropagation(); toggleFavorite(business.id); }} className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center hover:scale-110 transition">
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
                            {business.openNow && <span className="text-green-400 font-medium">Open</span>}
                            <span className="text-white/50">{business.priceRange}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </main>
      </div>
      
      {/* Futuristic Detail Modal */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4" onClick={() => setSelectedBusiness(null)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} onClick={(e) => e.stopPropagation()} className="relative w-full max-w-6xl max-h-[95vh] bg-gradient-to-b from-gray-900/95 to-black/95 rounded-3xl border border-white/20 overflow-hidden backdrop-blur-2xl">
              
              {/* Close Button */}
              <button onClick={() => setSelectedBusiness(null)} className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black transition">
                <X className="w-5 h-5" />
              </button>
              
              {/* Futuristic Header */}
              <div className="relative p-6 border-b border-white/10 bg-gradient-to-r from-white/5 to-transparent">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="px-3 py-1 rounded-full backdrop-blur-md text-xs font-bold border" style={{ backgroundColor: `${codeData.color}20`, color: codeData.color, borderColor: `${codeData.color}40` }}>
                        {selectedBusiness.matchScore}% MATCH
                      </div>
                      {selectedBusiness.openNow && (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-green-500/20 border border-green-500/40">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                          <span className="text-xs font-medium text-green-400">OPEN NOW</span>
                        </div>
                      )}
                    </div>
                    <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{selectedBusiness.name}</h2>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedBusiness.location}</span>
                      </div>
                      <span>•</span>
                      <span>{selectedBusiness.category}</span>
                      <span>•</span>
                      <span>{selectedBusiness.distance}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="flex items-center gap-1 mb-1">
                        <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        <span className="text-2xl font-bold">{selectedBusiness.rating}</span>
                      </div>
                      <div className="text-xs text-white/50">{selectedBusiness.reviews} reviews</div>
                    </div>
                    
                    <button onClick={(e) => { e.stopPropagation(); toggleFavorite(selectedBusiness.id); }} className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:scale-110 transition">
                      <Heart className={`w-6 h-6 ${favorites.has(selectedBusiness.id) ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Futuristic Tabs */}
              <div className="border-b border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="flex gap-1 px-6 overflow-x-auto">
                  {[
                    { id: 'overview', label: 'Overview', icon: Info },
                    { id: 'atmosphere', label: 'Atmosphere', icon: Sparkles },
                    { id: 'amenities', label: 'Amenities', icon: Zap },
                    { id: 'menu', label: 'Menu', icon: Utensils },
                    { id: 'practical', label: 'Practical', icon: Phone },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedTab(tab.id as any)}
                        className={`relative px-4 py-3 text-sm font-medium transition whitespace-nowrap flex items-center gap-2 ${
                          selectedTab === tab.id
                            ? 'text-white'
                            : 'text-white/50 hover:text-white/80'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {tab.label}
                        {selectedTab === tab.id && (
                          <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent" transition={{ type: 'spring', stiffness: 500, damping: 30 }} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
              
              {/* Tab Content */}
              <div className="overflow-y-auto max-h-[calc(95vh-240px)]">
                <AnimatePresence mode="wait">
                  <motion.div key={selectedTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }} className="p-6">
                    
                    {/* OVERVIEW TAB */}
                    {selectedTab === 'overview' && (
                      <div className="space-y-6">
                        {/* Tabbed Image Viewer */}
                        <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                          <div className="flex gap-2 p-3 bg-white/5 border-b border-white/10">
                            {selectedBusiness.images.map((img, idx) => (
                              <button key={idx} onClick={() => setSelectedImageIndex(idx)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${selectedImageIndex === idx ? 'bg-white/20 text-white' : 'text-white/50 hover:text-white/80'}`}>
                                {img.label}
                              </button>
                            ))}
                          </div>
                          <div className="relative h-96 bg-black">
                            <AnimatePresence mode="wait">
                              <motion.div key={selectedImageIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="absolute inset-0">
                                <Image src={selectedBusiness.images[selectedImageIndex].url} alt={selectedBusiness.images[selectedImageIndex].label} fill className="object-contain" sizes="100vw" priority />
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                        
                        {/* Cultural Identity */}
                        <div className="p-5 rounded-2xl border" style={{ backgroundColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}10`, borderColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}30` }}>
                          <div className="text-xs uppercase tracking-wider mb-3" style={{ color: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}` }}>Cultural Identity</div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm text-white/70">This is a</span>
                            <span className="px-4 py-2 rounded-full border text-lg font-bold" style={{ borderColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}60`, backgroundColor: `${CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color}20`, color: CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].color }}>
                              {CULTURAL_CODES[selectedBusiness.compatibleCodes[0] as keyof typeof CULTURAL_CODES].name}
                            </span>
                            <span className="text-sm text-white/70">space</span>
                          </div>
                        </div>
                        
                        {/* Also Loved By */}
                        <div>
                          <h3 className="text-xs uppercase tracking-wider text-white/50 mb-3">Also loved by</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedBusiness.compatibleCodes.slice(1).map(code => {
                              const c = CULTURAL_CODES[code as keyof typeof CULTURAL_CODES];
                              return (
                                <span key={code} className="px-3 py-1.5 rounded-full border text-sm font-medium" style={{ borderColor: `${c.color}40`, backgroundColor: `${c.color}10`, color: c.color }}>
                                  {c.name}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                        
                        {/* Owner Story */}
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Story</div>
                          <p className="text-sm text-white/80 leading-relaxed italic">{selectedBusiness.ownerStory}</p>
                        </div>
                      </div>
                    )}
                    
                    {/* ATMOSPHERE TAB */}
                    {selectedTab === 'atmosphere' && (
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <Music className="w-5 h-5" style={{ color: codeData.color }} />
                            <h4 className="text-xs uppercase tracking-wider text-white/50">Music</h4>
                          </div>
                          <p className="text-sm text-white/90">{selectedBusiness.musicStyle}</p>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <Lightbulb className="w-5 h-5" style={{ color: codeData.color }} />
                            <h4 className="text-xs uppercase tracking-wider text-white/50">Lighting</h4>
                          </div>
                          <p className="text-sm text-white/90">{selectedBusiness.lighting}</p>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <Volume2 className="w-5 h-5" style={{ color: codeData.color }} />
                            <h4 className="text-xs uppercase tracking-wider text-white/50">Noise Level</h4>
                          </div>
                          <p className="text-sm text-white/90">{selectedBusiness.noiseLevel}</p>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <Users className="w-5 h-5" style={{ color: codeData.color }} />
                            <h4 className="text-xs uppercase tracking-wider text-white/50">Capacity</h4>
                          </div>
                          <p className="text-sm text-white/90">{selectedBusiness.seating} seats</p>
                        </div>
                        
                        <div className="sm:col-span-2 p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Best For</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedBusiness.bestFor.map(item => (
                              <span key={item} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm">{item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* AMENITIES TAB */}
                    {selectedTab === 'amenities' && (
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.powerOutlets ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <Zap className={`w-5 h-5 ${selectedBusiness.amenities.powerOutlets ? 'text-green-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">Power Outlets</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.powerOutlets ? 'Available' : 'Not available'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.wifi ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <Wifi className={`w-5 h-5 ${selectedBusiness.amenities.wifi ? 'text-blue-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">WiFi</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.wifi || 'Not available'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.kidsArea ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <Baby className={`w-5 h-5 ${selectedBusiness.amenities.kidsArea ? 'text-purple-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">Kids Area</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.kidsArea ? 'Available' : 'Not available'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.outdoorSeating ? 'bg-green-500/10 border-green-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <Trees className={`w-5 h-5 ${selectedBusiness.amenities.outdoorSeating ? 'text-green-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">Outdoor Seating</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.outdoorSeating ? 'Available' : 'Not available'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.wheelchairAccessible ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <Accessibility className={`w-5 h-5 ${selectedBusiness.amenities.wheelchairAccessible ? 'text-blue-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">Accessible</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.wheelchairAccessible ? 'Wheelchair friendly' : 'Not accessible'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.parking ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <Car className={`w-5 h-5 ${selectedBusiness.amenities.parking ? 'text-yellow-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">Parking</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.parking ? 'Available' : 'Not available'}</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className={`p-4 rounded-xl border ${selectedBusiness.amenities.petFriendly ? 'bg-pink-500/10 border-pink-500/30' : 'bg-white/5 border-white/10'}`}>
                          <div className="flex items-center gap-3">
                            <PawPrint className={`w-5 h-5 ${selectedBusiness.amenities.petFriendly ? 'text-pink-400' : 'text-white/30'}`} />
                            <div>
                              <div className="text-sm font-medium">Pet Friendly</div>
                              <div className="text-xs text-white/50">{selectedBusiness.amenities.petFriendly ? 'Pets welcome' : 'No pets'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* MENU TAB */}
                    {selectedTab === 'menu' && (
                      <div className="space-y-4">
                        {selectedBusiness.menu.hasDigitalMenu && (
                          <a href={selectedBusiness.menu.menuLink} target="_blank" rel="noopener noreferrer" className="block p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-500/50 transition group">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                                  <ExternalLink className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                  <div className="font-semibold mb-1">View Digital Menu</div>
                                  <div className="text-xs text-white/50">Full menu with prices</div>
                                </div>
                              </div>
                              <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/60 transition" />
                            </div>
                          </a>
                        )}
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Specialties</div>
                          <div className="space-y-2">
                            {selectedBusiness.menu.specialties.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: codeData.color }} />
                                <span className="text-sm text-white/90">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs uppercase tracking-wider text-white/50 mb-3">Dietary Options</div>
                          <div className="flex flex-wrap gap-2">
                            {selectedBusiness.menu.dietary.map(item => (
                              <span key={item} className="px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-sm text-green-400">{item}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* PRACTICAL TAB */}
                    {selectedTab === 'practical' && (
                      <div className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-3">
                              <CreditCard className="w-5 h-5" style={{ color: codeData.color }} />
                              <h4 className="text-xs uppercase tracking-wider text-white/50">Payment</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedBusiness.practical.payment.map(method => (
                                <span key={method} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs">{method}</span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                            <div className="flex items-center gap-2 mb-3">
                              <Clock className="w-5 h-5" style={{ color: codeData.color }} />
                              <h4 className="text-xs uppercase tracking-wider text-white/50">Hours</h4>
                            </div>
                            <p className="text-sm text-white/90">{selectedBusiness.practical.hours}</p>
                          </div>
                        </div>
                        
                        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                          <div className="flex items-center gap-2 mb-3">
                            <Calendar className="w-5 h-5" style={{ color: codeData.color }} />
                            <h4 className="text-xs uppercase tracking-wider text-white/50">Booking</h4>
                          </div>
                          <p className="text-sm text-white/90">{selectedBusiness.practical.bookingRequired ? 'Reservation required' : 'Walk-ins welcome'}</p>
                        </div>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          <a href={`tel:${selectedBusiness.practical.phone}`} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition group">
                            <div className="flex items-center gap-3">
                              <Phone className="w-5 h-5 text-white/50 group-hover:text-white transition" />
                              <div>
                                <div className="text-xs text-white/50 mb-1">Phone</div>
                                <div className="text-sm text-white/90">{selectedBusiness.practical.phone}</div>
                              </div>
                            </div>
                          </a>
                          
                          <a href={`mailto:${selectedBusiness.practical.email}`} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition group">
                            <div className="flex items-center gap-3">
                              <Mail className="w-5 h-5 text-white/50 group-hover:text-white transition" />
                              <div>
                                <div className="text-xs text-white/50 mb-1">Email</div>
                                <div className="text-sm text-white/90">{selectedBusiness.practical.email}</div>
                              </div>
                            </div>
                          </a>
                        </div>
                        
                        <button className="w-full p-5 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 hover:border-blue-500/50 transition group">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Navigation className="w-6 h-6 text-blue-400" />
                              <div className="text-left">
                                <div className="font-semibold mb-1">Get Directions</div>
                                <div className="text-xs text-white/50">{selectedBusiness.distance} away</div>
                              </div>
                            </div>
                            <ExternalLink className="w-5 h-5 text-white/30 group-hover:text-white/60 transition" />
                          </div>
                        </button>
                      </div>
                    )}
                    
                  </motion.div>
                </AnimatePresence>
              </div>
              
              {/* Bottom Actions */}
              <div className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                <div className="flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-white/90 transition">
                    Book Now
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
