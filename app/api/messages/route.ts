import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
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
  
  const { searchParams } = new URL(request.url);
  const conversationId = searchParams.get("conversationId");
  
  if (!conversationId) {
    return NextResponse.json({ error: "Conversation ID required" }, { status: 400 });
  }
  
  const messages = await prisma.message.findMany({
    where: { conversationId },
    include: {
      sender: true
    },
    orderBy: { createdAt: "asc" },
    take: 100 // Last 100 messages
  });
  
  return NextResponse.json({ messages });
}