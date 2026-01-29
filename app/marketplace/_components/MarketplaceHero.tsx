"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lightning, MapPin, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Venue } from "../page";
import { ParticleBackground } from "./ParticleBackground";

interface MarketplaceHeroProps {
  slides: { venue: Venue; match: number }[];
  userArchetype?: string | null;
}

// Archetype-based welcome messages
const ARCHETYPE_MESSAGES: Record<string, { title: string; subtitle: string }> = {
  khoisan: { 
    title: "Welcome, Earthlistener", 
    subtitle: "Spaces that resonate with your present, observant nature" 
  },
  atlantean: { 
    title: "Welcome, Architect", 
    subtitle: "Discover venues that match your vision and structure" 
  },
  lemurian: { 
    title: "Welcome, Harmonizer", 
    subtitle: "Find spaces in sync with your intuitive flow" 
  },
  hyperborean: { 
    title: "Welcome, Visionary", 
    subtitle: "Explore cutting-edge experiences aligned with your innovation" 
  },
  muvian: { 
    title: "Welcome, Creator", 
    subtitle: "Venues that celebrate your artistic expression" 
  },
};

export function MarketplaceHero({ slides, userArchetype }: MarketplaceHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  if (!slides.length) {
    return null;
  }

  const currentSlide = slides[currentIndex];

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[520px] max-h-[800px] overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-cyan-50">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Personalized Welcome Banner (top) */}
      {userArchetype && ARCHETYPE_MESSAGES[userArchetype.toLowerCase()] && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute top-6 left-1/2 -translate-x-1/2 z-30"
        >
          <div className="px-6 py-3 rounded-full bg-white/90 backdrop-blur-xl border border-blue-200 shadow-lg">
            <p className="text-sm font-medium text-slate-700">
              {ARCHETYPE_MESSAGES[userArchetype.toLowerCase()].title}
              <span className="mx-2 text-blue-500">·</span>
              <span className="text-slate-600">
                {ARCHETYPE_MESSAGES[userArchetype.toLowerCase()].subtitle}
              </span>
            </p>
          </div>
        </motion.div>
      )}
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {/* Background Image with Parallax Effect */}
          {currentSlide.venue.imageUrl ? (
            <motion.div
              className="absolute inset-0"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 8, ease: "easeOut" }}
            >
              <Image
                src={currentSlide.venue.imageUrl}
                alt={currentSlide.venue.name}
                fill
                sizes="100vw"
                priority
                quality={95}
                className="object-cover"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              />
            </motion.div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-purple-100 to-cyan-100" />
          )}

          {/* Enhanced Gradient Overlays for Premium Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/40 to-white/70" />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent" />

          {/* Ambient Color Fields */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-blue-300/20 blur-3xl" />
            <div className="absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-purple-300/15 blur-3xl" />
            <div className="absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-cyan-300/15 blur-3xl" />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-[1800px] mx-auto px-6 flex items-end pb-16">
        <motion.div
          key={`content-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="w-full"
        >
          <div className="max-w-[760px]">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-200/50 text-sm text-blue-700 shadow-sm"
            >
              <Lightning weight="fill" className="text-cyan-500" />
              <span className="font-medium">Resonating right now</span>
            </motion.div>

            {/* Title - Enhanced Typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-slate-900 leading-[1.1] mb-4 tracking-tight">
              {currentSlide.venue.name}
            </h1>

            {/* Location - Enhanced Styling */}
            <div className="flex items-center gap-2 text-slate-700 mb-6 text-sm md:text-base">
              <MapPin weight="fill" className="w-5 h-5 text-cyan-500" />
              <span className="font-medium">
                {currentSlide.venue.neighborhood
                  ? `${currentSlide.venue.neighborhood}, ${currentSlide.venue.city}`
                  : currentSlide.venue.city}
              </span>
            </div>

            {/* Description - Improved Readability */}
            {currentSlide.venue.description && (
              <p className="text-slate-700 text-base md:text-lg leading-[1.7] max-w-[65ch] mb-8">
                {currentSlide.venue.description}
              </p>
            )}

            {/* CTA Row - Premium Button Design */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/marketplace/${currentSlide.venue.id}`}
                  className="inline-flex items-center justify-center px-9 h-13 md:h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm md:text-base font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 shadow-lg shadow-blue-500/25"
                  aria-label={`Explore ${currentSlide.venue.name}`}
                >
                  Explore this space
                </Link>
              </motion.div>

              {/* Meta Pills - Enhanced Design */}
              <div className="flex items-center gap-2 text-xs md:text-sm">
                {currentSlide.match > 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-cyan-50 to-cyan-100 border border-cyan-200 backdrop-blur-md text-cyan-700 font-medium shadow-sm"
                  >
                    {currentSlide.match}% match
                  </motion.span>
                )}
                {currentSlide.venue.subcategory && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="px-4 py-2 rounded-full bg-white/90 border border-slate-200 backdrop-blur-md capitalize text-slate-700 font-medium shadow-sm"
                  >
                    {currentSlide.venue.subcategory}
                  </motion.span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Arrows - Enhanced Design */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
            <motion.button
              onClick={goToPrevious}
              aria-label="Previous slide"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto w-14 h-14 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              type="button"
            >
              <CaretLeft className="w-6 h-6 text-slate-700" weight="bold" />
            </motion.button>
            <motion.button
              onClick={goToNext}
              aria-label="Next slide"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.95)" }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto w-14 h-14 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-xl"
              type="button"
            >
              <CaretRight className="w-6 h-6 text-slate-700" weight="bold" />
            </motion.button>
          </div>

          {/* Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-blue-500"
                    : "w-1.5 bg-slate-400 hover:bg-slate-500"
                }`}
                type="button"
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
