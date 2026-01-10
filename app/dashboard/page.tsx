import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { CodeOverview } from "@/components/dashboard/CodeOverview";
// import { PersonalityBreakdown } from "@/components/dashboard/PersonalityBreakdown";
// import { CompatibilityChart } from "@/components/dashboard/CompatibilityChart";
// import { MonthlyInsights } from "@/components/dashboard/MonthlyInsights";

export default async function DashboardPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return <div>Not authenticated</div>;
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <CodeOverview code={user.primaryCode!} />
      
      {/* <PersonalityBreakdown quizResults={user.quizResults} /> */}
      
      {/* <CompatibilityChart userCode={user.primaryCode!} /> */}
      
      {/* <MonthlyInsights code={user.primaryCode!} /> */}
    </div>
  );
}