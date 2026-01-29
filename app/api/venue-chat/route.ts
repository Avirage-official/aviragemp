import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// GET - Fetch chat messages for a venue
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

    if (!venueId) {
      return NextResponse.json(
        { error: "Missing venueId" },
        { status: 400 }
      );
    }

    // Fetch chat messages (non-deleted only)
    const messages = await prisma.venueChat.findMany({
      where: {
        venueId,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50, // Limit to 50 most recent messages
    });

    // Get user details for each message
    const userIds = [...new Set(messages.map((m) => m.userId))];
    const users = await prisma.user.findMany({
      where: {
        clerkId: {
          in: userIds,
        },
      },
      select: {
        clerkId: true,
        name: true,
        username: true,
        avatar: true,
        primaryCode: true,
      },
    });

    const userMap = new Map(users.map((u) => [u.clerkId, u]));

    // Enrich messages with user data
    const enrichedMessages = messages.map((msg) => ({
      ...msg,
      user: userMap.get(msg.userId) || null,
    }));

    return NextResponse.json({
      messages: enrichedMessages,
    });
  } catch (error) {
    console.error("Error fetching venue chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create a new chat message
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
    const { venueId, message, mood } = body;

    if (!venueId || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if message is too long
    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message too long (max 500 characters)" },
        { status: 400 }
      );
    }

    // Get the user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Check if user is banned
    const ban = await prisma.userBan.findUnique({
      where: { userId: user.clerkId },
    });

    if (ban) {
      // User is banned if bannedUntil is null (permanent) or in the future
      const isBanned = !ban.bannedUntil || ban.bannedUntil > new Date();
      if (isBanned) {
        return NextResponse.json(
          { error: "You are banned from posting" },
          { status: 403 }
        );
      }
    }

    // Check user's current check-in status
    const checkin = await prisma.venueCheckin.findUnique({
      where: {
        userId_venueId: {
          userId: user.id,
          venueId,
        },
      },
    });

    const isCheckedIn = checkin && checkin.expiresAt > new Date() && checkin.status === "here";

    // Create the chat message
    const chat = await prisma.venueChat.create({
      data: {
        venueId,
        userId,
        message: message.trim(),
        mood: mood || user.currentMood || null,
        isCheckedIn: isCheckedIn || false,
      },
    });

    return NextResponse.json({
      success: true,
      chat,
    });
  } catch (error) {
    console.error("Error creating venue chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete a chat message (user can delete their own)
export async function DELETE(req: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

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

    // Only the author can delete their message
    if (chat.userId !== userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Mark as deleted instead of actually deleting
    await prisma.venueChat.update({
      where: { id: chatId },
      data: { isDeleted: true },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting venue chat:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
