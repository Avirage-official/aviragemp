'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue } from 'framer-motion';
import { Sparkles, ArrowRight, LogIn, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Cultural Codes data with enhanced visuals
const CULTURAL_CODES = [
  {
    id: 'shokunin',
    name: 'Shokunin',
    tagline: 'The Master Craftsperson',
    description: 'Japanese craft mastery. You value depth, patience, and the relentless pursuit of perfection in your craft.',
    gradient: 'from-amber-900 via-yellow-800 to-amber-700',
    icon: '🎋',
    bgPattern: 'bamboo'
  },
  {
    id: 'alethir',
    name: 'Alethir',
    tagline: 'The Truth Seeker',
    description: 'Ancient Greek inquiry. You seek truth through questioning, philosophical dialogue, and intellectual exploration.',
    gradient: 'from-blue-900 via-indigo-800 to-blue-700',
    icon: '🏛️',
    bgPattern: 'columns'
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    tagline: 'The Communal Spirit',
    description: 'African communalism. You believe in collective wellbeing and that humanity is deeply interconnected.',
    gradient: 'from-orange-900 via-red-800 to-orange-700',
    icon: '🌍',
    bgPattern: 'earth'
  },
  {
    id: 'vivencia',
    name: 'Vivencia',
    tagline: 'The Present Moment',
    description: 'Latin American lived experience. You embrace sensory richness, celebration, and being fully present.',
    gradient: 'from-pink-900 via-rose-800 to-pink-700',
    icon: '💃',
    bgPattern: 'dance'
  },
  {
    id: 'hygge',
    name: 'Hygge',
    tagline: 'The Cozy Soul',
    description: 'Nordic comfort. You find beauty in simplicity, warmth, and creating intimate sanctuaries of contentment.',
    gradient: 'from-stone-700 via-neutral-600 to-stone-600',
    icon: '🕯️',
    bgPattern: 'candle'
  },
  {
    id: 'wabi-sabi',
    name: 'Wabi-Sabi',
    tagline: 'The Imperfect Beauty',
    description: 'Japanese aesthetics of impermanence. You appreciate the beauty in imperfection and the passage of time.',
    gradient: 'from-green-900 via-emerald-800 to-green-700',
    icon: '🍂',
    bgPattern: 'leaf'
  },
  {
    id: 'kairos',
    name: 'Kairos',
    tagline: 'The Perfect Timing',
    description: 'Greek opportune moment. You live for those fleeting perfect moments when everything aligns.',
    gradient: 'from-purple-900 via-violet-800 to-purple-700',
    icon: '⏱️',
    bgPattern: 'clock'
  },
  {
    id: 'sisu',
    name: 'Sisu',
    tagline: 'The Stoic Strength',
    description: 'Finnish resilience. You possess extraordinary determination and courage in the face of adversity.',
    gradient: 'from-slate-800 via-blue-900 to-slate-700',
    icon: '⛰️',
    bgPattern: 'mountain'
  },
  {
    id: 'yuan',
    name: 'Yuan',
    tagline: 'The Destined Path',
    description: 'Chinese fateful connection. You trust in the invisible threads that connect people and circumstances.',
    gradient: 'from-red-900 via-rose-800 to-red-700',
    icon: '🎎',
    bgPattern: 'knot'
  },
  {
    id: 'lagom',
    name: 'Lagom',
    tagline: 'The Balanced One',
    description: 'Swedish moderation. You seek the perfect balance—not too much, not too little, but just right.',
    gradient: 'from-teal-800 via-cyan-700 to-teal-700',
    icon: '⚖️',
    bgPattern: 'balance'
  },
  {
    id: 'meraki',
    name: 'Meraki',
    tagline: 'The Soul Creator',
    description: 'Greek creative essence. You pour your soul, creativity, and love into everything you create.',
    gradient: 'from-fuchsia-900 via-pink-800 to-fuchsia-700',
    icon: '🎨',
    bgPattern: 'art'
  },
  {
    id: 'gaman',
    name: 'Gaman',
    tagline: 'The Dignified Endurer',
    description: 'Japanese perseverance. You endure hardship with dignity and patience, finding strength in stoicism.',
    gradient: 'from-gray-800 via-slate-700 to-gray-700',
    icon: '🌸',
    bgPattern: 'sakura'
  },
  {
    id: 'tarab',
    name: 'Tarab',
    tagline: 'The Ecstatic Spirit',
    description: 'Arabic musical ecstasy. You experience profound emotional and spiritual transformation through art.',
    gradient: 'from-yellow-800 via-amber-700 to-yellow-700',
    icon: '🎵',
    bgPattern: 'music'
  },
  {
    id: 'savoir-faire',
    name: 'Savoir-Faire',
    tagline: 'The Refined Expert',
    description: 'French sophistication. You navigate life with grace, elegance, and an instinct for the refined.',
    gradient: 'from-purple-800 via-fuchsia-700 to-purple-700',
    icon: '🥐',
    bgPattern: 'paris'
  },
  {
    id: 'sankofa',
    name: 'Sankofa',
    tagline: 'The Wisdom Keeper',
    description: 'West African retrospection. You look to the past to understand the present and shape the future.',
    gradient: 'from-amber-800 via-orange-700 to-amber-700',
    icon: '🦅',
    bgPattern: 'bird'
  },
  {
    id: 'duende',
    name: 'Duende',
    tagline: 'The Passionate Soul',
    description: 'Spanish heightened emotion. You seek that mysterious power that moves people beyond rational thought.',
    gradient: 'from-red-800 via-orange-700 to-red-700',
    icon: '🔥',
    bgPattern: 'flame'
  },
  {
    id: 'ikigai',
    name: 'Ikigai',
    tagline: 'The Purpose Finder',
    description: 'Japanese reason for being. You seek the intersection of what you love, what you\'re good at, and what the world needs.',
    gradient: 'from-orange-800 via-red-700 to-orange-700',
    icon: '☀️',
    bgPattern: 'sun'
  },
  {
    id: 'gezellig',
    name: 'Gezellig',
    tagline: 'The Warm Connector',
    description: 'Dutch togetherness. You create cozy, convivial atmospheres where everyone feels welcome and connected.',
    gradient: 'from-amber-700 via-yellow-600 to-amber-600',
    icon: '🏡',
    bgPattern: 'home'
  },
  {
    id: 'mbuki-mvuki',
    name: 'Mbuki-Mvuki',
    tagline: 'The Joyful Dancer',
    description: 'Bantu celebratory release. You shake off burdens through dance, movement, and uninhibited celebration.',
    gradient: 'from-green-800 via-emerald-700 to-green-700',
    icon: '🎉',
    bgPattern: 'celebration'
  },
  {
    id: 'saudade',
    name: 'Saudade',
    tagline: 'The Nostalgic Heart',
    description: 'Portuguese longing. You feel deep, melancholic nostalgia for something or someone you love but is absent.',
    gradient: 'from-indigo-900 via-purple-800 to-indigo-800',
    icon: '🌙',
    bgPattern: 'moon'
  }
];

// Particle background component
const StarField = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars: Array<{ x: number; y: number; radius: number; vx: number; vy: number; alpha: number }> = [];
    
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        alpha: Math.random()
      });
    }
    
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1;
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1;
        
        star.alpha += (Math.random() - 0.5) * 0.02;
        star.alpha = Math.max(0.2, Math.min(1, star.alpha));
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }} />;
};

