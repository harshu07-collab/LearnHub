export default function LeaderboardLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-6 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header skeleton */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
          <div className="space-y-2">
            <div className="h-8 w-44 skeleton-shimmer rounded-lg" />
            <div className="h-4 w-60 skeleton-shimmer rounded-md" />
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
        {/* Leaderboard list skeleton */}
        <div className="rounded-xl bg-deep-2 border border-border-1 p-5 md:p-6 contain-layout">
          <div className="h-4 w-32 skeleton-shimmer rounded-md mb-5" />
          <div className="space-y-3">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 rounded-xl bg-surface-2/50 border border-border-1"
              >
                <div className="w-8 text-center">
                  <div className="h-6 w-6 skeleton-shimmer rounded-full mx-auto" />
                </div>
                <div className="w-10 h-10 rounded-xl skeleton-shimmer" />
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div className="h-4 w-32 skeleton-shimmer rounded-md" />
                  <div className="h-3 w-24 skeleton-shimmer rounded-md" />
                </div>
                <div className="text-right space-y-1.5">
                  <div className="h-4 w-16 skeleton-shimmer rounded-md ml-auto" />
                  <div className="h-3 w-12 skeleton-shimmer rounded-md ml-auto" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
