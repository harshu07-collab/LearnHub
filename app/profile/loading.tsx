export default function ProfileLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-6 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero skeleton */}
        <div className="rounded-2xl bg-deep-2 border border-border-1 min-h-[200px] p-6 md:p-8 contain-layout">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl skeleton-shimmer" />
            <div className="flex-1 space-y-3">
              <div className="h-8 md:h-10 w-48 skeleton-shimmer rounded-lg" />
              <div className="h-4 w-64 skeleton-shimmer rounded-md" />
              <div className="h-4 w-36 skeleton-shimmer rounded-md" />
            </div>
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-deep-2 border border-border-1 p-4 contain-layout">
              <div className="w-8 h-8 rounded-lg skeleton-shimmer mb-2.5" />
              <div className="h-7 w-12 skeleton-shimmer rounded-md mb-1" />
              <div className="h-3 w-16 skeleton-shimmer rounded-md" />
            </div>
          ))}
        </div>
        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-deep-2 border border-border-1 p-6 contain-layout">
              <div className="h-4 w-32 skeleton-shimmer rounded-md mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-full skeleton-shimmer rounded-md" />
                <div className="h-3 w-3/4 skeleton-shimmer rounded-md" />
                <div className="h-3 w-1/2 skeleton-shimmer rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
