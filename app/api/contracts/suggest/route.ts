import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

/**
 * POST /api/contracts/suggest
 * 
 * Mimics the milestone-ai service for contract analysis
 * Accepts contract drafts and returns structured advisory data
 */
export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { contractText, milestones = [], totalAmount = 0 } = body;

    if (!contractText) {
      return NextResponse.json(
        { error: "Contract text is required" },
        { status: 400 }
      );
    }

    // Simulate AI analysis with structured advisory data
    // In production, this would integrate with an actual AI service
    
    const assumptions = analyzeAssumptions(contractText, milestones);
    const riskFlags = analyzeRisks(contractText, milestones, totalAmount);
    const suggestions = generateSuggestions(contractText, milestones);
    const confidence = calculateConfidence(contractText, milestones);

    return NextResponse.json({
      suggestions,
      confidence,
      assumptions,
      risk_flags: riskFlags,
      analysis: {
        completeness: assessCompleteness(contractText, milestones),
        clarity: assessClarity(contractText),
        fairness: assessFairness(contractText, milestones),
      }
    });

  } catch (error) {
    console.error("Error analyzing contract:", error);
    return NextResponse.json(
      { error: "Failed to analyze contract" },
      { status: 500 }
    );
  }
}

/**
 * Analyze assumptions in the contract
 */
function analyzeAssumptions(contractText: string, milestones: any[]) {
  const assumptions = [];

  // Check for implicit assumptions
  if (!contractText.toLowerCase().includes("payment terms")) {
    assumptions.push({
      type: "payment",
      description: "Payment terms not explicitly defined",
      severity: "medium",
      recommendation: "Specify payment schedule and methods clearly"
    });
  }

  if (!contractText.toLowerCase().includes("timeline") && !contractText.toLowerCase().includes("deadline")) {
    assumptions.push({
      type: "timeline",
      description: "Project timeline not clearly specified",
      severity: "high",
      recommendation: "Define clear deadlines and milestone dates"
    });
  }

  if (milestones.length === 0) {
    assumptions.push({
      type: "milestones",
      description: "No milestones defined for project tracking",
      severity: "high",
      recommendation: "Break project into measurable milestones"
    });
  }

  if (!contractText.toLowerCase().includes("termination") && !contractText.toLowerCase().includes("cancellation")) {
    assumptions.push({
      type: "termination",
      description: "Exit conditions not defined",
      severity: "medium",
      recommendation: "Include termination clause with notice period"
    });
  }

  return assumptions;
}

/**
 * Analyze potential risks in the contract
 */
function analyzeRisks(contractText: string, milestones: any[], totalAmount: number) {
  const risks = [];

  // Financial risks
  if (totalAmount > 10000 && !contractText.toLowerCase().includes("insurance")) {
    risks.push({
      type: "financial",
      description: "High-value contract without insurance clause",
      severity: "high",
      mitigation: "Consider requiring professional liability insurance"
    });
  }

  // Scope creep
  if (!contractText.toLowerCase().includes("scope") && !contractText.toLowerCase().includes("deliverable")) {
    risks.push({
      type: "scope",
      description: "Scope of work not clearly defined",
      severity: "high",
      mitigation: "Define detailed scope and change request process"
    });
  }

  // IP ownership
  if (!contractText.toLowerCase().includes("intellectual property") && !contractText.toLowerCase().includes("ownership")) {
    risks.push({
      type: "intellectual_property",
      description: "IP ownership rights not specified",
      severity: "medium",
      mitigation: "Clarify who owns work product and deliverables"
    });
  }

  // Dispute resolution
  if (!contractText.toLowerCase().includes("dispute") && !contractText.toLowerCase().includes("arbitration")) {
    risks.push({
      type: "legal",
      description: "No dispute resolution mechanism",
      severity: "medium",
      mitigation: "Add arbitration or mediation clause"
    });
  }

  // Milestone balance
  if (milestones.length > 0) {
    const milestoneTotal = milestones.reduce((sum: number, m: any) => sum + (m.amount || 0), 0);
    if (Math.abs(milestoneTotal - totalAmount) > totalAmount * 0.05) {
      risks.push({
        type: "financial",
        description: "Milestone amounts don't match total contract value",
        severity: "high",
        mitigation: "Ensure milestone payments sum to total amount"
      });
    }
  }

  return risks;
}

/**
 * Generate improvement suggestions
 */
