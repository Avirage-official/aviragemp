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
  
  const { friendId } = await request.json();
  
  // Find all conversations this user is part of
  const myConversationParticipants = await prisma.conversationParticipant.findMany({
    where: { userId: user.id },
    include: {
      conversation: {
        include: {
          participants: true
        }
      }
    }
  });
  
  // Check if conversation exists with this friend (1-on-1)
  for (const cp of myConversationParticipants) {
    const conv = cp.conversation;
    if (conv.isGroup === false && conv.participants.length === 2) {
      const participantIds = conv.participants.map(p => p.userId);
      if (participantIds.includes(user.id) && participantIds.includes(friendId)) {
        return NextResponse.json({ conversationId: conv.id });
      }
    }
  }
  
  // Create new conversation
  const conversation = await prisma.conversation.create({
    data: {
      isGroup: false,
      participants: {
        create: [
          { userId: user.id },
          { userId: friendId }
        ]
      }
    }
  });
  
  return NextResponse.json({ conversationId: conversation.id });
}