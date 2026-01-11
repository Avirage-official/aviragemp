import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo/Title */}
          <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ETHOS
          </h1>
          
          {/* Tagline */}
          <p className="text-2xl md:text-3xl text-gray-300 mb-4">
            Discover Your Mythical Code
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Connect with personality-matched experiences, find your tribe, 
            and explore a marketplace built around who you truly are.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/sign-up"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-blue-500/50"
            >
              Get Started Free
            </Link>
            <Link 
              href="/sign-in"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-lg font-semibold rounded-xl border border-white/20 transition-all duration-200"
            >
              Sign In
            </Link>
          </div>
          
          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-4xl mb-4">🎭</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Find Your Code
              </h3>
              <p className="text-gray-400">
                Discover your personality archetype through our unique assessment
              </p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Connect with Friends
              </h3>
              <p className="text-gray-400">
                Build meaningful connections with compatible personalities
              </p>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/10 rounded-xl">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Matched Experiences
              </h3>
              <p className="text-gray-400">
                Explore curated offerings aligned with your unique code
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="border-t border-white/10 py-8 text-center text-gray-500">
        <p>© 2026 ETHOS. All rights reserved.</p>
      </div>
    </div>
  );
}