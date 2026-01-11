import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
  
  const { meetupId, status } = await request.json();
  
  // Update or create participant record
  const participant = await prisma.meetupParticipant.upsert({
    where: {
      meetupId_userId: {
        meetupId,
        userId: user.id
      }
    },
    update: {
      status
    },
    create: {
      meetupId,
      userId: user.id,
      status
    }
  });
  
  return NextResponse.json({ participant });
}