import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { mood } = await request.json();
  
  const user = await prisma.user.update({
    where: { clerkId: userId },
    data: {
      currentMood: mood,
      moodUpdatedAt: new Date()
    }
  });
  
  return NextResponse.json({ user });
}