// app/dashboard/codes/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MainNav } from "@/components/navigation/MainNav";
import { UserEmblems } from "@/components/dashboard/UserEmblems";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function CodesPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white">
      {/* Ambient Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-[30%] right-[10%] h-[800px] w-[800px] rounded-full bg-[#C7B9FF] blur-[180px] opacity-[0.08] animate-pulse" />
        <div className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#4F8CFF] blur-[170px] opacity-[0.06]" />
      </div>

      <MainNav />

      <main className="relative max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Back Button */}
        <Link 
          href="/dashboard"
          className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-6 sm:mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Dashboard</span>
        </Link>

        {/* Emblems */}
        <UserEmblems 
          primaryCode={user.primaryCode}
          secondaryCode={user.secondaryCode}
          tertiaryCode={user.tertiaryCode}
        />
      </main>
    </div>
  );
}