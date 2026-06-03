'use client';

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function TypewriterText({ text, className = '', delay = 0 }: TypewriterTextProps) {
  return (
    <span className={className}>
      {text.split('').map((char, idx) => (
        <span
          key={idx}
          className="inline-block"
          style={{ animation: `typewriterChar 0.25s ${delay + idx * 0.03}s ease-out both` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}
