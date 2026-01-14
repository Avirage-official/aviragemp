import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Business onboarding (idempotent, retry-safe)
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

    await prisma.user.update({
      where: { id: user.id },
      data: { type: "BUSINESS" },
    });

    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    const business = await prisma.businessProfile.upsert({
      where: { userId: user.id },
      create: {
        userId: user.id,
        businessName: data.businessName,
        category: data.category,
        contactEmail: data.contactEmail,
        description: data.description ?? null,
        country: data.country ?? null,
        city: data.city ?? null,
        timezone: data.timezone ?? null,
        primaryCode: null,
        secondaryCode: null,
        tertiaryCode: null,
        subscriptionStatus: "TRIAL",
        subscriptionTier: "basic",
        subscriptionEndsAt: trialEndDate,
      },
      update: {
        businessName: data.businessName,
        category: data.category,
        contactEmail: data.contactEmail,
        description: data.description ?? undefined,
        country: data.country ?? undefined,
        city: data.city ?? undefined,
        timezone: data.timezone ?? undefined,
      },
    });

    return NextResponse.json({ success: true, business });
  } catch (error: any) {
    console.error("Business create error:", error);
    return NextResponse.json(
      { error: "Failed to create business" },
      { status: 500 }
    );
  }
}