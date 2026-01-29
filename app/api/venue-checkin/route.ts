import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

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
    const { venueId, status } = body;

    if (!venueId || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (status !== "here" && status !== "going") {
      return NextResponse.json(
        { error: "Invalid status. Must be 'here' or 'going'" },
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

    // Check-ins expire after 24 hours for "going", 4 hours for "here"
    const hoursToExpire = status === "here" ? 4 : 24;
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + hoursToExpire);

    // Upsert check-in (update if exists, create if not)
    const checkin = await prisma.venueCheckin.upsert({
      where: {
        userId_venueId: {
          userId: user.id,
          venueId,
        },
      },
      update: {
        status,
        expiresAt,
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        venueId,
        status,
        expiresAt,
      },
    });

    // Update user's current venue if status is "here"
    if (status === "here") {
      await prisma.user.update({
        where: { id: user.id },
        data: { currentVenue: venueId },
      });
    }

    return NextResponse.json({
      success: true,
      checkin,
    });
  } catch (error) {
    console.error("Error creating check-in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
    const venueId = searchParams.get("venueId");

    if (!venueId) {
      return NextResponse.json(
        { error: "Missing venueId" },
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

    // Delete the check-in
    await prisma.venueCheckin.delete({
      where: {
        userId_venueId: {
          userId: user.id,
          venueId,
        },
      },
    });

    // Clear current venue if it matches
    if (user.currentVenue === venueId) {
      await prisma.user.update({
        where: { id: user.id },
        data: { currentVenue: null },
      });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Error deleting check-in:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const venueId = searchParams.get("venueId");

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

    // Get user's check-in for this venue
    const checkin = venueId
      ? await prisma.venueCheckin.findUnique({
          where: {
            userId_venueId: {
              userId: user.id,
              venueId,
            },
          },
        })
      : null;

    // Get all active check-ins for this user
    const allCheckins = await prisma.venueCheckin.findMany({
      where: {
        userId: user.id,
        expiresAt: {
          gte: new Date(),
        },
      },
    });

    return NextResponse.json({
      checkin,
      allCheckins,
    });
  } catch (error) {
    console.error("Error fetching check-ins:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
