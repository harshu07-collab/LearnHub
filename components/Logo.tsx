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
        {/* Background capsule */}
        <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="url(#lg-bg)" />

        {/* Left wing - upper */}
        <path d="M6 22L6 12L11 8L11 18L6 22Z" fill="rgba(255,255,255,0.92)" />
        {/* Center spine */}
        <rect x="11" y="8" width="3" height="16" rx="1" fill="rgba(255,255,255,0.85)" />
        {/* Right wing - lower */}
        <path d="M14 22L14 12L19 8L19 18L14 22Z" fill="rgba(255,255,255,0.92)" />
        {/* Right wing - upper overlap */}
        <path d="M19 8L24 12L24 22L19 18L19 8Z" fill="rgba(255,255,255,0.45)" />
        {/* Top accent bar */}
        <rect x="8" y="6" width="9" height="2" rx="1" fill="rgba(255,255,255,0.35)" />
        {/* Bottom accent bar */}
        <rect x="8" y="24" width="9" height="2" rx="1" fill="rgba(255,255,255,0.2)" />

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
