import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const clerkUser = await currentUser();
  
  if (!clerkUser) {
    redirect("/sign-in");
  }
  
  // Get user from database
  const user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id }
  });
  
  // If no user in DB, redirect to onboarding
  if (!user) {
    redirect("/onboarding");
  }
  
  return (
    <div className="space-y-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-4">
          Welcome back, {user.name}!
        </h2>
        <p className="text-gray-300">
          Your code: <span className="font-semibold text-white">{user.primaryCode}</span>
        </p>
      </div>
      
      {/* More components coming next */}
    </div>
  );
}