import { EmblemBadge } from "@/components/emblems/EmblemBadge";
import { EmblemCarousel } from "@/components/emblems/EmblemCarousel";
import { UserEmblems } from "@/components/dashboard/UserEmblems";
import { MYTHICAL_CODES } from "@/lib/mythicalCodesData";

export default function EmblemsTestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827] text-white p-8">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Mythical Code Emblems</h1>
          <p className="text-white/60">Testing emblem components</p>
        </div>

        {/* User Emblems (Dashboard Style) */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Dashboard View</h2>
          <UserEmblems
            primaryCode="alethir"
            secondaryCode="lhumir"
            tertiaryCode="khoisan"
          />
        </section>

        {/* Emblem Carousel (Onboarding Style) */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Onboarding Carousel</h2>
          <div className="bg-white/5 rounded-3xl border border-white/10 p-8">
            <EmblemCarousel codes={MYTHICAL_CODES} />
          </div>
        </section>

        {/* Individual Badges */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Badge Sizes</h2>
          <div className="flex flex-wrap gap-12 justify-center items-end">
            <EmblemBadge
              code="alethir"
              label="Seeker"
              size="sm"
              variant="primary"
            />
            <EmblemBadge
              code="lhumir"
              label="StillMind"
              size="md"
              variant="secondary"
            />
            <EmblemBadge
              code="khoisan"
              label="Earthlistener"
              size="lg"
              variant="tertiary"
            />
            <EmblemBadge
              code="kayori"
              label="Fireweaver"
              size="xl"
              variant="primary"
            />
          </div>
        </section>

        {/* All 20 Codes Grid */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">All 20 Mythical Codes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {MYTHICAL_CODES.map((code) => (
              <EmblemBadge
                key={code.key}
                code={code.key}
                label={code.label}
                size="md"
                variant="primary"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}