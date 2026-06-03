'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

interface AnimatedCounterProps {
  from?: number;
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  duration?: number;
  delay?: number;
}

export default function AnimatedCounter({
  from = 0,
  to,
  prefix = '',
  suffix = '',
  className = '',
  duration = 1.5,
  delay = 0,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState(from);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const delayTimer = setTimeout(() => {
      const startTime = performance.now();
      const range = to - from;

      const update = (now: number) => {
        const elapsed = (now - startTime) / 1000;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(Math.round(from + range * eased));
        if (progress < 1) requestAnimationFrame(update);
      };

      requestAnimationFrame(update);
    }, delay * 1000);

    return () => clearTimeout(delayTimer);
  }, [inView, from, to, duration, delay]);

  return (
    <span
      ref={ref}
      className={className}
      style={{ animation: `fadeSlideUp 0.4s ${delay}s ease-out both` }}
    >
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
