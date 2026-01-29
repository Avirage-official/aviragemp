import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get the user from database
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        friendships: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Get friend IDs
    const friendIds = user.friendships.map((f) => f.friendId);

    if (friendIds.length === 0) {
      return NextResponse.json({
        venues: [],
        checkins: [],
      });
    }

    // Get active check-ins from friends (not expired)
    const friendCheckins = await prisma.venueCheckin.findMany({
      where: {
        userId: {
          in: friendIds,
        },
        expiresAt: {
          gte: new Date(),
        },
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            username: true,
            avatar: true,
            primaryCode: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 20, // Limit to 20 most recent
    });

    // Get unique venue IDs from check-ins
    const venueIds = [...new Set(friendCheckins.map((c) => c.venueId))];

    // Get venue details
    const venues = await prisma.venue.findMany({
      where: {
        id: {
          in: venueIds,
        },
        isActive: true,
      },
      include: {
        vibes: true,
      },
    });

    // Create a map of venues by ID for easy lookup
    const venueMap = new Map(venues.map((v) => [v.id, v]));

    // Anonymize check-ins (remove personal info, just keep archetype and count)
    const anonymizedCheckins = friendCheckins.reduce((acc, checkin) => {
      const venueId = checkin.venueId;
      const existing = acc.find((c) => c.venueId === venueId);
      
      if (existing) {
        existing.count++;
        if (checkin.user.primaryCode && !existing.archetypes.includes(checkin.user.primaryCode)) {
          existing.archetypes.push(checkin.user.primaryCode);
        }
      } else {
        acc.push({
          venueId,
          count: 1,
          archetypes: checkin.user.primaryCode ? [checkin.user.primaryCode] : [],
          status: checkin.status,
          updatedAt: checkin.updatedAt,
        });
      }
      
      return acc;
    }, [] as Array<{
      venueId: string;
      count: number;
      archetypes: string[];
      status: string;
      updatedAt: Date;
    }>);

    // Add venue details to anonymized check-ins
    const enrichedCheckins = anonymizedCheckins
      .map((c) => ({
        ...c,
        venue: venueMap.get(c.venueId),
      }))
      .filter((c) => c.venue); // Only include if venue exists

    return NextResponse.json({
      checkins: enrichedCheckins,
    });
  } catch (error) {
    console.error("Error fetching friends' check-ins:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
