"use client";

import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  title: string;
}

export function ImageCarousel({ images, title }: ImageCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
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

  // Empty state
  if (!images || images.length === 0) {
    return (
      <div className="relative w-full aspect-[16/9] rounded-3xl bg-gradient-to-br from-[#0B0D12] to-[#111827] border border-white/10 overflow-hidden mb-10">
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
            <ImageIcon className="w-8 h-8 text-white/30" />
          </div>
          <p className="text-white/40 text-sm">No images available</p>
        </div>
      </div>
    );
  }

  // Single image
  if (images.length === 1) {
    return (
      <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-10 group">
        {/* Glow effect */}
        <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />
        
        {/* Image */}
        <div className="relative w-full h-full rounded-3xl border border-white/10 overflow-hidden bg-black">
          <Image
            src={images[0]}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    );
  }

  // Carousel for multiple images
  return (
    <div className="relative mb-10 group">
      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700 -z-10" />

      {/* Carousel container */}
      <div className="relative rounded-3xl border border-white/10 overflow-hidden bg-black">
        {/* Main carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex-[0_0_100%] aspect-[16/9]"
              >
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={scrollPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>

            <button
              onClick={scrollNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-black/90 hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {/* Image counter */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-sm border border-white/20 text-xs text-white/80 font-medium">
          {selectedIndex + 1} / {images.length}
        </div>

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-8 bg-white"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}