// app/api/astrology/numerology-info/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const number = searchParams.get("number");

  if (!number) {
    return NextResponse.json({ error: "Number required" }, { status: 400 });
  }

  try {
    const info = await prisma.numerologyInfo.findUnique({
      where: { number: parseInt(number) },
    });

    return NextResponse.json({ info });
  } catch (error) {
    console.error("Failed to fetch numerology info:", error);
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}