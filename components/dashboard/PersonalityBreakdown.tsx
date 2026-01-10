"use client";

export function PersonalityBreakdown({ quizResults }: { quizResults: any }) {
  // If user hasn't taken quiz yet, show placeholder
  if (!quizResults) {
    return (
      <div className="bg-white rounded-lg p-8 shadow">
        <h2 className="text-2xl font-bold mb-4">Personality Breakdown</h2>
        <p className="text-gray-600 mb-4">
          Complete the full assessment to see your detailed breakdown across Big Five, MBTI, and Enneagram.
        </p>
        <a 
          href="https://myethoslens.vercel.app" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Take Full Assessment →
        </a>
      </div>
    );
  }
  
  const bigFive = quizResults.bigFive || {};
  
  const traits = [
    { name: "Openness", value: bigFive.openness || 0, color: "bg-purple-500" },
    { name: "Conscientiousness", value: bigFive.conscientiousness || 0, color: "bg-blue-500" },
    { name: "Extraversion", value: bigFive.extraversion || 0, color: "bg-green-500" },
    { name: "Agreeableness", value: bigFive.agreeableness || 0, color: "bg-yellow-500" },
    { name: "Neuroticism", value: bigFive.neuroticism || 0, color: "bg-red-500" }
  ];
  
  return (
    <div className="bg-white rounded-lg p-8 shadow">
      <h2 className="text-2xl font-bold mb-6">Personality Breakdown</h2>
      
      <div className="space-y-4">
        {traits.map(trait => (
          <div key={trait.name}>
            <div className="flex justify-between mb-1">
              <span className="font-medium text-gray-700">{trait.name}</span>
              <span className="text-gray-600">{trait.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`${trait.color} h-3 rounded-full transition-all duration-500`}
                style={{ width: `${trait.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      {quizResults.mbti && (
        <div className="mt-6 pt-6 border-t">
          <h3 className="font-semibold mb-2">MBTI Type</h3>
          <p className="text-2xl font-bold text-blue-600">{quizResults.mbti}</p>
        </div>
      )}
      
      {quizResults.enneagram && (
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Enneagram</h3>
          <p className="text-xl text-gray-700">Type {quizResults.enneagram}</p>
        </div>
      )}
    </div>
  );
}