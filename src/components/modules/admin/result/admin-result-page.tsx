"use client";

import { useState } from "react";
import { useAdminResults } from "@/hook/result.hook";
import type { AdminResultsQuery } from "@/types/result.types";

export default function AdminResultsPage() {
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const query: AdminResultsQuery = {
    page,
    limit,
    ...(searchTerm ? { searchTerm } : {}),
  };

  const { data, isLoading, isError, refetch, isFetching } =
    useAdminResults(query);

  const results = data?.data ?? [];
  const meta = data?.meta;
  const totalPages = Math.max(1, meta?.totalPages ?? 1);

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(1);
    setSearchTerm(searchInput.trim());
  }

  function getStatusClass(status: string) {
    switch (status) {
      case "PASSED":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
      case "FAILED":
        return "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Results Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Monitor assessment results across the platform.
          </p>
        </div>

        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-muted disabled:opacity-50"
        >
          {isFetching ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Total Results</p>
          <p className="mt-2 text-3xl font-bold">{meta?.total ?? 0}</p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <p className="text-sm text-muted-foreground">Current Page</p>
          <p className="mt-2 text-3xl font-bold">
            {meta?.page ?? page}
            <span className="text-base font-normal text-muted-foreground">
              {" "}
              / {totalPages}
            </span>
          </p>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-4 sm:p-5">
        <form
          onSubmit={handleSearch}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search candidate name, email, or assessment..."
            className="h-10 min-w-0 flex-1 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />

          <button
            type="submit"
            className="h-10 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Search
          </button>

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchInput("");
                setSearchTerm("");
                setPage(1);
              }}
              className="h-10 rounded-lg border px-4 text-sm transition hover:bg-muted"
            >
              Clear
            </button>
          )}
        </form>
      </div>

      <div className="overflow-hidden rounded-xl border bg-card">
        {isLoading ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            Loading assessment results...
          </div>
        ) : isError ? (
          <div className="space-y-3 p-10 text-center">
            <p className="text-sm text-destructive">
              Failed to load results. Please try again.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-muted"
            >
              Try again
            </button>
          </div>
        ) : results.length === 0 ? (
          <div className="p-10 text-center">
            <h2 className="font-semibold">No results found</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              No assessment results match your search.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left text-sm">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="px-5 py-4 font-semibold">Candidate</th>
                    <th className="px-5 py-4 font-semibold">Assessment</th>
                    <th className="px-5 py-4 font-semibold">Marks</th>
                    <th className="px-5 py-4 font-semibold">Percentage</th>
                    <th className="px-5 py-4 font-semibold">Status</th>
                    <th className="px-5 py-4 font-semibold">Published</th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {results.map((result) => (
                    <tr
                      key={result.id}
                      className="transition hover:bg-muted/30"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {result.candidate?.name ?? "Unknown"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {result.candidate?.email ?? "No email"}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[240px] truncate font-medium">
                          {result.assessment?.title ?? "Unknown assessment"}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Pass mark: {result.assessment?.passMarks ?? 0}
                        </p>
                      </td>

                      <td className="px-5 py-4 tabular-nums">
                        {result.obtainedMarks} / {result.totalMarks}
                      </td>

                      <td className="px-5 py-4 tabular-nums">
                        {Number(result.percentage).toFixed(1)}%
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(result.status)}`}
                        >
                          {result.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        {result.publishedAt ? (
                          <span className="text-emerald-600 dark:text-emerald-400">
                            Published
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            Not published
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {results.length} results
                {meta ? ` of ${meta.total}` : ""}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page <= 1 || isFetching}
                  className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <span className="min-w-20 text-center text-sm">
                  {page} / {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setPage((current) => Math.min(totalPages, current + 1))
                  }
                  disabled={page >= totalPages || isFetching}
                  className="rounded-lg border px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
