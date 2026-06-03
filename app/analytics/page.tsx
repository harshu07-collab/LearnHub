import { Suspense } from 'react';
import AnalyticsClient from './AnalyticsClient';

function AnalyticsSkeleton() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-6 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-8 w-36 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-52 skeleton-shimmer rounded-md" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-deep-2 border border-border-1 p-4 contain-layout">
              <div className="w-8 h-8 rounded-lg skeleton-shimmer mb-2.5" />
              <div className="h-7 w-12 skeleton-shimmer rounded-md mb-1" />
              <div className="h-3 w-16 skeleton-shimmer rounded-md" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-deep-2 border border-border-1 p-6 h-72 contain-layout"
            >
              <div className="h-4 w-40 skeleton-shimmer rounded-md mb-6" />
              <div className="h-40 skeleton-shimmer rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AnalyticsPage() {
  return (
    <Suspense fallback={<AnalyticsSkeleton />}>
      <AnalyticsClient />
    </Suspense>
  );
}
