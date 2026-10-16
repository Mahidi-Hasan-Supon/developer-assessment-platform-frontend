"use client";

import { useEffect, useState } from "react";
import { Users } from "lucide-react";
import { CandidateQuery, Candidate } from "@/types/invitation.types";
import CandidateDetailsSheet from "./candidate-details-sheet";
import { useCandidates } from "@/hook/company.hook";
import CandidatesToolbar from "./get-canbdidates-toolbar";
import CandidatesTable from "./candidate-table";
import CandidatesPagination from "./candidate-pagination";

const PAGE_LIMIT = 10;

export default function GetCandidates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(
    null,
  );
  const [sheetOpen, setSheetOpen] = useState(false);

  // Search changes reset pagination to the first page.
  // useEffect(() => {
  //   setPage(1);
  // }, [searchTerm]);

  const params: CandidateQuery = {
    page,
    limit: PAGE_LIMIT,
    ...(searchTerm.trim() ? { searchTerm: searchTerm.trim() } : {}),
  };

  const { data, isPending, isError, error, refetch } = useCandidates(params);

  const candidates = data?.data ?? [];
  const meta = data?.meta;

  const handleSelectCandidate = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setSheetOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold tracking-tight">
            <Users className="size-6" />
            Candidates
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Browse candidates and view their profile details.
          </p>
        </div>
      </div>

      <CandidatesToolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {isPending ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={Number(index)}
              className="h-14 animate-pulse rounded-lg bg-muted"
            />
          ))}
        </div>
      ) : isError ? (
        <div className="rounded-lg border p-6 text-center">
          <p className="font-medium">Failed to load candidates</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong. Please try again."}
          </p>
          <button
            type="button"
            onClick={() => void refetch()}
            className="mt-4 text-sm font-medium underline underline-offset-4"
          >
            Try again
          </button>
        </div>
      ) : (
        <>
          <CandidatesTable
            candidates={candidates}
            onSelectCandidate={handleSelectCandidate}
          />

          {meta && (
            <CandidatesPagination
              page={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      <CandidateDetailsSheet
        candidate={selectedCandidate}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </div>
  );
}
