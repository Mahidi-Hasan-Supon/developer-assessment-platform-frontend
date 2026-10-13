"use client";

import { useEffect, useState } from "react";

import type { CompanyResultsQuery } from "@/types/result.types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCompanyResults } from "@/hook";
import ResultSearch from "./result-search";
import ResultLoading from "./result-loading";
import ResultTable from "./result-table";
import ResultPagination from "./result-pagination";


const PAGE_SIZE = 10;

export default function CompanyResultsPage() {
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(search.trim());
      setPage(1);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  const params: CompanyResultsQuery = {
    page,
    limit: PAGE_SIZE,
    ...(searchTerm ? { searchTerm } : {}),
  };

  const { data, isPending, isFetching, isError, refetch } =
    useCompanyResults(params);

  const results = data?.data ?? [];
  const meta = data?.meta;

  const total = meta?.total ?? results.length;
  const totalPages =
    meta?.totalPages ?? Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Results</h1>
        <p className="text-sm text-muted-foreground">
          Review candidate assessment results.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Candidate Results</CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <ResultSearch value={search} onChange={setSearch} />

            <Button
              variant="outline"
              onClick={() => refetch()}
              disabled={isFetching}
            >
              {isFetching ? "Refreshing..." : "Refresh"}
            </Button>
          </div>

          {isPending ? (
            <ResultLoading />
          ) : isError ? (
            <div className="space-y-3 rounded-lg border p-8 text-center">
              <p className="text-sm text-destructive">
                Failed to load results.
              </p>
              <Button variant="outline" onClick={() => refetch()}>
                Try again
              </Button>
            </div>
          ) : (
            <>
              {isFetching && (
                <p className="text-xs text-muted-foreground">
                  Updating results...
                </p>
              )}

              <ResultTable results={results} />

              <ResultPagination
                page={page}
                totalPages={totalPages}
                total={total}
                limit={PAGE_SIZE}
                onPageChange={setPage}
                disabled={isFetching}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
