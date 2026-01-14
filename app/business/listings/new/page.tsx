"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { 
  ArrowLeft, 
  Save, 
  Sparkles,
  Tag,
  MapPin,
  Clock,
  Users,
  Zap,
  Target,
  CheckCircle2,
  Info
} from "lucide-react";
import { CodeTargetingSelector } from "@/components/business/CodeTargetingSelector";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type Traits = {
  energy: number;
  social: number;
  structure: number;
  expression: number;
  nature: number;
  pace: number;
  introspection: number;
};

type TraitConfig = {
  label: string;
  description: string;
  lowLabel: string;
  highLabel: string;
  icon: React.ReactNode;
};

/* -------------------------------------------------------------------------- */
/* TRAIT CONFIGURATION                                                        */
/* -------------------------------------------------------------------------- */

const TRAIT_CONFIG: Record<keyof Traits, TraitConfig> = {
  energy: {
    label: "Energy",
    description: "Physical intensity and activity level",
    lowLabel: "Calm, meditative",
    highLabel: "Active, dynamic",
    icon: <Zap className="h-4 w-4" />
  },
  social: {
    label: "Social",
    description: "Group interaction vs solo reflection",
    lowLabel: "Solo, intimate",
    highLabel: "Group, communal",
    icon: <Users className="h-4 w-4" />
  },
  structure: {
    label: "Structure",
    description: "Planning and predictability",
    lowLabel: "Spontaneous, fluid",
    highLabel: "Planned, guided",
    icon: <Target className="h-4 w-4" />
  },
  expression: {
    label: "Expression",
    description: "Outward creativity and sharing",
    lowLabel: "Observational",
    highLabel: "Expressive, creative",
    icon: <Sparkles className="h-4 w-4" />
  },
  nature: {
    label: "Nature",
    description: "Connection to natural environment",
    lowLabel: "Indoor, urban",
    highLabel: "Outdoor, nature",
    icon: <MapPin className="h-4 w-4" />
  },
  pace: {
    label: "Pace",
    description: "Speed and rhythm of experience",
    lowLabel: "Slow, lingering",
    highLabel: "Fast, stimulating",
    icon: <Clock className="h-4 w-4" />
  },
  introspection: {
    label: "Introspection",
    description: "Internal vs external focus",
    lowLabel: "Outward, exploratory",
    highLabel: "Inward, reflective",
    icon: <Info className="h-4 w-4" />
  }
};

