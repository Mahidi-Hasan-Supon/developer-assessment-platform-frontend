"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  Clock3,
  FileQuestion,
  Search,
  Trophy,
  Wallet,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowRight,
  RefreshCw,
  BookOpenCheck,
} from "lucide-react";

import { useAssessments } from "@/hook/assessment.hook";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Assessment } from "@/types";
import { AssessmentAvailableLoading } from "./assessment-available-loading";

function formatPrice(price: number) {
  if (price === 0) return "Free";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

function AssessmentCard({
  assessment,
  index,
  reduceMotion,
}: {
  assessment: Assessment;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.06,
      }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="h-full"
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5">
        {/* Subtle top accent */}
        <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />

        <CardHeader className="space-y-5 p-6 pb-4">
          {/* Status and price */}
          <div className="flex items-center justify-between gap-3">
            <Badge
              variant="outline"
              className="gap-1.5 rounded-full border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-emerald-700 dark:text-emerald-400"
            >
              <span className="size-1.5 rounded-full bg-emerald-500" />
              Published
            </Badge>

            <div className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-bold text-primary">
              <Wallet className="size-3.5" />
              {formatPrice(assessment.price)}
            </div>
          </div>

          {/* Assessment title and description */}
          <div className="space-y-2">
            <CardTitle className="line-clamp-2 min-h-14 text-lg font-bold leading-7 tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary sm:text-xl">
              {assessment.title}
            </CardTitle>

            <CardDescription className="line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
              {assessment.description?.trim() ||
                "Explore this assessment and challenge your current skills."}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="flex flex-1 flex-col px-6 pb-6 pt-2">
          {/* Assessment information */}
          <div className="grid grid-cols-3 divide-x divide-border rounded-xl border border-border/80 bg-muted/30 py-4">
            <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center">
              <Clock3 className="size-4 text-primary" />

              <span className="text-[11px] text-muted-foreground sm:text-xs">
                Duration
              </span>

              <span className="text-sm font-bold text-foreground">
                {assessment.durationMinutes} min
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center">
              <Trophy className="size-4 text-primary" />

              <span className="text-[11px] text-muted-foreground sm:text-xs">
                Total Marks
              </span>

              <span className="text-sm font-bold text-foreground">
                {assessment.totalMarks}
              </span>
            </div>

            <div className="flex min-w-0 flex-col items-center gap-1.5 px-1 text-center">
              <BookOpenCheck className="size-4 text-primary" />

              <span className="text-[11px] text-muted-foreground sm:text-xs">
                Pass Marks
              </span>

              <span className="text-sm font-bold text-foreground">
                {assessment.passMarks}
              </span>
            </div>
          </div>

          {/* View assessment button */}
          <div className="mt-auto pt-5">
            <Button
              render={<Link href={`/assessments/${assessment.id}`} />}
              nativeButton={false}
              variant="outline"
              className="w-full rounded-xl border-border font-semibold transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground"
            >
              View Assessment
              <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function AvailableAssessments() {
  const reduceMotion = useReducedMotion();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "price-low" | "price-high" | "duration"
  >("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useAssessments({
    page: 1,
    limit: 100,
    status: "PUBLISHED",
  });

  const rawAssessments = (response?.data ?? []).filter(
    (assessment) => assessment.status === "PUBLISHED",
  );

  const sortedAssessments = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const filtered = rawAssessments.filter((assessment) => {
      const title = assessment.title?.toLowerCase() ?? "";
      const description = assessment.description?.toLowerCase() ?? "";

      return title.includes(query) || description.includes(query);
    });

    return [...filtered].sort((a, b) => {
      if (sortBy === "price-low") {
        return (a.price ?? 0) - (b.price ?? 0);
      }

      if (sortBy === "price-high") {
        return (b.price ?? 0) - (a.price ?? 0);
      }

      if (sortBy === "duration") {
        return a.durationMinutes - b.durationMinutes;
      }

      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [rawAssessments, searchQuery, sortBy]);

  const totalPages = Math.ceil(sortedAssessments.length / itemsPerPage);
  const safeTotalPages = Math.max(totalPages, 1);

  const paginatedAssessments = sortedAssessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= safeTotalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isPending) {
    return (
      <div className="mx-auto min-h-[300px] max-w-7xl">
        <AssessmentAvailableLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="mx-auto max-w-7xl rounded-2xl border-border bg-card">
        <CardContent className="flex flex-col items-center gap-4 px-6 py-14 text-center">
          <div className="rounded-full bg-destructive/10 p-4 text-destructive">
            <RefreshCw className="size-7" />
          </div>

          <h2 className="text-lg font-semibold text-foreground">
            Assessments couldn&apos;t be loaded
          </h2>

          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Something went wrong while fetching assessments. Please try again.
          </p>

          <Button onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw
              className={`mr-2 size-4 ${isFetching ? "animate-spin" : ""}`}
            />
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page heading */}
      <div className="relative overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
        <div className="absolute  size-64  " />

        <div className="relative">
          <Badge
            variant="outline"
            className="rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary"
          >
            CANDIDATE PORTAL
          </Badge>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Available Assessments
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
            Discover published assessments, challenge your knowledge, and take
            the next step in your skill development journey.
          </p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="rounded-2xl border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-primary/10 p-3 text-primary">
              <FileQuestion className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Published Assessments
              </p>
              <p className="text-2xl font-bold text-foreground">
                {rawAssessments.length}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-400">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Assessment Format</p>
              <p className="text-2xl font-bold text-foreground">Timed</p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
              <Trophy className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Your Next Goal</p>
              <p className="text-2xl font-bold text-foreground">Get Started</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and sort */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(event) => {
              setSearchQuery(event.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-xl pl-9"
          />
        </div>

        <div className="flex w-full items-center gap-3 sm:w-auto">
          <ArrowUpDown className="hidden size-4 text-muted-foreground sm:block" />

          <label
            htmlFor="assessment-sort"
            className="shrink-0 text-sm font-medium text-muted-foreground"
          >
            Sort by
          </label>

          <select
            id="assessment-sort"
            value={sortBy}
            onChange={(event) => {
              setSortBy(event.target.value as typeof sortBy);
              setCurrentPage(1);
            }}
            className="h-11 min-w-0 flex-1 rounded-xl border border-input bg-background px-3 text-sm text-foreground shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring sm:w-56 sm:flex-none"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Shortest Duration</option>
          </select>
        </div>
      </div>

      {/* Results heading */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            Explore Assessments
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Find a challenge that matches your goals.
          </p>
        </div>

        <Badge variant="secondary" className="rounded-full px-3 py-1">
          {sortedAssessments.length}{" "}
          {sortedAssessments.length === 1 ? "assessment" : "assessments"}
        </Badge>
      </div>

      {/* Empty state */}
      {paginatedAssessments.length === 0 ? (
        <Card className="rounded-2xl border-dashed border-border bg-card">
          <CardContent className="flex flex-col items-center gap-4 px-6 py-16 text-center">
            <div className="rounded-2xl bg-muted p-4">
              <Search className="size-8 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                No Assessments Found
              </h2>

              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {searchQuery
                  ? `No assessments match "${searchQuery}". Try a different search.`
                  : "Published assessments will appear here when available."}
              </p>
            </div>

            {searchQuery ? (
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setCurrentPage(1);
                }}
              >
                Clear Search
              </Button>
            ) : (
              <Button
                variant="outline"
                onClick={() => refetch()}
                disabled={isFetching}
              >
                Refresh Assessments
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Assessment cards */}
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedAssessments.map((assessment, index) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col gap-4 border-t border-border/70 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing{" "}
                <span className="font-semibold text-foreground">
                  {(currentPage - 1) * itemsPerPage + 1}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-foreground">
                  {Math.min(
                    currentPage * itemsPerPage,
                    sortedAssessments.length,
                  )}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-foreground">
                  {sortedAssessments.length}
                </span>{" "}
                assessments
              </p>

              <div className="flex items-center justify-between gap-2 sm:justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg"
                >
                  <ChevronLeft className="mr-1 size-4" />
                  Previous
                </Button>

                <span className="min-w-16 text-center text-sm font-medium text-foreground">
                  {currentPage} / {safeTotalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === safeTotalPages}
                  className="rounded-lg"
                >
                  Next
                  <ChevronRight className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
