import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CodeOverview } from "@/components/dashboard/CodeOverview";
import { PersonalityBreakdown } from "@/components/dashboard/PersonalityBreakdown";
import { CompatibilityChart } from "@/components/dashboard/CompatibilityChart";
import { MonthlyInsights } from "@/components/dashboard/MonthlyInsights";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    redirect("/onboarding");
  }

  if (!user.primaryCode) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-[#111827] text-[#FAFAFA]">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Hero Section - All 3 Codes */}
        <CodeOverview 
          primaryCode={user.primaryCode}
          secondaryCode={user.secondaryCode}
          tertiaryCode={user.tertiaryCode}
        />

        {/* Personality Section */}
        <PersonalityBreakdown quizResults={user.quizResults} />

        {/* Compatibility Section */}
        <CompatibilityChart userCode={user.primaryCode} />

        {/* Insights Section */}
        <MonthlyInsights code={user.primaryCode} />
      </div>
    </div>
  );
}