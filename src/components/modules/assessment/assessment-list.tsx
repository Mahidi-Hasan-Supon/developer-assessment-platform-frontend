"use client";

import { useState } from "react";
import Link from "next/link";

import type { AssessmentStatus } from "@/types/assessment.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";


import { useAssessments } from "@/hook";
import AssessmentTabs from "./assessment-tabs";
import AssessmentTableLoading from "./assessment-table-loading";
import AssessmentTable from "./assessment-table";

export default function AssessmentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState<
    AssessmentStatus | undefined
  >(undefined);

  const { data, isLoading, isError } = useAssessments({
    page: 1,
    limit: 10,
    searchTerm: searchTerm || undefined,
    status: activeStatus,
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const assessments = data?.data ?? [];

  return (
    <div className="mx-4 space-y-6 py-6 sm:mx-6 lg:mx-10 lg:py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Assessments</h1>

          <p className="text-sm text-muted-foreground">
            Create and manage your developer assessments.
          </p>
        </div>

        <Button >
          <Link href="/company/assessments/create">+ Create Assessment</Link>
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <Input
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="max-w-md"
          />
        </CardContent>
      </Card>

      {/* Tabs */}
      <AssessmentTabs
        activeStatus={activeStatus}
        onStatusChange={setActiveStatus}
      />

      {/* Error */}
      {isError && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-destructive">Failed to load assessments.</p>
        </div>
      )}

      {/* Loading */}
      {isLoading && <AssessmentTableLoading />}

      {/* Empty */}
      {!isLoading && !isError && assessments.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <span className="text-2xl">📝</span>
            </div>

            <h2 className="text-lg font-semibold">No assessments found</h2>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              {activeStatus
                ? `There are no ${activeStatus.toLowerCase()} assessments.`
                : "You haven't created any assessments yet."}
            </p>

            <Button className="mt-6">
              <Link href="/company/assessments/create">Create Assessment</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Table */}
      {!isLoading && !isError && assessments.length > 0 && (
        <AssessmentTable assessments={assessments} />
      )}
    </div>
  );
}
