"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Lightning, MapPin, CaretLeft, CaretRight } from "@phosphor-icons/react";
import type { Venue } from "../page";

interface MarketplaceHeroProps {
  slides: { venue: Venue; match: number }[];
}

export function MarketplaceHero({ slides }: MarketplaceHeroProps) {
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
    <section className="relative w-full h-[70vh] min-h-[520px] max-h-[800px] overflow-hidden bg-[#0B0D10]">
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
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900" />
          )}

          {/* Enhanced Gradient Overlays for Premium Depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/90 via-[#0B0D10]/30 to-[#0B0D10]/60" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent" />

          {/* Ambient Color Fields */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute -top-24 -left-24 h-[420px] w-[420px] rounded-full bg-[#4F8CFF]/15 blur-3xl" />
            <div className="absolute top-24 right-[-140px] h-[520px] w-[520px] rounded-full bg-[#C7B9FF]/12 blur-3xl" />
            <div className="absolute bottom-[-220px] left-1/3 h-[520px] w-[520px] rounded-full bg-[#7CF5C8]/10 blur-3xl" />
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
              className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/[0.06] text-sm text-white"
            >
              <Lightning weight="fill" className="text-[#7CF5C8]" />
              <span>Resonating right now</span>
            </motion.div>

            {/* Title - Enhanced Typography */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] mb-4 tracking-tight">
              {currentSlide.venue.name}
            </h1>

            {/* Location - Enhanced Styling */}
            <div className="flex items-center gap-2 text-zinc-300 mb-6 text-sm md:text-base">
              <MapPin weight="fill" className="w-5 h-5 text-[#7CF5C8]" />
              <span className="font-medium">
                {currentSlide.venue.neighborhood
                  ? `${currentSlide.venue.neighborhood}, ${currentSlide.venue.city}`
                  : currentSlide.venue.city}
              </span>
            </div>

            {/* Description - Improved Readability */}
            {currentSlide.venue.description && (
              <p className="text-zinc-200 text-base md:text-lg leading-[1.7] max-w-[65ch] mb-8 font-light">
                {currentSlide.venue.description}
              </p>
            )}

            {/* CTA Row - Premium Button Design */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href={`/marketplace/${currentSlide.venue.id}`}
                  className="inline-flex items-center justify-center px-9 h-13 md:h-14 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-[#041021] text-sm md:text-base font-semibold hover:shadow-[0_10px_40px_rgba(79,140,255,0.5)] transition-all duration-300 shadow-[0_6px_30px_rgba(79,140,255,0.35)]"
                  aria-label={`Explore ${currentSlide.venue.name}`}
                >
                  Explore this space
                </Link>
              </motion.div>

              {/* Meta Pills - Enhanced Design */}
              <div className="flex items-center gap-2 text-xs md:text-sm text-zinc-400">
                {currentSlide.match > 0 && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#7CF5C8]/15 to-[#7CF5C8]/5 border border-[#7CF5C8]/20 backdrop-blur-md text-[#7CF5C8] font-medium"
                  >
                    {currentSlide.match}% match
                  </motion.span>
                )}
                {currentSlide.venue.subcategory && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.08] backdrop-blur-md capitalize text-white/90 font-medium"
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
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-2xl"
              type="button"
            >
              <CaretLeft className="w-6 h-6 text-white" weight="bold" />
            </motion.button>
            <motion.button
              onClick={goToNext}
              aria-label="Next slide"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.7)" }}
              whileTap={{ scale: 0.95 }}
              className="pointer-events-auto w-14 h-14 rounded-full bg-black/50 backdrop-blur-xl border border-white/15 flex items-center justify-center transition-all duration-200 shadow-lg hover:shadow-2xl"
              type="button"
            >
              <CaretRight className="w-6 h-6 text-white" weight="bold" />
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
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
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
