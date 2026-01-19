// app/dashboard/codes/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function CodesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      primaryCode: true,
      secondaryCode: true,
      tertiaryCode: true,
    },
  });

  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-[#0B0D12] text-white">
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Your Mythical Codes
          </h1>
          <p className="text-lg text-white/70 max-w-2xl">
            Understanding your personality archetypes
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-purple-500/10 to-transparent p-8">
          <div className="space-y-4">
            <span className="text-xs uppercase tracking-wider text-purple-400">Primary Code</span>
            <h2 className="text-4xl font-bold">{user.primaryCode}</h2>
            <p className="text-white/70">
              This is your dominant archetypal energy - the primary pattern that shapes how you move through the world.
            </p>
          </div>
        </div>

        {(user.secondaryCode || user.tertiaryCode) && (
          <div className="grid md:grid-cols-2 gap-6">
            {user.secondaryCode && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="text-xs uppercase tracking-wider text-blue-400">Secondary Code</span>
                <h3 className="text-2xl font-bold mt-2">{user.secondaryCode}</h3>
                <p className="text-white/60 text-sm mt-2">
                  Your supporting archetypal influence
                </p>
              </div>
            )}

            {user.tertiaryCode && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <span className="text-xs uppercase tracking-wider text-green-400">Tertiary Code</span>
                <h3 className="text-2xl font-bold mt-2">{user.tertiaryCode}</h3>
                <p className="text-white/60 text-sm mt-2">
                  Your complementary archetypal aspect
                </p>
              </div>
            )}
          </div>
        )}

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Detailed Breakdown Coming Soon</h3>
          <p className="text-white/60">
            Full personality insights, strengths, challenges, and compatibility information will be available here.
          </p>
        </div>
      </div>
    </div>
  );
}