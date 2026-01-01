'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Star, Heart, Filter, X } from 'lucide-react';
import Link from 'next/link';

// Cultural Code data
const CULTURAL_CODES = {
  khoisan: { name: 'KHOISAN', tagline: 'Hyper-Acute Perception', gradient: 'from-amber-900 via-orange-800 to-amber-700' },
  kayori: { name: 'KÁYORI', tagline: 'Expressive Ritual Creativity', gradient: 'from-purple-900 via-fuchsia-800 to-purple-700' },
  sahen: { name: 'SAHÉN', tagline: 'Desert Wisdom', gradient: 'from-yellow-900 via-amber-800 to-yellow-700' },
  enzuka: { name: 'ENZUKA', tagline: 'Warrior Discipline', gradient: 'from-red-900 via-orange-800 to-red-700' },
  siyuane: { name: 'SIYUANÉ', tagline: 'Generational Harmony', gradient: 'from-emerald-900 via-teal-800 to-emerald-700' },
  jaejin: { name: 'JAEJIN', tagline: 'Compressed Emotion (Han)', gradient: 'from-slate-800 via-blue-900 to-slate-700' },
  namsea: { name: 'NAMSÉA', tagline: 'Water-Based Cognition', gradient: 'from-cyan-900 via-blue-800 to-cyan-700' },
  shokunin: { name: 'SHOKUNIN', tagline: 'Perfectionist Craftsmanship', gradient: 'from-rose-900 via-pink-800 to-rose-700' },
  khoruun: { name: 'KHORUUN', tagline: 'Nomadic Mobility', gradient: 'from-stone-800 via-gray-700 to-stone-700' },
  lhumir: { name: 'LHUMIR', tagline: 'Contemplative Consciousness', gradient: 'from-indigo-900 via-purple-800 to-indigo-700' },
  yatevar: { name: 'YATEVAR', tagline: 'Warrior-Philosopher', gradient: 'from-orange-900 via-amber-800 to-orange-700' },
  renara: { name: 'RÉNARA', tagline: 'Refined Subtlety (Halus)', gradient: 'from-emerald-800 via-green-700 to-emerald-700' },
  karayni: { name: 'KARAYNI', tagline: 'Sacred Reciprocity', gradient: 'from-yellow-800 via-orange-700 to-yellow-700' },
  wohaka: { name: 'WÓHAKA', tagline: 'All Beings as Kin', gradient: 'from-teal-900 via-cyan-800 to-teal-700' },
  tjukari: { name: 'TJUKARI', tagline: 'Dreamtime Cosmology', gradient: 'from-red-800 via-orange-700 to-red-700' },
  kinmora: { name: 'KINMORA', tagline: 'Mathematical Cosmology', gradient: 'from-lime-900 via-green-800 to-lime-700' },
  siljoa: { name: 'SILJOA', tagline: 'Arctic Intelligence', gradient: 'from-blue-900 via-cyan-800 to-blue-700' },
  skenari: { name: 'SKÉNARI', tagline: 'Seventh Generation', gradient: 'from-green-900 via-emerald-800 to-green-700' },
  ashkara: { name: 'ASHKARA', tagline: 'Truth as Sacred Action', gradient: 'from-orange-800 via-red-700 to-orange-700' },
  alethir: { name: 'ALÉTHIR', tagline: 'Logos-Centered Inquiry', gradient: 'from-blue-800 via-indigo-700 to-blue-700' },
};

// Fake business data (will be replaced with real database)
const DEMO_BUSINESSES = [
  {
    id: '1',
    name: 'The Minimalist Café',
    category: 'Café',
    location: 'Tokyo, Japan',
    image: 'https://images.unsplash.com/photo-1501492693086-291f65a61ea4?w=800',
    matchScore: 94,
    priceRange: '$$',
    rating: 4.8,
    tags: ['Quiet', 'Solo-friendly', 'Minimalist'],
    codeId: 'shokunin',
  },
  {
    id: '2',
    name: 'Ubuntu Kitchen',
    category: 'Restaurant',
    location: 'Cape Town, South Africa',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
    matchScore: 91,
    priceRange: '$$$',
    rating: 4.9,
    tags: ['Community', 'Family-style', 'Warm'],
    codeId: 'kayori',
  },
  {
    id: '3',
    name: 'Desert Silence Retreat',
    category: 'Wellness',
    location: 'Sahara, Morocco',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    matchScore: 96,
    priceRange: '$$$$',
    rating: 5.0,
    tags: ['Contemplative', 'Remote', 'Transformative'],
    codeId: 'sahen',
  },
  {
    id: '4',
    name: 'Flow State Studio',
    category: 'Workspace',
    location: 'Hanoi, Vietnam',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
    matchScore: 89,
    priceRange: '$',
    rating: 4.7,
    tags: ['Calm', 'Natural light', 'Flexible'],
    codeId: 'namsea',
  },
  {
    id: '5',
    name: 'Mountain Lodge',
    category: 'Accommodation',
    location: 'Lhasa, Tibet',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    matchScore: 93,
    priceRange: '$$$',
    rating: 4.9,
    tags: ['Peaceful', 'Panoramic', 'Meditative'],
    codeId: 'lhumir',
  },
  {
    id: '6',
    name: 'Steppe Nomad Tours',
    category: 'Experience',
    location: 'Ulaanbaatar, Mongolia',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800',
    matchScore: 97,
    priceRange: '$$',
    rating: 4.8,
    tags: ['Adventure', 'Freedom', 'Authentic'],
    codeId: 'khoruun',
  },
  {
    id: '7',
    name: 'Agora Philosophy Café',
    category: 'Café',
    location: 'Athens, Greece',
    image: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800',
    matchScore: 92,
    priceRange: '$$',
    rating: 4.6,
    tags: ['Discussion', 'Intellectual', 'Historic'],
    codeId: 'alethir',
  },
  {
    id: '8',
    name: 'Precision Workshop',
    category: 'Makerspace',
    location: 'Kyoto, Japan',
    image: 'https://images.unsplash.com/photo-1504253163759-c23fccaebb55?w=800',
    matchScore: 95,
    priceRange: '$$$',
    rating: 5.0,
    tags: ['Craftsmanship', 'Detail-oriented', 'Traditional'],
    codeId: 'shokunin',
  },
];

