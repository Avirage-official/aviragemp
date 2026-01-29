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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          {currentSlide.venue.imageUrl ? (
            <div className="absolute inset-0">
              <Image
                src={currentSlide.venue.imageUrl}
                alt={currentSlide.venue.name}
                fill
                sizes="100vw"
                priority
                quality={90}
                className="object-cover scale-105"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCwAA8A/9k="
              />
            </div>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-800" />
          )}

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/60 to-[#0B0D10]/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/80 via-transparent to-[#0B0D10]/40" />

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

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {currentSlide.venue.name}
            </h1>

            {/* Location */}
            <div className="flex items-center gap-2 text-zinc-300 mb-6">
              <MapPin weight="fill" className="w-5 h-5" />
              <span>
                {currentSlide.venue.neighborhood
                  ? `${currentSlide.venue.neighborhood}, ${currentSlide.venue.city}`
                  : currentSlide.venue.city}
              </span>
            </div>

            {/* Description */}
            {currentSlide.venue.description && (
              <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-[68ch] mb-8">
                {currentSlide.venue.description}
              </p>
            )}

            {/* CTA Row */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/marketplace/${currentSlide.venue.id}`}
                className="inline-flex items-center justify-center px-8 h-12 rounded-full bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-[#041021] text-sm font-semibold hover:shadow-2xl transition-all shadow-lg"
                aria-label={`Explore ${currentSlide.venue.name}`}
              >
                Explore this space
              </Link>

              {/* Meta Pills */}
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                {currentSlide.match > 0 && (
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.06] backdrop-blur-md">
                    {currentSlide.match}% match
                  </span>
                )}
                {currentSlide.venue.subcategory && (
                  <span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/[0.06] backdrop-blur-md capitalize">
                    {currentSlide.venue.subcategory}
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Controls */}
      {slides.length > 1 && (
        <>
          {/* Arrows */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 z-20 flex justify-between pointer-events-none">
            <button
              onClick={goToPrevious}
              aria-label="Previous slide"
              className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
              type="button"
            >
              <CaretLeft className="w-6 h-6 text-white" weight="bold" />
            </button>
            <button
              onClick={goToNext}
              aria-label="Next slide"
              className="pointer-events-auto w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition-colors"
              type="button"
            >
              <CaretRight className="w-6 h-6 text-white" weight="bold" />
            </button>
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
