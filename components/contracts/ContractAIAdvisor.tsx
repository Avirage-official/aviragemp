"use client";

import { motion } from "framer-motion";
import { Brain, ShieldCheck, AlertTriangle, Lightbulb, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

type RiskFlag = {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
  mitigation?: string;
};

type Assumption = {
  type: string;
  description: string;
  severity: "low" | "medium" | "high";
  recommendation?: string;
};

type Suggestion = {
  priority: "low" | "medium" | "high";
  message: string;
  action?: string;
};

type Analysis = {
  completeness: number;
  clarity: number;
  fairness: number;
};

type AdvisoryData = {
  assumptions?: Assumption[];
  risk_flags?: RiskFlag[];
  suggestions?: {
    structure?: Suggestion[];
    content?: Suggestion[];
    milestones?: Suggestion[];
  };
  confidence?: number;
  analysis?: Analysis;
};

interface ContractAIAdvisorProps {
  contractData?: AdvisoryData;
  isAnalyzing?: boolean;
}

export function ContractAIAdvisor({ contractData, isAnalyzing = false }: ContractAIAdvisorProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "risks" | "suggestions">("overview");

  const confidence = contractData?.confidence || 0;
  const riskFlags = contractData?.risk_flags || [];
  const assumptions = contractData?.assumptions || [];
  const suggestions = contractData?.suggestions || {};
  const analysis = contractData?.analysis || { completeness: 0, clarity: 0, fairness: 0 };

  const allSuggestions = [
    ...(suggestions.structure || []),
    ...(suggestions.content || []),
    ...(suggestions.milestones || [])
  ];

  const highRisks = riskFlags.filter(r => r.severity === "high").length;
  const mediumRisks = riskFlags.filter(r => r.severity === "medium").length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      {/* Glass card container */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl p-6 shadow-2xl">
        {/* Header */}
        <div className="mb-6 flex items-start gap-3">
          <div className="rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-2.5">
            <Brain className="h-6 w-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">AI Advisor</h3>
            <p className="text-sm text-slate-400">2026 Glass-Governance Analysis</p>
          </div>
        </div>

        {/* Loading state */}
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-8 text-center"
          >
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-purple-500/20 border-t-purple-500"></div>
            <p className="text-sm text-slate-400">Analyzing contract...</p>
          </motion.div>
        )}

        {/* Content */}
        {!isAnalyzing && contractData && (
          <>
            {/* Confidence Score */}
            <div className="mb-6">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-slate-300">Confidence Score</span>
                <span className="text-lg font-bold text-white">{Math.round(confidence * 100)}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-700/50">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${confidence * 100}%` }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className={`h-full rounded-full ${
                    confidence >= 0.8 ? "bg-gradient-to-r from-green-500 to-emerald-500" :
                    confidence >= 0.6 ? "bg-gradient-to-r from-yellow-500 to-amber-500" :
                    "bg-gradient-to-r from-red-500 to-orange-500"
                  }`}
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-4 flex gap-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "overview"
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("risks")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "risks"
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-300"
                }`}
              >
                Risks ({riskFlags.length})
              </button>
              <button
                onClick={() => setActiveTab("suggestions")}
                className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "suggestions"
                    ? "bg-purple-500/20 text-purple-300"
                    : "text-slate-400 hover:bg-slate-700/30 hover:text-slate-300"
                }`}
              >
                Tips ({allSuggestions.length})
              </button>
            </div>

            {/* Tab Content */}
            <div className="space-y-4">
              {activeTab === "overview" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  {/* Analysis Metrics */}
                  <div className="space-y-3">
                    <MetricBar label="Completeness" value={analysis.completeness} />
                    <MetricBar label="Clarity" value={analysis.clarity} />
                    <MetricBar label="Fairness" value={analysis.fairness} />
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-lg bg-slate-800/50 p-3">
                      <div className="text-2xl font-bold text-white">{assumptions.length}</div>
                      <div className="text-xs text-slate-400">Assumptions</div>
                    </div>
                    <div className="rounded-lg bg-slate-800/50 p-3">
                      <div className="text-2xl font-bold text-white">{riskFlags.length}</div>
                      <div className="text-xs text-slate-400">Risk Flags</div>
                    </div>
                  </div>

                  {/* Top Assumptions */}
                  {assumptions.length > 0 && (
                    <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Lightbulb className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-blue-300">Key Assumptions</span>
                      </div>
                      <ul className="space-y-2">
                        {assumptions.slice(0, 2).map((assumption, idx) => (
                          <li key={idx} className="text-xs text-slate-300">
                            • {assumption.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "risks" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {riskFlags.length === 0 ? (
                    <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-4 text-center">
                      <ShieldCheck className="mx-auto mb-2 h-8 w-8 text-green-400" />
                      <p className="text-sm text-green-300">No significant risks detected</p>
                    </div>
                  ) : (
                    riskFlags.map((risk, idx) => (
                      <RiskCard key={idx} risk={risk} />
                    ))
                  )}
                </motion.div>
              )}

              {activeTab === "suggestions" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3"
                >
                  {allSuggestions.length === 0 ? (
                    <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-4 text-center">
                      <TrendingUp className="mx-auto mb-2 h-8 w-8 text-purple-400" />
                      <p className="text-sm text-purple-300">Contract looks good!</p>
                    </div>
                  ) : (
                    allSuggestions.map((suggestion, idx) => (
                      <SuggestionCard key={idx} suggestion={suggestion} />
                    ))
                  )}
                </motion.div>
              )}
            </div>
          </>
        )}

        {/* Empty state */}
        {!isAnalyzing && !contractData && (
          <div className="py-8 text-center">
            <Brain className="mx-auto mb-3 h-12 w-12 text-slate-600" />
            <p className="text-sm text-slate-400">
              Enter contract details to receive AI-powered insights
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-medium text-slate-300">{Math.round(value * 100)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-700/50">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8 }}
          className={`h-full ${
            value >= 0.8 ? "bg-green-500" :
            value >= 0.6 ? "bg-yellow-500" :
            "bg-red-500"
          }`}
        />
      </div>
    </div>
  );
}

function RiskCard({ risk }: { risk: RiskFlag }) {
  const severityColors = {
    high: "border-red-500/30 bg-red-500/10",
    medium: "border-yellow-500/30 bg-yellow-500/10",
    low: "border-blue-500/30 bg-blue-500/10",
  };

  const severityIcons = {
    high: "text-red-400",
    medium: "text-yellow-400",
    low: "text-blue-400",
  };

  return (
    <div className={`rounded-lg border p-3 ${severityColors[risk.severity]}`}>
      <div className="mb-2 flex items-start gap-2">
        <AlertTriangle className={`h-4 w-4 mt-0.5 ${severityIcons[risk.severity]}`} />
        <div className="flex-1">
          <div className="text-xs font-medium text-white capitalize mb-1">{risk.type} Risk</div>
          <p className="text-xs text-slate-300">{risk.description}</p>
        </div>
      </div>
      {risk.mitigation && (
        <div className="mt-2 rounded bg-slate-900/50 px-2 py-1.5 text-xs text-slate-400">
          <strong className="text-slate-300">Mitigation:</strong> {risk.mitigation}
        </div>
      )}
    </div>
  );
}

function SuggestionCard({ suggestion }: { suggestion: Suggestion }) {
  const priorityColors = {
    high: "border-purple-500/30 bg-purple-500/10",
    medium: "border-blue-500/30 bg-blue-500/10",
    low: "border-slate-500/30 bg-slate-500/10",
  };

  return (
    <div className={`rounded-lg border p-3 ${priorityColors[suggestion.priority]}`}>
      <div className="mb-1 flex items-center gap-2">
        <Lightbulb className="h-3.5 w-3.5 text-purple-400" />
        <span className="text-xs font-medium text-white capitalize">{suggestion.priority} Priority</span>
      </div>
      <p className="text-xs text-slate-300 mb-2">{suggestion.message}</p>
      {suggestion.action && (
        <div className="rounded bg-slate-900/50 px-2 py-1.5 text-xs text-slate-400">
          <strong className="text-slate-300">Action:</strong> {suggestion.action}
        </div>
      )}
    </div>
  );
}