// Enhanced Card Component with gradient backgrounds
interface CardProps {
  code: typeof CULTURAL_CODES[0];
  index: number;
}

const CulturalCodeCard = ({ code, index }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer group"
      style={{ width: '320px', height: '480px' }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <div className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-gradient-to-br ${code.gradient} shadow-2xl`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
            {/* Icon section */}
            <div className="flex-1 flex items-center justify-center">
              <motion.div
                className="text-8xl drop-shadow-2xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {code.icon}
              </motion.div>
            </div>
            
            {/* Title section */}
            <div className="text-center space-y-2">
              <h3 className="text-3xl font-bold tracking-wide">{code.name}</h3>
              <p className="text-sm opacity-90 font-light">{code.tagline}</p>
            </div>
            
            {/* Number badge */}
            <div className="absolute bottom-8 right-8 w-16 h-16 rounded-full border-2 border-white/30 flex items-center justify-center backdrop-blur-sm bg-white/10">
              <span className="text-2xl font-light">{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
        </div>
        
        {/* Back of card */}
        <div 
          className={`absolute inset-0 backface-hidden rounded-2xl overflow-hidden bg-gradient-to-br ${code.gradient} shadow-2xl`}
          style={{ rotateY: 180 }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
            <div className="flex-1 flex items-center justify-center">
              <p className="text-center text-lg leading-relaxed font-light">{code.description}</p>
            </div>
            
            <Link href={`/explore/${code.id}`} className="w-full">
              <motion.button
                className="w-full px-6 py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Enter My World
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAuth, setShowAuth] = useState(false);
  const constraintsRef = useRef(null);
  
  const cardsPerView = 4;
  const cardWidth = 320;
  const gap = 32;
  const totalWidth = (cardWidth + gap) * CULTURAL_CODES.length;
  
  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, CULTURAL_CODES.length - cardsPerView));
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#12121e] to-[#1a1a2e] overflow-hidden">
      <StarField />
      
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6 backdrop-blur-md bg-black/20"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">AVIRAGE</span>
          </div>
          
          <div className="flex items-center gap-4">
            <motion.button
              onClick={() => setShowAuth(true)}
              className="px-5 py-2 rounded-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/10 transition-colors flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </motion.button>
            <motion.button
              onClick={() => setShowAuth(true)}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 transition-all flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="w-4 h-4" />
              Get Started
            </motion.button>
          </div>
        </motion.header>
        
        {/* Main content */}
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-20">
          {/* Hero text */}
          <motion.div
            className="text-center mb-16 space-y-4 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent leading-tight">
              Choose Your Destiny
            </h1>
            <p className="text-xl text-gray-300">
              Discover your cultural code and enter a world tailored just for you
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Click any card to explore its world, or swipe to see all 20 cultural codes
            </p>
          </motion.div>
          
          {/* Carousel */}
          <div className="relative w-full max-w-[1400px] mb-16">
            <div className="overflow-hidden" ref={constraintsRef}>
              <motion.div
                className="flex gap-8"
                animate={{
                  x: -(currentIndex * (cardWidth + gap))
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30
                }}
              >
                {CULTURAL_CODES.map((code, index) => (
                  <CulturalCodeCard key={code.id} code={code} index={index} />
                ))}
              </motion.div>
            </div>
            
            {/* Navigation arrows */}
            {currentIndex > 0 && (
              <motion.button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}
            
            {currentIndex < CULTURAL_CODES.length - cardsPerView && (
              <motion.button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}
          </div>
          
          {/* Progress indicators */}
          <div className="flex gap-2 mb-8">
            {Array.from({ length: Math.ceil(CULTURAL_CODES.length / cardsPerView) }).map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  Math.floor(currentIndex / cardsPerView) === i 
                    ? 'w-12 bg-purple-500' 
                    : 'w-1.5 bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
              />
            ))}
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-gray-400">
              Not sure which code is yours?
            </p>
            <Link href="/quiz">
              <motion.button
                className="px-8 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Take the Quiz
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Auth modal */}
      <AnimatePresence>
        {showAuth && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowAuth(false)}
          >
            <motion.div
              className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 rounded-2xl p-8 max-w-md w-full border border-purple-500/30"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Sign In / Sign Up</h2>
              <p className="text-gray-300 mb-6">
                Authentication integration goes here (Clerk)
              </p>
              <button
                onClick={() => setShowAuth(false)}
                className="w-full px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </div>
  );
}
