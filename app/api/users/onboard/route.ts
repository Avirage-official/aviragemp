import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const user = await prisma.user.create({
      data: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name,
        username: data.username,
        type: "CONSUMER",
        primaryCode: data.primaryCode,
        city: data.city,
        country: "US"
      }
    });

    return Response.json({ user });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Failed to create user" }, { status: 500 });
  }
}