import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const category = searchParams.get("category");

    const where: any = {
      isActive: true,
      business: {
        subscriptionStatus: {
          in: ["ACTIVE", "TRIAL"]
        }
      }
    };

    // Filter by personality code if provided
    if (code) {
      where.targetCodes = {
        has: code
      };
    }

    // Filter by category if provided
    if (category && category !== "all") {
      where.category = category;
    }

    const listings = await prisma.listing.findMany({
      where,
      include: {
        business: {
          select: {
            businessName: true,
            category: true,
            logo: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ listings });

  } catch (error) {
    console.error("Error fetching listings:", error);
    return NextResponse.json(
      { error: "Failed to fetch listings" },
      { status: 500 }
    );
  }
}