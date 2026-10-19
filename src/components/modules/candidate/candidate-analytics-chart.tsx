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
import type { CandidateAnalytics } from "@/types/analytics.types";

interface CandidateAnalyticsChartProps {
  analytics: CandidateAnalytics;
}

export default function CandidateAnalyticsChart({
  analytics,
}: CandidateAnalyticsChartProps) {
  const chartData = [
    {
      name: "Passed",
      count: analytics.passedResults,
    },
    {
      name: "Failed",
      count: analytics.failedResults,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assessment Performance</CardTitle>
      </CardHeader>

      <CardContent>
        {analytics.totalResults === 0 ? (
          <p className="py-10 text-center text-sm text-muted-foreground">
            No published results available yet.
          </p>
        ) : (
          <div className="h-[280px] w-full">
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

                <XAxis dataKey="name" tickLine={false} axisLine={false} />

                <YAxis
                  allowDecimals={false}
                  tickLine={false}
                  axisLine={false}
                />

                <Tooltip cursor={{ fill: "var(--muted)", opacity: 0.35 }} />

                <Bar
                  dataKey="count"
                  name="Results"
                  fill="var(--chart-1)"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={64}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
