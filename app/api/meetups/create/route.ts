import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const user = await prisma.user.findUnique({
    where: { clerkId: userId }
  });
  
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  
  const {
    title,
    description,
    date,
    time,
    location,
    city,
    isPublic,
    invitedFriends
  } = await request.json();
  
  // Combine date and time into scheduledAt
  const scheduledAt = new Date(`${date}T${time}`);
  
  // Create meetup
  const meetup = await prisma.meetup.create({
    data: {
      title,
      description,
      venueName: location,
      city,
      scheduledAt,
      isPublic,
      hostId: user.id
    }
  });
  
  // Add host as first participant (GOING status)
  await prisma.meetupParticipant.create({
    data: {
      meetupId: meetup.id,
      userId: user.id,
      status: "GOING"
    }
  });
  
  // Invite friends if private meetup
  if (!isPublic && invitedFriends && invitedFriends.length > 0) {
    await prisma.meetupParticipant.createMany({
      data: invitedFriends.map((friendId: string) => ({
        meetupId: meetup.id,
        userId: friendId,
        status: "PENDING"
      })),
      skipDuplicates: true
    });
  }
  
  return NextResponse.json({ meetup });
}