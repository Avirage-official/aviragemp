import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    select: {
      type: true,
      primaryCode: true
    }
  });

  if (!user) {
    redirect("/onboarding");
  }

  // Redirect based on user type
  if (user.type === "BUSINESS") {
    redirect("/business/dashboard");
  }

  // If no code yet, go to onboarding
  if (!user.primaryCode) {
    redirect("/onboarding");
  }

  // Regular user goes to dashboard
  redirect("/dashboard");
}