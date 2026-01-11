import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { SubscriptionButton } from "@/components/business/SubscriptionButton";

export default async function BusinessDashboard() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: {
      businessProfile: {
        include: {
          listings: {
            where: { isActive: true },
            orderBy: { createdAt: "desc" }
          }
        }
      }
    }
  });

  if (!user) {
    redirect("/onboarding");
  }

  if (!user.businessProfile) {
    redirect("/onboarding/business");
  }

  const business = user.businessProfile;
  const daysUntilTrialEnd = Math.ceil(
    (new Date(business.subscriptionEndsAt!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">{business.businessName}</h1>
          <p className="text-gray-600 mt-2">{business.category}</p>
        </div>

        {/* Trial Status Banner */}
        {business.subscriptionStatus === "TRIAL" && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-yellow-800">Free Trial Active</h3>
                <p className="text-yellow-700 mt-1">
                  {daysUntilTrialEnd} days remaining until {new Date(business.subscriptionEndsAt!).toLocaleDateString()}
                </p>
              </div>
              <SubscriptionButton />
            </div>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Active Listings</p>
            <p className="text-3xl font-bold mt-2">{business.listings?.length || 0}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Total Views</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-sm">Inquiries</p>
            <p className="text-3xl font-bold mt-2">0</p>
          </div>
        </div>

        {/* Listings Section */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Listings</h2>
            <a
              href="/business/listings/new"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              + Create Listing
            </a>
          </div>
          
          {business.listings && business.listings.length > 0 ? (
            <div className="space-y-4">
              {business.listings.map((listing: any) => (
                <div key={listing.id} className="border rounded-lg p-4 hover:bg-gray-50 transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{listing.title}</h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex gap-4 mt-3 text-sm">
                        <span className="text-gray-600">
                          📁 {listing.category}
                        </span>
                        {listing.price && (
                          <span className="text-gray-600">
                            💰 ${listing.price}
                          </span>
                        )}
                        <span className="text-gray-600">
                          🎯 {listing.targetCodes.length} codes targeted
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                        Edit
                      </button>
                      <button className="px-3 py-1 text-sm border rounded hover:bg-gray-100">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-bold mb-2">No listings yet</h3>
              <p className="text-gray-600 mb-6">
                Create your first listing to start reaching personality-matched customers
              </p>
              <a
                href="/business/listings/new"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Create Your First Listing
              </a>
            </div>
          )}
        </div>

        {/* Business Info */}
        <div className="bg-white rounded-lg shadow p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">Business Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-600">Contact Email</p>
              <p className="font-semibold mt-1">{business.contactEmail}</p>
            </div>
            
            {business.contactPhone && (
              <div>
                <p className="text-sm text-gray-600">Contact Phone</p>
                <p className="font-semibold mt-1">{business.contactPhone}</p>
              </div>
            )}
            
            {business.website && (
              <div>
                <p className="text-sm text-gray-600">Website</p>
                <a 
                  href={business.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold mt-1 text-blue-600 hover:underline"
                >
                  {business.website}
                </a>
              </div>
            )}
            
            <div>
              <p className="text-sm text-gray-600">Description</p>
              <p className="mt-1">{business.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}