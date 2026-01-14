// app/api/listings/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const {
    listingId,
    title,
    description,
    category,
    subcategory,
    price,
    pricingType,
    location,
    city,
    bookingType,
    targetCodes,
    duration,
    groupSize,
    tags,
    traits,
  } = body as any;

  if (!listingId || !title || !description || !category) {
    return NextResponse.json(
      { error: "listingId, title, description, category are required" },
      { status: 400 }
    );
  }

  if (!Array.isArray(targetCodes)) {
    return NextResponse.json(
      { error: "targetCodes must be an array" },
      { status: 400 }
    );
  }

  if (!Array.isArray(tags)) {
    return NextResponse.json({ error: "tags must be an array" }, { status: 400 });
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
  });

  if (!listing || listing.businessId !== user.businessProfile.id) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await prisma.listing.update({
    where: { id: listingId },
    data: {
      title,
      description,
      category,
      subcategory: subcategory ?? null,
      price: price ?? null,
      pricingType: pricingType ?? "FIXED",
      location: location ?? null,
      city: city ?? null,
      bookingType: bookingType ?? "INQUIRY",
      targetCodes,
      duration: duration ?? null,
      groupSize: groupSize ?? null,
      tags,
      traits: traits ?? null,
    },
  });

  return NextResponse.json({ ok: true });
}