/* -------------------------------------------------------------------------- */
/* ANIMATION VARIANTS                                                         */
/* -------------------------------------------------------------------------- */

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function NewListingPage() {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    pricingType: "FIXED",
    location: "",
    city: "",
    bookingType: "INQUIRY",
    targetCodes: [] as string[],
    duration: "",
    groupSize: "",
    tags: "",
    traits: {
      energy: 50,
      social: 50,
      structure: 50,
      expression: 50,
      nature: 50,
      pace: 50,
      introspection: 50,
    } as Traits,
  });

  function updateTrait(key: keyof Traits, value: number) {
    setFormData((prev) => ({
      ...prev,
      traits: { ...prev.traits, [key]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/listings/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: formData.price ? parseFloat(formData.price) : null,
          tags: formData.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          router.push("/business/listings");
          router.refresh();
        }, 1500);
      } else {
        alert("Failed to create listing.");
      }
    } catch {
      alert("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#111827] via-[#0f172a] to-[#111827]">
      {/* ------------------------------------------------------------------ */}
      {/* AMBIENT BACKGROUND                                                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.1 : [0.08, 0.12, 0.08],
            scale: prefersReducedMotion ? 1 : [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[30%] left-[10%] h-[800px] w-[800px] rounded-full bg-[#4F8CFF] blur-[180px] opacity-10"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.08 : [0.06, 0.1, 0.06],
            scale: prefersReducedMotion ? 1 : [1, 1.12, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[5%] h-[700px] w-[700px] rounded-full bg-[#C7B9FF] blur-[160px] opacity-08"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: prefersReducedMotion ? 0.06 : [0.05, 0.09, 0.05],
            scale: prefersReducedMotion ? 1 : [1, 1.08, 1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[-20%] left-[40%] h-[750px] w-[750px] rounded-full bg-[#7CF5C8] blur-[170px] opacity-06"
        />

        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* CONTENT                                                            */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="space-y-8"
        >
          {/* HEADER */}
          <motion.header variants={fadeInUp} className="space-y-4">
            <button
              onClick={() => router.back()}
              className="group inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white"
            >
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
              Back to listings
            </button>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-[#4F8CFF]/20 to-[#C7B9FF]/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-[#4F8CFF]" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white/95">
                    Create listing
                  </h1>
                  <p className="text-sm text-white/50 mt-1">
                    Define an experience, not just a service
                  </p>
                </div>
              </div>
            </div>
          </motion.header>

          {/* FORM */}
          <motion.form 
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* CORE DETAILS */}
            <Section 
              title="Core details" 
              icon={<Sparkles className="h-5 w-5" />}
              description="The foundation of your listing"
            >
              <div className="space-y-5">
                <Field label="Title" required>
                  <Input
                    required
                    placeholder="Clear, inviting, human"
                    value={formData.title}
                    onChange={(v) => setFormData({ ...formData, title: v })}
                  />
                </Field>

                <Field label="Description" required>
                  <Textarea
                    required
                    rows={6}
                    placeholder="Describe the feeling and transformation, not just the logistics..."
                    value={formData.description}
                    onChange={(v) => setFormData({ ...formData, description: v })}
                  />
                  <FieldHint>
                    Help people imagine themselves in the experience
                  </FieldHint>
                </Field>
              </div>
            </Section>

            {/* CATEGORY */}
            <Section 
              title="Category & type" 
              icon={<Tag className="h-5 w-5" />}
              description="Help people find you"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Category" required>
                  <Select
                    required
                    value={formData.category}
                    onChange={(v) => setFormData({ ...formData, category: v })}
                    options={[
                      ["", "Select category"],
                      ["experience", "Experience"],
                      ["workshop", "Workshop"],
                      ["retreat", "Retreat"],
                      ["event", "Event"],
                      ["service", "Service"],
                    ]}
                  />
                </Field>

                <Field label="Subcategory" hint="Optional">
                  <Input
                    placeholder="e.g., Sound healing, Meditation"
                    value={formData.subcategory}
                    onChange={(v) => setFormData({ ...formData, subcategory: v })}
                  />
                </Field>
              </div>
            </Section>

            {/* EXPERIENCE PERSONALITY */}
            <Section 
              title="Experience personality" 
              icon={<Zap className="h-5 w-5" />}
              description="Define the feel and rhythm"
            >
              <div className="space-y-6">
                <InfoBox>
                  These traits help users understand the vibe and pace. They're not rankings—they're dimensions of experience.
                </InfoBox>

                <div className="space-y-6">
                  {(Object.keys(formData.traits) as (keyof Traits)[]).map((key) => (
                    <TraitSlider
                      key={key}
                      traitKey={key}
                      value={formData.traits[key]}
                      onChange={(value) => updateTrait(key, value)}
                      config={TRAIT_CONFIG[key]}
                    />
                  ))}
                </div>
              </div>
            </Section>

            {/* EDITORIAL TAGS */}
            <Section 
              title="Editorial tags" 
              icon={<Tag className="h-5 w-5" />}
              description="Add texture and nuance"
            >
              <Field label="Tags (comma separated)">
                <Input
                  placeholder="quiet, reflective, nature-led, transformative"
                  value={formData.tags}
                  onChange={(v) => setFormData({ ...formData, tags: v })}
                />
                <FieldHint>
                  Use descriptive words that capture the essence—not categories
                </FieldHint>
              </Field>
            </Section>

            {/* PRACTICAL DETAILS */}
            <Section 
              title="Practical details" 
              icon={<Clock className="h-5 w-5" />}
              description="Logistics and expectations"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Duration" hint="Optional">
                  <Input
                    placeholder="2–3 hours"
                    value={formData.duration}
                    onChange={(v) => setFormData({ ...formData, duration: v })}
                  />
                </Field>

                <Field label="Group size" hint="Optional">
                  <Input
                    placeholder="2–6 people"
                    value={formData.groupSize}
                    onChange={(v) => setFormData({ ...formData, groupSize: v })}
                  />
                </Field>
              </div>
            </Section>

            {/* TARGET CODES */}
            <Section 
              title="Target mythical codes" 
              icon={<Target className="h-5 w-5" />}
              description="Precision over reach"
            >
              <div className="space-y-4">
                <CodeTargetingSelector
                  selectedCodes={formData.targetCodes}
                  onChange={(codes) => setFormData({ ...formData, targetCodes: codes })}
                />
                <InfoBox variant="success">
                  Fewer codes with real resonance perform better than broad targeting. Quality over quantity.
                </InfoBox>
              </div>
            </Section>

            {/* FOOTER */}
            <div className="sticky bottom-0 z-10">
              <GlassPanel>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/70 font-medium text-sm backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isLoading || formData.targetCodes.length === 0}
                    className="group relative flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-br from-[#4F8CFF] to-[#3b6bd8] text-white font-semibold text-sm shadow-lg shadow-[#4F8CFF]/25 transition-all duration-300 hover:shadow-xl hover:shadow-[#4F8CFF]/35 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                        Creating...
                      </>
                    ) : showSuccess ? (
                      <>
                        <CheckCircle2 size={18} />
                        Created!
                      </>
                    ) : (
                      <>
                        <Save size={18} className="transition-transform group-hover:scale-110" />
                        Create listing
                      </>
                    )}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>

                {formData.targetCodes.length === 0 && (
                  <p className="text-xs text-white/40 mt-3 text-center">
                    Select at least one mythical code to continue
                  </p>
                )}
              </GlassPanel>
            </div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI COMPONENTS                                                              */
/* -------------------------------------------------------------------------- */

function GlassPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
      <div className="absolute -inset-[1px] rounded-[24px] bg-gradient-to-r from-[#4F8CFF]/0 via-[#C7B9FF]/0 to-[#7CF5C8]/0 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />
      
      <div className="relative rounded-[24px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] p-4 sm:p-6">
        <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative">{children}</div>
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  description,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative group">
      <div className="absolute -inset-[1px] rounded-[28px] bg-gradient-to-br from-[#4F8CFF]/5 via-[#C7B9FF]/5 to-[#7CF5C8]/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-700" />
      
      <div className="relative rounded-[28px] bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-white/[0.08] bg-gradient-to-r from-white/[0.02] to-transparent">
          <div className="flex items-center gap-3">
            <div className="text-[#4F8CFF]">
              {icon}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white/90">
                {title}
              </h2>
              <p className="text-xs text-white/50 mt-0.5">
                {description}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {children}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-white/70">
        {label}
        {required && <span className="text-[#4F8CFF]">*</span>}
        {hint && <span className="text-xs text-white/40 font-normal">({hint})</span>}
      </label>
      {children}
    </div>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <input
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-[#0B0D12] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F8CFF]/50 focus:bg-[#0B0D12] transition-all duration-300"
    />
  );
}

