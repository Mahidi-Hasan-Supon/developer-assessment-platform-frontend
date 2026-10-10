"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Eye,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  ClipboardList,
} from "lucide-react";

import { useAllAttempts } from "@/hook/attempt.hook";
import type { AttemptStatus, AttemptQuery } from "@/types/attempt.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AssessmentStatus } from "@/types";

const PAGE_SIZE = 10;

const attemptStatusStyles: Record<AttemptStatus, string> = {
  IN_PROGRESS:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  SUBMITTED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  EXPIRED:
    "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
  AUTO_SUBMITTED:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300",
};

const assessmentStatusStyles: Record<AssessmentStatus, string> = {
  DRAFT:
    "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300",
  PUBLISHED:
    "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
  ONGOING:
    "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300",
  COMPLETED:
    "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300",
  ARCHIVED:
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300",
};

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatStatus(value: string) {
  return value
    .toLowerCase()
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function AdminAttemptsPage() {
  const [search, setSearch] = useState("");
  const [attemptStatus, setAttemptStatus] = useState<"ALL" | AttemptStatus>(
    "ALL",
  );
  const [assessmentStatus, setAssessmentStatus] = useState<
    "ALL" | AssessmentStatus
  >("ALL");
  const [page, setPage] = useState(1);

  const params: AttemptQuery = {
    searchTerm: search.trim() || undefined,
    status: attemptStatus === "ALL" ? undefined : attemptStatus,
    page,
    limit: PAGE_SIZE,
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const { data, isPending, isError, error, refetch, isFetching } =
    useAllAttempts(params);

  const attempts = data?.data ?? [];

  // Assessment status is not supported by the current backend query.
  // Apply this filter to the current page only; see note below.
  const visibleAttempts =
    assessmentStatus === "ALL"
      ? attempts
      : attempts.filter(
          (attempt) => attempt.assessment.status === assessmentStatus,
        );

  const meta = data?.meta;
  const total = meta?.total ?? 0;
  const totalPages = Math.max(meta?.totalPages ?? 1, 1);
  const firstItem = total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const lastItem = Math.min(page * PAGE_SIZE, total);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="size-5" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Attempts Management
            </h1>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">
            Monitor candidate assessment attempts and submissions.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search assessment title or description..."
            className="pl-9"
          />
        </div>

        <Select
          value={attemptStatus}
          onValueChange={(value) => {
            if (value === null) return;
            setAttemptStatus(value as "ALL" | AttemptStatus);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[190px]">
            <SelectValue placeholder="Attempt status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Attempt Statuses</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="SUBMITTED">Submitted</SelectItem>
            <SelectItem value="EXPIRED">Expired</SelectItem>
            <SelectItem value="AUTO_SUBMITTED">Auto Submitted</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={assessmentStatus}
          onValueChange={(value) => {
            if (value === null) return;
            setAssessmentStatus(value as "ALL" | AssessmentStatus);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-full md:w-[190px]">
            <SelectValue placeholder="Assessment status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Assessment Statuses</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="ONGOING">Ongoing</SelectItem>
            <SelectItem value="COMPLETED">Completed</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidate</TableHead>
              <TableHead>Assessment</TableHead>
              <TableHead>Started At</TableHead>
              <TableHead>Expires At</TableHead>
              <TableHead>Submitted At</TableHead>
              <TableHead>Attempt Status</TableHead>
              <TableHead>Assessment Status</TableHead>
              {/* <TableHead className="text-right">Action</TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  Loading attempts...
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell colSpan={8} className="h-32 text-center">
                  <p className="text-sm text-destructive">
                    {error instanceof Error
                      ? error.message
                      : "Failed to load attempts."}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3"
                    onClick={() => void refetch()}
                  >
                    Try again
                  </Button>
                </TableCell>
              </TableRow>
            ) : visibleAttempts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="h-32 text-center text-muted-foreground"
                >
                  No attempts found.
                </TableCell>
              </TableRow>
            ) : (
              visibleAttempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell>
                    <div className="min-w-[150px]">
                      <p className="font-medium">
                        {attempt.candidate?.name ?? "Unknown candidate"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.candidate?.email ?? attempt.candidateId}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="min-w-[160px]">
                      <p className="font-medium">
                        {attempt.assessment?.title ?? "Untitled assessment"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {attempt.assessment?.durationMinutes ?? "—"} minutes
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm">
                    {formatDate(attempt.startedAt)}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm">
                    {formatDate(attempt.expiresAt)}
                  </TableCell>

                  <TableCell className="whitespace-nowrap text-sm">
                    {formatDate(attempt.submittedAt)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={attemptStatusStyles[attempt.status]}
                    >
                      {formatStatus(attempt.status)}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    {attempt.assessment?.status ? (
                      <Badge
                        variant="outline"
                        className={
                          assessmentStatusStyles[attempt.assessment.status]
                        }
                      >
                        {formatStatus(attempt.assessment.status)}
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </TableCell>

                  {/* <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Link
                        href={`/admin/attempts/${attempt.id}`}
                        aria-label={`View attempt ${attempt.id}`}
                      >
                        <Eye className="mr-2 size-4" />
                        Details
                      </Link>
                    </Button>
                  </TableCell> */}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination stays outside the table container */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {firstItem}–{lastItem} of {total} attempts
        </p>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page <= 1 || isPending}
          >
            <ChevronLeft className="mr-1 size-4" />
            Previous
          </Button>

          <span className="min-w-20 text-center text-sm font-medium">
            Page {page} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setPage((current) => Math.min(totalPages, current + 1))
            }
            disabled={page >= totalPages || isPending}
          >
            Next
            <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
