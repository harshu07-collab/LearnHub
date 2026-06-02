import React from 'react';

function Pulse({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-lg bg-gradient-to-r from-surface-2 via-surface-3 to-surface-2 bg-[length:200%_100%] animate-pulse ${className}`}
      style={style}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 space-y-3">
      <div className="flex items-start gap-3">
        <Pulse className="w-9 h-9 rounded-lg flex-shrink-0" />
        <Pulse className="h-4 flex-1 mt-1.5" />
      </div>
      <div className="pt-2">
        <div className="flex justify-between mb-2">
          <Pulse className="h-3 w-16" />
          <Pulse className="h-3 w-8" />
        </div>
        <Pulse className="h-1.5 w-full rounded-full" />
      </div>
    </div>
  );
}

export function CourseListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ActivityTileSkeleton() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-5 md:p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Pulse className="w-8 h-8 rounded-lg" />
          <div className="space-y-1.5">
            <Pulse className="h-4 w-28" />
            <Pulse className="h-3 w-20" />
          </div>
        </div>
        <Pulse className="h-6 w-16 rounded-lg" />
      </div>
      <div className="flex items-end justify-between gap-1.5 h-28 md:h-32">
        {[45, 72, 38, 91, 62, 55, 80].map((h, i) => (
          <Pulse key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="pt-4 border-t border-border-1 grid grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="text-center space-y-1.5">
            <Pulse className="h-6 w-12 mx-auto" />
            <Pulse className="h-3 w-16 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function HeroTileSkeleton() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-surface-1 to-deep-3 border border-border-1 p-6 md:p-8 min-h-[240px] md:min-h-[260px]">
      <div className="space-y-3">
        <Pulse className="h-3 w-40" />
        <Pulse className="h-8 w-72 mt-4" />
        <Pulse className="h-4 w-48" />
      </div>
      <div className="flex items-center gap-6 mt-8">
        <Pulse className="h-8 w-32" />
        <Pulse className="h-8 w-40" />
      </div>
    </div>
  );
}
