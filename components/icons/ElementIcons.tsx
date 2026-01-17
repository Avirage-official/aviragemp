// components/icons/ElementIcons.tsx
export function FireIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c-4 0-7-3-7-7 0-2 1-4 2-6 1.5-2.5 2-4 2-6 0 3 3 5 5 8 1-2 2-4 2-6 2 3 3 6 3 10 0 4-3 7-7 7z" />
      <path d="M12 22c-2 0-3-2-3-4s2-4 3-4 3 2 3 4-1 4-3 4z" />
    </svg>
  );
}

export function WaterIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2c0 0-6 7-6 12a6 6 0 0 0 12 0c0-5-6-12-6-12z" />
      <path d="M12 18c-1.5 0-3-1-3-3 0-1.5 2-4 3-4" />
    </svg>
  );
}

export function EarthIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
      <path d="M12 2a15 15 0 0 0 0 20" />
    </svg>
  );
}

export function AirIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 8h12a3 3 0 1 0-3-3" />
      <path d="M4 12h16a3 3 0 1 1-3 3" />
      <path d="M4 16h8a3 3 0 1 0-3 3" />
    </svg>
  );
}

export const ELEMENT_ICONS = {
  Fire: FireIcon,
  Water: WaterIcon,
  Earth: EarthIcon,
  Air: AirIcon,
} as const;