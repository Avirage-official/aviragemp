"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Sparkles, 
  Users, 
  Compass, 
  Heart,
  MapPin,
  Star,
  Coffee,
  Music,
  Utensils,
  Dumbbell,
  CheckCircle2,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

export default function HomePage() {
  const { user } = useUser();
  const router = useRouter();

  async function handleGetStarted() {
    if (!user) {
      router.push("/sign-up");
      return;
    }

    try {
      const response = await fetch(`/api/users/${user.id}`);
      const data = await response.json();

      if (!data.user || !data.user.primaryCode) {
        router.push("/onboarding");
      } else if (data.user.type === "BUSINESS") {
        router.push("/business/dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch {
      router.push("/onboarding");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        {/* Background Video */}
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover opacity-40"
            src="/videos/landing-page.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-white/60 to-white/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/50" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#4F8CFF]/20 blur-3xl" />
          <div className="absolute top-40 right-20 h-80 w-80 rounded-full bg-[#C7B9FF]/20 blur-3xl" />
          <div className="absolute bottom-20 left-1/3 h-96 w-96 rounded-full bg-[#7CF5C8]/20 blur-3xl" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-full bg-white/90 backdrop-blur-xl border border-[#4F8CFF]/20 shadow-lg"
          >
            <Sparkles className="w-5 h-5 text-[#4F8CFF]" />
            <span className="text-sm font-semibold text-slate-800">
              Discover Your Personal Alignment
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] mb-8 text-slate-900"
          >
            Find Places That
            <br />
            <span className="bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
              Align With You
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl md:text-2xl lg:text-3xl text-slate-600 max-w-4xl mx-auto mb-6 leading-relaxed"
          >
            ETHOS helps you discover how environments around you affect your well-being—and find the places that truly resonate with who you are.
          </motion.p>

          {/* Supporting Text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto mb-12"
          >
            From coffee shops to fitness studios, discover local experiences aligned with your natural behavioral patterns and emotional rhythms.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <button
              onClick={handleGetStarted}
              className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-white font-bold text-lg flex items-center gap-3 shadow-2xl shadow-[#4F8CFF]/30 hover:shadow-[#4F8CFF]/50 transition-all hover:scale-105"
            >
              <span>{user ? "Go to Dashboard" : "Start Your Journey"}</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {!user && (
              <Link
                href="/sign-in"
                className="px-10 py-5 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-slate-200 hover:border-[#4F8CFF] hover:bg-white transition-all font-bold text-lg text-slate-700 hover:text-[#4F8CFF] shadow-lg hover:shadow-xl"
              >
                Sign In
              </Link>
            )}
          </motion.div>

          {/* Trust Badge */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-sm text-slate-400 mt-8"
          >
            Free to join • No credit card required • Discover your archetype in 5 minutes
          </motion.p>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-700 transition-colors group"
          >
            <span className="text-xs uppercase tracking-wider font-semibold">Explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-slate-300 group-hover:border-[#4F8CFF] flex justify-center pt-2 transition-colors"
            >
              <div className="w-1.5 h-2 bg-gradient-to-b from-[#4F8CFF] to-[#C7B9FF] rounded-full" />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* WHAT IS ETHOS - 3 PILLARS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-0 h-96 w-96 rounded-full bg-[#4F8CFF]/5 blur-3xl" />
          <div className="absolute bottom-1/4 right-0 h-96 w-96 rounded-full bg-[#C7B9FF]/5 blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
              What is{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
                ETHOS
              </span>
              ?
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              An identity-based social layer that helps you find alignment in three key areas
            </p>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <PillarCard
              icon={<Users className="w-8 h-8" />}
              title="Social Alignment"
              subtitle="Connect with like minds"
              description="Meet people who share your natural behavioral patterns and communication styles. Find friendships and relationships that feel effortless."
              gradient="from-[#4F8CFF] to-[#4F8CFF]/60"
              delay={0.1}
            />
            <PillarCard
              icon={<Heart className="w-8 h-8" />}
              title="Emotional Alignment"
              subtitle="Discover your rhythm"
              description="Understand environments and experiences that resonate with your inner emotional state. Find spaces that energize or calm you."
              gradient="from-[#C7B9FF] to-[#C7B9FF]/60"
              delay={0.2}
            />
            <PillarCard
              icon={<Compass className="w-8 h-8" />}
              title="Experiential Alignment"
              subtitle="Places that feel like you"
              description="Explore activities and locations that authentically match your identity. Discover experiences where you can truly be yourself."
              gradient="from-[#7CF5C8] to-[#7CF5C8]/60"
              delay={0.3}
            />
          </div>

          {/* Context Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20 p-10 rounded-3xl bg-gradient-to-br from-[#4F8CFF]/10 via-white to-[#C7B9FF]/10 border border-[#4F8CFF]/20 backdrop-blur-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
              Starting with Local Place Discovery
            </h3>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed">
              This platform focuses on helping you navigate the places around you—understanding how different environments affect your well-being, positively or negatively. ETHOS will expand to other areas like career, education, and more in the future.
            </p>
          </motion.div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
              How It{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent">
                Works
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Three simple steps to discover your alignment
            </p>
          </motion.div>

          {/* Steps */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-[#4F8CFF]/20 via-[#C7B9FF]/20 to-[#7CF5C8]/20" />

            <div className="grid md:grid-cols-3 gap-12 relative">
              <StepCard
                number="01"
                icon={<Sparkles className="w-8 h-8" />}
                title="Take the Quiz"
                description="Answer a quick 5-minute archetype assessment to reveal your unique identity code and natural behavioral patterns."
                delay={0.1}
              />
              <StepCard
                number="02"
                icon={<Star className="w-8 h-8" />}
                title="Discover Your Archetype"
                description="Unlock your mythical archetype—your personal identity blueprint that explains how you interact with the world."
                delay={0.2}
              />
              <StepCard
                number="03"
                icon={<MapPin className="w-8 h-8" />}
                title="Find Aligned Places"
                description="Get personalized recommendations for local venues, experiences, and environments that match your unique profile."
                delay={0.3}
              />
            </div>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={handleGetStarted}
              className="group relative px-10 py-5 rounded-2xl bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-white font-bold text-lg flex items-center gap-3 mx-auto shadow-2xl shadow-[#4F8CFF]/30 hover:shadow-[#4F8CFF]/50 transition-all hover:scale-105"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* EXPLORE PLACES */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white via-purple-50/20 to-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
              Explore{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] to-[#7CF5C8] bg-clip-text text-transparent">
                Local Places
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Discover cafes, studios, restaurants, and spaces that align with your identity
            </p>
          </motion.div>

          {/* Place Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <PlaceCard
              icon={<Coffee className="w-10 h-10" />}
              title="Cafes & Coffee"
              description="Find your perfect work or relaxation spot"
              gradient="from-amber-500/20 to-orange-500/20"
              delay={0.1}
            />
            <PlaceCard
              icon={<Utensils className="w-10 h-10" />}
              title="Restaurants"
              description="Dining experiences that match your vibe"
              gradient="from-rose-500/20 to-pink-500/20"
              delay={0.2}
            />
            <PlaceCard
              icon={<Music className="w-10 h-10" />}
              title="Arts & Culture"
              description="Creative spaces for inspiration"
              gradient="from-purple-500/20 to-indigo-500/20"
              delay={0.3}
            />
            <PlaceCard
              icon={<Dumbbell className="w-10 h-10" />}
              title="Fitness & Wellness"
              description="Studios that energize your spirit"
              gradient="from-green-500/20 to-teal-500/20"
              delay={0.4}
            />
          </div>

          {/* Feature Highlights */}
          <div className="mt-20 grid md:grid-cols-2 gap-8">
            <FeatureHighlight
              icon={<MapPin className="w-7 h-7" />}
              title="Location-Based Discovery"
              description="Find aligned places near you or anywhere you're traveling. Filter by distance, vibe, and experience type."
              delay={0.2}
            />
            <FeatureHighlight
              icon={<Users className="w-7 h-7" />}
              title="See Where Friends Go"
              description="Discover what places your archetype-matched friends love. Get authentic recommendations from people like you."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* BENEFITS & SOCIAL PROOF */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-slate-900">
              Why{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent">
                ETHOS
              </span>
              ?
            </h2>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Transform how you experience the world around you
            </p>
          </motion.div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <BenefitCard
              icon={<CheckCircle2 className="w-7 h-7" />}
              title="Save Time & Energy"
              description="No more trial and error. Discover places that work for you on the first try."
              delay={0.1}
            />
            <BenefitCard
              icon={<Heart className="w-7 h-7" />}
              title="Improve Well-Being"
              description="Spend time in environments that energize and support your mental health."
              delay={0.2}
            />
            <BenefitCard
              icon={<Users className="w-7 h-7" />}
              title="Connect Authentically"
              description="Meet people who share your values and communication style naturally."
              delay={0.3}
            />
            <BenefitCard
              icon={<TrendingUp className="w-7 h-7" />}
              title="Personal Growth"
              description="Understand yourself better through insights about your preferences and patterns."
              delay={0.4}
            />
            <BenefitCard
              icon={<Sparkles className="w-7 h-7" />}
              title="Curated Experiences"
              description="Get personalized recommendations based on your unique archetype."
              delay={0.5}
            />
            <BenefitCard
              icon={<Shield className="w-7 h-7" />}
              title="Privacy First"
              description="Your data is yours. We never sell your information to third parties."
              delay={0.6}
            />
          </div>

          {/* Social Proof Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-3xl bg-gradient-to-br from-[#4F8CFF]/5 via-white to-[#C7B9FF]/5 border border-[#4F8CFF]/10"
          >
            <StatCard number="12" label="Archetypes" delay={0.1} />
            <StatCard number="500+" label="Local Venues" delay={0.2} />
            <StatCard number="95%" label="Satisfaction Rate" delay={0.3} />
            <StatCard number="5 min" label="Quiz Time" delay={0.4} />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-white via-blue-50/20 to-white overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-slate-900">
              What People Are{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent">
                Saying
              </span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Real stories from people who found their alignment
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ETHOS helped me understand why certain cafes feel like 'my place' while others drain my energy. Game changer!"
              author="Sarah M."
              archetype="The Wanderer"
              delay={0.1}
            />
            <TestimonialCard
              quote="I finally found a fitness studio where I actually look forward to going. The archetype matching really works."
              author="Alex T."
              archetype="The Warrior"
              delay={0.2}
            />
            <TestimonialCard
              quote="Meeting people who communicate like me has been incredible. No more awkward small talk!"
              author="Jamie L."
              archetype="The Sage"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-br from-[#4F8CFF]/10 via-[#C7B9FF]/10 to-[#7CF5C8]/10 overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 blur-3xl" />
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-slate-900">
              Ready to discover places that{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#C7B9FF] to-[#7CF5C8] bg-clip-text text-transparent">
                truly align with you
              </span>
              ?
            </h2>
            
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Join ETHOS today and start your journey to finding environments that support your well-being and help you thrive.
            </p>

            {/* Multiple CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
              <button
                onClick={handleGetStarted}
                className="group relative px-12 py-6 rounded-2xl bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] text-white font-bold text-xl flex items-center gap-3 shadow-2xl shadow-[#4F8CFF]/40 hover:shadow-[#4F8CFF]/60 transition-all hover:scale-105"
              >
                <span>{user ? "Go to Dashboard" : "Start Free Today"}</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link
                href="/marketplace"
                className="px-12 py-6 rounded-2xl bg-white/90 backdrop-blur-xl border-2 border-slate-200 hover:border-[#4F8CFF] hover:bg-white transition-all font-bold text-xl text-slate-700 hover:text-[#4F8CFF] shadow-lg hover:shadow-xl"
              >
                Explore Places
              </Link>
            </div>

            <p className="text-base text-slate-500 pt-4">
              No credit card required • Free forever • 5-minute setup
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 pt-12">
              <div className="flex items-center gap-2 text-slate-600">
                <Shield className="w-5 h-5 text-[#4F8CFF]" />
                <span className="text-sm font-medium">Privacy First</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Zap className="w-5 h-5 text-[#C7B9FF]" />
                <span className="text-sm font-medium">Instant Access</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Star className="w-5 h-5 text-[#7CF5C8]" />
                <span className="text-sm font-medium">Personalized Results</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-16 px-6 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">ETHOS</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Your identity-based social layer for discovering aligned people and places.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><Link href="/marketplace" className="hover:text-white transition-colors">Marketplace</Link></li>
                <li><Link href="/onboarding" className="hover:text-white transition-colors">Take Quiz</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-bold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
            © 2026 ETHOS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// Component: Pillar Card
function PillarCard({
  icon,
  title,
  subtitle,
  description,
  gradient,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative p-10 rounded-3xl bg-white border-2 border-slate-100 hover:border-transparent hover:shadow-2xl transition-all duration-300"
    >
      {/* Gradient Overlay on Hover */}
      <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
      
      <div className="relative">
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 text-white shadow-lg`}>
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-slate-900">{title}</h3>
        <p className="text-lg font-semibold text-slate-500 mb-4">{subtitle}</p>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Component: Step Card
function StepCard({
  number,
  icon,
  title,
  description,
  delay = 0,
}: {
  number: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative"
    >
      {/* Number Badge */}
      <div className="absolute -top-6 -left-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF] flex items-center justify-center text-white font-bold text-xl shadow-xl z-10">
        {number}
      </div>

      {/* Card */}
      <div className="relative p-8 pt-12 rounded-3xl bg-white border-2 border-slate-100 hover:border-[#4F8CFF]/30 hover:shadow-xl transition-all">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4F8CFF]/10 to-[#C7B9FF]/10 flex items-center justify-center mb-6 text-[#4F8CFF]">
          {icon}
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4 text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Component: Place Card
function PlaceCard({
  icon,
  title,
  description,
  gradient,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`p-8 rounded-2xl bg-gradient-to-br ${gradient} border border-white/50 backdrop-blur-sm hover:shadow-xl transition-all cursor-pointer`}
    >
      <div className="text-slate-700 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </motion.div>
  );
}

// Component: Feature Highlight
function FeatureHighlight({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="flex gap-6 p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition-all"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-[#4F8CFF]/10 to-[#C7B9FF]/10 flex items-center justify-center text-[#4F8CFF]">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2 text-slate-900">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

// Component: Benefit Card
function BenefitCard({
  icon,
  title,
  description,
  delay = 0,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group p-8 rounded-2xl bg-white border border-slate-100 hover:border-[#4F8CFF]/30 hover:shadow-xl transition-all"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4F8CFF]/10 to-[#C7B9FF]/10 flex items-center justify-center mb-5 text-[#4F8CFF] group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-slate-900">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

// Component: Stat Card
function StatCard({
  number,
  label,
  delay = 0,
}: {
  number: string;
  label: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4F8CFF] to-[#C7B9FF] bg-clip-text text-transparent mb-2">
        {number}
      </div>
      <div className="text-sm md:text-base text-slate-600 font-medium">{label}</div>
    </motion.div>
  );
}

// Component: Testimonial Card
function TestimonialCard({
  quote,
  author,
  archetype,
  delay = 0,
}: {
  quote: string;
  author: string;
  archetype: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="p-8 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-all"
    >
      {/* Quote Icon */}
      <div className="text-6xl text-[#4F8CFF]/20 font-serif mb-4">"</div>
      
      {/* Quote */}
      <p className="text-slate-700 leading-relaxed mb-6 italic">{quote}</p>
      
      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#4F8CFF] to-[#C7B9FF]" />
        <div>
          <div className="font-bold text-slate-900">{author}</div>
          <div className="text-sm text-slate-500">{archetype}</div>
        </div>
      </div>
    </motion.div>
  );
}
