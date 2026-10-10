"use client";

import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useCandidateAnalytics } from "@/hook/analytics.hook";
import CompanyOverviewSkeleton from "../company/company-analytics-loadin";

export default function CandidateOverviewPage() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useCandidateAnalytics();

  if (isLoading) {
    return <CompanyOverviewSkeleton />;
  }

  if (isError || !response?.data) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <h1 className="text-2xl font-bold">Candidate Overview</h1>

        <p className="text-sm text-muted-foreground">
          Analytics data load করা যায়নি। আবার চেষ্টা করো।
        </p>

        <Button onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    );
  }

  //   const analytics = response.data;
  const analytics = response?.data;

  console.log("Candidate Analytics:", analytics);

  const stats = [
    {
      key: "total-attempts",
      label: "Total Attempts",
      value: analytics.totalAttempts,
    },
    {
      key: "completed-attempts",
      label: "Completed Attempts",
      value: analytics.completedAttempts,
    },
    {
      key: "total-results",
      label: "Total Results",
      value: analytics.totalResults,
    },
    {
      key: "passed-results",
      label: "Passed",
      value: analytics.passedResults,
    },
    {
      key: "failed-results",
      label: "Failed",
      value: analytics.failedResults,
    },
    {
      key: "pass-rate",
      label: "Pass Rate",
      value: `${analytics.passRate}%`,
    },
    {
      key: "average-score",
      label: "Average Score",
      value: `${Number(analytics.averageScore.toFixed(2))}%`,
    },
  ];

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Candidate Overview
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track your assessments, submissions, and results.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.key}
            className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/30"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>

            <p className="mt-3 text-2xl font-bold tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Performance */}
      <section className="space-y-6 rounded-xl border bg-card p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold">Your Performance</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            A quick overview of your assessment progress.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Pass Rate</span>
            <span className="font-medium">{analytics.passRate}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${Math.min(100, Math.max(0, analytics.passRate))}%`,
              }}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Total Attempts</p>
            <p className="mt-2 text-xl font-semibold">
              {analytics.totalAttempts}
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Passed</p>
            <p className="mt-2 text-xl font-semibold">
              {analytics.passedResults}
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Failed</p>
            <p className="mt-2 text-xl font-semibold">
              {analytics.failedResults}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
