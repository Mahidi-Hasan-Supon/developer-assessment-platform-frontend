"use client";

import { Button } from "@/components/ui/button";

interface CandidatesPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function CandidatesPagination({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: CandidatesPaginationProps) {
  if (total === 0) return null;

  const visiblePages = Array.from(
    { length: Math.max(0, totalPages) },
    (_, index) => index + 1,
  );

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-center">
      <p className="text-sm text-muted-foreground">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of{" "}
        {total} candidates
      </p>

      <div className="flex flex-wrap items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          Previous
        </Button>

        {visiblePages.map((pageNumber) => (
          <Button
            key={pageNumber}
            variant={pageNumber === page ? "default" : "outline"}
            size="sm"
            aria-current={pageNumber === page ? "page" : undefined}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Button>
        ))}

        <Button
          variant="outline"
          size="sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
