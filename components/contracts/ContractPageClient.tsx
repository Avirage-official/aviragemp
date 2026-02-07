"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ContractAIAdvisor } from "./ContractAIAdvisor";
import { MilestoneProgressMap } from "./MilestoneProgressMap";
import { FileText, Edit3, Check, X, Sparkles } from "lucide-react";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";
import toast from "react-hot-toast";

type Contract = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  legalTerms: string;
  totalAmount: number;
  currency: string;
  aiAssumptions?: any;
  aiRiskFlags?: any;
  aiConfidence?: number | null;
  businessSignedAt?: string | null;
  clientSignedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

type Milestone = {
  id: string;
  title: string;
  description?: string | null;
  deliverables: string[];
  status: string;
  amount: number;
  currency: string;
  dueDate?: string | null;
  completedAt?: string | null;
  orderIndex: number;
};

type BusinessProfile = {
  businessName: string;
  primaryCode?: string | null;
};

interface ContractPageClientProps {
  contract: Contract;
  milestones: Milestone[];
  businessProfile: BusinessProfile;
}

export function ContractPageClient({
  contract,
  milestones,
  businessProfile,
}: ContractPageClientProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [legalTerms, setLegalTerms] = useState(contract.legalTerms);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiData, setAiData] = useState<any>(
    contract.aiAssumptions || contract.aiRiskFlags
      ? {
          assumptions: contract.aiAssumptions,
          risk_flags: contract.aiRiskFlags,
          confidence: contract.aiConfidence,
        }
      : null
  );

  // Get mythical code theme
  const primaryCode = (businessProfile.primaryCode?.toLowerCase() || "lhumir") as MythicalCodeKey;
  const codeData = MYTHICAL_CODES[primaryCode] || MYTHICAL_CODES.lhumir;

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/contracts/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contractText: legalTerms,
          milestones: milestones,
          totalAmount: contract.totalAmount,
        }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setAiData(data);
      toast.success("Contract analyzed successfully");
    } catch (error) {
      toast.error("Failed to analyze contract");
      console.error(error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSave = async () => {
    // In a real app, this would save to the database
    setIsEditing(false);
    toast.success("Contract updated");
    
    // Re-analyze after saving
    await handleAnalyze();
  };

  const canSign = contract.status === "DRAFT" || contract.status === "ACTIVE";
  const isBothSigned = contract.businessSignedAt && contract.clientSignedAt;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="border-b border-white/10 bg-slate-900/50 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-2 flex items-center gap-3">
                <div
                  className="rounded-lg p-2"
                  style={{
                    backgroundColor: codeData.colorMood.primary + "20",
                  }}
                >
                  <FileText className="h-6 w-6" style={{ color: codeData.colorMood.primary }} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{contract.title}</h1>
                  <p className="text-sm text-slate-400">{businessProfile.businessName}</p>
                </div>
              </div>
              {contract.description && (
                <p className="mt-2 max-w-2xl text-slate-300">{contract.description}</p>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              <StatusBadge status={contract.status} />
              {!isEditing && contract.status === "DRAFT" && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 rounded-lg bg-slate-700/50 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700"
                  >
                    <Check className="h-4 w-4" />
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      setLegalTerms(contract.legalTerms);
                    }}
                    className="flex items-center gap-2 rounded-lg bg-slate-700/50 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-slate-700"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left: Legal Terms (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Legal Terms Section */}
            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Legal Terms</h2>
                {!isEditing && (
                  <button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 rounded-lg bg-purple-600/20 px-3 py-1.5 text-sm font-medium text-purple-300 transition-all hover:bg-purple-600/30 disabled:opacity-50"
                  >
                    <Sparkles className={`h-4 w-4 ${isAnalyzing ? "animate-spin" : ""}`} />
                    {isAnalyzing ? "Analyzing..." : "Analyze"}
                  </button>
                )}
              </div>

              {isEditing ? (
                <textarea
                  value={legalTerms}
                  onChange={(e) => setLegalTerms(e.target.value)}
                  className="min-h-[400px] w-full rounded-lg border border-slate-600 bg-slate-800/50 p-4 font-mono text-sm text-slate-200 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                  placeholder="Enter contract legal terms..."
                />
              ) : (
                <div className="prose prose-invert max-w-none">
                  <div className="whitespace-pre-wrap rounded-lg bg-slate-800/30 p-4 font-mono text-sm text-slate-300">
                    {legalTerms || "No legal terms defined yet."}
                  </div>
                </div>
              )}
            </div>

            {/* Milestones Section */}
            <MilestoneProgressMap
              milestones={milestones}
              onMilestoneClick={(milestone) => {
                toast(`Milestone: ${milestone.title}`, {
                  icon: "📋",
                });
              }}
            />

            {/* Signature Section */}
            {canSign && (
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6">
                <h2 className="mb-4 text-lg font-semibold text-white">Signature Ritual</h2>
                <div className="grid grid-cols-2 gap-4">
                  <SignatureBox
                    label="Business Signature"
                    signedAt={contract.businessSignedAt}
                    signerName={businessProfile.businessName}
                    primaryColor={codeData.colorMood.primary}
                  />
                  <SignatureBox
                    label="Client Signature"
                    signedAt={contract.clientSignedAt}
                    signerName="Client"
                  />
                </div>
                {isBothSigned && (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="mt-4 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 p-4 text-center"
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                      className="inline-block text-4xl mb-2"
                    >
                      ✨
                    </motion.div>
                    <p className="font-semibold text-green-300">
                      Contract Sealed - Living Agreement Active
                    </p>
                  </motion.div>
                )}
              </div>
            )}
          </div>

          {/* Right: AI Advisor (1/3 width) */}
          <div className="lg:col-span-1">
            <ContractAIAdvisor contractData={aiData} isAnalyzing={isAnalyzing} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    DRAFT: { color: "text-slate-400", bg: "bg-slate-500/20", label: "Draft" },
    ACTIVE: { color: "text-blue-400", bg: "bg-blue-500/20", label: "Active" },
    COMPLETED: { color: "text-green-400", bg: "bg-green-500/20", label: "Completed" },
    CANCELLED: { color: "text-red-400", bg: "bg-red-500/20", label: "Cancelled" },
  };

  const config = statusConfig[status] || statusConfig.DRAFT;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${config.bg} px-3 py-1 text-sm font-medium ${config.color}`}
    >
      <div className={`h-2 w-2 rounded-full ${config.color.replace("text-", "bg-")}`} />
      {config.label}
    </span>
  );
}

function SignatureBox({
  label,
  signedAt,
  signerName,
  primaryColor = "#6B7280",
}: {
  label: string;
  signedAt?: string | null;
  signerName: string;
  primaryColor?: string;
}) {
  const isSigned = !!signedAt;

  return (
    <div
      className={`rounded-lg border p-4 transition-all ${
        isSigned
          ? "border-green-500/30 bg-green-500/10"
          : "border-slate-600/30 bg-slate-700/20"
      }`}
    >
      <div className="mb-2 text-xs font-medium text-slate-400">{label}</div>
      {isSigned ? (
        <>
          <div className="mb-1 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-400" />
            <span className="font-semibold text-green-300">Signed</span>
          </div>
          <div className="text-xs text-slate-400">
            by {signerName}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {new Date(signedAt).toLocaleString()}
          </div>
        </>
      ) : (
        <div className="py-4 text-center">
          <div
            className="mx-auto mb-2 h-12 w-12 rounded-full border-2 border-dashed"
            style={{ borderColor: primaryColor + "40" }}
          />
          <div className="text-xs text-slate-500">Awaiting signature</div>
        </div>
      )}
    </div>
  );
}