type Business = typeof DEMO_BUSINESSES[0];

export default function MarketplacePage() {
  const params = useParams();
  const router = useRouter();
  const codeId = params.code as string;
  
  const codeData = CULTURAL_CODES[codeId as keyof typeof CULTURAL_CODES];
  
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [minMatch, setMinMatch] = useState(85);
  
  // Filter businesses (in real app, this would be a database query)
  const filteredBusinesses = useMemo(() => {
    return DEMO_BUSINESSES.filter(b => {
      const categoryMatch = selectedCategory === 'all' || b.category === selectedCategory;
      const matchScorePass = b.matchScore >= minMatch;
      // For demo, show all. In production, filter by b.codeId === codeId
      return categoryMatch && matchScorePass;
    });
  }, [selectedCategory, minMatch]);
  
  const categories = ['all', 'Café', 'Restaurant', 'Workspace', 'Wellness', 'Experience', 'Accommodation'];
  
  if (!codeData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#12121e] to-[#1a1a2e] flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Code not found</h1>
          <Link href="/">
            <button className="px-6 py-3 bg-white text-black rounded-full font-semibold">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#12121e] to-[#1a1a2e] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-2 text-white/70 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm">Back</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <div className={`relative overflow-hidden bg-gradient-to-br ${codeData.gradient}`}>
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-4"
          >
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight">
              {codeData.name}
            </h1>
            <p className="text-xl sm:text-2xl text-white/90">
              {codeData.tagline}
            </p>
            <p className="text-base text-white/70 max-w-2xl mx-auto">
              Discover spaces, experiences, and communities that resonate with your cultural code.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Filters Panel (slide down) */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-white/10 bg-black/20 backdrop-blur-md overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
              {/* Category filter */}
              <div>
                <label className="text-sm text-white/70 mb-2 block">Category</label>
                <div className="flex flex-wrap gap-2">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm transition ${
                        selectedCategory === cat
                          ? 'bg-white text-black'
                          : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }`}
                    >
                      {cat === 'all' ? 'All' : cat}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Match score slider */}
              <div>
                <label className="text-sm text-white/70 mb-2 block">
                  Minimum Match Score: {minMatch}%
                </label>
                <input
                  type="range"
                  min="70"
                  max="100"
                  value={minMatch}
                  onChange={(e) => setMinMatch(Number(e.target.value))}
                  className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Results count */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-sm text-white/60">
          {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'place' : 'places'} match your code
        </p>
      </div>
      
      {/* Business Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business, index) => (
            <motion.div
              key={business.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <button
                onClick={() => setSelectedBusiness(business)}
                className="group w-full text-left"
              >
                <div className="relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] duration-300">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={business.image}
                      alt={business.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    
                    {/* Match badge */}
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                      <span className="text-sm font-semibold text-white">
                        {business.matchScore}% match
                      </span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-white/90 transition">
                        {business.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-white/60">
                        <MapPin className="w-4 h-4" />
                        <span>{business.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{business.rating}</span>
                      </div>
                      <span className="text-sm text-white/60">{business.priceRange}</span>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {business.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-full bg-white/10 text-xs text-white/70"
                        >
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
      </div>
      
      {/* Business Detail Modal */}
      <AnimatePresence>
        {selectedBusiness && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedBusiness(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-gradient-to-b from-gray-900 to-black rounded-3xl border border-white/20 shadow-2xl"
            >
              {/* Close button */}
              <button
                onClick={() => setSelectedBusiness(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Hero image */}
              <div className="relative h-80">
                <Image
                  src={selectedBusiness.image}
                  alt={selectedBusiness.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Match badge */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
                  <span className="text-lg font-bold text-white">
                    {selectedBusiness.matchScore}% match with {codeData.name}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8 space-y-6">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h2 className="text-3xl font-bold">{selectedBusiness.name}</h2>
                    <button className="p-2 rounded-full hover:bg-white/10 transition">
                      <Heart className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 text-white/70">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedBusiness.location}</span>
                    </div>
                    <span>•</span>
                    <span>{selectedBusiness.category}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{selectedBusiness.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                    Why this matches you
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    This space embodies the essence of {codeData.name}. Every detail has been crafted 
                    to resonate with those who value {codeData.tagline.toLowerCase()}.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">
                    Vibe
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedBusiness.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1.5 rounded-full bg-white/10 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex gap-3">
                  <button className="flex-1 px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition">
                    Book Now
                  </button>
                  <button className="px-6 py-3 border border-white/20 rounded-full font-semibold hover:bg-white/10 transition">
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
