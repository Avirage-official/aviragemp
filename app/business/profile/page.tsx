"use client";

import { useEffect, useState } from "react";
import { Save, Eye, Edit3 } from "lucide-react";

type BusinessProfile = {
  businessName: string;
  description?: string | null;
  category: string;
  website?: string | null;
  contactEmail: string;
  contactPhone?: string | null;
  city?: string | null;
  country?: string | null;
  primaryCode?: string | null;
  secondaryCode?: string | null;
  tertiaryCode?: string | null;
};

export default function BusinessProfilePage() {
  const [profile, setProfile] = useState<BusinessProfile | null>(null);
  const [draft, setDraft] = useState<BusinessProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/business/profile");
    const json = await res.json();
    setProfile(json.profile);
    setDraft(json.profile);
    setLoading(false);
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    await fetch("/api/business/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    setSaving(false);
    setProfile(draft);
  }

  if (loading || !draft) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white/60">
        Loading profile…
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Business Identity
          </h1>
          <p className="text-white/60 mt-1">
            This is how your business is understood on ETHOS.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setPreview(!preview)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/15 hover:bg-white/5 transition text-sm"
          >
            <Eye size={16} />
            {preview ? "Edit" : "Preview"}
          </button>

          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-60 transition text-sm"
          >
            <Save size={16} />
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
        {/* Editor */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6 space-y-6">
          <Section title="Core Identity">
            <Field label="Business name">
              <Input
                value={draft.businessName}
                onChange={(v) =>
                  setDraft({ ...draft, businessName: v })
                }
              />
            </Field>

            <Field label="Category">
              <Input
                value={draft.category}
                onChange={(v) => setDraft({ ...draft, category: v })}
              />
            </Field>
          </Section>

          <Section title="Ethos & Description">
            <Field label="Description">
              <Textarea
                rows={5}
                placeholder="What does your business stand for?"
                value={draft.description || ""}
                onChange={(v) =>
                  setDraft({ ...draft, description: v })
                }
              />
              <p className="text-xs text-white/40 mt-2">
                Calm, human language performs best. Avoid selling.
              </p>
            </Field>
          </Section>

          <Section title="Contact & Presence">
            <Field label="Website">
              <Input
                value={draft.website || ""}
                onChange={(v) => setDraft({ ...draft, website: v })}
                placeholder="https://"
              />
            </Field>

            <Field label="Contact email">
              <Input
                value={draft.contactEmail}
                onChange={(v) =>
                  setDraft({ ...draft, contactEmail: v })
                }
              />
            </Field>

            <Field label="Phone (optional)">
              <Input
                value={draft.contactPhone || ""}
                onChange={(v) =>
                  setDraft({ ...draft, contactPhone: v })
                }
              />
            </Field>
          </Section>

          <Section title="Location">
            <div className="grid grid-cols-2 gap-4">
              <Field label="City">
                <Input
                  value={draft.city || ""}
                  onChange={(v) => setDraft({ ...draft, city: v })}
                />
              </Field>
              <Field label="Country">
                <Input
                  value={draft.country || ""}
                  onChange={(v) =>
                    setDraft({ ...draft, country: v })
                  }
                />
              </Field>
            </div>
          </Section>

          <Section title="Identity Codes (Read-only)">
            <div className="flex flex-wrap gap-3">
              <CodePill label="Primary" value={draft.primaryCode} />
              <CodePill label="Secondary" value={draft.secondaryCode} />
              <CodePill label="Tertiary" value={draft.tertiaryCode} />
            </div>
            <p className="text-xs text-white/40 mt-2">
              Codes are derived from onboarding and cannot be edited here.
            </p>
          </Section>
        </div>

        {/* Preview */}
        <div className="border border-white/10 rounded-2xl bg-white/[0.02] p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Edit3 size={16} />
            Public Preview
          </h2>

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              {draft.businessName}
            </h3>
            <p className="text-sm text-white/60">{draft.category}</p>

            {draft.description && (
              <p className="text-sm text-white/80 whitespace-pre-line">
                {draft.description}
              </p>
            )}

            <div className="flex flex-wrap gap-2 pt-3">
              {draft.primaryCode && <PreviewPill value={draft.primaryCode} />}
              {draft.secondaryCode && (
                <PreviewPill value={draft.secondaryCode} />
              )}
              {draft.tertiaryCode && (
                <PreviewPill value={draft.tertiaryCode} />
              )}
            </div>

            <div className="pt-4 text-sm text-white/60 space-y-1">
              {draft.city && (
                <p>
                  📍 {draft.city}
                  {draft.country ? `, ${draft.country}` : ""}
                </p>
              )}
              {draft.website && <p>🔗 {draft.website}</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- UI primitives ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-white/80">
        {title}
      </h3>
      {children}
    </div>
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
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <input
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
}: {
  value: string;
  onChange: (v: string) => void;
  rows: number;
  placeholder?: string;
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl bg-black border border-white/15 px-4 py-3 text-white focus:outline-none focus:border-white/30"
    />
  );
}

function CodePill({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <span className="text-xs px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] text-white/70">
      {label}: {value || "—"}
    </span>
  );
}

function PreviewPill({ value }: { value: string }) {
  return (
    <span className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/[0.05] text-white/80">
      {value}
    </span>
  );
}
