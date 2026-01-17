// components/icons/ZodiacIcons.tsx
export function AriesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 21c0-9 4-16 8-16s8 7 8 16" />
      <path d="M12 5V21" />
    </svg>
  );
}

export function TaurusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="16" r="5" />
      <path d="M4 6c0 2.5 2.5 5 8 5s8-2.5 8-5" />
    </svg>
  );
}

export function GeminiIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12" />
      <path d="M6 21h12" />
      <path d="M8 3v18" />
      <path d="M16 3v18" />
    </svg>
  );
}

export function CancerIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 6a4 4 0 1 0-4 4" />
      <path d="M12 18a4 4 0 1 0 4-4" />
      <path d="M8 10h8" />
      <path d="M8 14h8" />
    </svg>
  );
}

export function LeoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="9" r="4" />
      <path d="M13 9c0 4 3 8 3 12" />
      <path d="M16 21a2 2 0 1 0 0-4" />
    </svg>
  );
}

export function VirgoIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4v16" />
      <path d="M5 8c4-4 6 4 6 0V4" />
      <path d="M11 8c4-4 6 4 6 0V4" />
      <path d="M17 8v6c0 2 1 4 3 4" />
      <path d="M17 14c0 3-1 6-4 6" />
    </svg>
  );
}

export function LibraIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20h16" />
      <path d="M4 16h16" />
      <path d="M12 16V6" />
      <path d="M6 6h12" />
    </svg>
  );
}

export function ScorpioIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 4v12c0 2 1 4 3 4" />
      <path d="M5 8c4-4 6 4 6 0V4" />
      <path d="M11 8c4-4 6 4 6 0v8c0 2 2 4 4 2" />
      <path d="M19 16l2 2" />
    </svg>
  );
}

export function SagittariusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 19L19 5" />
      <path d="M12 5h7v7" />
      <path d="M7 14l4-4" />
    </svg>
  );
}

export function CapricornIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 10c0-3 2-6 5-6s5 6 5 6v6" />
      <circle cx="17" cy="18" r="3" />
      <path d="M15 12v4" />
    </svg>
  );
}

export function AquariusIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 10l4-2 4 4 4-4 4 2" />
      <path d="M4 16l4-2 4 4 4-4 4 2" />
    </svg>
  );
}

export function PiscesIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 6c4 0 7 6 7 6s-3 6-7 6" />
      <path d="M19 6c-4 0-7 6-7 6s3 6 7 6" />
      <path d="M4 12h16" />
    </svg>
  );
}

// Map for easy lookup
export const ZODIAC_ICONS = {
  Aries: AriesIcon,
  Taurus: TaurusIcon,
  Gemini: GeminiIcon,
  Cancer: CancerIcon,
  Leo: LeoIcon,
  Virgo: VirgoIcon,
  Libra: LibraIcon,
  Scorpio: ScorpioIcon,
  Sagittarius: SagittariusIcon,
  Capricorn: CapricornIcon,
  Aquarius: AquariusIcon,
  Pisces: PiscesIcon,
} as const;

export type ZodiacSign = keyof typeof ZODIAC_ICONS;