import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Business onboarding (idempotent, retry-safe)
 * - Safe on refresh / retry
 * - No schema changes
 * - No lock states
 */
export async function POST(request: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Promote user to BUSINESS (idempotent)
    await prisma.user.update({
      where: { id: user.id },
      data: { type: "BUSINESS" },
    });

    // Trial period (7 days)
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    const business = await prisma.businessProfile.upsert({
      where: {
        userId: user.id, // UNIQUE
      },
      create: {
        userId: user.id,

        businessName: data.businessName,
        description: data.description ?? null,
        category: data.category,

        primaryCode: data.primaryCode ?? null,
        secondaryCode: data.secondaryCode ?? null,
        tertiaryCode: data.tertiaryCode ?? null,

        country: data.country ?? null,
        city: data.city ?? null,
        timezone: data.timezone ?? null,

        contactEmail: data.contactEmail,
        contactPhone: data.contactPhone ?? null,
        website: data.website ?? null,

        subscriptionStatus: "TRIAL",
        subscriptionTier: "basic",
        subscriptionEndsAt: trialEndDate,
      },
      update: {
        // allow safe retries / edits
        businessName: data.businessName ?? undefined,
        description: data.description ?? undefined,
        category: data.category ?? undefined,

        primaryCode: data.primaryCode ?? undefined,
        secondaryCode: data.secondaryCode ?? undefined,
        tertiaryCode: data.tertiaryCode ?? undefined,

        country: data.country ?? undefined,
        city: data.city ?? undefined,
        timezone: data.timezone ?? undefined,

        contactEmail: data.contactEmail ?? undefined,
        contactPhone: data.contactPhone ?? undefined,
        website: data.website ?? undefined,
      },
    });

    return NextResponse.json({ success: true, business });
  } catch (error) {
    console.error("Error creating business profile:", error);
    return NextResponse.json(
      { error: "Failed to create business profile" },
      { status: 500 }
    );
  }
}
