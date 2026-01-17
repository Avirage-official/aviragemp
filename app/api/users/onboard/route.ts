// app/api/users/onboard/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Onboard request:", {
      clerkId: data.clerkId,
      email: data.email,
      username: data.username,
      primaryCode: data.primaryCode,
    });

    if (!data.clerkId || !data.email) {
      return NextResponse.json(
        { error: "Missing required auth fields" },
        { status: 400 }
      );
    }

    // Parse birthDate safely
    let birthDate: Date | null = null;
    if (data.birthDate) {
      const parsed = new Date(data.birthDate);
      if (!isNaN(parsed.getTime())) {
        birthDate = parsed;
      }
    }

    // Check if user exists by email (handles re-signup case)
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: data.email },
    });

    let user;

    if (existingUserByEmail) {
      // User exists with this email - update their clerkId and other fields
      user = await prisma.user.update({
        where: { email: data.email },
        data: {
          clerkId: data.clerkId, // Update to new Clerk ID
          name: data.name ?? undefined,
          username: data.username ?? undefined,

          primaryCode: data.primaryCode ?? undefined,
          secondaryCode: data.secondaryCode ?? undefined,
          tertiaryCode: data.tertiaryCode ?? undefined,

          birthDate: birthDate ?? undefined,
          birthTime: data.birthTime ?? undefined,

          city: data.city ?? undefined,
          country: data.country ?? undefined,
          timezone: data.timezone ?? undefined,
        },
      });
      console.log("Existing user updated with new clerkId:", user.id);
    } else {
      // New user - create
      user = await prisma.user.create({
        data: {
          clerkId: data.clerkId,
          email: data.email,
          name: data.name ?? null,
          username: data.username ?? null,
          type: data.type ?? "CONSUMER",

          primaryCode: data.primaryCode ?? null,
          secondaryCode: data.secondaryCode ?? null,
          tertiaryCode: data.tertiaryCode ?? null,

          birthDate: birthDate,
          birthTime: data.birthTime ?? null,

          city: data.city ?? null,
          country: data.country ?? null,
          timezone: data.timezone ?? null,
        },
      });
      console.log("New user created:", user.id);
    }

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Onboard error:", error);

    return NextResponse.json(
      {
        error: "User onboarding failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}