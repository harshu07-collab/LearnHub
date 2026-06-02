'use client';

interface LogoProps {
  size?: number;
  showText?: boolean;
}

export default function Logo({ size = 28, showText = true }: LogoProps) {
  const s = size;

  return (
    <div className="flex items-center gap-2.5">
      <svg
        width={s}
        height={s}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <defs>
          <linearGradient id="lg-bg" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {/* Background capsule */}
        <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="url(#lg-bg)" />

        {/* Diamond — knowledge as a precious gem */}
        <path
          d="M16 5 L26 16 L16 27 L6 16 Z"
          fill="rgba(255,255,255,0.92)"
          strokeLinejoin="round"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="2"
          mask="url(#l-hole)"
        />

        {/* L cutout — reveals bg gradient, forms the "L" of Learn */}
        <mask id="l-hole">
          <rect width="32" height="32" fill="white" />
          <rect x="11" y="11" width="4" height="9.5" rx="0.8" fill="black" />
          <rect x="11" y="18.5" width="9" height="4" rx="0.8" fill="black" />
        </mask>

        {/* Hub glow layers */}
        <circle cx="16" cy="16" r="4" fill="rgba(99,102,241,0.08)" />
        <circle cx="16" cy="16" r="2" fill="rgba(99,102,241,0.25)" />
        <circle cx="16" cy="16" r="1.2" fill="white" />
        <circle cx="16" cy="16" r="0.5" fill="rgba(99,102,241,0.6)" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-tight select-none">
          <span className="text-sm font-semibold text-soft-white tracking-tight">LearnHub</span>
          <span className="text-[9px] font-medium text-subtle tracking-[0.15em] uppercase">
            Next-Gen
          </span>
        </div>
      )}
    </div>
  );
}
