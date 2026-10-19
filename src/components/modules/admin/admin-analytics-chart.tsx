"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { AdminAnalytics } from "@/types/analytics.types";

interface AdminAnalyticsChartProps {
  analytics: AdminAnalytics;
}

export default function AdminAnalyticsChart({
  analytics,
}: AdminAnalyticsChartProps) {
  const chartData = [
    { name: "Users", count: analytics.totalUsers },
    { name: "Candidates", count: analytics.totalCandidates },
    { name: "Companies", count: analytics.totalCompanies },
    { name: "Assessments", count: analytics.totalAssessments },
    { name: "Problems", count: analytics.totalProblems },
    { name: "Attempts", count: analytics.totalAttempts },
    { name: "Submissions", count: analytics.totalSubmissions },
    { name: "Results", count: analytics.totalResults },
  ];

  const hasData = chartData.some((item) => item.count > 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Activity Overview</CardTitle>
      </CardHeader>

      <CardContent>
        {!hasData ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No platform activity available yet.
          </p>
        ) : (
          <div className="h-[340px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 12, right: 12, left: -16, bottom: 4 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  className="stroke-border"
                />

                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11 }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip cursor={{ fill: "var(--muted)", opacity: 0.35 }} />

                <Bar
                  dataKey="count"
                  name="Count"
                  fill="var(--chart-1)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={48}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
