'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, LogIn, UserPlus } from 'lucide-react';
import Link from 'next/link';

// Cultural Codes data with colors and descriptions
const CULTURAL_CODES = [
  {
    id: 'shokunin',
    name: 'Shokunin',
    tagline: 'The Master Craftsperson',
    description: 'Japanese craft mastery. You value depth, patience, and the relentless pursuit of perfection in your craft.',
    color: '#8B4513',
    icon: '🎋'
  },
  {
    id: 'alethir',
    name: 'Alethir',
    tagline: 'The Truth Seeker',
    description: 'Ancient Greek inquiry. You seek truth through questioning, philosophical dialogue, and intellectual exploration.',
    color: '#4169E1',
    icon: '🏛️'
  },
  {
    id: 'ubuntu',
    name: 'Ubuntu',
    tagline: 'The Communal Spirit',
    description: 'African communalism. You believe in collective wellbeing and that humanity is deeply interconnected.',
    color: '#FF6B35',
    icon: '🌍'
  },
  {
    id: 'vivencia',
    name: 'Vivencia',
    tagline: 'The Present Moment',
    description: 'Latin American lived experience. You embrace sensory richness, celebration, and being fully present.',
    color: '#E91E63',
    icon: '💃'
  },
  {
    id: 'hygge',
    name: 'Hygge',
    tagline: 'The Cozy Soul',
    description: 'Nordic comfort. You find beauty in simplicity, warmth, and creating intimate sanctuaries of contentment.',
    color: '#D4A574',
    icon: '🕯️'
  },
  {
    id: 'wabi-sabi',
    name: 'Wabi-Sabi',
    tagline: 'The Imperfect Beauty',
    description: 'Japanese aesthetics of impermanence. You appreciate the beauty in imperfection and the passage of time.',
    color: '#556B2F',
    icon: '🍂'
  },
  {
    id: 'kairos',
    name: 'Kairos',
    tagline: 'The Perfect Timing',
    description: 'Greek opportune moment. You live for those fleeting perfect moments when everything aligns.',
    color: '#9370DB',
    icon: '⏱️'
  },
  {
    id: 'sisu',
    name: 'Sisu',
    tagline: 'The Stoic Strength',
    description: 'Finnish resilience. You possess extraordinary determination and courage in the face of adversity.',
    color: '#4682B4',
    icon: '⛰️'
  },
  {
    id: 'yuan',
    name: 'Yuan',
    tagline: 'The Destined Path',
    description: 'Chinese fateful connection. You trust in the invisible threads that connect people and circumstances.',
    color: '#DC143C',
    icon: '🎎'
  },
  {
    id: 'lagom',
    name: 'Lagom',
    tagline: 'The Balanced One',
    description: 'Swedish moderation. You seek the perfect balance—not too much, not too little, but just right.',
    color: '#5F9EA0',
    icon: '⚖️'
  },
  {
    id: 'meraki',
    name: 'Meraki',
    tagline: 'The Soul Creator',
    description: 'Greek creative essence. You pour your soul, creativity, and love into everything you create.',
    color: '#FF69B4',
    icon: '🎨'
  },
  {
    id: 'gaman',
    name: 'Gaman',
    tagline: 'The Dignified Endurer',
    description: 'Japanese perseverance. You endure hardship with dignity and patience, finding strength in stoicism.',
    color: '#2F4F4F',
    icon: '🌸'
  },
  {
    id: 'tarab',
    name: 'Tarab',
    tagline: 'The Ecstatic Spirit',
    description: 'Arabic musical ecstasy. You experience profound emotional and spiritual transformation through art.',
    color: '#DAA520',
    icon: '🎵'
  },
  {
    id: 'savoir-faire',
    name: 'Savoir-Faire',
    tagline: 'The Refined Expert',
    description: 'French sophistication. You navigate life with grace, elegance, and an instinct for the refined.',
    color: '#C71585',
    icon: '🥐'
  },
  {
    id: 'sankofa',
    name: 'Sankofa',
    tagline: 'The Wisdom Keeper',
    description: 'West African retrospection. You look to the past to understand the present and shape the future.',
    color: '#8B6914',
    icon: '🦅'
  },
  {
    id: 'duende',
    name: 'Duende',
    tagline: 'The Passionate Soul',
    description: 'Spanish heightened emotion. You seek that mysterious power that moves people beyond rational thought.',
    color: '#B22222',
    icon: '🔥'
  },
  {
    id: 'ikigai',
    name: 'Ikigai',
    tagline: 'The Purpose Finder',
    description: 'Japanese reason for being. You seek the intersection of what you love, what you\'re good at, and what the world needs.',
    color: '#FF4500',
    icon: '☀️'
  },
  {
    id: 'gezellig',
    name: 'Gezellig',
    tagline: 'The Warm Connector',
    description: 'Dutch togetherness. You create cozy, convivial atmospheres where everyone feels welcome and connected.',
    color: '#FF8C00',
    icon: '🏡'
  },
  {
    id: 'mbuki-mvuki',
    name: 'Mbuki-Mvuki',
    tagline: 'The Joyful Dancer',
    description: 'Bantu celebratory release. You shake off burdens through dance, movement, and uninhibited celebration.',
    color: '#32CD32',
    icon: '🎉'
  },
  {
    id: 'saudade',
    name: 'Saudade',
    tagline: 'The Nostalgic Heart',
    description: 'Portuguese longing. You feel deep, melancholic nostalgia for something or someone you love but is absent.',
    color: '#4B0082',
    icon: '🌙'
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
    
    // Create stars
    for (let i = 0; i < 200; i++) {
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

// Cultural Code Card Component
interface CardProps {
  code: typeof CULTURAL_CODES[0];
  index: number;
  total: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const CulturalCodeCard = ({ code, index, total, isHovered, onHover, onLeave }: CardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Calculate circular position
  const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
  const radius = 280; // Distance from center
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;
  
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: '50%',
        top: '50%',
        x: x,
        y: y,
        marginLeft: '-80px',
        marginTop: '-110px',
        zIndex: isHovered ? 50 : 10
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isHovered ? 1.15 : 1, 
        opacity: 1,
        rotateY: isFlipped ? 180 : 0
      }}
      transition={{ 
        delay: index * 0.05, 
        duration: 0.6,
        scale: { duration: 0.3 },
        rotateY: { duration: 0.6 }
      }}
      whileHover={{ scale: 1.15 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative w-40 h-56 preserve-3d">
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl shadow-2xl overflow-hidden border-2"
          style={{
            backgroundColor: `${code.color}15`,
            borderColor: code.color,
            boxShadow: `0 0 20px ${code.color}40`
          }}
        >
          <div className="h-full flex flex-col items-center justify-center p-4 text-center">
            <div className="text-5xl mb-3">{code.icon}</div>
            <h3 className="text-xl font-bold text-white mb-1">{code.name}</h3>
            <p className="text-xs text-gray-300">{code.tagline}</p>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </motion.div>
        
        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl shadow-2xl overflow-hidden border-2"
          style={{
            backgroundColor: `${code.color}25`,
            borderColor: code.color,
            boxShadow: `0 0 30px ${code.color}60`,
            rotateY: 180
          }}
        >
          <div className="h-full flex flex-col items-center justify-between p-4 text-center">
            <div className="flex-1 flex items-center">
              <p className="text-xs text-gray-200 leading-relaxed">{code.description}</p>
            </div>
            <Link href={`/explore/${code.id}`}>
              <motion.button
                className="w-full px-4 py-2 rounded-lg font-semibold text-sm flex items-center justify-center gap-2 mt-3"
                style={{
                  backgroundColor: code.color,
                  color: 'white'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Enter My World
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default function LandingPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#0a0a14] via-[#12121e] to-[#1a1a2e] overflow-hidden">
      {/* Animated star field background */}
      <StarField />
      
      {/* Content container */}
      <div className="relative z-10">
        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-6"
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
        <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          {/* Hero text */}
          <motion.div
            className="text-center mb-20 space-y-4 max-w-3xl"
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
              Each code represents a unique way of experiencing life. Click any card to explore its world.
            </p>
          </motion.div>
          
          {/* Circular card orbit */}
          <div className="relative w-full max-w-[800px] h-[800px] mb-20">
            {/* Center glow */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(147,51,234,0.3) 0%, rgba(219,39,119,0.2) 50%, transparent 100%)',
                filter: 'blur(40px)'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
            
            {/* Center text */}
            <motion.div
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="text-6xl mb-2">✨</div>
              <p className="text-sm text-gray-400">Your journey begins</p>
            </motion.div>
            
            {/* Cultural code cards */}
            {CULTURAL_CODES.map((code, index) => (
              <CulturalCodeCard
                key={code.id}
                code={code}
                index={index}
                total={CULTURAL_CODES.length}
                isHovered={hoveredCard === index}
                onHover={() => setHoveredCard(index)}
                onLeave={() => setHoveredCard(null)}
              />
            ))}
          </div>
          
          {/* Bottom CTA */}
          <motion.div
            className="text-center space-y-4 mb-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
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
      
      {/* Auth modal (placeholder) */}
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
