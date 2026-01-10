const INSIGHTS: Record<string, {
  month: string;
  theme: string;
  tip: string;
  astrologyNote: string;
  numerology: string;
}> = {
  "lhumir": {
    month: "January 2026",
    theme: "Inner Renewal",
    tip: "Winter's stillness mirrors your natural contemplative state. Use this month for deep reflection and setting intentions rooted in authentic purpose.",
    astrologyNote: "Capricorn season (until Jan 19) aligns with your need for structure in spiritual practice. Aquarius season brings fresh perspectives.",
    numerology: "January (1) brings new beginnings—perfect for starting a meditation practice or journal."
  },
  "kayori": {
    month: "January 2026",
    theme: "Spark & Connect",
    tip: "New year energy fuels your natural enthusiasm. Host gatherings, initiate projects, and bring people together with your infectious warmth.",
    astrologyNote: "Aquarius season (Jan 19+) amplifies your social nature and innovative thinking.",
    numerology: "The number 1 month channels your initiator energy—light the fires that will warm others all year."
  },
  "sahen": {
    month: "January 2026",
    theme: "Horizon Planning",
    tip: "Map your adventures for the year ahead. Research new places, learn new skills, and set exploratory goals that expand your world.",
    astrologyNote: "Capricorn's grounding helps you structure your wanderlust into achievable plans.",
    numerology: "January's pioneering energy supports bold plans—think big, then bigger."
  },
  "enzuka": {
    month: "January 2026",
    theme: "Fortify Foundations",
    tip: "Strengthen the structures that protect what you care about. Review commitments, reinforce boundaries, and ensure your inner circle feels secure.",
    astrologyNote: "Capricorn season resonates with your protective instincts—build systems that last.",
    numerology: "Month 1 energy: be the foundation others can build upon."
  },
  "siyuane": {
    month: "January 2026",
    theme: "Adaptive Flow",
    tip: "Winter's unpredictability plays to your strengths. Stay flexible, embrace change, and find creative solutions to new year challenges.",
    astrologyNote: "Aquarius season (Jan 19+) loves your innovative thinking and ability to pivot gracefully.",
    numerology: "The number 1 brings fresh starts—perfect for trying new approaches."
  },
  "jaejin": {
    month: "January 2026",
    theme: "Centered Balance",
    tip: "As others rush into new year resolutions, model sustainable equilibrium. Help friends find middle ground between ambition and rest.",
    astrologyNote: "Capricorn's discipline balanced with Aquarius's freedom—you understand both.",
    numerology: "January's initiating energy needs your balancing wisdom to stay sustainable."
  },
  "namsea": {
    month: "January 2026",
    theme: "Winter Waters",
    tip: "Like water taking new shapes, flow into 2026 with grace. Don't force—allow circumstances to guide your natural movement.",
    astrologyNote: "Winter's fluid energy matches your adaptable nature perfectly.",
    numerology: "The number 1 asks: what new form will you take this year?"
  },
  "shokunin": {
    month: "January 2026",
    theme: "Sharpening Skills",
    tip: "Start the year with focused practice. Choose one craft to deepen, set measurable goals, and pursue mastery with your signature discipline.",
    astrologyNote: "Capricorn season speaks your language—dedication, precision, incremental progress.",
    numerology: "Month 1: lay the foundation for a year of refinement."
  },
  "khoruun": {
    month: "January 2026",
    theme: "Vision Flight",
    tip: "Rise above details to see the bigger picture. Set ambitious goals that excite you, then chart the flight path to reach them.",
    astrologyNote: "Aquarius season (Jan 19+) amplifies your forward-thinking, big-picture vision.",
    numerology: "January's pioneering energy aligns with your soaring ambitions—aim high."
  },
  "yatevar": {
    month: "January 2026",
    theme: "Honoring Cycles",
    tip: "Recognize that January is both ending and beginning. Honor what completed in 2025 before planting seeds for 2026.",
    astrologyNote: "Capricorn's awareness of time's passage resonates with your cyclical wisdom.",
    numerology: "The number 1 appears at the cycle's return—trust the rhythm."
  },
  "tahiri": {
    month: "January 2026",
    theme: "Heart Opening",
    tip: "Winter invites deeper emotional connection. Create space for authentic conversations and vulnerable sharing with loved ones.",
    astrologyNote: "Aquarius season (Jan 19+) brings humanitarian heart—your empathy serves the collective.",
    numerology: "Month 1: lead with love as your primary compass."
  },
  "karayni": {
    month: "January 2026",
    theme: "Roots & Legacy",
    tip: "Connect with family traditions, honor your lineage, and consider what you're building for future generations.",
    astrologyNote: "Capricorn's reverence for tradition aligns with your ancestral awareness.",
    numerology: "January asks: what foundation from the past supports your future?"
  },
  "wohaka": {
    month: "January 2026",
    theme: "Story Gathering",
    tip: "Collect stories from your community. Winter nights are made for shared narrative—host gatherings that weave connection.",
    astrologyNote: "Aquarius season celebrates collective wisdom—your storytelling serves the whole.",
    numerology: "The number 1: every epic begins with a single story."
  },
  "tjukari": {
    month: "January 2026",
    theme: "Dream Mapping",
    tip: "Your intuition is especially sharp in winter's quiet. Pay attention to dreams, synchronicities, and inner knowing.",
    astrologyNote: "Aquarius season opens channels to collective consciousness—trust your visions.",
    numerology: "Month 1 brings clarity to what wants to emerge from the unseen."
  },
  "kinmora": {
    month: "January 2026",
    theme: "Strategic Architecture",
    tip: "Design your year with long-term thinking. Build systems and structures now that will compound over time.",
    astrologyNote: "Capricorn season is your element—strategic, patient, building for decades not days.",
    numerology: "January's initiating energy: lay cornerstones for your grand design."
  },
  "siljoa": {
    month: "January 2026",
    theme: "Clear Perspective",
    tip: "Winter's clarity serves your objective nature. Step back from emotion to see situations with crystalline truth.",
    astrologyNote: "Capricorn's cool assessment and Aquarius's detached wisdom both honor your clear-seeing.",
    numerology: "The number 1: see with beginner's eyes—fresh, uncluttered."
  },
  "skenari": {
    month: "January 2026",
    theme: "Future Preparation",
    tip: "Look ahead to anticipate what 2026 will require. Build buffers, learn new skills, and prepare for what's emerging.",
    astrologyNote: "Aquarius season (Jan 19+) loves your forward focus—you see tomorrow clearly.",
    numerology: "Month 1: the future is shaped by today's preparations."
  },
  "ashkara": {
    month: "January 2026",
    theme: "Truth Forging",
    tip: "Cut away illusions that don't serve. Start the year with radical honesty about what's real and what matters.",
    astrologyNote: "Capricorn's realism appreciates your no-nonsense clarity.",
    numerology: "January demands authenticity—your specialty."
  },
  "alethir": {
    month: "January 2026",
    theme: "Knowledge Quest",
    tip: "Choose a subject to master this year. Winter's quiet is perfect for deep learning and intellectual exploration.",
    astrologyNote: "Aquarius season (Jan 19+) celebrates innovative thinking and intellectual pursuits.",
    numerology: "The number 1: every expert began as a curious beginner."
  },
  "khoisan": {
    month: "January 2026",
    theme: "Earth Connection",
    tip: "Even in winter, stay grounded in nature. Notice seasonal shifts, honor the dormant earth, and trust the cycle.",
    astrologyNote: "Capricorn's earth element speaks to your grounded awareness.",
    numerology: "Month 1: plant intentions that will root deeply over the year."
  }
};

export function MonthlyInsights({ code }: { code: string }) {
  const insight = INSIGHTS[code] || INSIGHTS["lhumir"];
  
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-8 shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Monthly Insights</h2>
        <span className="text-sm font-medium text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
          {insight.month}
        </span>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            This Month's Theme
          </h3>
          <p className="text-2xl font-bold text-gray-900">{insight.theme}</p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Insight for Your Code
          </h3>
          <p className="text-gray-700 leading-relaxed">{insight.tip}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-indigo-200">
          <div>
            <h3 className="text-sm font-semibold text-indigo-700 mb-2 flex items-center gap-2">
              <span>✨</span>
              Astrological Alignment
            </h3>
            <p className="text-sm text-gray-600">{insight.astrologyNote}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-purple-700 mb-2 flex items-center gap-2">
              <span>🔢</span>
              Numerology
            </h3>
            <p className="text-sm text-gray-600">{insight.numerology}</p>
          </div>
        </div>
      </div>
    </div>
  );
}