"use client";

import type { CompanyResultItem } from "@/types/result.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ResultTableProps {
  results: CompanyResultItem[];
}

export default function ResultTable({ results }: ResultTableProps) {
  if (results.length === 0) {
    return (
      <div className="rounded-lg border py-12 text-center text-sm text-muted-foreground">
        No results found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead>Assessment</TableHead>
            <TableHead>Marks</TableHead>
            <TableHead>Percentage</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Published</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {results.map((result) => (
            <TableRow key={result.id}>
              <TableCell>
                <div className="font-medium">
                  {result.candidate?.name ?? "Unknown"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {result.candidate?.email ?? "—"}
                </div>
              </TableCell>

              <TableCell>{result.assessment?.title ?? "—"}</TableCell>

              <TableCell>
                {result.obtainedMarks} / {result.totalMarks}
              </TableCell>

              <TableCell>{Number(result.percentage).toFixed(1)}%</TableCell>

              <TableCell>
                <span className="rounded-full border px-2 py-1 text-xs">
                  {result.status}
                </span>
              </TableCell>

              <TableCell>
                {result.publishedAt
                  ? new Date(result.publishedAt).toLocaleDateString()
                  : "Not published"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
