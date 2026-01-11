import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
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

    const data = await request.json();

    // Verify this booking belongs to one of the business's listings
    const booking = await prisma.booking.findFirst({
      where: {
        id: data.bookingId,
        listing: {
          businessId: user.businessProfile.id
        }
      }
    });

    if (!booking) {
      return NextResponse.json(
        { error: "Booking not found" },
        { status: 404 }
      );
    }

    // Update booking with response
    const updatedBooking = await prisma.booking.update({
      where: { id: data.bookingId },
      data: {
        businessResponse: data.response,
        status: data.status || booking.status,
        amount: data.amount ? parseFloat(data.amount) : booking.amount,
        updatedAt: new Date()
      }
    });

    // TODO: Send email notification to customer

    return NextResponse.json({ 
      success: true,
      booking: updatedBooking 
    });

  } catch (error) {
    console.error("Error responding to inquiry:", error);
    return NextResponse.json(
      { error: "Failed to respond to inquiry" },
      { status: 500 }
    );
  }
}