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
  
  console.log("Creating conversation between:", user.id, "and", friendId);
  
  // Check if they're the same user
  if (user.id === friendId) {
    return NextResponse.json({ error: "Cannot message yourself" }, { status: 400 });
  }
  
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
  
  // Create new conversation with transaction
  try {
    const conversation = await prisma.$transaction(async (tx) => {
      // Create conversation
      const newConv = await tx.conversation.create({
        data: {
          isGroup: false
        }
      });
      
      console.log("Created conversation:", newConv.id);
      
      // Create participants separately
      const participant1 = await tx.conversationParticipant.create({
        data: {
          conversationId: newConv.id,
          userId: user.id
        }
      });
      
      console.log("Added participant 1:", user.id);
      
      // Check if participant 2 already exists (from failed transaction)
      const existingParticipant = await tx.conversationParticipant.findUnique({
        where: {
          conversationId_userId: {
            conversationId: newConv.id,
            userId: friendId
          }
        }
      });
      
      if (existingParticipant) {
        console.log("Participant 2 already exists:", friendId);
      } else {
        const participant2 = await tx.conversationParticipant.create({
          data: {
            conversationId: newConv.id,
            userId: friendId
          }
        });
        
        console.log("Added participant 2:", friendId);
      }
      
      return newConv;
    });
    
    console.log("Transaction complete - conversation has 2 participants");
    return NextResponse.json({ conversationId: conversation.id });
  } catch (error) {
    console.error("Failed to create conversation:", error);
    return NextResponse.json({ error: "Failed to create conversation" }, { status: 500 });
  }
}