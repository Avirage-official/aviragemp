import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export default async function MeetupsPage() {
  const { userId } = await auth();
  
  if (!userId) {
    return <div>Not authenticated</div>;
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Meetups</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Create Meetup
        </button>
      </div>
      
      <div className="bg-white rounded-lg p-12 shadow text-center">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-bold mb-2">Coming Soon</h2>
        <p className="text-gray-600 mb-4">
          Coordinate gatherings with friends and discover public meetups in your city.
        </p>
        <div className="flex gap-4 justify-center text-sm text-gray-500">
          <span>• Private friend meetups</span>
          <span>• Public discovery</span>
          <span>• Location-based</span>
        </div>
      </div>
    </div>
  );
}