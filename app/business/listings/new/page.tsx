"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

    // Editorial
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
        router.push("/business/dashboard?listing=created");
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Create New Listing</h1>
        <p className="text-gray-600 mb-8">
          Describe how the experience feels — not just what it is.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8 space-y-10"
        >
          {/* BASIC INFO */}
          <section>
            <h2 className="text-xl font-bold mb-4">Basic Information</h2>

            <input
              required
              placeholder="Title"
              className="w-full p-3 border rounded-lg mb-4"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />

            <textarea
              required
              rows={5}
              placeholder="Description"
              className="w-full p-3 border rounded-lg"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </section>

          {/* CATEGORY */}
          <section>
            <h2 className="text-xl font-bold mb-4">Category</h2>

            <select
              required
              className="w-full p-3 border rounded-lg"
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
            >
              <option value="">Select category</option>
              <option value="experience">Experience</option>
              <option value="workshop">Workshop</option>
              <option value="retreat">Retreat</option>
              <option value="event">Event</option>
              <option value="service">Service</option>
            </select>
          </section>

          {/* EDITORIAL */}
          <section>
            <h2 className="text-xl font-bold mb-4">Experience Personality</h2>
            <p className="text-gray-600 mb-6">
              These do not rank or recommend — they describe feel and rhythm.
            </p>

            {(
              Object.keys(formData.traits) as (keyof Traits)[]
            ).map((key) => (
              <div key={key} className="mb-4">
                <label className="block font-semibold capitalize mb-1">
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
                  className="w-full"
                />
                <div className="text-sm text-gray-500">
                  {formData.traits[key]}
                </div>
              </div>
            ))}
          </section>

          {/* TAGS */}
          <section>
            <h2 className="text-xl font-bold mb-4">Editorial Tags</h2>
            <input
              placeholder="quiet, reflective, nature-led"
              className="w-full p-3 border rounded-lg"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
            />
            <p className="text-sm text-gray-500 mt-1">
              Comma separated. Not categories.
            </p>
          </section>

          {/* DURATION */}
          <section className="grid grid-cols-2 gap-4">
            <input
              placeholder="Duration (e.g. 2–3h)"
              className="p-3 border rounded-lg"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
            />
            <input
              placeholder="Group size (e.g. 2–6)"
              className="p-3 border rounded-lg"
              value={formData.groupSize}
              onChange={(e) =>
                setFormData({ ...formData, groupSize: e.target.value })
              }
            />
          </section>

          {/* TARGET CODES */}
          <section>
            <h2 className="text-xl font-bold mb-4">
              Target Mythical Codes
            </h2>

            <CodeTargetingSelector
              selectedCodes={formData.targetCodes}
              onChange={(codes) =>
                setFormData({ ...formData, targetCodes: codes })
              }
            />
          </section>

          {/* SUBMIT */}
          <div className="flex gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 bg-gray-300 rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading || formData.targetCodes.length === 0}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
            >
              {isLoading ? "Creating…" : "Create Listing"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
