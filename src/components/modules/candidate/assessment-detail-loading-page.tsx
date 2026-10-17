import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-7 px-4 py-6 pb-12 sm:px-6 lg:px-8 min-h-screen bg-muted/20">
      {/* Back button skeleton */}
      <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />

      {/* Overview Card Skeleton */}
      <Card className="overflow-hidden border-border/70 shadow-sm">
        <div className="h-1.5 bg-primary/40 animate-pulse" />
        <CardContent className="p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <div className="h-6 w-20 bg-muted rounded animate-pulse" />
              <div className="h-6 w-28 bg-muted rounded animate-pulse" />
              <div className="h-6 w-28 bg-muted rounded animate-pulse" />
              <div className="h-6 w-28 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-12 w-32 bg-muted rounded-xl animate-pulse" />
          </div>
          <div className="space-y-3">
            <div className="h-4 w-36 bg-muted rounded animate-pulse" />
            <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
          </div>
        </CardContent>
      </Card>

      {/* 4 Metric Cards Loading Skeletons (Aapnar card gulo er moto) */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="border-border/70 shadow-sm">
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-11 rounded-xl bg-muted animate-pulse shrink-0" />
              <div className="space-y-2 w-full">
                <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
                <div className="h-6 w-24 bg-muted rounded animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Center Spinner for feedback */}
      {/* <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Spinner />
        <p className="text-sm text-muted-foreground animate-pulse">
          Loading assessment data...
        </p>
      </div> */}
    </div>
  );
}
