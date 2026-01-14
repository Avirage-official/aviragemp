// app/business/listings/[id]/edit/page.tsx
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import EditListingClient from "./EditListingClient";

export default async function EditListingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { businessProfile: true },
  });

  if (!user) redirect("/onboarding");
  if (!user.businessProfile) redirect("/onboarding/business");

  const listing = await prisma.listing.findUnique({
    where: { id },
  });

  if (!listing) return notFound();
  if (listing.businessId !== user.businessProfile.id) return notFound();

  return (
    <EditListingClient
      listing={{
        id: listing.id,
        title: listing.title,
        description: listing.description,
        category: listing.category,
        subcategory: listing.subcategory,
        price: listing.price,
        currency: listing.currency,
        pricingType: listing.pricingType,
        location: listing.location,
        city: listing.city,
        bookingType: listing.bookingType,
        targetCodes: listing.targetCodes || [],
        duration: listing.duration,
        groupSize: listing.groupSize,
        tags: listing.tags || [],
        traits: listing.traits,
        isActive: listing.isActive,
      }}
    />
  );
}
