import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// POST - Report a chat message
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { chatId, reason } = body;

    if (!chatId) {
      return NextResponse.json(
        { error: "Missing chatId" },
        { status: 400 }
      );
    }

    // Find the chat message
    const chat = await prisma.venueChat.findUnique({
      where: { id: chatId },
    });

    if (!chat) {
      return NextResponse.json(
        { error: "Chat message not found" },
        { status: 404 }
      );
    }

    // Cannot report your own message
    if (chat.userId === userId) {
      return NextResponse.json(
        { error: "Cannot report your own message" },
        { status: 400 }
      );
    }

    // Create the report
    const report = await prisma.chatReport.create({
      data: {
        chatId,
        reportedBy: userId,
        reason: reason || null,
      },
    });

    // Increment report count on the chat
    await prisma.venueChat.update({
      where: { id: chatId },
      data: {
        reportCount: {
          increment: 1,
        },
      },
    });

    // Auto-delete if report count exceeds threshold (e.g., 3)
    const updatedChat = await prisma.venueChat.findUnique({
      where: { id: chatId },
    });

    if (updatedChat && updatedChat.reportCount >= 3) {
      await prisma.venueChat.update({
        where: { id: chatId },
        data: { isDeleted: true },
      });
    }

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Error reporting chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
