'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, LogIn, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';

// REAL Cultural Codes with authentic data
const CULTURAL_CODES = [
  {
    id: 'khoisan',
    name: 'KHOISAN',
    origin: 'Khoisan Peoples',
    tagline: 'Hyper-Acute Perception',
    essence: 'Hyper-acute environmental perception, radical egalitarianism, present-moment survival intelligence',
    gradient: 'from-amber-900 via-orange-800 to-amber-700',
    icon: '🏹',
  },
  {
    id: 'kayori',
    name: 'KÁYORI',
    origin: 'Yoruba',
    tagline: 'Expressive Ritual Creativity',
    essence: 'Expressive ritual creativity, destiny-aware, communal intellect, oral-intellectual tradition',
    gradient: 'from-purple-900 via-fuchsia-800 to-purple-700',
    icon: '🎭',
  },
  {
    id: 'sahen',
    name: 'SAHÉN',
    origin: 'Tuareg',
    tagline: 'Desert Wisdom',
    essence: 'Introspective poetic identity, desert wisdom, existential longing, nomadic autonomy',
    gradient: 'from-yellow-900 via-amber-800 to-yellow-700',
    icon: '🏜️',
  },
  {
    id: 'enzuka',
    name: 'ENZUKA',
    origin: 'Maasai + Zulu',
    tagline: 'Warrior Discipline',
    essence: 'Strength through people, courage as social duty, warrior discipline, collective honor',
    gradient: 'from-red-900 via-orange-800 to-red-700',
    icon: '🛡️',
  },
  {
    id: 'siyuane',
    name: 'SIYUANÉ',
    origin: 'Ethiopian + Han Chinese',
    tagline: 'Generational Harmony',
    essence: 'Harmony sustained across generations, long continuity, hierarchical order, disciplined tradition',
    gradient: 'from-emerald-900 via-teal-800 to-emerald-700',
    icon: '🏛️',
  },
  {
    id: 'jaejin',
    name: 'JAEJIN',
    origin: 'Korean',
    tagline: 'Compressed Emotion (Han)',
    essence: 'Strength forged under constraint, compressed emotion (Han), intense loyalty, extreme diligence',
    gradient: 'from-slate-800 via-blue-900 to-slate-700',
    icon: '⚡',
  },
  {
    id: 'namsea',
    name: 'NAMSÉA',
    origin: 'Vietnamese + Thai',
    tagline: 'Water-Based Cognition',
    essence: 'Grace under movement, water-based cognition, calm resilience, gentle ease, conflict avoidance',
    gradient: 'from-cyan-900 via-blue-800 to-cyan-700',
    icon: '🌊',
  },
  {
    id: 'shokunin',
    name: 'SHOKUNIN',
    origin: 'Japanese',
    tagline: 'Perfectionist Craftsmanship',
    essence: 'Perfectionist craftsmanship, group harmony (Wa), aesthetic discipline, ritualized order',
    gradient: 'from-rose-900 via-pink-800 to-rose-700',
    icon: '🎋',
  },
  {
    id: 'khoruun',
    name: 'KHORUUN',
    origin: 'Mongolian',
    tagline: 'Nomadic Mobility',
    essence: 'Freedom sustained by movement, nomadic mobility intelligence, decentralized strength',
    gradient: 'from-stone-800 via-gray-700 to-stone-700',
    icon: '🐎',
  },
  {
    id: 'lhumir',
    name: 'LHUMIR',
    origin: 'Tibetan',
    tagline: 'Contemplative Consciousness',
    essence: 'Stillness that includes others, contemplative consciousness, impermanence worldview, compassion discipline',
    gradient: 'from-indigo-900 via-purple-800 to-indigo-700',
    icon: '🕉️',
  },
  {
    id: 'yatevar',
    name: 'YATEVAR',
    origin: 'Vedic + Aztec',
    tagline: 'Warrior-Philosopher',
    essence: 'Order embodied through duty, law as lived ritual, metaphysical abstraction, warrior-philosopher',
    gradient: 'from-orange-900 via-amber-800 to-orange-700',
    icon: '🔱',
  },
  {
    id: 'renara',
    name: 'RÉNARA',
    origin: 'Javanese',
    tagline: 'Refined Subtlety (Halus)',
    essence: 'Order maintained through balance, refined subtlety (Halus), emotional restraint, hierarchical harmony',
    gradient: 'from-emerald-800 via-green-700 to-emerald-700',
    icon: '🌺',
  },
  {
    id: 'karayni',
    name: 'KARAYNI',
    origin: 'Balinese + Quechua',
    tagline: 'Sacred Reciprocity',
    essence: 'Sacred balance through reciprocity, mutual responsibility (humans-spirits-land), communal ritual labor',
    gradient: 'from-yellow-800 via-orange-700 to-yellow-700',
    icon: '🌄',
  },
  {
    id: 'wohaka',
    name: 'WÓHAKA',
    origin: 'Maori + Lakota',
    tagline: 'All Beings as Kin',
    essence: 'Existence as relationship, all beings as kin, warrior-spiritual synthesis, land-identity fusion',
    gradient: 'from-teal-900 via-cyan-800 to-teal-700',
    icon: '🦅',
  },
  {
    id: 'tjukari',
    name: 'TJUKARI',
    origin: 'Aboriginal Australian',
    tagline: 'Dreamtime Cosmology',
    essence: 'Land remembers through us, Dreamtime cosmology, Songline navigation, non-linear time, deep time consciousness',
    gradient: 'from-red-800 via-orange-700 to-red-700',
    icon: '🪃',
  },
  {
    id: 'kinmora',
    name: 'KINMORA',
    origin: 'Maya',
    tagline: 'Mathematical Cosmology',
    essence: 'Mastery of cycles, mathematical cosmology, cyclical time consciousness, astronomical precision',
    gradient: 'from-lime-900 via-green-800 to-lime-700',
    icon: '🌙',
  },
  {
    id: 'siljoa',
    name: 'SILJOA',
    origin: 'Inuit + Sami',
    tagline: 'Arctic Intelligence',
    essence: 'Living in dialogue with climate and place, environment as thinking partner, Arctic survival intelligence',
    gradient: 'from-blue-900 via-cyan-800 to-blue-700',
    icon: '❄️',
  },
  {
    id: 'skenari',
    name: 'SKÉNARI',
    origin: 'Haudenosaunee',
    tagline: 'Seventh Generation',
    essence: 'Responsibility to the unborn, Seventh Generation principle, consensus governance, future-oriented ethics',
    gradient: 'from-green-900 via-emerald-800 to-green-700',
    icon: '🌲',
  },
  {
    id: 'ashkara',
    name: 'ASHKARA',
    origin: 'Persian/Zoroastrian',
    tagline: 'Truth as Sacred Action',
    essence: 'Truth enacted not believed, moral choice as sacred action, ethical dualism, fire symbolism',
    gradient: 'from-orange-800 via-red-700 to-orange-700',
    icon: '🔥',
  },
  {
    id: 'alethir',
    name: 'ALÉTHIR',
    origin: 'Ancient Greek',
    tagline: 'Logos-Centered Inquiry',
    essence: 'To live by seeking what is real, truth emerges through inquiry and dialogue, logos-centered thinking',
    gradient: 'from-blue-800 via-indigo-700 to-blue-700',
    icon: '🏺',
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

// Enhanced Card Component
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
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
            {/* Icon section */}
            <div className="flex-1 flex flex-col items-center justify-center">
              <motion.div
                className="text-7xl drop-shadow-2xl mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {code.icon}
              </motion.div>
              <p className="text-xs uppercase tracking-widest opacity-70 mb-2">{code.origin}</p>
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
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="absolute inset-0 bg-black/40" />
          <div className="relative h-full flex flex-col items-center justify-between p-8 text-white">
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <p className="text-xs uppercase tracking-widest opacity-70">{code.origin}</p>
              <h4 className="text-2xl font-bold">{code.name}</h4>
              <p className="text-center text-base leading-relaxed font-light">{code.essence}</p>
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
  
  const cardsPerView = 4;
  const cardWidth = 320;
  const gap = 32;
  
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
              20 cultural codes. One matches the way you see the world.
            </p>
            <p className="text-sm text-gray-400 max-w-xl mx-auto">
              Each code represents an ancient way of being. Click to explore, swipe to discover all.
            </p>
          </motion.div>
          
          {/* Carousel */}
          <div className="relative w-full max-w-[1400px] mb-16">
            <div className="overflow-hidden">
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
