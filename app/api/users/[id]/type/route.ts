import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;  // ← AWAIT PARAMS HERE

    const user = await prisma.user.findUnique({
      where: { clerkId: id },  // ← USE AWAITED ID
      select: {
        type: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ type: user.type });

  } catch (error) {
    console.error("Error fetching user type:", error);
    return NextResponse.json(
      { error: "Failed to fetch user type" },
      { status: 500 }
    );
  }
}