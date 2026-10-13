import { useId } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AssessmentAvailableLoadingProps {
  cardCount?: number;
}

export function AssessmentAvailableLoading({
  cardCount = 6,
}: AssessmentAvailableLoadingProps) {
  const baseId = useId();

  // ৩টি সামারি কার্ডের জন্য ইউনিক আইডি কি (Key)
  const SUMMARY_KEYS = ["summary-1", "summary-2", "summary-3"] as const;

  // কার্ডের ভেতরের ৩টি স্ট্যাট (Duration, Total Marks, Pass Marks) এর জন্য কি (Key)
  const STAT_KEYS = ["stat-1", "stat-2", "stat-3"] as const;

  // ডাইনামিক Main Cards এর জন্য Unique ID array
  const mainCardIds = Array.from(
    { length: cardCount },
    (_, i) => `${baseId}-assessment-card-${i + 1}`,
  );

  return (
    <output
      className="space-y-8"
      aria-live="polite"
      aria-label="Loading assessments"
    >
      {/* 1. Summary Cards Skeleton (3 Columns layout) */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {SUMMARY_KEYS.map((summaryKey) => (
          <Card
            key={`${baseId}-${summaryKey}`}
            className="border-border/70 shadow-sm"
          >
            <CardContent className="flex items-center gap-4 p-5">
              <div className="size-11 rounded-xl bg-muted animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-3.5 w-24 rounded bg-muted animate-pulse" />
                <div className="h-6 w-12 rounded bg-muted animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 2. Main Assessment Cards Skeleton (Grid layout matching the main page) */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {mainCardIds.map((cardKey) => (
          <Card
            key={cardKey}
            className="flex h-full flex-col overflow-hidden border-border/70 bg-card shadow-sm"
          >
            {/* Header section skeleton */}
            <CardHeader className="space-y-4">
              {/* Badge & Price skeleton */}
              <div className="flex items-center justify-between gap-3">
                <div className="h-6 w-24 rounded-full bg-muted animate-pulse" />
                <div className="h-8 w-20 rounded-lg bg-muted animate-pulse" />
              </div>

              {/* Title & Description skeleton */}
              <div className="space-y-2">
                <div className="h-6 w-3/4 rounded bg-muted animate-pulse" />
                <div className="space-y-1.5 pt-1">
                  <div className="h-4 w-full rounded bg-muted/70 animate-pulse" />
                  <div className="h-4 w-5/6 rounded bg-muted/70 animate-pulse" />
                  <div className="h-4 w-2/3 rounded bg-muted/70 animate-pulse" />
                </div>
              </div>
            </CardHeader>

            {/* Content section skeleton */}
            <CardContent className="flex flex-1 flex-col gap-5">
              {/* 3 Stats Grid skeleton (Duration, Total Marks, Pass Marks) */}
              <div className="grid grid-cols-3 gap-2">
                {STAT_KEYS.map((statKey) => (
                  <div
                    key={`${cardKey}-${statKey}`}
                    className="rounded-xl border border-border/50 bg-muted/30 p-3 space-y-2"
                  >
                    <div className="size-8 rounded-lg bg-muted animate-pulse" />
                    <div className="h-5 w-10 rounded bg-muted animate-pulse" />
                    <div className="h-3 w-12 rounded bg-muted/70 animate-pulse" />
                  </div>
                ))}
              </div>

              {/* View Button skeleton */}
              <div className="mt-auto border-t border-border/70 pt-4">
                <div className="h-10 w-full rounded-md bg-muted animate-pulse" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </output>
  );
}
