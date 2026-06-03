export default function ProfileLoading() {
  return (
    <div className="p-4 md:p-6 lg:p-8 pb-28 lg:pb-8 min-h-full">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Hero skeleton */}
        <div className="rounded-2xl bg-deep-2 border border-border-1 min-h-[200px] p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-surface-3 animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-8 md:h-10 w-48 bg-surface-3 rounded-lg animate-pulse" />
              <div className="h-4 w-64 bg-surface-3 rounded-md animate-pulse" />
              <div className="h-4 w-36 bg-surface-3 rounded-md animate-pulse" />
            </div>
          </div>
        </div>
        {/* Stats skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-deep-2 border border-border-1 p-4">
              <div className="w-8 h-8 rounded-lg bg-surface-3 animate-pulse mb-2.5" />
              <div className="h-7 w-12 bg-surface-3 rounded-md animate-pulse mb-1" />
              <div className="h-3 w-16 bg-surface-3 rounded-md animate-pulse" />
            </div>
          ))}
        </div>
        {/* Content skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-xl bg-deep-2 border border-border-1 p-6">
              <div className="h-4 w-32 bg-surface-3 rounded-md animate-pulse mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-surface-3 rounded-md animate-pulse" />
                <div className="h-3 w-3/4 bg-surface-3 rounded-md animate-pulse" />
                <div className="h-3 w-1/2 bg-surface-3 rounded-md animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
