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

        {/* Left page — sweeping curve */}
        <path d="M6 22V10C6 8.9 6.9 8 8 8H11V22H6Z" fill="rgba(255,255,255,0.9)" />
        {/* Left page spine fold */}
        <path
          d="M6 22V10C6 8.9 6.9 8 8 8H11"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Left page inner highlight */}
        <path
          d="M9 10V20"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        {/* Left page text lines */}
        <line
          x1="7.5"
          y1="13"
          x2="10"
          y2="13"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
        <line
          x1="7.5"
          y1="15"
          x2="9.5"
          y2="15"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
        <line
          x1="7.5"
          y1="17"
          x2="10"
          y2="17"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />

        {/* Right page — sweeping curve */}
        <path d="M21 22V10C21 8.9 20.1 8 19 8H16V22H21Z" fill="rgba(255,255,255,0.85)" />
        {/* Right page spine fold */}
        <path
          d="M21 22V10C21 8.9 20.1 8 19 8H16"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="0.5"
          fill="none"
        />
        {/* Right page inner highlight */}
        <path
          d="M18 10V20"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.5"
          strokeLinecap="round"
        />
        {/* Right page text lines */}
        <line
          x1="17"
          y1="13"
          x2="19.5"
          y2="13"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
        <line
          x1="17"
          y1="15"
          x2="19"
          y2="15"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />
        <line
          x1="17"
          y1="17"
          x2="19.5"
          y2="17"
          stroke="rgba(255,255,255,0.2)"
          strokeWidth="0.4"
          strokeLinecap="round"
        />

        {/* Spine center */}
        <rect x="11" y="8" width="2" height="14" rx="0.6" fill="rgba(255,255,255,0.65)" />
        {/* Spine highlight */}
        <rect x="11.5" y="9" width="0.4" height="12" rx="0.2" fill="rgba(255,255,255,0.25)" />

        {/* Top accent dot */}
        <circle cx="14.5" cy="6" r="1.2" fill="rgba(255,255,255,0.2)" />

        {/* Bottom accent bar */}
        <rect x="12" y="24" width="5" height="1.5" rx="0.75" fill="rgba(255,255,255,0.15)" />

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
