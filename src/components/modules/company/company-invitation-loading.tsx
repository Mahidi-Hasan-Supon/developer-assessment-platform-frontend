import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const skeletonRows = [
  "candidate-row-one",
  "candidate-row-two",
  "candidate-row-three",
  "candidate-row-four",
  "candidate-row-five",
];

export default function CompanyInvitationsLoading() {
  return (
    <main className="mx-auto max-w-5xl animate-in fade-in-50 space-y-8 p-4 md:p-6">
      {/* Page Header Skeleton */}
      <div className="flex flex-col gap-2 border-b pb-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-96 max-w-full" />
      </div>

      {/* Select Assessment Skeleton */}
      <Card>
        <CardHeader className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-4 w-72 max-w-full" />
        </CardHeader>

        <CardContent className="space-y-4">
          <Skeleton className="h-10 w-full rounded-md" />
        </CardContent>
      </Card>

      {/* Search Candidate Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full max-w-md rounded-md" />
      </div>

      {/* Candidates Table Skeleton */}
      <Card className="border shadow-sm">
        <CardHeader className="space-y-2 border-b bg-muted/30">
          <Skeleton className="h-5 w-36" />
          <Skeleton className="h-4 w-64 max-w-full" />
        </CardHeader>

        <CardContent className="p-0">
          <div className="space-y-4 p-4">
            {/* Table Header Skeleton */}
            <div className="flex items-center justify-between gap-4 border-b pb-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-48" />
            </div>

            {/* Table Rows Skeleton */}
            {skeletonRows.map((rowId) => (
              <div
                key={rowId}
                className="flex items-center justify-between gap-4 border-b py-2 last:border-0"
              >
                <Skeleton className="size-4 shrink-0 rounded-full" />
                <Skeleton className="h-4 w-36 max-w-full" />
                <Skeleton className="h-4 w-52 max-w-full" />
              </div>
            ))}
          </div>

          {/* Action Bar Skeleton */}
          <div className="flex flex-col justify-between gap-4 border-t bg-muted/10 p-4 sm:flex-row sm:items-center">
            <Skeleton className="h-4 w-64 max-w-full" />
            <Skeleton className="h-10 w-36 rounded-md" />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

