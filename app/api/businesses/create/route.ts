import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Business onboarding (self-healing, idempotent)
 * - Guarantees Prisma User exists
 * - Safe on refresh / retry
 * - Correct Clerk → Prisma sync
 */
export async function POST(request: Request) {
  try {
    /* ---------------------------------------------------------------------- */
    /* AUTH                                                                    */
    /* ---------------------------------------------------------------------- */
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /* ---------------------------------------------------------------------- */
    /* FETCH CLERK USER (EMAIL SOURCE OF TRUTH)                                 */
    /* ---------------------------------------------------------------------- */
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId);

    const email =
      clerkUser.emailAddresses.find(
        (e) => e.id === clerkUser.primaryEmailAddressId
      )?.emailAddress;

    if (!email) {
      return NextResponse.json(
        { error: "User email not found in Clerk" },
        { status: 400 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /* PARSE PAYLOAD                                                           */
    /* ---------------------------------------------------------------------- */
    const data = await request.json();

    /* ---------------------------------------------------------------------- */
    /* UPSERT USER (CRITICAL FIX)                                               */
    /* ---------------------------------------------------------------------- */
    const user = await prisma.user.upsert({
      where: { clerkId: userId },
      create: {
        clerkId: userId,
        email,
        type: "BUSINESS",
      },
      update: {
        type: "BUSINESS",
      },
    });

    /* ---------------------------------------------------------------------- */
    /* TRIAL PERIOD                                                            */
    /* ---------------------------------------------------------------------- */
    const trialEndDate = new Date();
    trialEndDate.setDate(trialEndDate.getDate() + 7);

    /* ---------------------------------------------------------------------- */
    /* UPSERT BUSINESS PROFILE                                                  */
    /* ---------------------------------------------------------------------- */
    const business = await prisma.businessProfile.upsert({
      where: { userId: user.id },
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
  } catch (error: any) {
    console.error("Business onboarding error:", error);

    return NextResponse.json(
      {
        error: "Failed to create business profile",
        prismaCode: error?.code,
        prismaMeta: error?.meta,
      },
      { status: 500 }
    );
  }
}
