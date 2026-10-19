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

import type { CompanyAnalytics } from "@/types/analytics.types";

interface CompanyAnalyticsChartProps {
  analytics: CompanyAnalytics;
}

export default function CompanyAnalyticsChart({
  analytics,
}: CompanyAnalyticsChartProps) {
  const chartData = [
    {
      name: "Assessments",
      count: analytics.totalAssessments,
    },
    {
      name: "Published",
      count: analytics.publishedAssessments,
    },
    {
      name: "Invitations",
      count: analytics.totalInvitations,
    },
    {
      name: "Accepted",
      count: analytics.acceptedInvitations,
    },
    {
      name: "Attempts",
      count: analytics.totalAttempts,
    },
    {
      name: "Submissions",
      count: analytics.totalSubmissions,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Company Activity Overview</CardTitle>
      </CardHeader>

      <CardContent>
        {analytics.totalAssessments === 0 &&
        analytics.totalInvitations === 0 &&
        analytics.totalAttempts === 0 &&
        analytics.totalSubmissions === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No company activity available yet.
          </p>
        ) : (
          <div className="h-[320px] w-full">
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
                  angle={-15}
                  textAnchor="end"
                  height={55}
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
