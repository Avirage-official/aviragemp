"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CodeTargetingSelector } from "@/components/business/CodeTargetingSelector";
import { ArrowLeft, Save } from "lucide-react";

type Traits = {
  energy: number;
  social: number;
  structure: number;
  expression: number;
  nature: number;
  pace: number;
  introspection: number;
};

type ListingInput = {
  id: string;
  title: string;
  description: string;
  category: string;
  subcategory?: string | null;
  price?: number | null;
  currency: string;
  pricingType: string;
  location?: string | null;
  city?: string | null;
  bookingType: string;
  targetCodes: string[];
  duration?: string | null;
  groupSize?: string | null;
  tags: string[];
  traits: any;
  isActive: boolean;
};

function normalizeTraits(traits: any): Traits {
  const base: Traits = {
    energy: 50,
    social: 50,
    structure: 50,
    expression: 50,
    nature: 50,
    pace: 50,
    introspection: 50,
  };
  if (!traits || typeof traits !== "object") return base;
  return {
    energy: Number(traits.energy ?? base.energy),
    social: Number(traits.social ?? base.social),
    structure: Number(traits.structure ?? base.structure),
    expression: Number(traits.expression ?? base.expression),
    nature: Number(traits.nature ?? base.nature),
    pace: Number(traits.pace ?? base.pace),
    introspection: Number(traits.introspection ?? base.introspection),
  };
}

