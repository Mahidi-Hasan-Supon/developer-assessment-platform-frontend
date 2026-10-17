"use client";

import { useState } from "react";
import { FileText, RefreshCw } from "lucide-react";

import { useMySubmissions } from "@/hook/submission.hook";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MySubmissionsSkeleton from "./mySubmissionLoading";
import MySubmissionsTable from "./my-submission-table";
import MySubmissionsPagination from "./mySubmissionPagination";

export default function MySubmissionsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const {
    data: response,
    isPending,
    isError,
    isFetching,
    refetch,
  } = useMySubmissions(page, limit);
  const submissions = response?.data ?? [];
  const meta = response?.meta;

  const total = meta?.total ?? submissions.length;
  const totalPages = meta?.totalPages ?? 1;

  console.log("submissions:", submissions);
  console.log("meta:", meta);

  if (isPending) {
    return (
      <div className="p-4 md:p-6">
        <MySubmissionsSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Submissions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Track your assessment submissions and evaluation results.
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <FileText className="h-10 w-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">
              Unable to load submissions
            </h2>

            <p className="max-w-md text-sm text-muted-foreground">
              Something went wrong while retrieving your submissions. Please try
              again.
            </p>

            <Button onClick={() => refetch()} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Submissions</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View your submitted assessments and track evaluation progress.
          </p>
        </div>

        <Badge variant="secondary" className="w-fit px-3 py-1.5">
          {total} {total === 1 ? "Submission" : "Submissions"}
        </Badge>
      </div>

      {/* Table */}
      <div className="relative space-y-4">
        {isFetching && (
          <div className="absolute right-3 top-3 z-10 flex items-center gap-2 rounded-md border bg-background/95 px-3 py-2 text-xs text-muted-foreground shadow-sm">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            Updating...
          </div>
        )}

        <MySubmissionsTable submissions={submissions} />

        {/* Pagination */}
        {total > 0 && (
          <MySubmissionsPagination
            page={page}
            limit={limit}
            total={total}
            totalPages={totalPages}
            onPageChange={setPage}
            disabled={isFetching}
          />
        )}
      </div>
    </div>
  );
}
