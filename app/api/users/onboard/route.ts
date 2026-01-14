import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * User onboarding (idempotent)
 * - Safe to call multiple times
 * - Handles retry, partial state, and re-onboarding
 * - Required for BOTH personal and business flows
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data.clerkId || !data.email) {
      return NextResponse.json(
        { error: "Missing required auth fields" },
        { status: 400 }
      );
    }

    const user = await prisma.user.upsert({
      where: {
        clerkId: data.clerkId,
      },
      create: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name ?? null,
        username: data.username ?? null,
        type: data.type ?? "CONSUMER",

        primaryCode: data.primaryCode ?? null,
        secondaryCode: data.secondaryCode ?? null,
        tertiaryCode: data.tertiaryCode ?? null,

        city: data.city ?? null,
        country: data.country ?? null,
        timezone: data.timezone ?? null,
      },
      update: {
        // only update fields that may change during onboarding retries
        name: data.name ?? undefined,
        username: data.username ?? undefined,

        primaryCode: data.primaryCode ?? undefined,
        secondaryCode: data.secondaryCode ?? undefined,
        tertiaryCode: data.tertiaryCode ?? undefined,

        city: data.city ?? undefined,
        country: data.country ?? undefined,
        timezone: data.timezone ?? undefined,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("User onboarding error:", error);
    return NextResponse.json(
      { error: "User onboarding failed" },
      { status: 500 }
    );
  }
}
