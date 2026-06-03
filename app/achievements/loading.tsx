export default function AchievementsLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-6 lg:pb-8 min-h-full">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-8 w-40 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-56 skeleton-shimmer rounded-md" />
          </div>
        </div>
        {/* Stat cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-deep-2 border border-border-1 p-5 contain-layout">
              <div className="w-9 h-9 rounded-lg skeleton-shimmer mb-3" />
              <div className="h-8 w-16 skeleton-shimmer rounded-md mb-1" />
              <div className="h-4 w-20 skeleton-shimmer rounded-md" />
            </div>
          ))}
        </div>
        {/* Achievements grid skeleton */}
        <div className="rounded-xl bg-deep-2 border border-border-1 p-5 md:p-6 contain-layout">
          <div className="h-4 w-36 skeleton-shimmer rounded-md mb-5" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="rounded-xl bg-surface-2/50 border border-border-1 p-5 text-center"
              >
                <div className="w-10 h-10 rounded-xl skeleton-shimmer mx-auto mb-2.5" />
                <div className="h-3 w-20 skeleton-shimmer rounded-md mx-auto mb-1" />
                <div className="h-2.5 w-16 skeleton-shimmer rounded-md mx-auto" />
                <div className="mt-2 h-1 w-full skeleton-shimmer rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
