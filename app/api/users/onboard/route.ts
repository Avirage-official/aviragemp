// app/api/users/onboard/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    // Debug log
    console.log("Onboard request:", {
      clerkId: data.clerkId,
      email: data.email,
      username: data.username,
      birthDate: data.birthDate,
      birthTime: data.birthTime,
      country: data.country,
      city: data.city,
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

        birthDate: birthDate,
        birthTime: data.birthTime ?? null,

        city: data.city ?? null,
        country: data.country ?? null,
        timezone: data.timezone ?? null,
      },
      update: {
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

    console.log("User created/updated:", user.id);

    return NextResponse.json({ user });
  } catch (error) {
    console.error("Onboard error:", error);
    
    // Return detailed error in development
    return NextResponse.json(
      { 
        error: "User onboarding failed",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}