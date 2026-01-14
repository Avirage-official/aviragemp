// app/business/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SubscriptionButton } from "@/components/business/SubscriptionButton";
import { BusinessDashboardClient } from "@/components/business/BusinessDashboardClient";

export default async function BusinessDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      businessProfile: {
        include: {
          listings: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" },
            include: {
              bookings: {
                where: { status: { in: ["INQUIRY", "PENDING"] } },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/onboarding");

  // ✅ Forward-safe redirect — unchanged
  if (!user.businessProfile) {
    redirect("/onboarding/business?returnTo=/business/dashboard");
  }

  const business = user.businessProfile;

  const daysUntilTrialEnd = business.subscriptionEndsAt
    ? Math.ceil(
        (business.subscriptionEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const totalInquiries =
    business.listings.reduce((sum, l) => sum + (l.bookings?.length || 0), 0) || 0;

  // Keep payload client-safe (no Dates)
  const listings = business.listings.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    category: l.category,
    price: l.price,
    targetCodesCount: l.targetCodes.length,
    inquiryCount: l.bookings?.length || 0,
    createdAt: l.createdAt.toISOString(),
  }));

  return (
    <BusinessDashboardClient
      business={{
        businessName: business.businessName,
        description: business.description,
        category: business.category,
        contactEmail: business.contactEmail,
        contactPhone: business.contactPhone,
        website: business.website,
        subscriptionStatus: business.subscriptionStatus,
      }}
      daysUntilTrialEnd={daysUntilTrialEnd}
      totalInquiries={totalInquiries}
      activeListingsCount={business.listings.length}
      listings={listings}
      TrialCTA={<SubscriptionButton />}
    />
  );
}
