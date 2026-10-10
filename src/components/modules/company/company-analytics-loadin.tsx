
import { Skeleton } from "@/components/ui/skeleton";

const metricSkeletons = [
  "total-assessments",
  "published-assessments",
  "total-invitations",
  "accepted-invitations",
  "total-attempts",
  "total-submissions",
  "total-results",
  "passed-results",
  "failed-results",
  "pass-rate",
  "total-revenue",
];

const performanceSkeletons = [
  "published-performance",
  "pass-rate-performance",
];

export default function CompanyOverviewSkeleton() {
  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-4 w-80 max-w-full" />
        </div>

        <Skeleton className="h-9 w-24 rounded-md" />
      </div>

      {/* Analytics Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metricSkeletons.map((key) => (
          <div
            key={key}
            className="space-y-4 rounded-xl border bg-card p-5"
          >
            <div className="flex items-center justify-between gap-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-5 w-5 rounded-md" />
            </div>

            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-40 max-w-full" />
          </div>
        ))}
      </div>

      {/* Performance Section */}
      <div className="space-y-6 rounded-xl border bg-card p-5 sm:p-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-52" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </div>

        {performanceSkeletons.map((key) => (
          <div key={key} className="space-y-3">
            <div className="flex items-center justify-between gap-4">
              <Skeleton className="h-4 w-36 max-w-full" />
              <Skeleton className="h-4 w-16" />
            </div>

            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
