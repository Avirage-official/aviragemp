 import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  // Generate unique invite token
  const inviteToken = `${user.id}-${Date.now()}-${Math.random().toString(36).substring(7)}`;
  
  const inviteLink = `${process.env.NEXT_PUBLIC_URL}/invite/${inviteToken}`;
  
  return NextResponse.json({ inviteLink });
}