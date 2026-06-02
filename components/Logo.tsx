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
        {/* Background rounded rect */}
        <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="url(#lg-bg)" />

        {/* Orbiting ring — outer */}
        <circle
          cx="16"
          cy="16"
          r="10"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="0.5"
        />
        {/* Orbiting ring — inner */}
        <circle
          cx="16"
          cy="16"
          r="7"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.6"
        />

        {/* Orbital arcs (3 arcs around the hub) */}
        {/* Top arc */}
        <path
          d="M10.5 10C12.5 8 19.5 8 21.5 10"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Bottom arc */}
        <path
          d="M10.5 22C12.5 24 19.5 24 21.5 22"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.6"
          fill="none"
          strokeLinecap="round"
        />
        {/* Diagonal arc */}
        <path
          d="M11 19.5C12 22 20 22 21 19.5"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="0.5"
          fill="none"
          strokeLinecap="round"
        />

        {/* Orbiting particles — 4 dots on the outer ring */}
        <circle cx="16" cy="6" r="1.2" fill="rgba(255,255,255,0.25)" />
        <circle cx="16" cy="26" r="1.2" fill="rgba(255,255,255,0.15)" />
        <circle cx="6" cy="16" r="1.2" fill="rgba(255,255,255,0.2)" />
        <circle cx="26" cy="16" r="1.2" fill="rgba(255,255,255,0.2)" />

        {/* Orbiting particles — 4 smaller dots on inner ring */}
        <circle cx="23" cy="12" r="0.8" fill="rgba(255,255,255,0.12)" />
        <circle cx="9" cy="20" r="0.8" fill="rgba(255,255,255,0.12)" />
        <circle cx="20" cy="23" r="0.8" fill="rgba(255,255,255,0.08)" />
        <circle cx="12" cy="9" r="0.8" fill="rgba(255,255,255,0.08)" />

        {/* Central hub — outer glow */}
        <circle cx="16" cy="16" r="4" fill="rgba(255,255,255,0.08)" />
        {/* Central hub — main glow */}
        <circle cx="16" cy="16" r="2.8" fill="rgba(255,255,255,0.15)" />
        {/* Central hub — core */}
        <circle cx="16" cy="16" r="1.5" fill="white" />
        {/* Central hub — inner bright core */}
        <circle cx="16" cy="16" r="0.6" fill="rgba(99,102,241,0.5)" />

        <defs>
          <linearGradient id="lg-bg" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
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
