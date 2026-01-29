"use client";

export function SkeletonCard() {
  return (
    <div className="rounded-xl overflow-hidden bg-[#0F1114] border border-white/[0.06]">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] bg-zinc-900/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-5 bg-zinc-800/50 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-zinc-800/50 rounded animate-pulse w-1/2" />
        
        {/* Meta row */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-6 bg-zinc-800/50 rounded-full animate-pulse w-16" />
          <div className="h-6 bg-zinc-800/50 rounded-full animate-pulse w-20" />
        </div>
      </div>
    </div>
  );
}
