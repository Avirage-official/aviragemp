import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { redirect, notFound } from "next/navigation";
import { ContractPageClient } from "@/components/contracts/ContractPageClient";

export const revalidate = 60;

async function getContractData(contractId: string, userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        businessProfile: true,
      },
    });

    if (!user) redirect("/onboarding");
    if (!user.businessProfile) {
      redirect("/onboarding/business?returnTo=/business/contracts");
    }

    const contract = await prisma.contract.findUnique({
      where: { id: contractId },
      include: {
        business: true,
        milestones: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });

    if (!contract) {
      notFound();
    }

    // Verify the contract belongs to this business
    if (contract.businessId !== user.businessProfile.id) {
      notFound();
    }

    return {
      contract: {
        id: contract.id,
        title: contract.title,
        description: contract.description,
        status: contract.status,
        legalTerms: contract.legalTerms,
        totalAmount: contract.totalAmount,
        currency: contract.currency,
        aiAssumptions: contract.aiAssumptions,
        aiRiskFlags: contract.aiRiskFlags,
        aiConfidence: contract.aiConfidence,
        businessSignedAt: contract.businessSignedAt?.toISOString(),
        clientSignedAt: contract.clientSignedAt?.toISOString(),
        createdAt: contract.createdAt.toISOString(),
        updatedAt: contract.updatedAt.toISOString(),
      },
      milestones: contract.milestones.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        deliverables: m.deliverables,
        status: m.status,
        amount: m.amount,
        currency: m.currency,
        dueDate: m.dueDate?.toISOString(),
        completedAt: m.completedAt?.toISOString(),
        orderIndex: m.orderIndex,
      })),
      businessProfile: {
        businessName: contract.business.businessName,
        primaryCode: contract.business.primaryCode,
      },
    };
  } catch (error) {
    console.error("Contract data fetch error:", error);
    throw new Error("Failed to load contract data");
  }
}

export default async function ContractPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id } = await params;

  let data;
  try {
    data = await getContractData(id, userId);
  } catch (error) {
    notFound();
  }

  return (
    <ContractPageClient
      contract={data.contract}
      milestones={data.milestones}
      businessProfile={data.businessProfile}
    />
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { userId } = await auth();
  
  if (!userId) {
    return {
      title: "Contract | ETHOS",
      description: "View and manage your contract",
    };
  }

  try {
    const { id } = await params;
    
    const contract = await prisma.contract.findUnique({
      where: { id },
      select: {
        title: true,
      },
    });

    return {
      title: `${contract?.title || "Contract"} | ETHOS`,
      description: "Living Agreement - AI-Governed Contract Page",
    };
  } catch {
    return {
      title: "Contract | ETHOS",
      description: "View and manage your contract",
    };
  }
}
