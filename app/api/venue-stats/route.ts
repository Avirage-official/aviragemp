import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Get aggregated stats for a venue
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

    // Get active check-ins (not expired)
    const now = new Date();
    const activeCheckins = await prisma.venueCheckin.findMany({
      where: {
        venueId,
        expiresAt: {
          gte: now,
        },
      },
      include: {
        user: {
          select: {
            primaryCode: true,
          },
        },
      },
    });

    // Count by status
    const hereCount = activeCheckins.filter((c) => c.status === "here").length;
    const goingCount = activeCheckins.filter((c) => c.status === "going").length;

    // Get trending archetypes from recent check-ins (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentCheckins = await prisma.venueCheckin.findMany({
      where: {
        venueId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      include: {
        user: {
          select: {
            primaryCode: true,
          },
        },
      },
    });

    // Count archetypes
    const archetypeCounts: Record<string, number> = {};
    recentCheckins.forEach((checkin) => {
      const archetype = checkin.user.primaryCode;
      if (archetype) {
        archetypeCounts[archetype] = (archetypeCounts[archetype] || 0) + 1;
      }
    });

    // Sort by count and get top 5
    const trendingArchetypes = Object.entries(archetypeCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([archetype, count]) => ({ archetype, count }));

    // Get popular times (aggregated by hour and day of week)
    const allCheckins = await prisma.venueCheckin.findMany({
      where: {
        venueId,
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
      },
    });

    // Aggregate by day of week and hour
    const hourCounts: Record<number, number> = {};
    const dayCounts: Record<number, number> = {};

    allCheckins.forEach((checkin) => {
      const hour = checkin.createdAt.getHours();
      const day = checkin.createdAt.getDay(); // 0 = Sunday, 6 = Saturday

      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
      dayCounts[day] = (dayCounts[day] || 0) + 1;
    });

    // Find peak hour and day
    const peakHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
    const peakDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return NextResponse.json({
      currentActivity: {
        here: hereCount,
        going: goingCount,
        total: activeCheckins.length,
      },
      trendingArchetypes,
      popularTimes: {
        peakHour: peakHour ? parseInt(peakHour[0]) : null,
        peakDay: peakDay ? dayNames[parseInt(peakDay[0])] : null,
        hourCounts,
        dayCounts,
      },
    });
  } catch (error) {
    console.error("Error fetching venue stats:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
