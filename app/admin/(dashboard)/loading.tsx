import { Skeleton } from "@/components/ui/skeleton"

// Admin pages are all dynamic (they read cookies), and in the App Router a
// <Link> can only prefetch a dynamic route down to its nearest loading
// boundary. Without this file prefetch does nothing at all and every sidebar
// click is a cold, blocking round trip with a frozen screen.
export default function AdminLoading() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-7 w-44" />
        <Skeleton className="h-9 w-28" />
      </div>

      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-4 rounded-lg border border-zinc-800 bg-zinc-900/70 p-4"
          >
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-3 w-1/2" />
            </div>
            <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
            <Skeleton className="h-9 w-9 shrink-0 rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}
