"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CodeTargetingSelector } from "@/components/business/CodeTargetingSelector";
import { ImageUpload } from "@/components/business/ImageUpload";
import { ArrowLeft, Save, Image as ImageIcon } from "lucide-react";

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
  images: string[];
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
    images: listing.images || [],
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
          images: form.images,
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

        {/* Images */}
        <Section title="Images" icon={<ImageIcon className="h-5 w-5" />}>
          <ImageUpload
            images={form.images}
            onChange={(urls) => setForm({ ...form, images: urls })}
            maxImages={6}
          />
          <p className="text-xs text-white/40 mt-2">
            Upload up to 6 high-quality images that capture the essence of your experience
          </p>
        </Section>

        {/* Category */}
        <Section title="Category">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Category">
              <Select
                required
                value={form.category}
                onChange={(v) => setForm({ ...form, category: v })}
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

            <Field label="Subcategory">
              <Input
                value={form.subcategory}
                onChange={(v) => setForm({ ...form, subcategory: v })}
                placeholder="Optional"
              />
            </Field>
          </div>
        </Section>

        {/* Practical */}
        <Section title="Practical details">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Duration">
              <Input
                value={form.duration}
                onChange={(v) => setForm({ ...form, duration: v })}
                placeholder="e.g., 2–3 hours"
              />
            </Field>

            <Field label="Group size">
              <Input
                value={form.groupSize}
                onChange={(v) => setForm({ ...form, groupSize: v })}
                placeholder="e.g., 2–6 people"
              />
            </Field>
          </div>
        </Section>

        {/* Tags */}
        <Section title="Editorial tags">
          <Field label="Tags (comma separated)">
            <Input
              value={form.tags}
              onChange={(v) => setForm({ ...form, tags: v })}
              placeholder="quiet, reflective, nature-led, transformative"
            />
          </Field>
        </Section>

        {/* Target codes */}
        <Section title="Target mythical codes">
          <CodeTargetingSelector
            selectedCodes={form.targetCodes}
            onChange={(codes) => setForm({ ...form, targetCodes: codes })}
          />
        </Section>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => router.push(`/business/listings/${listing.id}`)}
            className="px-5 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition text-sm disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save size={16} />
                Save changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

/* UI Components */

function Section({ title, icon, children }: { title: string; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="text-lg font-medium">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/70">{label}</label>
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
      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition"
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
      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30 transition resize-none"
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
      className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 transition"
    >
      {options.map(([val, label]) => (
        <option key={val} value={val}>
          {label}
        </option>
      ))}
    </select>
  );
}