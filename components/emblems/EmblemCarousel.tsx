"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface EmblemCarouselProps {
  codes: Array<{ key: string; label: string; description: string }>;
  selectedCode?: string;
  onSelect?: (code: string) => void;
}

export function EmblemCarousel({
  codes,
  selectedCode,
  onSelect: onSelectCallback,
}: EmblemCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const currentCode = codes[selectedIndex];

  return (
    <div className="relative">
      {/* Main carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {codes.map((code, index) => {
            const isCenter = index === selectedIndex;
            return (
              <div
                key={code.key}
                className="flex-[0_0_100%] min-w-0 flex items-center justify-center py-8"
              >
                <motion.div
                  animate={{
                    scale: isCenter ? 1 : 0.7,
                    opacity: isCenter ? 1 : 0.3,
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative group cursor-pointer"
                  onClick={() => onSelectCallback?.(code.key)}
                >
                  {/* Glow effect for center item */}
                  {isCenter && (
                    <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-[#4F8CFF]/30 via-[#C7B9FF]/20 to-[#7CF5C8]/30 blur-3xl opacity-60 animate-pulse" />
                  )}

                  {/* Emblem badge */}
                  <div className="relative w-64 h-64">
                    <div
                      className={`absolute inset-0 rounded-full border-4 ${
                        isCenter
                          ? "border-[#4F8CFF] shadow-[0_0_30px_rgba(79,140,255,0.6)]"
                          : "border-white/20"
                      } bg-gradient-to-br from-[#4F8CFF]/20 to-[#7CF5C8]/20 backdrop-blur-xl transition-all duration-300`}
                    >
                      <div className="w-full h-full rounded-full border-2 border-white/20 bg-[#111827] p-2 overflow-hidden">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={`/emblems/${code.key}-${code.label.replace(
                              /\s+/g,
                              ""
                            )}.jpeg`}
                            alt={code.label}
                            fill
                            className="object-cover"
                            sizes="256px"
                            priority={index <= 2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all z-10"
        aria-label="Previous code"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/90 hover:scale-110 transition-all z-10"
        aria-label="Next code"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Code info */}
      <motion.div
        key={currentCode.key}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mt-8 space-y-3"
      >
        <h3 className="text-2xl font-bold text-white">{currentCode.label}</h3>
        <p className="text-white/60 max-w-md mx-auto text-sm leading-relaxed">
          {currentCode.description}
        </p>
      </motion.div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex
                ? "w-8 bg-[#4F8CFF]"
                : "w-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Go to ${codes[index].label}`}
          />
        ))}
      </div>
    </div>
  );
}