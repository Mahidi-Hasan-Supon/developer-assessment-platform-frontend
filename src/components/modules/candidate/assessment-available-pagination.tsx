"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | "left-ellipsis" | "right-ellipsis";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, "right-ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [
      1,
      "left-ellipsis",
      totalPages - 4,
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "left-ellipsis",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "right-ellipsis",
    totalPages,
  ];
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pageItems = getPageItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-wrap items-center justify-center gap-2"
    >
      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Previous page"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="size-4" />
      </Button>

      {pageItems.map((item, index) => {
        if (typeof item !== "number") {
          return (
            <span
              key={`${item}-${Number(index)}`}
              aria-hidden="true"
              className="flex size-9 items-center justify-center text-muted-foreground"
            >
              ...
            </span>
          );
        }

        const isActive = item === currentPage;

        return (
          <Button
            key={item}
            type="button"
            variant={isActive ? "default" : "outline"}
            size="icon"
            aria-label={`Page ${item}`}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onPageChange(item)}
            className="tabular-nums"
          >
            {item}
          </Button>
        );
      })}

      <Button
        type="button"
        variant="outline"
        size="icon"
        aria-label="Next page"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="size-4" />
      </Button>
    </nav>
  );
}
