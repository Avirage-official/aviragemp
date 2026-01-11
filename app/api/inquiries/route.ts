import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { businessProfile: true }
    });

    if (!user || !user.businessProfile) {
      return NextResponse.json(
        { error: "Business profile not found" },
        { status: 404 }
      );
    }

    // Get all bookings/inquiries for this business's listings
    const inquiries = await prisma.booking.findMany({
      where: {
        listing: {
          businessId: user.businessProfile.id
        }
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            primaryCode: true
          }
        },
        listing: {
          select: {
            title: true,
            category: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ inquiries });

  } catch (error) {
    console.error("Error fetching inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}