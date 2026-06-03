'use client';

/**
 * Shared grain filter definition — rendered once in layout via GrainFilterDefs.
 * Each GrainOverlay just references the shared filter by URL.
 */
export function GrainFilterDefs() {
  return (
    <svg
      className="absolute w-0 h-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="grain-shared">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </defs>
    </svg>
  );
}

export default function GrainOverlay({ opacity = 0.035 }: { opacity?: number }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity }}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="100%" height="100%" filter="url(#grain-shared)" />
    </svg>
  );
}
