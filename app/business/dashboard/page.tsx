// app/business/dashboard/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { Suspense } from "react";
import { SubscriptionButton } from "@/components/business/SubscriptionButton";
import { BusinessDashboardClient } from "@/components/business/BusinessDashboardClient";
import { DashboardSkeleton } from "@/components/business/DashboardSkeleton";

export const revalidate = 300;

async function getDashboardData(userId: string) {
  try {
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
                  where: { 
                    status: { in: ["INQUIRY", "PENDING"] } 
                  },
                  orderBy: { createdAt: "desc" },
                },
                analytics: {
                  where: {
                    action: "VIEW",
                    timestamp: {
                      gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                    }
                  }
                }
              },
            },
          },
        },
      },
    });

    if (!user) redirect("/onboarding");
    if (!user.businessProfile) {
      redirect("/onboarding/business?returnTo=/business/dashboard");
    }

    const business = user.businessProfile;

    const daysUntilTrialEnd = business.subscriptionEndsAt
      ? Math.max(
          0,
          Math.ceil(
            (business.subscriptionEndsAt.getTime() - Date.now()) / 
            (1000 * 60 * 60 * 24)
          )
        )
      : null;

    const totalInquiries = business.listings.reduce(
      (sum, l) => sum + (l.bookings?.length || 0), 
      0
    );

    const totalViews = business.listings.reduce(
      (sum, l) => sum + (l.analytics?.length || 0), 
      0
    );

    const topListing = business.listings.reduce(
      (top, current) => {
        const currentInquiries = current.bookings?.length || 0;
        const topInquiries = top?.bookings?.length || 0;
        return currentInquiries > topInquiries ? current : top;
      },
      business.listings[0]
    );

    const conversionRate = totalViews > 0 
      ? Math.round((totalInquiries / totalViews) * 100) 
      : 0;

    const listings = business.listings.map((l) => ({
      id: l.id,
      title: l.title,
      description: l.description,
      category: l.category,
      price: l.price,
      targetCodesCount: Array.isArray(l.targetCodes) ? l.targetCodes.length : 0,
      inquiryCount: l.bookings?.length || 0,
      createdAt: l.createdAt.toISOString(),
    }));

    return {
      business: {
        businessName: business.businessName,
        description: business.description,
        category: business.category,
        contactEmail: business.contactEmail,
        contactPhone: business.contactPhone,
        website: business.website,
        subscriptionStatus: business.subscriptionStatus,
      },
      daysUntilTrialEnd,
      totalInquiries,
      activeListingsCount: business.listings.length,
      listings,
      metrics: {
        totalViews,
        conversionRate,
        avgResponseTime: null,
        topPerformingListing: topListing?.title || null,
      },
    };
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    throw new Error("Failed to load dashboard data");
  }
}

export default async function BusinessDashboard() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  let data;
  
  try {
    data = await getDashboardData(userId);
  } catch (error) {
    notFound();
  }

  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <BusinessDashboardClient
        business={data.business}
        daysUntilTrialEnd={data.daysUntilTrialEnd}
        totalInquiries={data.totalInquiries}
        activeListingsCount={data.activeListingsCount}
        listings={data.listings}
        metrics={data.metrics}
        TrialCTA={<SubscriptionButton />}
      />
    </Suspense>
  );
}

export async function generateMetadata() {
  const { userId } = await auth();
  
  if (!userId) {
    return {
      title: "Business Dashboard | ETHOS",
      description: "Manage your ETHOS business presence",
    };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      select: {
        businessProfile: {
          select: {
            businessName: true,
          },
        },
      },
    });

    return {
      title: `${user?.businessProfile?.businessName || "Business"} Dashboard | ETHOS`,
      description: "Manage your listings, inquiries, and business performance on ETHOS",
    };
  } catch {
    return {
      title: "Business Dashboard | ETHOS",
      description: "Manage your ETHOS business presence",
    };
  }
}