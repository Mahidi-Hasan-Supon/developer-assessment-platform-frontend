"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock3,
  FileQuestion,
  Search,
  Trophy,
  Wallet,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  Filter,
} from "lucide-react";

import { useAssessments } from "@/hook/assessment.hook";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Assessment } from "@/types";

function formatPrice(price: number) {
  if (price === 0) return "Free";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function AvailableAssessments() {
  // State for Search, Sort, and Pagination
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
  } = useAssessments({
    page: 1,
    limit: 100, // Fetching initial assessments list
    status: "PUBLISHED",
  });

  const rawAssessments = (response?.data ?? []).filter(
    (assessment) => assessment.status === "PUBLISHED",
  );

  // 1. Filter by Search Query
  const filteredAssessments = rawAssessments.filter((assessment) => {
    const titleMatch = assessment.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const descMatch = assessment.description
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    return titleMatch || descMatch;
  });

  // 2. Sort Assessments
  const sortedAssessments : any = [...filteredAssessments].sort((a, b) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    if (sortBy === "duration")
      return (a.durationMinutes || 0) - (b.durationMinutes || 0);
    // default: newest/id
    return b.id.localeCompare(a.id);
  });

  // 3. Paginate
  const totalPages = Math.ceil(sortedAssessments.length / itemsPerPage) || 1;
  const paginatedAssessments = sortedAssessments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="text-muted-foreground">
            Assessments could not be loaded.
          </p>
          <Button variant="outline" onClick={() => refetch()}>
            Try again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-widest text-primary">
          CANDIDATE PORTAL
        </p>

        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Available Assessments
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
          Explore published assessments and find your next challenge.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
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

        <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-sky-500/10 p-3 text-sky-600 dark:text-sky-400">
              <Clock3 className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Assessment Format</p>
              <p className="text-2xl font-bold text-sky-700 dark:text-sky-400">
                Timed
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="rounded-xl bg-violet-500/10 p-3 text-violet-600 dark:text-violet-400">
              <Trophy className="size-5" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Your Next Goal</p>
              <p className="text-2xl font-bold text-violet-700 dark:text-violet-400">
                Get Started
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Sort Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-border/70 bg-card p-4 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Search assessments..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // Reset to page 1 on new search
            }}
            className="pl-9"
          />
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <ArrowUpDown className="size-4 text-muted-foreground hidden sm:block" />
          <span className="text-xs font-medium text-muted-foreground hidden sm:block">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 w-full sm:w-auto rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            <option value="newest">Newest First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="duration">Duration: Shortest First</option>
          </select>
        </div>
      </div>

      {/* Empty state */}
      {paginatedAssessments.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="rounded-full bg-muted p-4">
              <Search className="size-8 text-muted-foreground" />
            </div>

            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-foreground">
                No Assessments Found
              </h2>

              <p className="max-w-md text-sm leading-6 text-muted-foreground">
                {searchQuery
                  ? `No assessments match your query "${searchQuery}".`
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
              <Button variant="outline" onClick={() => refetch()}>
                Refresh Assessments
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Assessment cards */
        <div className="space-y-8">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {paginatedAssessments.map((assessment : Assessment) => (
              <Card
                key={assessment.id}
                className="group flex h-full flex-col overflow-hidden border-border/70 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
              >
                <CardHeader className="space-y-4">
                  {/* Status and price */}
                  <div className="flex items-center justify-between gap-3">
                    <Badge className="border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
                      <span className="mr-1.5 size-1.5 rounded-full bg-emerald-500" />
                      Published
                    </Badge>

                    <div className="flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-sm font-bold text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300">
                      <Wallet className="size-4" />
                      {formatPrice(assessment.price)}
                    </div>
                  </div>

                  {/* Title and description */}
                  <div className="space-y-2">
                    <CardTitle className="text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {assessment.title}
                    </CardTitle>

                    <CardDescription className="line-clamp-3 min-h-[60px] text-sm leading-6 text-muted-foreground">
                      {assessment.description || "No description provided."}
                    </CardDescription>
                  </div>
                </CardHeader>

                {/* Assessment information */}
                <CardContent className="flex flex-1 flex-col gap-5">
                  <div className="grid grid-cols-3 gap-2">
                    {/* Duration */}
                    <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-3 dark:border-sky-900 dark:bg-sky-950/40">
                      <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-900 dark:text-sky-300">
                        <Clock3 className="size-4" />
                      </div>

                      <p className="text-lg font-bold text-sky-800 dark:text-sky-300">
                        {assessment.durationMinutes}
                        <span className="ml-1 text-xs font-semibold">min</span>
                      </p>

                      <p className="mt-1 text-xs font-medium text-sky-700/80 dark:text-sky-400">
                        Duration
                      </p>
                    </div>

                    {/* Total marks */}
                    <div className="rounded-xl border border-violet-200 bg-violet-50/80 p-3 dark:border-violet-900 dark:bg-violet-950/40">
                      <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300">
                        <Trophy className="size-4" />
                      </div>

                      <p className="text-lg font-bold text-violet-800 dark:text-violet-300">
                        {assessment.totalMarks}
                      </p>

                      <p className="mt-1 text-xs font-medium text-violet-700/80 dark:text-violet-400">
                        Total Marks
                      </p>
                    </div>

                    {/* Pass marks */}
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 dark:border-emerald-900 dark:bg-emerald-950/40">
                      <div className="mb-3 flex size-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">
                        <FileQuestion className="size-4" />
                      </div>

                      <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">
                        {assessment.passMarks}
                      </p>

                      <p className="mt-1 text-xs font-medium text-emerald-700/80 dark:text-emerald-400">
                        Pass Marks
                      </p>
                    </div>
                  </div>

                  {/* View assessment button */}
                  <div className="mt-auto border-t border-border/70 pt-4">
                    <Button
                      
                      className="w-full font-semibold shadow-sm transition-all hover:shadow-md"
                    >
                      <Link href={`/assessments/${assessment.id}`}>
                        View Assessment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination Bar */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border/70 pt-6">
              <p className="text-xs sm:text-sm text-muted-foreground">
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

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="gap-1"
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>

                <div className="flex items-center gap-1 text-xs sm:text-sm font-medium px-2">
                  <span>{currentPage}</span> / <span>{totalPages}</span>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="gap-1"
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
