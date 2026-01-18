// app/api/friends/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  // Get all friendships where this user is involved
  const friendships = await prisma.friendship.findMany({
    where: { userId: user.id },
    include: {
      user: true,
    },
  });

  // Also get reverse friendships (where user is the friend)
  const reverseFriendships = await prisma.friendship.findMany({
    where: { friendId: user.id },
  });

  // Get the friend user IDs
  const friendIds = [
    ...friendships.map((f) => f.friendId),
    ...reverseFriendships.map((f) => f.userId),
  ];

  // Fetch friend details
  const friends = await prisma.user.findMany({
    where: {
      id: { in: friendIds },
    },
    select: {
      id: true,
      name: true,
      username: true,
      primaryCode: true,
    },
  });

  return NextResponse.json({ friends });
}