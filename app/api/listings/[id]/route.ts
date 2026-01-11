import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }  // ← Changed to Promise
) {
  const { id } = await params;  // ← AWAIT params
  
  try {
    const listing = await prisma.listing.findUnique({
      where: { 
        id: id,  // ← Use awaited id
        isActive: true
      },
      include: {
        business: {
          select: {
            id: true,
            businessName: true,
            category: true,
            description: true,
            logo: true,
            website: true,
            contactEmail: true
          }
        }
      }
    });

    if (!listing) {
      return NextResponse.json(
        { error: "Listing not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ listing });

  } catch (error) {
    console.error("Error fetching listing:", error);
    return NextResponse.json(
      { error: "Failed to fetch listing" },
      { status: 500 }
    );
  }
}