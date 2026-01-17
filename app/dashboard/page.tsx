// app/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/dashboard/DashboardClient";

/* ============================================================================
   DASHBOARD PAGE — Server Component
   Fetches user data, computes aggregates, passes clean DTO to client
   ============================================================================ */

export default async function DashboardPage() {
  const { userId } = await auth();

  // ---------------------------------------------------------------------------
  // Auth guard
  // ---------------------------------------------------------------------------
  if (!userId) {
    redirect("/sign-in");
  }

  // ---------------------------------------------------------------------------
  // Fetch user + relations
  // NOTE:
  // - There is NO numerology relation in your schema
  // - Numerology fields live INSIDE AstrologyProfile
  // ---------------------------------------------------------------------------
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      friendships: true,
      meetupParticipants: {
        include: {
          meetup: true,
        },
      },
      astrology: true, // includes numerology fields
    },
  });

  // ---------------------------------------------------------------------------
  // Onboarding guards
  // ---------------------------------------------------------------------------
  if (!user || !user.primaryCode) {
    redirect("/onboarding");
  }

  // ---------------------------------------------------------------------------
  // Derived values (compute BEFORE DTO shaping)
  // ---------------------------------------------------------------------------
  const friendCount = user.friendships.length;

  const upcomingMeetups = user.meetupParticipants.filter(
    (participant) => participant.meetup.status === "UPCOMING"
  ).length;

  // ---------------------------------------------------------------------------
  // Client-safe DTO (NO Prisma objects beyond this point)
  // ---------------------------------------------------------------------------
  const userData = {
    id: user.id,
    name: user.name || user.username || "Friend",
    username: user.username,

    primaryCode: user.primaryCode,
    secondaryCode: user.secondaryCode,
    tertiaryCode: user.tertiaryCode,

    city: user.city,
    currentMood: user.currentMood,

    astrology: user.astrology
      ? {
          sunSign: user.astrology.sunSign,
          moonSign: user.astrology.moonSign,
          risingSign: user.astrology.risingSign,
          birthElement: user.astrology.birthElement,
        }
      : null,

    // Numerology is derived FROM astrology profile
    numerology: user.astrology
      ? {
          lifePathNumber: user.astrology.lifePathNumber,
          expressionNumber: user.astrology.destinyNumber,
          soulUrgeNumber: user.astrology.soulUrgeNumber,
        }
      : null,

    friendCount,
    upcomingMeetups,
  };

  // ---------------------------------------------------------------------------
  // Render dashboard
  // ---------------------------------------------------------------------------
  return <DashboardClient user={userData} />;
}
