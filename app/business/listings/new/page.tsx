"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CodeTargetingSelector } from "@/components/business/CodeTargetingSelector";
import { ArrowLeft, Save } from "lucide-react";

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

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function NewListingPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

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
        router.push("/business/listings");
        router.refresh();
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm mb-3"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <h1 className="text-3xl font-semibold tracking-tight">
            Create listing
          </h1>
          <p className="text-white/60 mt-1">
            You’re not posting — you’re defining an experience.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 space-y-10"
      >
        {/* CORE */}
        <Section title="Core">
          <Field label="Title">
            <Input
              required
              placeholder="Clear, human, inviting"
              value={formData.title}
              onChange={(v: string) =>
                setFormData({ ...formData, title: v })
              }
            />
          </Field>

          <Field label="Description">
            <Textarea
              required
              rows={6}
              placeholder="Describe the feeling, not the logistics"
              value={formData.description}
              onChange={(v: string) =>
                setFormData({ ...formData, description: v })
              }
            />
          </Field>
        </Section>

        {/* CATEGORY */}
        <Section title="Category">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category">
              <Select
                required
                value={formData.category}
                onChange={(v: string) =>
                  setFormData({ ...formData, category: v })
                }
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

            <Field label="Subcategory (optional)">
              <Input
                placeholder="Optional"
                value={formData.subcategory}
                onChange={(v: string) =>
                  setFormData({ ...formData, subcategory: v })
                }
              />
            </Field>
          </div>
        </Section>

        {/* EXPERIENCE PERSONALITY */}
        <Section title="Experience personality">
          <p className="text-sm text-white/60 mb-6">
            These describe feel and rhythm. They don’t rank or game the system.
          </p>

          {(Object.keys(formData.traits) as (keyof Traits)[]).map((key) => (
            <div key={key} className="mb-5">
              <label className="block text-xs text-white/50 mb-2 capitalize">
                {key}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={formData.traits[key]}
                onChange={(e) =>
                  updateTrait(key, Number(e.target.value))
                }
                className="w-full accent-white"
              />
              <div className="text-xs text-white/50 mt-2">
                {formData.traits[key]}
              </div>
            </div>
          ))}
        </Section>

        {/* TAGS */}
        <Section title="Editorial tags">
          <Field label="Tags (comma separated)">
            <Input
              placeholder="quiet, reflective, nature-led"
              value={formData.tags}
              onChange={(v: string) =>
                setFormData({ ...formData, tags: v })
              }
            />
          </Field>
          <p className="text-xs text-white/40">
            These add texture — they are not categories.
          </p>
        </Section>

        {/* DETAILS */}
        <Section title="Details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Duration (optional)">
              <Input
                placeholder="2–3h"
                value={formData.duration}
                onChange={(v: string) =>
                  setFormData({ ...formData, duration: v })
                }
              />
            </Field>

            <Field label="Group size (optional)">
              <Input
                placeholder="2–6"
                value={formData.groupSize}
                onChange={(v: string) =>
                  setFormData({ ...formData, groupSize: v })
                }
              />
            </Field>
          </div>
        </Section>

        {/* TARGETING */}
        <Section title="Target mythical codes">
          <CodeTargetingSelector
            selectedCodes={formData.targetCodes}
            onChange={(codes: string[]) =>
              setFormData({ ...formData, targetCodes: codes })
            }
          />
          <p className="text-xs text-white/40 mt-2">
            Precision beats reach. Fewer codes with real fit perform better.
          </p>
        </Section>

        {/* FOOTER */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={isLoading || formData.targetCodes.length === 0}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 transition text-sm flex-1"
          >
            <Save size={16} />
            {isLoading ? "Creating…" : "Create listing"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* UI HELPERS                                                                 */
/* -------------------------------------------------------------------------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-white/80">
        {title}
      </h2>
      <div className="rounded-2xl border border-white/10 bg-black p-5">
        {children}
      </div>
    </section>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-white/50 mb-1">
        {label}
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
      className="w-full rounded-xl bg-black border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-white/30"
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
      className="w-full rounded-xl bg-black border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-white/30"
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
      className="w-full rounded-xl bg-black border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-white/30"
    >
      {options.map(([value, label]) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
