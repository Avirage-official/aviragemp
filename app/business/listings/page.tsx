// app/business/listings/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ListingsManagerClient from "./ListingsManagerClient";

export default async function BusinessListingsPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      businessProfile: {
        include: {
          listings: {
            orderBy: { createdAt: "desc" },
            include: {
              bookings: {
                where: { status: { in: ["INQUIRY", "PENDING"] } },
              },
              analytics: true,
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/onboarding");
  if (!user.businessProfile) redirect("/onboarding/business");

  const business = user.businessProfile;

  const listings = business.listings.map((l) => ({
    id: l.id,
    title: l.title,
    description: l.description,
    category: l.category,
    subcategory: l.subcategory,
    price: l.price,
    currency: l.currency,
    pricingType: l.pricingType,
    city: l.city,
    location: l.location,
    isActive: l.isActive,
    targetCodesCount: l.targetCodes?.length || 0,
    tagsCount: l.tags?.length || 0,
    duration: l.duration,
    groupSize: l.groupSize,
    createdAt: l.createdAt.toISOString(),
    updatedAt: l.updatedAt.toISOString(),
    openInquiries: l.bookings?.length || 0,
    signals: l.analytics?.length || 0,
  }));

  return <ListingsManagerClient listings={listings} />;
}