function Textarea({
  value,
  onChange,
  rows,
  placeholder,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  rows: number;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <textarea
      required={required}
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-[#0B0D12] border border-white/15 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#4F8CFF]/50 focus:bg-[#0B0D12] transition-all duration-300 resize-none"
    />
  );
}

function Select({
  value,
  onChange,
  options,
  required,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<[string, string]>;
  required?: boolean;
}) {
  return (
    <select
      required={required}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl bg-[#0B0D12] border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-[#4F8CFF]/50 transition-all duration-300"
    >
      {options.map(([val, label]) => (
        <option key={val} value={val}>
          {label}
        </option>
      ))}
    </select>
  );
}

function TraitSlider({
  traitKey,
  value,
  onChange,
  config,
}: {
  traitKey: string;
  value: number;
  onChange: (value: number) => void;
  config: TraitConfig;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-[#4F8CFF]">
            {config.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-white/80">
              {config.label}
            </p>
            <p className="text-xs text-white/40">
              {config.description}
            </p>
          </div>
        </div>
        <div className="text-sm font-semibold text-[#4F8CFF] tabular-nums">
          {value}
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer slider"
            style={{
              background: `linear-gradient(to right, #4F8CFF 0%, #4F8CFF ${value}%, rgba(255,255,255,0.05) ${value}%, rgba(255,255,255,0.05) 100%)`
            }}
          />
        </div>

        <div className="flex justify-between text-xs text-white/40">
          <span>{config.lowLabel}</span>
          <span>{config.highLabel}</span>
        </div>
      </div>
    </div>
  );
}

function InfoBox({ 
  children, 
  variant = "default" 
}: { 
  children: React.ReactNode;
  variant?: "default" | "success";
}) {
  const styles = {
    default: "bg-[#4F8CFF]/5 border-[#4F8CFF]/20 text-white/60",
    success: "bg-[#7CF5C8]/5 border-[#7CF5C8]/20 text-white/60"
  }[variant];

  return (
    <div className={`rounded-xl border px-4 py-3 text-xs leading-relaxed ${styles}`}>
      {children}
    </div>
  );
}

function FieldHint({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-white/40 mt-1.5">
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* CUSTOM SLIDER STYLES                                                       */
/* -------------------------------------------------------------------------- */

const sliderStyles = `
.slider::-webkit-slider-thumb {
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4F8CFF;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(79, 140, 255, 0.4);
  transition: all 0.2s ease;
}

.slider::-webkit-slider-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(79, 140, 255, 0.6);
}

.slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #4F8CFF;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 8px rgba(79, 140, 255, 0.4);
  transition: all 0.2s ease;
}

.slider::-moz-range-thumb:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(79, 140, 255, 0.6);
}
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = sliderStyles;
  document.head.appendChild(styleSheet);
}