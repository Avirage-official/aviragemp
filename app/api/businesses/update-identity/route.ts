// app/api/businesses/update-identity/route.ts
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";

export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();

    const {
      primaryCode,
      secondaryCode,
      tertiaryCode,
    }: {
      primaryCode: MythicalCodeKey;
      secondaryCode?: MythicalCodeKey | null;
      tertiaryCode?: MythicalCodeKey | null;
    } = body;

    /* ---------------------------------------------------------------------- */
    /* HARD VALIDATION                                                         */
    /* ---------------------------------------------------------------------- */

    if (!primaryCode || !(primaryCode in MYTHICAL_CODES)) {
      return NextResponse.json(
        { error: "Invalid primary code" },
        { status: 400 }
      );
    }

    if (
      secondaryCode &&
      !(secondaryCode in MYTHICAL_CODES)
    ) {
      return NextResponse.json(
        { error: "Invalid secondary code" },
        { status: 400 }
      );
    }

    if (
      tertiaryCode &&
      !(tertiaryCode in MYTHICAL_CODES)
    ) {
      return NextResponse.json(
        { error: "Invalid tertiary code" },
        { status: 400 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /* FIND BUSINESS                                                           */
    /* ---------------------------------------------------------------------- */

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: { businessProfile: true },
    });

    if (!user || !user.businessProfile) {
      return NextResponse.json(
        { error: "Business profile not found" },
        { status: 404 }
      );
    }

    /* ---------------------------------------------------------------------- */
    /* UPDATE                                                                  */
    /* ---------------------------------------------------------------------- */

    await prisma.businessProfile.update({
      where: { id: user.businessProfile.id },
      data: {
        primaryCode,
        secondaryCode: secondaryCode || null,
        tertiaryCode: tertiaryCode || null,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("UPDATE IDENTITY ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
