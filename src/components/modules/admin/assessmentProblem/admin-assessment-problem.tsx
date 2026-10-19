"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getAllAssessmentProblems } from "@/api";
import type { AssessmentProblem } from "@/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ITEMS_PER_PAGE = 10;

export default function AdminAssessmentProblemsPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [difficultyFilter, setDifficultyFilter] = useState("ALL");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, isFetching, refetch } = useQuery({
    queryKey: ["assessment-problems", "admin"],
    queryFn: () => getAllAssessmentProblems(),
    staleTime: 60 * 1000,
  });

  const rows: AssessmentProblem[] = data?.data ?? [];

  const filteredRows = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return rows.filter((item) => {
      const title = item.problem?.title ?? "";
      const assessmentTitle = item.assessment?.title ?? "";
      const problemType = item.problem?.type ?? "";
      const difficulty = item.problem?.difficulty ?? "";

      const matchesSearch =
        !searchTerm ||
        title.toLowerCase().includes(searchTerm) ||
        assessmentTitle.toLowerCase().includes(searchTerm);

      const matchesType = typeFilter === "ALL" || problemType === typeFilter;

      const matchesDifficulty =
        difficultyFilter === "ALL" || difficulty === difficultyFilter;

      return matchesSearch && matchesType && matchesDifficulty;
    });
  }, [rows, search, typeFilter, difficultyFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredRows.length / ITEMS_PER_PAGE),
  );

  const currentPage = Math.min(page, totalPages);

  const paginatedRows = filteredRows.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const problemTypes = [
    ...new Set(
      rows
        .map((item) => item.problem?.type)
        .filter((type) => type !== undefined),
    ),
  ];

  const difficulties = [
    ...new Set(
      rows
        .map((item) => item.problem?.difficulty)
        .filter((difficulty) => difficulty !== undefined),
    ),
  ];

  const resetFilters = () => {
    setSearch("");
    setTypeFilter("ALL");
    setDifficultyFilter("ALL");
    setPage(1);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Assessment Problems
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            View and monitor problems linked to assessments across the platform.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Total Linked Problems
            </p>
            <p className="mt-2 text-3xl font-bold">{rows.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">
              Assessments With Problems
            </p>
            <p className="mt-2 text-3xl font-bold">
              {new Set(rows.map((item) => item.assessmentId)).size}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-muted-foreground">Matching Problems</p>
            <p className="mt-2 text-3xl font-bold">{filteredRows.length}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search and Filter</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value);
                setPage(1);
              }}
              placeholder="Search problem or assessment..."
              className="h-10 rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />

            <select
              value={typeFilter}
              onChange={(event) => {
                setTypeFilter(event.target.value);
                setPage(1);
              }}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="ALL">All problem types</option>
              {problemTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <select
              value={difficultyFilter}
              onChange={(event) => {
                setDifficultyFilter(event.target.value);
                setPage(1);
              }}
              className="h-10 rounded-md border bg-background px-3 text-sm"
            >
              <option value="ALL">All difficulties</option>
              {difficulties.map((difficulty) => (
                <option key={difficulty} value={difficulty}>
                  {difficulty}
                </option>
              ))}
            </select>

            <Button variant="outline" onClick={resetFilters}>
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>All Assessment Problems</CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              Loading assessment problems...
            </div>
          ) : isError ? (
            <div className="space-y-3 py-12 text-center">
              <p className="text-sm text-destructive">
                Failed to load assessment problems.
              </p>
              <Button variant="outline" onClick={() => refetch()}>
                Try Again
              </Button>
            </div>
          ) : paginatedRows.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-medium">No problems found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Try changing your search or filters.
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Problem</TableHead>
                      <TableHead>Assessment</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Difficulty</TableHead>
                      <TableHead>Order</TableHead>
                      <TableHead>Marks</TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {paginatedRows.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="min-w-[180px]">
                          <p className="font-medium">
                            {item.problem?.title ?? "Unknown problem"}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {item.problemId}
                          </p>
                        </TableCell>

                        <TableCell className="min-w-[180px]">
                          <p className="font-medium">
                            {item.assessment?.title ?? "Unknown assessment"}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            ID: {item.assessmentId}
                          </p>
                        </TableCell>

                        <TableCell>
                          {item.problem?.type ? (
                            <Badge variant="secondary">
                              {item.problem.type}
                            </Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell>
                          {item.problem?.difficulty ? (
                            <Badge variant="outline">
                              {item.problem.difficulty}
                            </Badge>
                          ) : (
                            "—"
                          )}
                        </TableCell>

                        <TableCell>{item.order}</TableCell>
                        <TableCell>{item.marks ?? "—"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {paginatedRows.length} of {filteredRows.length}{" "}
                  matching problems
                </p>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage <= 1}
                    onClick={() =>
                      setPage((previous) => Math.max(1, previous - 1))
                    }
                  >
                    Previous
                  </Button>

                  <span className="min-w-20 text-center text-sm">
                    {currentPage} / {totalPages}
                  </span>

                  <Button
                    variant="outline"
                    size="sm"
                    disabled={currentPage >= totalPages}
                    onClick={() =>
                      setPage((previous) => Math.min(totalPages, previous + 1))
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
