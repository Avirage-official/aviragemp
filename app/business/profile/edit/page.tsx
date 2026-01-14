// app/business/profile/edit/page.tsx
"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { MYTHICAL_CODES, MythicalCodeKey } from "@/lib/mythicalCodes";
import { ArrowLeft, Save } from "lucide-react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                      */
/* -------------------------------------------------------------------------- */

type FormState = {
  primaryCode: MythicalCodeKey | "";
  secondaryCode: MythicalCodeKey | "";
  tertiaryCode: MythicalCodeKey | "";
};

/* -------------------------------------------------------------------------- */
/* PAGE                                                                       */
/* -------------------------------------------------------------------------- */

export default function EditBusinessIdentityPage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();

  const [isSaving, setIsSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [form, setForm] = React.useState<FormState>({
    primaryCode: "",
    secondaryCode: "",
    tertiaryCode: "",
  });

  /* ------------------------------------------------------------------------ */
  /* LOAD EXISTING BUSINESS IDENTITY                                           */
  /* ------------------------------------------------------------------------ */

  React.useEffect(() => {
    if (!isLoaded || !user) return;

    (async () => {
      try {
        const res = await fetch("/api/businesses/me");
        if (!res.ok) throw new Error();

        const data = await res.json();

        setForm({
          primaryCode: data.primaryCode ?? "",
          secondaryCode: data.secondaryCode ?? "",
          tertiaryCode: data.tertiaryCode ?? "",
        });
      } catch {
        setError("Failed to load business identity.");
      }
    })();
  }, [isLoaded, user]);

  /* ------------------------------------------------------------------------ */
  /* DEDUPE LOGIC                                                             */
  /* ------------------------------------------------------------------------ */

  const usedCodes = React.useMemo(
    () =>
      new Set(
        [form.primaryCode, form.secondaryCode, form.tertiaryCode].filter(Boolean)
      ),
    [form.primaryCode, form.secondaryCode, form.tertiaryCode]
  );

  /* ------------------------------------------------------------------------ */
  /* SAVE                                                                     */
  /* ------------------------------------------------------------------------ */

  async function save() {
    if (!form.primaryCode) {
      setError("Primary identity is required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/businesses/update-identity", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          primaryCode: form.primaryCode,
          secondaryCode: form.secondaryCode || null,
          tertiaryCode: form.tertiaryCode || null,
        }),
      });

      if (!res.ok) throw new Error();

      router.push("/business/profile");
    } catch {
      setError("Failed to update business identity.");
    } finally {
      setIsSaving(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <div className="max-w-3xl space-y-10">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold">Edit Business Identity</h1>
        <p className="text-white/60 max-w-xl">
          Adjust how your business is perceived inside the ETHOS ecosystem.
          Changes update immediately — nothing is recreated.
        </p>
      </header>

      {/* Form */}
      <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 space-y-6">
        {(["primaryCode", "secondaryCode", "tertiaryCode"] as const).map(
          (key, idx) => (
            <div key={key} className="space-y-2">
              <label className="text-sm text-white/70">
                {idx === 0
                  ? "Primary identity (required)"
                  : idx === 1
                  ? "Secondary influence (optional)"
                  : "Tertiary influence (optional)"}
              </label>

              <select
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value as any })
                }
                className="w-full h-12 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none focus:border-white/30"
              >
                <option value="">
                  {idx === 0 ? "Select primary identity" : "None"}
                </option>

                {(Object.keys(MYTHICAL_CODES) as MythicalCodeKey[])
                  .filter(
                    (k) => !usedCodes.has(k) || k === form[key]
                  )
                  .map((k) => (
                    <option key={k} value={k}>
                      {MYTHICAL_CODES[k].label}
                    </option>
                  ))}
              </select>
            </div>
          )
        )}

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}
      </section>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:bg-white/5 transition"
        >
          <ArrowLeft size={16} />
          Cancel
        </button>

        <button
          onClick={save}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-50"
        >
          <Save size={16} />
          Save changes
        </button>
      </div>
    </div>
  );
}