function generateSuggestions(contractText: string, milestones: any[]) {
  const suggestions: any = {
    structure: [],
    content: [],
    milestones: []
  };

  // Structure suggestions
  if (contractText.length < 500) {
    suggestions.structure.push({
      priority: "high",
      message: "Contract appears brief. Consider adding more detail.",
      action: "Expand key sections: scope, deliverables, payment terms"
    });
  }

  // Content suggestions
  if (!contractText.toLowerCase().includes("confidentiality")) {
    suggestions.content.push({
      priority: "medium",
      message: "Consider adding confidentiality clause",
      action: "Protect sensitive business information"
    });
  }

  if (!contractText.toLowerCase().includes("warranty") && !contractText.toLowerCase().includes("guarantee")) {
    suggestions.content.push({
      priority: "low",
      message: "No warranty or guarantee terms found",
      action: "Define quality standards and warranties"
    });
  }

  // Milestone suggestions
  if (milestones.length === 0) {
    suggestions.milestones.push({
      priority: "high",
      message: "No milestones defined",
      action: "Create 3-5 milestone checkpoints for progress tracking"
    });
  } else if (milestones.length > 10) {
    suggestions.milestones.push({
      priority: "medium",
      message: "Many milestones may be difficult to track",
      action: "Consider consolidating into key checkpoints"
    });
  }

  return suggestions;
}

/**
 * Calculate confidence score based on contract completeness
 */
function calculateConfidence(contractText: string, milestones: any[]): number {
  let score = 0.5; // Base score

  // Essential elements
  const essentials = [
    "payment",
    "deliverable",
    "timeline",
    "scope"
  ];

  const foundEssentials = essentials.filter(term => 
    contractText.toLowerCase().includes(term)
  ).length;

  score += (foundEssentials / essentials.length) * 0.3;

  // Milestones defined
  if (milestones.length >= 3) {
    score += 0.1;
  }

  // Legal protections
  const protections = [
    "termination",
    "dispute",
    "confidentiality",
    "intellectual property"
  ];

  const foundProtections = protections.filter(term =>
    contractText.toLowerCase().includes(term)
  ).length;

  score += (foundProtections / protections.length) * 0.1;

  return Math.min(Math.max(score, 0), 1); // Clamp between 0 and 1
}

/**
 * Assess contract completeness
 */
function assessCompleteness(contractText: string, milestones: any[]): number {
  const requiredSections = [
    "parties",
    "scope",
    "payment",
    "timeline",
    "termination"
  ];

  const found = requiredSections.filter(section =>
    contractText.toLowerCase().includes(section)
  ).length;

  let score = (found / requiredSections.length) * 0.7;

  if (milestones.length >= 3) {
    score += 0.3;
  }

  return Math.min(score, 1);
}

/**
 * Assess contract clarity
 */
function assessClarity(contractText: string): number {
  // Simple heuristics for clarity
  const sentences = contractText.split(/[.!?]+/).length;
  const words = contractText.split(/\s+/).length;
  const avgWordsPerSentence = words / sentences;

  // Prefer moderate sentence length (15-25 words)
  let clarityScore = 0.7;

  if (avgWordsPerSentence > 30) {
    clarityScore -= 0.2; // Too complex
  } else if (avgWordsPerSentence < 10) {
    clarityScore -= 0.1; // Too simple, may lack detail
  }

  // Check for legal jargon overuse
  const jargonTerms = ["herein", "thereof", "whereby", "henceforth", "aforementioned"];
  const jargonCount = jargonTerms.filter(term =>
    contractText.toLowerCase().includes(term)
  ).length;

  if (jargonCount > 5) {
    clarityScore -= 0.2;
  }

  return Math.max(clarityScore, 0.3);
}

/**
 * Assess contract fairness
 */
function assessFairness(contractText: string, milestones: any[]): number {
  let fairnessScore = 0.7;

  // Check for one-sided terms
  const onesidedIndicators = [
    "sole discretion",
    "without limitation",
    "absolute right",
    "no liability"
  ];

  const onesidedCount = onesidedIndicators.filter(term =>
    contractText.toLowerCase().includes(term)
  ).length;

  fairnessScore -= onesidedCount * 0.1;

  // Check for balanced payment structure
  if (milestones.length >= 3) {
    const amounts = milestones.map((m: any) => m.amount || 0);
    const maxAmount = Math.max(...amounts);
    const minAmount = Math.min(...amounts);
    
    // If payments are relatively balanced
    if (maxAmount > 0 && minAmount / maxAmount > 0.5) {
      fairnessScore += 0.1;
    }
  }

  return Math.max(fairnessScore, 0.3);
}
