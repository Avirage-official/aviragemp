'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { useDrag } from '@use-gesture/react';
import { Sparkles, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// REAL Cultural Codes with authentic data
const CULTURAL_CODES = [
  {
    id: 'khoisan',
    name: 'KHOISAN',
    origin: 'Khoisan Peoples',
    tagline: 'Hyper-Acute Perception',
    essence: 'Hyper-acute environmental perception, radical egalitarianism, present-moment survival intelligence',
    gradient: 'from-amber-900/40 via-orange-800/40 to-amber-700/40',
    image: '/images/codes/KHOISAN-frontpage.jpeg'
  },
  {
    id: 'kayori',
    name: 'KÁYORI',
    origin: 'Yoruba',
    tagline: 'Expressive Ritual Creativity',
    essence: 'Expressive ritual creativity, destiny-aware, communal intellect, oral-intellectual tradition',
    gradient: 'from-purple-900/40 via-fuchsia-800/40 to-purple-700/40',
    image: '/images/codes/KAYORI-frontpage.jpeg'
  },
  {
    id: 'sahen',
    name: 'SAHÉN',
    origin: 'Tuareg',
    tagline: 'Desert Wisdom',
    essence: 'Introspective poetic identity, desert wisdom, existential longing, nomadic autonomy',
    gradient: 'from-yellow-900/40 via-amber-800/40 to-yellow-700/40',
    image: '/images/codes/SAHEN-frontpage.jpeg'
  },
  {
    id: 'enzuka',
    name: 'ENZUKA',
    origin: 'Maasai + Zulu',
    tagline: 'Warrior Discipline',
    essence: 'Strength through people, courage as social duty, warrior discipline, collective honor',
    gradient: 'from-red-900/40 via-orange-800/40 to-red-700/40',
    image: '/images/codes/ENZUKA-frontpage.jpeg'
  },
  {
    id: 'siyuane',
    name: 'SIYUANÉ',
    origin: 'Ethiopian + Han Chinese',
    tagline: 'Generational Harmony',
    essence: 'Harmony sustained across generations, long continuity, hierarchical order, disciplined tradition',
    gradient: 'from-emerald-900/40 via-teal-800/40 to-emerald-700/40',
    image: '/images/codes/SIYUANE-frontpage.jpeg'
  },
  {
    id: 'jaejin',
    name: 'JAEJIN',
    origin: 'Korean',
    tagline: 'Compressed Emotion (Han)',
    essence: 'Strength forged under constraint, compressed emotion (Han), intense loyalty, extreme diligence',
    gradient: 'from-slate-800/40 via-blue-900/40 to-slate-700/40',
    image: '/images/codes/JAEJIN-frontpage.jpeg'
  },
  {
    id: 'namsea',
    name: 'NAMSÉA',
    origin: 'Vietnamese + Thai',
    tagline: 'Water-Based Cognition',
    essence: 'Grace under movement, water-based cognition, calm resilience, gentle ease, conflict avoidance',
    gradient: 'from-cyan-900/40 via-blue-800/40 to-cyan-700/40',
    image: '/images/codes/NAMSEA-frontpage.jpeg'
  },
  {
    id: 'shokunin',
    name: 'SHOKUNIN',
    origin: 'Japanese',
    tagline: 'Perfectionist Craftsmanship',
    essence: 'Perfectionist craftsmanship, group harmony (Wa), aesthetic discipline, ritualized order',
    gradient: 'from-rose-900/40 via-pink-800/40 to-rose-700/40',
    image: '/images/codes/SHOKUNIN-frontpage.jpeg'
  },
  {
    id: 'khoruun',
    name: 'KHORUUN',
    origin: 'Mongolian',
    tagline: 'Nomadic Mobility',
    essence: 'Freedom sustained by movement, nomadic mobility intelligence, decentralized strength',
    gradient: 'from-stone-800/40 via-gray-700/40 to-stone-700/40',
    image: '/images/codes/KHORUUN-frontpage.jpeg'
  },
  {
    id: 'lhumir',
    name: 'LHUMIR',
    origin: 'Tibetan',
    tagline: 'Contemplative Consciousness',
    essence: 'Stillness that includes others, contemplative consciousness, impermanence worldview, compassion discipline',
    gradient: 'from-indigo-900/40 via-purple-800/40 to-indigo-700/40',
    image: '/images/codes/LHUMIR-frontpage.jpeg'
  },
  {
    id: 'yatevar',
    name: 'YATEVAR',
    origin: 'Vedic + Aztec',
    tagline: 'Warrior-Philosopher',
    essence: 'Order embodied through duty, law as lived ritual, metaphysical abstraction, warrior-philosopher',
    gradient: 'from-orange-900/40 via-amber-800/40 to-orange-700/40',
    image: '/images/codes/YATEVAR-frontpage.jpeg'
  },
  {
    id: 'renara',
    name: 'RÉNARA',
    origin: 'Javanese',
    tagline: 'Refined Subtlety (Halus)',
    essence: 'Order maintained through balance, refined subtlety (Halus), emotional restraint, hierarchical harmony',
    gradient: 'from-emerald-800/40 via-green-700/40 to-emerald-700/40',
    image: '/images/codes/RENARA-frontpage.jpeg'
  },
  {
    id: 'karayni',
    name: 'KARAYNI',
    origin: 'Balinese + Quechua',
    tagline: 'Sacred Reciprocity',
    essence: 'Sacred balance through reciprocity, mutual responsibility (humans-spirits-land), communal ritual labor',
    gradient: 'from-yellow-800/40 via-orange-700/40 to-yellow-700/40',
    image: '/images/codes/KARAYNI-frontpage.jpeg'
  },
  {
    id: 'wohaka',
    name: 'WÓHAKA',
    origin: 'Maori + Lakota',
    tagline: 'All Beings as Kin',
    essence: 'Existence as relationship, all beings as kin, warrior-spiritual synthesis, land-identity fusion',
    gradient: 'from-teal-900/40 via-cyan-800/40 to-teal-700/40',
    image: '/images/codes/WOHAKA-frontpage.jpeg'
  },
  {
    id: 'tjukari',
    name: 'TJUKARI',
    origin: 'Aboriginal Australian',
    tagline: 'Dreamtime Cosmology',
    essence: 'Land remembers through us, Dreamtime cosmology, Songline navigation, non-linear time, deep time consciousness',
    gradient: 'from-red-800/40 via-orange-700/40 to-red-700/40',
    image: '/images/codes/TJUKARI-frontpage.jpeg'
  },
  {
    id: 'kinmora',
    name: 'KINMORA',
    origin: 'Maya',
    tagline: 'Mathematical Cosmology',
    essence: 'Mastery of cycles, mathematical cosmology, cyclical time consciousness, astronomical precision',
    gradient: 'from-lime-900/40 via-green-800/40 to-lime-700/40',
    image: '/images/codes/KINMORA-frontpage.jpeg'
  },
  {
    id: 'siljoa',
    name: 'SILJOA',
    origin: 'Inuit + Sami',
    tagline: 'Arctic Intelligence',
    essence: 'Living in dialogue with climate and place, environment as thinking partner, Arctic survival intelligence',
    gradient: 'from-blue-900/40 via-cyan-800/40 to-blue-700/40',
    image: '/images/codes/SILJOA-frontpage.jpeg'
  },
  {
    id: 'skenari',
    name: 'SKÉNARI',
    origin: 'Haudenosaunee',
    tagline: 'Seventh Generation',
    essence: 'Responsibility to the unborn, Seventh Generation principle, consensus governance, future-oriented ethics',
    gradient: 'from-green-900/40 via-emerald-800/40 to-green-700/40',
    image: '/images/codes/SKENARI-frontpage.jpeg'
  },
  {
    id: 'ashkara',
    name: 'ASHKARA',
    origin: 'Persian/Zoroastrian',
    tagline: 'Truth as Sacred Action',
    essence: 'Truth enacted not believed, moral choice as sacred action, ethical dualism, fire symbolism',
    gradient: 'from-orange-800/40 via-red-700/40 to-orange-700/40',
    image: '/images/codes/ASHKARA-frontpage.jpeg'
  },
  {
    id: 'alethir',
    name: 'ALÉTHIR',
    origin: 'Ancient Greek',
    tagline: 'Logos-Centered Inquiry',
    essence: 'To live by seeking what is real, truth emerges through inquiry and dialogue, logos-centered thinking',
    gradient: 'from-blue-800/40 via-indigo-700/40 to-blue-700/40',
    image: '/images/codes/ALETHIR-frontpage.jpeg'
  }
];

// Particle background
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
    
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
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

// 3D Carousel Card
interface CardProps {
  code: typeof CULTURAL_CODES[0];
  index: number;
  rotation: ReturnType<typeof useSpring>;
  totalCards: number;
  onCardClick: () => void;
}

const CarouselCard = ({ code, index, rotation, totalCards, onCardClick }: CardProps) => {
  const anglePerCard = (2 * Math.PI) / totalCards;
  const cardAngle = index * anglePerCard;
  const radius = 600;
  
  const adjustedAngle = useTransform(rotation, (r) => cardAngle - r);
  const x = useTransform(adjustedAngle, (angle) => Math.sin(angle) * radius);
  const z = useTransform(adjustedAngle, (angle) => Math.cos(angle) * radius);
  
  // Scale and opacity based on z position (depth)
  const scale = useTransform(z, (zVal) => 0.6 + (zVal + radius) / (radius * 2) * 0.6);
  const opacity = useTransform(z, (zVal) => 0.3 + (zVal + radius) / (radius * 2) * 0.7);
  const blur = useTransform(z, (zVal) => Math.max(0, (radius - zVal) / 100));
  
  // Transform for checking if centered (using adjustedAngle)
  const isNearCenter = useTransform(adjustedAngle, (angle) => {
    const normalizedAngle = ((angle % (2 * Math.PI)) + (2 * Math.PI)) % (2 * Math.PI);
    return normalizedAngle < 0.3 || normalizedAngle > (2 * Math.PI - 0.3);
  });
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        width: '260px',
        height: '480px',
        left: '50%',
        top: '50%',
        marginLeft: '-130px',
        marginTop: '-240px',
        x,
        z,
        scale,
        opacity,
        filter: useTransform(blur, (b) => `blur(${b}px)`),
        zIndex: useTransform(z, (zVal) => Math.round(zVal)),
        rotateY: useTransform(adjustedAngle, (angle) => `${angle * (180 / Math.PI)}deg`),
      }}
      onClick={onCardClick}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={code.image}
            alt={code.name}
            fill
            className="object-cover"
            sizes="260px"
            priority={index < 5}
          />
        </div>
        
        {/* Light gradient overlay for readability */}
        <div className={`absolute inset-0 bg-gradient-to-t ${code.gradient}`} />
        
        {/* Glass morphism overlay */}
        <div className="absolute inset-0 backdrop-blur-[1px] bg-black/10" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col justify-between p-6 text-white">
          {/* Top section */}
          <div className="flex items-start justify-between">
            <div className="px-3 py-1.5 rounded-full backdrop-blur-md bg-black/40 border border-white/20">
              <p className="text-xs uppercase tracking-wider font-light">{code.origin}</p>
            </div>
            <div className="w-10 h-10 rounded-full backdrop-blur-md bg-black/40 border border-white/20 flex items-center justify-center">
              <span className="text-sm font-light">{String(index + 1).padStart(2, '0')}</span>
            </div>
          </div>
          
          {/* Bottom section */}
          <div className="space-y-2">
            <h3 className="text-3xl font-bold tracking-wide drop-shadow-lg">{code.name}</h3>
            <p className="text-sm opacity-90 font-light">{code.tagline}</p>
            <p className="text-xs opacity-75 italic">Click to explore</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof CULTURAL_CODES[0] | null>(null);
  
  // Rotation state with spring physics
  const rotation = useSpring(0, {
    stiffness: 100,
    damping: 30,
  });
  
  // Drag gesture
  const bind = useDrag(
    ({ offset: [x], velocity: [vx], direction: [dx], dragging }) => {
      const sensitivity = 0.003;
      rotation.set(-x * sensitivity);
      
      // Add momentum when released
      if (!dragging && Math.abs(vx) > 0.5) {
        const momentum = vx * dx * 0.2;
        rotation.set(rotation.get() + momentum);
      }
    },
    {
      from: () => [rotation.get() / -0.003, 0],
      bounds: { left: -Infinity, right: Infinity },
      rubberband: false,
    }
  );
  
  const handleCardClick = (code: typeof CULTURAL_CODES[0]) => {
    setSelectedCard(code);
  };
  
  const closeModal = () => {
    setSelectedCard(null);
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
            className="text-center mb-12 space-y-4 max-w-3xl"
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
              Drag to spin • Click centered card to explore
            </p>
          </motion.div>
          
          {/* 3D Carousel */}
          <div 
            className="relative w-full h-[600px] perspective-1000"
            style={{ perspective: '1000px' }}
            {...bind()}
          >
            <div className="absolute inset-0 preserve-3d">
              {CULTURAL_CODES.map((code, index) => (
                <CarouselCard
                  key={code.id}
                  code={code}
                  index={index}
                  rotation={rotation}
                  totalCards={CULTURAL_CODES.length}
                  onCardClick={() => handleCardClick(code)}
                />
              ))}
            </div>
          </div>
          
          {/* Bottom hint */}
          <motion.div
            className="text-center space-y-4 mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <p className="text-gray-400 text-sm">
              Not sure which code is yours?
            </p>
            <Link href="/quiz">
              <motion.button
                className="px-10 py-4 rounded-full bg-white text-black font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Take the Quiz
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Card Detail Modal */}
      {selectedCard && (
        <motion.div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeModal}
        >
          <motion.div
            className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src={selectedCard.image}
                alt={selectedCard.name}
                fill
                className="object-cover opacity-50"
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-br ${selectedCard.gradient.replace('/40', '/90')}`} />
            
            {/* Content */}
            <div className="relative p-12 text-white space-y-6">
              <div className="space-y-2">
                <p className="text-sm uppercase tracking-widest opacity-70">{selectedCard.origin}</p>
                <h2 className="text-5xl font-bold">{selectedCard.name}</h2>
                <p className="text-xl opacity-90">{selectedCard.tagline}</p>
              </div>
              
              <p className="text-lg leading-relaxed">{selectedCard.essence}</p>
              
              <div className="flex gap-4">
                <Link href={`/explore/${selectedCard.id}`} className="flex-1">
                  <motion.button
                    className="w-full px-6 py-4 rounded-2xl font-semibold text-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enter My World
                  </motion.button>
                </Link>
                <motion.button
                  onClick={closeModal}
                  className="px-6 py-4 rounded-2xl font-semibold text-lg bg-white/10 hover:bg-white/20 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Auth modal */}
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
      
      <style jsx global>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
}