export default function EditListingClient({ listing }: { listing: ListingInput }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);

  const initialTags = useMemo(() => listing.tags.join(", "), [listing.tags]);

  const [form, setForm] = useState({
    title: listing.title,
    description: listing.description,
    category: listing.category,
    subcategory: listing.subcategory || "",
    price: listing.price != null ? String(listing.price) : "",
    pricingType: listing.pricingType || "FIXED",
    location: listing.location || "",
    city: listing.city || "",
    bookingType: listing.bookingType || "INQUIRY",
    targetCodes: listing.targetCodes || [],
    duration: listing.duration || "",
    groupSize: listing.groupSize || "",
    tags: initialTags,
    traits: normalizeTraits(listing.traits),
  });

  function updateTrait(key: keyof Traits, value: number) {
    setForm((prev) => ({
      ...prev,
      traits: { ...prev.traits, [key]: value },
    }));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/listings/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listingId: listing.id,
          title: form.title,
          description: form.description,
          category: form.category,
          subcategory: form.subcategory || null,
          price: form.price ? parseFloat(form.price) : null,
          pricingType: form.pricingType,
          location: form.location || null,
          city: form.city || null,
          bookingType: form.bookingType,
          targetCodes: form.targetCodes,
          duration: form.duration || null,
          groupSize: form.groupSize || null,
          tags: form.tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          traits: form.traits,
        }),
      });

      if (!res.ok) {
        alert("Failed to update listing.");
        return;
      }

      router.push(`/business/listings/${listing.id}`);
      router.refresh();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div className="min-w-0">
          <Link
            href={`/business/listings/${listing.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm mb-3"
          >
            <ArrowLeft size={16} />
            Back to listing
          </Link>

          <h1 className="text-3xl font-semibold tracking-tight truncate">
            Edit listing
          </h1>
          <p className="text-white/60 mt-1">
            Make it clearer. Keep it human.
          </p>
        </div>

        <button
          onClick={() => router.push(`/business/listings/${listing.id}`)}
          className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
        >
          Cancel
        </button>
      </div>

      <form
        onSubmit={onSave}
        className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 space-y-10"
      >
        {/* Core */}
        <Section title="Core">
          <Field label="Title">
            <Input
              required
              value={form.title}
              onChange={(v) => setForm({ ...form, title: v })}
              placeholder="A clear, honest title"
            />
          </Field>

          <Field label="Description">
            <Textarea
              required
              rows={6}
              value={form.description}
              onChange={(v) => setForm({ ...form, description: v })}
              placeholder="Describe the feel and rhythm — not just the itinerary."
            />
            <p className="text-xs text-white/40 mt-2">
              ETHOS performs best when the copy reads like a human invite, not an ad.
            </p>
          </Field>
        </Section>

        {/* Category */}
        <Section title="Category">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category">
              <Input
                required
                value={form.category}
                onChange={(v) => setForm({ ...form, category: v })}
              />
            </Field>

            <Field label="Subcategory (optional)">
              <Input
                value={form.subcategory}
                onChange={(v) => setForm({ ...form, subcategory: v })}
                placeholder="Optional"
              />
            </Field>
          </div>
        </Section>

        {/* Pricing + location */}
        <Section title="Pricing & location">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Field label="Price (optional)">
              <Input
                value={form.price}
                onChange={(v) => setForm({ ...form, price: v })}
                placeholder="99.00"
              />
            </Field>

            <Field label="Pricing type">
              <Select
                value={form.pricingType}
                onChange={(v) => setForm({ ...form, pricingType: v })}
                options={[
                  { value: "FIXED", label: "Fixed" },
                  { value: "FROM", label: "From" },
                  { value: "QUOTE", label: "Quote" },
                ]}
              />
            </Field>

            <Field label="City (optional)">
              <Input
                value={form.city}
                onChange={(v) => setForm({ ...form, city: v })}
                placeholder="City"
              />
            </Field>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Location (optional)">
              <Input
                value={form.location}
                onChange={(v) => setForm({ ...form, location: v })}
                placeholder="Area / venue hint"
              />
            </Field>

            <Field label="Booking type">
              <Select
                value={form.bookingType}
                onChange={(v) => setForm({ ...form, bookingType: v })}
                options={[
                  { value: "INQUIRY", label: "Inquiry" },
                  { value: "PENDING", label: "Pending" },
                ]}
              />
            </Field>
          </div>
        </Section>

        {/* Editorial */}
        <Section title="Editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Duration (optional)">
              <Input
                value={form.duration}
                onChange={(v) => setForm({ ...form, duration: v })}
                placeholder="2–3h"
              />
            </Field>

            <Field label="Group size (optional)">
              <Input
                value={form.groupSize}
                onChange={(v) => setForm({ ...form, groupSize: v })}
                placeholder="2–6"
              />
            </Field>
          </div>

          <Field label="Editorial tags (comma separated)">
            <Input
              value={form.tags}
              onChange={(v) => setForm({ ...form, tags: v })}
              placeholder="quiet, reflective, nature-led"
            />
          </Field>
        </Section>

        {/* Target codes */}
        <Section title="Target codes">
          <CodeTargetingSelector
            selectedCodes={form.targetCodes}
            onChange={(codes) => setForm({ ...form, targetCodes: codes })}
          />
          <p className="text-xs text-white/40 mt-2">
            Aim for precision. Fewer codes with real fit beats broad targeting.
          </p>
        </Section>

        {/* Traits */}
        <Section title="Experience personality (traits)">
          <p className="text-sm text-white/60 mb-5">
            These describe feel and rhythm — they don’t rank or “game” the system.
          </p>

          {(Object.keys(form.traits) as (keyof Traits)[]).map((key) => (
            <div key={key} className="mb-5">
              <label className="block text-xs text-white/50 mb-2 capitalize">
                {key}
              </label>
              <input
                type="range"
                min={0}
                max={100}
                value={form.traits[key]}
                onChange={(e) => updateTrait(key, Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="text-xs text-white/50 mt-2">
                {form.traits[key]}
              </div>
            </div>
          ))}
        </Section>

        {/* Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
          <Link
            href={`/business/listings/${listing.id}`}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={saving || form.targetCodes.length === 0}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 transition text-sm flex-1"
          >
            <Save size={16} />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-sm font-semibold text-white/80">{title}</h2>
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
      <label className="block text-xs text-white/50 mb-1">{label}</label>
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
  onChange: (v: string) => void;
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
  onChange: (v: string) => void;
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
}: {
  value: string;
  onChange: (v: string) => void;
  options: Array<{ value: string; label: string }>;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl bg-black border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-white/30"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
