"use client";

import { format } from "date-fns";
import { CalendarDays, FileText } from "lucide-react";

import type { MySubmission } from "@/types";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MySubmissionsTableProps {
  submissions: MySubmission[];
}

function formatSubmissionDate(date?: string | null) {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return format(parsedDate, "dd MMM yyyy, hh:mm a");
}

export default function MySubmissionsTable({
  submissions,
}: MySubmissionsTableProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">Submission History</CardTitle>
        <CardDescription>
          Review your submitted assessments and evaluation progress.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {submissions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>

            <h3 className="text-lg font-semibold">No submissions yet</h3>

            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Your submitted assessments will appear here. Complete and submit
              an assessment to see your submission history.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Score</TableHead>
                  <TableHead>Evaluation</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {submissions.map((submission) => {
                  const assessment = submission.attempt.assessment;
                  const isEvaluated = submission.status === "EVALUATED";
                  const totalMarks =
                    submission.totalMarks ?? assessment.totalMarks;

                  return (
                    <TableRow key={submission.id}>
                      <TableCell className="min-w-[220px]">
                        <div className="font-medium">{assessment.title}</div>

                        <p className="mt-1 text-xs text-muted-foreground">
                          Pass marks: {assessment.passMarks}
                        </p>
                      </TableCell>

                      <TableCell className="min-w-[170px] whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CalendarDays className="h-4 w-4 shrink-0" />
                          {formatSubmissionDate(
                            submission.attempt.submittedAt ??
                              submission.createdAt,
                          )}
                        </div>
                      </TableCell>

                      <TableCell className="whitespace-nowrap">
                        {isEvaluated ? (
                          <span className="font-semibold tabular-nums">
                            {submission.obtainedMarks} / {totalMarks}
                          </span>
                        ) : (
                          <span className="text-sm text-muted-foreground">
                            Awaiting marks
                          </span>
                        )}
                      </TableCell>

                      <TableCell>
                        <Badge variant={isEvaluated ? "default" : "secondary"}>
                          {isEvaluated ? "Evaluated" : "Pending Evaluation"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
