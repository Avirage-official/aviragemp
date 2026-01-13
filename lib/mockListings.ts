// lib/mockListings.ts
// UI-FIRST: Curated placeholder listings for Marketplace (Australia-only)
// Swap this later with real API data without changing UI structure.

export type MockListing = {
  id: string;
  title: string;
  description: string;
  category:
    | "experience"
    | "retreat"
    | "coaching"
    | "workshop"
    | "event"
    | "service"
    | "product";
  price: number | null;
  pricingType: "FIXED" | "RANGE" | "CUSTOM";
  location: string | null; // State/region label
  city: string | null; // City label
  targetCodes: string[];
  bookingType: "INQUIRY" | "INSTANT";
  business: {
    businessName: string;
    description: string;
    website?: string | null;
  };
};

export const MOCK_LISTINGS: MockListing[] = [
  {
    id: "mock-1",
    title: "Coastal Reset Retreat",
    description:
      "A slow, grounding reset for people who recharge through nature, space, and quiet rhythm. Designed to feel like exhale, not itinerary.",
    category: "retreat",
    price: null,
    pricingType: "CUSTOM",
    location: "New South Wales",
    city: "Byron Bay",
    targetCodes: ["earthlistener", "stillmind", "tidekeeper"],
    bookingType: "INQUIRY",
    business: {
      businessName: "Still Co.",
      description:
        "Retreats built for calm nervous systems and intentional living. Small groups. Real silence. No performance.",
      website: null,
    },
  },
  {
    id: "mock-2",
    title: "Creative Immersion Workshop",
    description:
      "A hands-on studio session focused on flow, experimentation, and expression — structured enough to guide you, open enough to surprise you.",
    category: "workshop",
    price: 180,
    pricingType: "FIXED",
    location: "Victoria",
    city: "Melbourne",
    targetCodes: ["sparkmaker", "skyweaver", "neonmuse"],
    bookingType: "INQUIRY",
    business: {
      businessName: "Open Studio",
      description:
        "Workshops for creators who want clarity without losing the magic. Craft, play, and real output.",
      website: null,
    },
  },
  {
    id: "mock-3",
    title: "One-on-One Life Navigation",
    description:
      "Private coaching for people who think deeply and move intentionally. Quiet strategy. Clear decisions. No hype.",
    category: "coaching",
    price: null,
    pricingType: "CUSTOM",
    location: "Queensland",
    city: "Brisbane",
    targetCodes: ["stillmind", "northstar", "ironreader"],
    bookingType: "INQUIRY",
    business: {
      businessName: "Clear Path",
      description:
        "Coaching for high-agency people building a life that fits. Practical, human, and aligned.",
      website: null,
    },
  },
  {
    id: "mock-4",
    title: "City Night Photo Walk",
    description:
      "A guided night walk for people who see stories in light. Designed for curiosity, calm confidence, and slow observation.",
    category: "experience",
    price: 90,
    pricingType: "FIXED",
    location: "New South Wales",
    city: "Sydney",
    targetCodes: ["skyweaver", "echoheart", "neonmuse"],
    bookingType: "INQUIRY",
    business: {
      businessName: "Lens & Lanes",
      description:
        "Small-format experiences that make cities feel personal again. No crowds. Just perspective.",
      website: null,
    },
  },
  {
    id: "mock-5",
    title: "Sunrise Surf Session (Beginner Calm)",
    description:
      "A gentle surf session built around timing, breath, and confidence. Ideal for people who learn best through embodied rhythm.",
    category: "service",
    price: 120,
    pricingType: "FIXED",
    location: "Queensland",
    city: "Gold Coast",
    targetCodes: ["tidekeeper", "earthlistener", "echoheart"],
    bookingType: "INQUIRY",
    business: {
      businessName: "Tide Rituals",
      description:
        "Surf instruction that feels like mentorship. Soft approach. Real progression.",
      website: null,
    },
  },
  {
    id: "mock-6",
    title: "Intentional Dinner Table (8 seats only)",
    description:
      "A curated dinner with strangers who feel like familiar. Thoughtful prompts, warm pacing, and zero awkward icebreakers.",
    category: "event",
    price: 140,
    pricingType: "FIXED",
    location: "Victoria",
    city: "Melbourne",
    targetCodes: ["echoheart", "earthlistener", "northstar"],
    bookingType: "INQUIRY",
    business: {
      businessName: "Common Ground",
      description:
        "Micro-events for real connection. Designed like culture, not networking.",
      website: null,
    },
  },
];
