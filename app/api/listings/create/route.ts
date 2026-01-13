import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { businessProfile: true },
    });

    if (!user || !user.businessProfile) {
      return NextResponse.json(
        { error: "Business profile not found" },
        { status: 404 }
      );
    }

    if (
      user.businessProfile.subscriptionStatus !== "ACTIVE" &&
      user.businessProfile.subscriptionStatus !== "TRIAL"
    ) {
      return NextResponse.json(
        { error: "Active subscription required to create listings" },
        { status: 403 }
      );
    }

    const data = await request.json();

    if (!Array.isArray(data.targetCodes) || data.targetCodes.length === 0) {
      return NextResponse.json(
        { error: "At least one target personality code is required" },
        { status: 400 }
      );
    }

    const listing = await prisma.listing.create({
      data: {
        businessId: user.businessProfile.id,

        title: data.title,
        description: data.description,
        category: data.category,
        subcategory: data.subcategory ?? null,

        images: [],

        price: data.price ?? null,
        currency: "USD",
        pricingType: data.pricingType ?? "FIXED",

        location: data.location ?? null,
        city: data.city ?? null,

        targetCodes: data.targetCodes,

        bookingType: data.bookingType ?? "INQUIRY",
        isActive: true,
      },
    });

    return NextResponse.json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("Error creating listing:", error);
    return NextResponse.json(
      { error: "Failed to create listing" },
      { status: 500 }
    );
  }
}
