// app/api/listings/toggle/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { listingId, isActive } = body as {
    listingId?: string;
    isActive?: boolean;
  };

  if (!listingId || typeof isActive !== "boolean") {
    return NextResponse.json(
      { error: "listingId and isActive are required" },
      { status: 400 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { businessProfile: true },
  });

  if (!user?.businessProfile) {
    return NextResponse.json(
      { error: "Business profile not found" },
      { status: 404 }
    );
  }

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
    include: { business: true },
  });

  if (!listing || listing.businessId !== user.businessProfile.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: { isActive },
  });

  return NextResponse.json({ ok: true });
}
