"use client";

import { Brain } from "lucide-react";

function TraitBar({ 
  name, 
  value, 
  color 
}: { 
  name: string; 
  value: number;
  color: "blue" | "mint" | "lavender" | "blue-mint" | "mint-lavender";
}) {
  const colorClasses = {
    blue: "bg-[#4F8CFF]/20 [&>div]:bg-gradient-to-r [&>div]:from-[#4F8CFF] [&>div]:to-[#7CF5C8]",
    mint: "bg-[#7CF5C8]/20 [&>div]:bg-gradient-to-r [&>div]:from-[#7CF5C8] [&>div]:to-[#4F8CFF]",
    lavender: "bg-[#C7B9FF]/20 [&>div]:bg-gradient-to-r [&>div]:from-[#C7B9FF] [&>div]:to-[#4F8CFF]",
    "blue-mint": "bg-[#4F8CFF]/20 [&>div]:bg-gradient-to-r [&>div]:from-[#4F8CFF] [&>div]:to-[#7CF5C8]",
    "mint-lavender": "bg-[#7CF5C8]/20 [&>div]:bg-gradient-to-r [&>div]:from-[#7CF5C8] [&>div]:to-[#C7B9FF]"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-[#FAFAFA]/80">{name}</span>
        <span className="text-xs text-[#FAFAFA]/50 font-mono">{value}%</span>
      </div>
      <div className={`h-2 w-full rounded-full overflow-hidden ${colorClasses[color]}`}>
        <div 
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function PersonalityBreakdown({ quizResults }: { quizResults: any }) {
  // If user hasn't taken quiz yet, show placeholder
  if (!quizResults) {
    return (
      <div className="relative group">
        {/* Glow */}
        <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#C7B9FF]/10 to-[#4F8CFF]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
        
        {/* Card */}
        <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-[#C7B9FF]/30 flex items-center justify-center">
              <Brain className="h-6 w-6 text-[#C7B9FF]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#FAFAFA]">Personality Breakdown</h3>
              <p className="text-xs text-[#FAFAFA]/50">Big Five, MBTI & Enneagram</p>
            </div>
          </div>
          
          <p className="text-sm text-[#FAFAFA]/60 mb-6 leading-relaxed">
            Complete the full assessment to see your detailed breakdown across personality frameworks and unlock deeper insights.
          </p>
          
          <a 
            href="https://myethoslens.vercel.app" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] text-white font-medium text-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#4F8CFF]/30 hover:scale-[1.02]"
          >
            Take Full Assessment →
          </a>
        </div>
      </div>
    );
  }
  
  const bigFive = quizResults.bigFive || {};
  
  const traits = [
    { name: "Openness", value: bigFive.openness || 0, color: "blue" as const },
    { name: "Conscientiousness", value: bigFive.conscientiousness || 0, color: "mint" as const },
    { name: "Extraversion", value: bigFive.extraversion || 0, color: "lavender" as const },
    { name: "Agreeableness", value: bigFive.agreeableness || 0, color: "blue-mint" as const },
    { name: "Neuroticism", value: bigFive.neuroticism || 0, color: "mint-lavender" as const }
  ];
  
  return (
    <div className="relative group">
      {/* Glow */}
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#C7B9FF]/10 to-[#4F8CFF]/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      {/* Card */}
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-[#FAFAFA]/10 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#C7B9FF]/20 to-[#4F8CFF]/20 border border-[#C7B9FF]/30 flex items-center justify-center">
            <Brain className="h-6 w-6 text-[#C7B9FF]" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#FAFAFA]">Personality Breakdown</h3>
            <p className="text-xs text-[#FAFAFA]/50">Big Five Traits</p>
          </div>
        </div>
        
        {/* Big Five Bars */}
        <div className="space-y-4 mb-8">
          {traits.map(trait => (
            <TraitBar 
              key={trait.name}
              name={trait.name}
              value={trait.value}
              color={trait.color}
            />
          ))}
        </div>
        
        {/* MBTI & Enneagram */}
        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-[#FAFAFA]/10">
          {quizResults.mbti && (
            <div className="space-y-1">
              <p className="text-xs text-[#FAFAFA]/50 uppercase tracking-wider">MBTI Type</p>
              <p className="text-2xl font-bold text-[#4F8CFF]">{quizResults.mbti}</p>
            </div>
          )}
          
          {quizResults.enneagram && (
            <div className="space-y-1">
              <p className="text-xs text-[#FAFAFA]/50 uppercase tracking-wider">Enneagram</p>
              <p className="text-xl font-bold text-[#7CF5C8]">Type {quizResults.enneagram}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}