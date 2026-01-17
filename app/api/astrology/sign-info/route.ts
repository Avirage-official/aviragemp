// app/api/astrology/sign-info/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sign = searchParams.get("sign");

  if (!sign) {
    return NextResponse.json({ error: "Sign required" }, { status: 400 });
  }

  try {
    const info = await prisma.astrologySignInfo.findUnique({
      where: { sign },
    });

    return NextResponse.json({ info });
  } catch (error) {
    console.error("Failed to fetch sign info:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}