"use client";

export function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white border border-slate-200 shadow-sm">
      {/* Image skeleton */}
      <div className="relative aspect-[3/2] bg-slate-100 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-200/50 to-transparent animate-shimmer" />
      </div>
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
        
        {/* Meta row */}
        <div className="flex items-center gap-2 pt-2">
          <div className="h-7 bg-slate-200 rounded-full animate-pulse w-20" />
          <div className="h-7 bg-slate-200 rounded-full animate-pulse w-24" />
        </div>
      </div>
    </div>
  );
}
