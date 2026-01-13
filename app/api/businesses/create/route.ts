import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Find user by Clerk ID
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Promote user to BUSINESS
    await prisma.user.update({
      where: { id: user.id },
      data: { type: "BUSINESS" },
    });

    // Trial period (7 days)
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    // Create business profile (NOW COMPLETE)
    const business = await prisma.businessProfile.create({
      data: {
        userId: user.id,

        businessName: data.businessName,
        description: data.description ?? null,
        category: data.category,

        // Business identity (same 3-code system as users)
        primaryCode: data.primaryCode ?? null,
        secondaryCode: data.secondaryCode ?? null,
        tertiaryCode: data.tertiaryCode ?? null,

        // Location
        country: data.country ?? null,
        city: data.city ?? null,
        timezone: data.timezone ?? null,

        // Contact
        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone ?? null,
        website: data.website ?? null,

        // Subscription
        subscriptionStatus: "TRIAL",
        subscriptionTier: "basic",
        subscriptionEndsAt: trialEndDate,
      },
    });

    return NextResponse.json({
      success: true,
      business,
    });
  } catch (error) {
    console.error("Error creating business profile:", error);
    return NextResponse.json(
      { error: "Failed to create business profile" },
      { status: 500 }
    );
  }
}
