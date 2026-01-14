// components/business/DashboardSkeleton.tsx
"use client";

export function DashboardSkeleton() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] left-[10%] h-[800px] w-[800px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-10 animate-pulse" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-6 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16">
        <div className="space-y-10 sm:space-y-12">
          {/* Header skeleton */}
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white/5 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-3 w-32 rounded-full bg-white/5 animate-pulse" />
                    <div className="h-8 w-64 rounded-full bg-white/10 animate-pulse" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-7 w-20 rounded-full bg-white/5 animate-pulse" />
                  <div className="h-7 w-28 rounded-full bg-white/5 animate-pulse" />
                  <div className="h-7 w-32 rounded-full bg-white/5 animate-pulse" />
                </div>
              </div>
              <div className="flex gap-3">
                <div className="h-11 w-32 rounded-2xl bg-white/10 animate-pulse" />
                <div className="h-11 w-28 rounded-2xl bg-white/5 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Hero panel skeleton */}
          <div className="rounded-[32px] bg-white/[0.03] border border-white/[0.08] p-8 sm:p-10">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="h-8 w-3/4 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-5 w-full rounded-full bg-white/5 animate-pulse" />
                </div>
                <div className="flex gap-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-11 w-28 rounded-2xl bg-white/5 animate-pulse" />
                  ))}
                </div>
              </div>
              <div className="grid gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 rounded-2xl bg-white/[0.04] border border-white/[0.08] animate-pulse" />
                ))}
              </div>
            </div>
          </div>

          {/* Listings skeleton */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="h-8 w-48 rounded-full bg-white/10 animate-pulse" />
              <div className="h-4 w-64 rounded-full bg-white/5 animate-pulse" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="rounded-[28px] bg-white/[0.04] border border-white/[0.08] p-6 space-y-4 animate-pulse"
                >
                  <div className="space-y-3">
                    <div className="h-6 w-3/4 rounded-full bg-white/10" />
                    <div className="space-y-2">
                      <div className="h-4 w-full rounded-full bg-white/5" />
                      <div className="h-4 w-5/6 rounded-full bg-white/5" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-7 w-20 rounded-lg bg-white/5" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}