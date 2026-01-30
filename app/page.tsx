"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Users, Compass, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 140]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  async function handleGetStarted() {
    if (!user) {
      router.push("/sign-up");
      return;
    }

    try {
      const response = await fetch(`/api/users/${user.id}`);
      const data = await response.json();

      if (!data.user || !data.user.primaryCode) {
        router.push("/onboarding");
      } else if (data.user.type === "BUSINESS") {
        router.push("/business/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch {
      router.push("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-orange-50/30 to-blue-50 text-slate-900">
      {/* HERO */}
      <section className="relative h-screen overflow-hidden">
        {/* Particle Background */}
        <ParticleBackground />

        {/* VIDEO BACKGROUND */}
        <motion.div style={{ y }} className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            src="/videos/landing-page.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />

          {/* Enhanced gradient overlays with glassmorphism */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#006994]/30 via-[#00AEEF]/20 to-[#FF6B35]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-white/20 to-white/40" />
          
          {/* Ambient blur fields */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#00AEEF]/25 blur-3xl" />
            <div className="absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-[#FF6B35]/20 blur-3xl" />
            <div className="absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-[#7CF5C8]/20 blur-3xl" />
          </motion.div>
        </motion.div>

        {/* HERO CONTENT */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 h-full flex items-center justify-center px-6"
        >
          <div className="max-w-5xl mx-auto text-center space-y-10 bg-white/60 backdrop-blur-md rounded-3xl p-12 shadow-2xl border border-white/40">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-xl border border-[#00AEEF]/30 shadow-lg shadow-[#00AEEF]/10"
            >
              <Sparkles className="w-4 h-4 text-[#FF6B35]" />
              <span className="text-sm font-medium text-slate-700">
                Welcome to ETHOS
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-slate-900"
            >
              Travel your way.
              <br />
              <span className="bg-gradient-to-r from-[#006994] via-[#00AEEF] to-[#FF6B35] bg-clip-text text-transparent">
                Find places that feel like you.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-700 max-w-3xl mx-auto leading-relaxed"
            >
              Discover personalized travel experiences, places, and connections that match your natural style.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
            >
              <motion.button
                onClick={handleGetStarted}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                aria-label={user ? "Go to your dashboard" : "Take the travel style quiz"}
                className="group relative px-9 py-4 rounded-xl bg-gradient-to-r from-[#006994] to-[#00AEEF] text-white font-semibold flex items-center gap-2 shadow-2xl shadow-[#00AEEF]/40 hover:shadow-[#00AEEF]/60 transition-all"
              >
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#006994] to-[#00AEEF] opacity-30 blur group-hover:opacity-50 transition-opacity" />
                <span className="relative">{user ? "Go to Dashboard" : "Take the Travel Style Quiz"}</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              {!user && (
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/sign-in"
                    className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-xl border border-slate-300 hover:bg-white hover:border-slate-400 transition-all font-semibold shadow-lg text-slate-700"
                  >
                    Sign In
                  </Link>
                </motion.div>
              )}
            </motion.div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm text-slate-500 pt-4"
            >
              No commitment required · Takes 2 minutes
            </motion.p>
          </div>
        </motion.div>

        {/* SCROLL INDICATOR */}
        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          aria-label="Scroll to content"
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 cursor-pointer bg-transparent border-none"
        >
          <div className="flex flex-col items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
            <span className="text-xs uppercase tracking-wider font-medium">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border border-slate-400/50 backdrop-blur-sm bg-white/50 flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-gradient-to-b from-[#006994] to-[#00AEEF] rounded-full" />
            </motion.div>
          </div>
        </button>
      </section>

      {/* WHAT IS ETHOS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-blue-50 via-white to-orange-50/30 overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-[#00AEEF]/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[400px] w-[400px] rounded-full bg-[#FF6B35]/10 blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
              Your Personal{" "}
              <span className="bg-gradient-to-r from-[#006994] via-[#00AEEF] to-[#FF6B35] bg-clip-text text-transparent">
                Travel Discovery
              </span>
              {" "}Platform
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              ETHOS helps you discover personalized travel experiences, places, and connections that match your natural style.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Feature
              icon={<Compass />}
              title="Discover your travel style"
              text="Take a personalized quiz to uncover your unique travel preferences and what kind of experiences energize you."
              delay={0.1}
            />
            <Feature
              icon={<Zap />}
              title="Find aligned experiences"
              text="Explore destinations, activities, and hidden gems perfectly matched to your travel personality."
              delay={0.2}
            />
            <Feature
              icon={<Users />}
              title="Connect with like-minded travelers"
              text="Meet fellow adventurers who share your travel style and create meaningful connections on the road."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6 text-center bg-gradient-to-b from-orange-50/30 via-blue-50 to-sky-100 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#006994]/15 via-[#00AEEF]/15 to-[#FF6B35]/15 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-3xl mx-auto space-y-10"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
            Ready to discover{" "}
            <span className="bg-gradient-to-r from-[#006994] via-[#00AEEF] to-[#FF6B35] bg-clip-text text-transparent">
              your travel style
            </span>
            ?
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            Take the quiz and start finding travel experiences perfectly matched to who you are.
          </p>

          <motion.button
            onClick={handleGetStarted}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            aria-label={user ? "Go to your dashboard" : "Discover your travel style"}
            className="group relative inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-gradient-to-r from-[#006994] to-[#00AEEF] text-white font-semibold text-lg shadow-2xl shadow-[#00AEEF]/40 hover:shadow-[#00AEEF]/60 transition-all"
          >
            <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#006994] to-[#00AEEF] opacity-30 blur group-hover:opacity-50 transition-opacity" />
            <span className="relative">{user ? "Go to Dashboard" : "Discover Your Travel Style"}</span>
            <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <p className="text-sm text-slate-500">
            Free to start · No credit card needed
          </p>
        </motion.div>
      </section>

      <footer className="py-12 text-center text-slate-400 text-sm bg-gradient-to-b from-sky-100 to-slate-50">
        © 2026 ETHOS
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="group relative rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-xl p-8 transition-all hover:border-[#00AEEF]/40 hover:bg-white hover:shadow-xl hover:shadow-[#00AEEF]/10"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00AEEF]/5 to-[#FF6B35]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative">
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#006994] via-[#00AEEF] to-[#7CF5C8] flex items-center justify-center mb-6 shadow-lg shadow-[#00AEEF]/20"
        >
          <div className="text-white">
            {icon}
          </div>
        </motion.div>
        <h3 className="text-2xl font-semibold mb-3 text-slate-900 group-hover:text-[#006994] transition-colors">
          {title}
        </h3>
        <p className="text-slate-600 leading-relaxed">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

// Particle class definition (outside component for performance)
class Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  canvasWidth: number;
  canvasHeight: number;

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.x = Math.random() * canvasWidth;
    this.y = Math.random() * canvasHeight;
    this.size = Math.random() * 2 + 0.5;
    this.speedX = Math.random() * 0.5 - 0.25;
    this.speedY = Math.random() * 0.5 - 0.25;
    
    const colors = [
      "0, 105, 148",     // #006994 (ocean blue)
      "0, 174, 239",     // #00AEEF (bright blue)
      "255, 107, 53",    // #FF6B35 (sunset orange)
      "124, 245, 200",   // #7CF5C8 (mint - keeping this)
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];
    this.color = `rgba(${color}, 0.6)`;
    this.opacity = Math.random() * 0.5 + 0.2;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x > this.canvasWidth) this.x = 0;
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.y > this.canvasHeight) this.y = 0;
    if (this.y < 0) this.y = this.canvasHeight;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

// Particle Background Component
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Reduce particles on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const numberOfParticles = isMobile ? 30 : 60;

    const particlesArray: Particle[] = [];
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle(canvas.width, canvas.height));
    }

    let animationFrameId: number;
    let isVisible = true;

    // Use Page Visibility API to pause animations when page is not visible
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = () => {
      if (!isVisible) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesArray.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
      role="presentation"
    />
  );
}