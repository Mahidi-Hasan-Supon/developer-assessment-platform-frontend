"use client";

import {
  BarChart3,
  ClipboardCheck,
  FileText,
  Users,
  UserCheck,
  Trophy,
  XCircle,
  Wallet,
  Send,
  Target,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import { useCompanyAnalytics } from "@/hook/analytics.hook";
import CompanyOverviewSkeleton from "./company-analytics-loadin";

const stats = [
  {
    key: "totalAssessments",
    label: "Total Assessments",
    icon: FileText,
    color: "text-blue-600",
  },
  {
    key: "publishedAssessments",
    label: "Published Assessments",
    icon: ClipboardCheck,
    color: "text-green-600",
  },
  {
    key: "totalInvitations",
    label: "Total Invitations",
    icon: Send,
    color: "text-violet-600",
  },
  {
    key: "acceptedInvitations",
    label: "Accepted Invitations",
    icon: UserCheck,
    color: "text-cyan-600",
  },
  {
    key: "totalAttempts",
    label: "Total Attempts",
    icon: Users,
    color: "text-orange-600",
  },
  {
    key: "totalSubmissions",
    label: "Total Submissions",
    icon: FileText,
    color: "text-indigo-600",
  },
  {
    key: "totalResults",
    label: "Published Results",
    icon: ClipboardCheck,
    color: "text-teal-600",
  },
  {
    key: "passedResults",
    label: "Passed Candidates",
    icon: Trophy,
    color: "text-green-600",
  },
  {
    key: "failedResults",
    label: "Failed Candidates",
    icon: XCircle,
    color: "text-red-600",
  },
  {
    key: "passRate",
    label: "Pass Rate",
    icon: Target,
    color: "text-emerald-600",
    suffix: "%",
  },
  {
    key: "totalRevenue",
    label: "Total Revenue",
    icon: Wallet,
    color: "text-amber-600",
    currency: true,
  },
] as const;

export default function CompanyOverviewPage() {
  const { data, isLoading, isError, refetch } = useCompanyAnalytics();

  const analytics = data?.data;

  if (isLoading) {
    return <CompanyOverviewSkeleton />;
  }

  if (isError || !analytics) {
    return (
      <div className="space-y-4 p-6">
        <h2 className="text-xl font-semibold">Unable to load analytics</h2>
        <p className="text-sm text-muted-foreground">
          Please check your connection and try again.
        </p>
        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  const formatValue = (key: string, value: number) => {
    if (key === "totalRevenue") {
      return `৳ ${value.toLocaleString("en-BD", {
        maximumFractionDigits: 2,
      })}`;
    }

    if (key === "passRate") {
      return `${value.toFixed(1)}%`;
    }

    return value.toLocaleString("en-BD");
  };

  return (
    <div className="space-y-8 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Company Overview
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor your assessments, candidates, results, and revenue.
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-colors hover:bg-muted"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          const value = analytics[item.key];

          return (
            <div
              key={item.key}
              className="rounded-xl border bg-card p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.label}
                </p>
                <Icon className={`h-5 w-5 ${item.color}`} />
              </div>

              <p className="mt-4 text-2xl font-bold tracking-tight">
                {formatValue(item.key, value)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-xl border bg-card p-5">
        <div className="mb-5 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Assessment Performance</h2>
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">
                Published Assessments
              </span>
              <span className="font-medium">
                {analytics.publishedAssessments} / {analytics.totalAssessments}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{
                  width: `${
                    analytics.totalAssessments > 0
                      ? Math.min(
                          100,
                          (analytics.publishedAssessments /
                            analytics.totalAssessments) *
                            100,
                        )
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Candidate Pass Rate</span>
              <span className="font-medium">
                {analytics.passRate.toFixed(1)}%
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-green-600"
                style={{
                  width: `${Math.min(100, Math.max(0, analytics.passRate))}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
