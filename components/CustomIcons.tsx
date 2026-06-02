'use client';

// Hand-crafted geometric icons — unique to LearnHub, no AI generation

export function IconCode({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M9 9L6 12L9 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15 9L18 12L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="13"
        y1="8"
        x2="11"
        y2="16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBrain({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3C8.5 3 6 5.5 6 9C6 11.5 7.5 13.5 9.5 14.5L9 21L12 19L15 21L14.5 14.5C16.5 13.5 18 11.5 18 9C18 5.5 15.5 3 12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="9" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M9 17H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconCloud({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 17C3.5 17 2 15.5 2 13C2 10.5 3.5 9 6 9C6 6 8.5 3.5 12 3.5C15.5 3.5 18 6 18 9C20.5 9 22 10.5 22 13C22 15.5 20.5 17 18 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M12 10V15M12 15L10 13M12 15L14 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconPalette({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="9" cy="10" r="1.5" fill="currentColor" opacity="0.8" />
      <circle cx="15" cy="10" r="1.5" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.9" />
      <path
        d="M12 15C10.5 15 9 16 9 17.5C9 19 10.5 20 12 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M6 15H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 15H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function IconBookOpen({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M4 19.5V5.5C4 4.5 5 3.5 6 3.5H18C19 3.5 20 4.5 20 5.5V19.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M4 19.5C4 18 5 17 6.5 17H20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="9"
        y1="9"
        x2="9"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="15"
        y1="9"
        x2="15"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconEye({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M2 12C4 6 8 3 12 3C16 3 20 6 22 12C20 18 16 21 12 21C8 21 4 18 2 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  );
}

export function IconRocket({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3L16 8L14 14H10L8 8L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 14L8 21H16L14 14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="9" r="1.5" fill="currentColor" />
    </svg>
  );
}

export function IconStar({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3L14.5 8.5L20.5 9L16 13L17 19L12 16L7 19L8 13L3.5 9L9.5 8.5L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function IconZap({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 3H18L15 10H18L11 21L13 12H9L13 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconShield({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 3L4 6V11C4 16.5 7.5 21 12 22.5C16.5 21 20 16.5 20 11V6L12 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.7"
      />
    </svg>
  );
}

export function IconActivity({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="3"
        y="12"
        width="4"
        height="9"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="10"
        y="7"
        width="4"
        height="14"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <rect
        x="17"
        y="3"
        width="4"
        height="18"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
      <line
        x1="3"
        y1="21"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---- New premium icons ----

export function IconHome({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M3 10L12 3L21 10V21H3V10Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 21V12H15V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="6"
        y1="10.5"
        x2="18"
        y2="10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function IconUser({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="8" r="4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M3 21C3 16 7 13 12 13C17 13 21 16 21 21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 8L21 5M21 5V8M21 5H18"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconTrophy({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M6 9H5C3.5 9 3 8 3 6.5V5H6V9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M18 9H19C20.5 9 21 8 21 6.5V5H18V9Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M6 5H18V16H6V5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M9 19H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 16V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 21H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line
        x1="12"
        y1="10"
        x2="14"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="12"
        y1="10"
        x2="10"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconAward({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M8 13.5L6 21L12 18L18 21L16 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="9" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function IconFlame({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 4C8 9 6 12 6 15C6 18 8.5 21 12 21C15.5 21 18 18 18 15C18 12 16 9 12 4Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 14C9.5 11 12 10 12 10C12 10 11 13 12 14.5C13 16 11 17.5 10.5 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function IconClock({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M12 7V12L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function IconTrendingUp({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <polyline
        points="2 16 8 10 13 14 22 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="17 5 22 5 22 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="22" cy="5" r="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

export function IconTarget({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M12 3V6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M12 18V21"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M3 12H6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M18 12H21"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconMail({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M22 8L12 15L2 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M8 12H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0"
      />
    </svg>
  );
}

export function IconLock({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="5"
        y="11"
        width="14"
        height="10"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M8 11V7C8 4.5 9.5 3 12 3C14.5 3 16 4.5 16 7V11"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="16" r="1.5" fill="currentColor" opacity="0.4" />
      <line
        x1="12"
        y1="17.5"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function IconBell({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M18 8C18 6 16 3 12 3C8 3 6 6 6 8C6 13 4 15 4 16H20C20 15 18 13 18 8Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M10 19C10 20.5 11 22 12 22C13 22 14 20.5 14 19"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="12" cy="8" r="1.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

export function IconSettings({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M19.4 15C19.2 15.3 19 15.6 18.8 15.8L19.2 17.4L17.4 19.2L15.8 18.8C15.6 19 15.3 19.2 15 19.4L14.5 21H9.5L9 19.4C8.7 19.2 8.4 19 8.2 18.8L6.6 19.2L4.8 17.4L5.2 15.8C5 15.6 4.8 15.3 4.6 15L3 14.5V9.5L4.6 9C4.8 8.7 5 8.4 5.2 8.2L4.8 6.6L6.6 4.8L8.2 5.2C8.4 5 8.7 4.8 9 4.6L9.5 3H14.5L15 4.6C15.3 4.8 15.6 5 15.8 5.2L17.4 4.8L19.2 6.6L18.8 8.2C19 8.4 19.2 8.7 19.4 9L21 9.5V14.5L19.4 15Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}

export function IconLogOut({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 21H5C4 21 3 20 3 19V5C3 4 4 3 5 3H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <polyline
        points="16 17 21 12 16 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="21"
        y1="12"
        x2="9"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCheckCircle({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconAlertCircle({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <line
        x1="12"
        y1="7"
        x2="12"
        y2="13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.5" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function IconSearch({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16.5 16.5L21 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line
        x1="11"
        y1="8"
        x2="11"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.4"
      />
      <line
        x1="8"
        y1="11"
        x2="14"
        y2="11"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}

export function IconBarChart({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect
        x="4"
        y="14"
        width="4"
        height="7"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
      />
      <rect
        x="10"
        y="9"
        width="4"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
      />
      <rect
        x="16"
        y="4"
        width="4"
        height="17"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="none"
      />
      <line
        x1="3"
        y1="21"
        x2="21"
        y2="21"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconArrowRight({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <line
        x1="4"
        y1="12"
        x2="18"
        y2="12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <polyline
        points="13 7 18 12 13 17"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconChevronLeft({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <polyline
        points="15 18 9 12 15 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconChevronRight({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <polyline
        points="9 6 15 12 9 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function IconX({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <line
        x1="18"
        y1="6"
        x2="6"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="6"
        y1="6"
        x2="18"
        y2="18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconBookmark({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 3H19V21L12 17L5 21V3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="9"
        y1="7"
        x2="15"
        y2="7"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconTrash({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M6 6V20C6 21 7 22 8 22H16C17 22 18 21 18 20V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 6V4C9 3 10 2 11 2H13C14 2 15 3 15 4V6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <line
        x1="10"
        y1="10"
        x2="10"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
      <line
        x1="14"
        y1="10"
        x2="14"
        y2="17"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

export function IconSave({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M5 3H16L21 8V19C21 20 20 21 19 21H5C4 21 3 20 3 19V5C3 4 4 3 5 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M7 3V8H15V3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="12" cy="15" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M9 3H13" stroke="currentColor" strokeWidth="1.5" opacity="0" />
    </svg>
  );
}

export function IconCommand({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M9 6C7.5 6 6 5 6 3.5C6 2 7.5 1 9 1C10.5 1 12 2 12 3.5V9H3.5C2 9 1 7.5 1 6C1 4.5 2 3 3.5 3C5 3 6 4.5 6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M15 18C16.5 18 18 19 18 20.5C18 22 16.5 23 15 23C13.5 23 12 22 12 20.5V15H20.5C22 15 23 16.5 23 18C23 19.5 22 21 20.5 21C19 21 18 19.5 18 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Map for easy lookup
export const customIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code: IconCode,
  Brain: IconBrain,
  Cloud: IconCloud,
  Palette: IconPalette,
  BookOpen: IconBookOpen,
  Eye: IconEye,
  Rocket: IconRocket,
  Star: IconStar,
  Zap: IconZap,
  Shield: IconShield,
  Activity: IconActivity,
  Home: IconHome,
  User: IconUser,
  Trophy: IconTrophy,
  Award: IconAward,
  Flame: IconFlame,
  Clock: IconClock,
  TrendingUp: IconTrendingUp,
  Target: IconTarget,
  Mail: IconMail,
  Lock: IconLock,
  Bell: IconBell,
  Settings: IconSettings,
  LogOut: IconLogOut,
  CheckCircle: IconCheckCircle,
  AlertCircle: IconAlertCircle,
  Search: IconSearch,
  BarChart3: IconBarChart,
  ArrowRight: IconArrowRight,
  ChevronLeft: IconChevronLeft,
  ChevronRight: IconChevronRight,
  X: IconX,
  Bookmark: IconBookmark,
  Trash2: IconTrash,
  Save: IconSave,
  Command: IconCommand,
};
