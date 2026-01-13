import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const user = await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name ?? null,
        username: data.username ?? null,
        type: "CONSUMER",

        // Identity codes (now 3)
        primaryCode: data.primaryCode ?? null,
        secondaryCode: data.secondaryCode ?? null,
        tertiaryCode: data.tertiaryCode ?? null,

        // Location
        city: data.city ?? null,
        country: data.country ?? null,
        timezone: data.timezone ?? null,
      },
    });

    return NextResponse.json({ user });
  } catch (error) {
    console.error("User onboarding error:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
