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
      where: { clerkId: userId }
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    const data = await request.json();

   const booking = await prisma.booking.create({
  data: {
    userId: user.id,
    listingId: data.listingId,
    inquiryMessage: data.message,
    numberOfPeople: data.numberOfPeople || null,
    bookingDate: data.bookingDate ? new Date(data.bookingDate) : null,
    specialRequests: data.specialRequests || null,
    status: "INQUIRY",
    currency: "USD"
    // amount is omitted - will be set when booking is confirmed
  }
});

    // TODO: Send email notification to business

    return NextResponse.json({ 
      success: true,
      booking 
    });

  } catch (error) {
    console.error("Error creating inquiry:", error);
    return NextResponse.json(
      { error: "Failed to send inquiry" },
      { status: 500 }
    );
  }
}