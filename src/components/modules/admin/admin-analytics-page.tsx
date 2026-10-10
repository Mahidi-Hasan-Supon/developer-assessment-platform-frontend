"use client";

import {
  Activity,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ClipboardList,
  Code2,
  FileCheck2,
  FileText,
  RefreshCw,
  Users,
  Wallet,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAdminAnalytics } from "@/hook/analytics.hook";
import CompanyOverviewSkeleton from "../company/company-analytics-loadin";

export default function AdminOverviewPage() {
  const {
    data: response,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAdminAnalytics();

  if (isLoading) {
    return <CompanyOverviewSkeleton />;
  }

  if (isError || !response?.data) {
    return (
      <div className="space-y-4 p-4 sm:p-6">
        <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>

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

  const analytics = response.data;

  const stats = [
    {
      key: "total-users",
      label: "Total Users",
      value: analytics.totalUsers,
      description: "All active platform accounts",
      icon: Users,
    },
    {
      key: "total-candidates",
      label: "Total Candidates",
      value: analytics.totalCandidates,
      description: "Registered candidates",
      icon: Users,
    },
    {
      key: "total-companies",
      label: "Total Companies",
      value: analytics.totalCompanies,
      description: "Registered companies",
      icon: Building2,
    },
    {
      key: "total-assessments",
      label: "Total Assessments",
      value: analytics.totalAssessments,
      description: "Assessments created",
      icon: ClipboardList,
    },
    {
      key: "total-problems",
      label: "Total Problems",
      value: analytics.totalProblems,
      description: "Problems in the platform",
      icon: Code2,
    },
    {
      key: "total-attempts",
      label: "Total Attempts",
      value: analytics.totalAttempts,
      description: "Candidate assessment attempts",
      icon: Activity,
    },
    {
      key: "total-submissions",
      label: "Total Submissions",
      value: analytics.totalSubmissions,
      description: "Submitted assessment answers",
      icon: FileText,
    },
    {
      key: "total-results",
      label: "Published Results",
      value: analytics.totalResults,
      description: "Results published to candidates",
      icon: FileCheck2,
    },
    {
      key: "passed-results",
      label: "Passed Results",
      value: analytics.passedResults,
      description: "Candidates who passed",
      icon: CheckCircle2,
    },
    {
      key: "failed-results",
      label: "Failed Results",
      value: analytics.failedResults,
      description: "Candidates who did not pass",
      icon: XCircle,
    },
    {
      key: "pass-rate",
      label: "Pass Rate",
      value: `${analytics.passRate.toFixed(2)}%`,
      description: "Among published results",
      icon: BadgeCheck,
    },
    {
      key: "total-revenue",
      label: "Total Revenue",
      value: `৳${Number(analytics.totalRevenue).toLocaleString("en-BD", {
        maximumFractionDigits: 2,
      })}`,
      description: "Successful payments only",
      icon: Wallet,
    },
  ];

  const passRate = Math.min(100, Math.max(0, analytics.passRate));

  const publishedResults = analytics.totalResults;
  const decidedResults = analytics.passedResults + analytics.failedResults;

  const decidedRate =
    publishedResults > 0
      ? Math.min(100, (decidedResults / publishedResults) * 100)
      : 0;

  return (
    <div className="space-y-8 p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Admin Overview</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor users, assessment activity, results, and revenue.
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
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.key}
              className="rounded-xl border bg-card p-5 transition-colors hover:bg-muted/30"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </p>

                <Icon className="h-5 w-5 text-muted-foreground" />
              </div>

              <p className="mt-3 break-words text-2xl font-bold tracking-tight">
                {stat.value}
              </p>

              <p className="mt-2 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Platform Performance */}
      <section className="space-y-6 rounded-xl border bg-card p-5 sm:p-6">
        <div>
          <h2 className="text-lg font-semibold">Platform Performance</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Overview of published results and candidate performance.
          </p>
        </div>

        {/* Pass Rate */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Pass Rate</span>

            <span className="font-medium">
              {analytics.passRate.toFixed(2)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${passRate}%` }}
            />
          </div>
        </div>

        {/* Results Status */}
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">
              Passed / Failed Results
            </span>

            <span className="font-medium">
              {decidedResults} / {publishedResults}
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${decidedRate}%` }}
            />
          </div>
        </div>

        {/* Quick Summary */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Candidates</p>

            <p className="mt-2 text-xl font-semibold">
              {analytics.totalCandidates}
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Attempts</p>

            <p className="mt-2 text-xl font-semibold">
              {analytics.totalAttempts}
            </p>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">Revenue</p>

            <p className="mt-2 break-words text-xl font-semibold">
              ৳
              {Number(analytics.totalRevenue).toLocaleString("en-BD", {
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
