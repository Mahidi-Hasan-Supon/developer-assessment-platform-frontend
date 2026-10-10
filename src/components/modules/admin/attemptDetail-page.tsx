"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Clock, FileText, UserRound } from "lucide-react";

import { useAttemptById } from "@/hook/attempt.hook";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function formatDate(value?: string | null) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

const statusClasses: Record<string, string> = {
  IN_PROGRESS: "border-blue-200 bg-blue-50 text-blue-700",
  SUBMITTED: "border-green-200 bg-green-50 text-green-700",
  EXPIRED: "border-amber-200 bg-amber-50 text-amber-700",
  AUTO_SUBMITTED: "border-purple-200 bg-purple-50 text-purple-700",
};

export default function AdminAttemptDetailsPage() {
  const params = useParams<{ attemptId: string }>();
  const attemptId = params.attemptId;

  const { data, isPending, isError, error, refetch } =
    useAttemptById(attemptId);

  const attempt = data?.data;

  if (isPending) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading attempt details...
      </div>
    );
  }

  if (isError || !attempt) {
    return (
      <div className="space-y-4 p-6">
        <p className="text-destructive">
          {error instanceof Error ? error.message : "Attempt not found."}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => void refetch()}>
            Try again
          </Button>
          <Button variant="ghost">
            <Link href="/dashboard/admin/attempts">Back to attempts</Link>
          </Button>
        </div>
      </div>
    );
  }

  const assessment = attempt.assessment;
  const submission = attempt.submission;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="icon">
          <Link href="/dashboard/admin/attempts" aria-label="Back to attempts">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>

        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-semibold tracking-tight">
            Attempt Details
          </h1>
          <p className="mt-1 break-all text-sm text-muted-foreground">
            ID: {attempt.id}
          </p>
        </div>

        <Badge
          variant="outline"
          className={statusClasses[attempt.status] ?? ""}
        >
          {attempt.status.replaceAll("_", " ")}
        </Badge>
      </div>

      <section className="rounded-xl border p-5">
        <div className="mb-4 flex items-center gap-2">
          <UserRound className="size-5 text-primary" />
          <h2 className="font-semibold">Candidate Information</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Candidate Name</p>
            <p className="mt-1 font-medium">
              {attempt.candidate?.name ?? "Unknown candidate"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-1 break-all font-medium">
              {attempt.candidate?.email ?? "—"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Candidate ID</p>
            <p className="mt-1 break-all text-sm">{attempt.candidateId}</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-5">
        <div className="mb-4 flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          <h2 className="font-semibold">Assessment Information</h2>
        </div>

        <h3 className="text-lg font-semibold">
          {assessment?.title ?? "Untitled assessment"}
        </h3>

        {assessment?.description && (
          <p className="mt-2 text-sm text-muted-foreground">
            {assessment.description}
          </p>
        )}

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-muted-foreground">Duration</p>
            <p className="mt-1 font-medium">
              {assessment?.durationMinutes ?? "—"} minutes
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Marks</p>
            <p className="mt-1 font-medium">{assessment?.totalMarks ?? "—"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Pass Marks</p>
            <p className="mt-1 font-medium">{assessment?.passMarks ?? "—"}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Assessment Status</p>
            <p className="mt-1 font-medium">
              {assessment?.status?.replaceAll("_", " ") ?? "Not provided"}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-5">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="size-5 text-primary" />
          <h2 className="font-semibold">Attempt Timeline</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-sm text-muted-foreground">Started At</p>
            <p className="mt-1 font-medium">{formatDate(attempt.startedAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expires At</p>
            <p className="mt-1 font-medium">{formatDate(attempt.expiresAt)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Submitted At</p>
            <p className="mt-1 font-medium">
              {formatDate(attempt.submittedAt)}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Submission Status</p>
            <p className="mt-1 font-medium">
              {submission?.status?.replaceAll("_", " ") ?? "Not available"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Obtained Marks</p>
            <p className="mt-1 font-medium">
              {submission?.obtainedMarks ?? "Not evaluated"}
              {submission ? ` / ${submission.totalMarks}` : ""}
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border p-5">
        <h2 className="font-semibold">Assessment Problems</h2>

        <div className="mt-4 space-y-3">
          {assessment?.assessmentProblems?.length ? (
            assessment.assessmentProblems.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col justify-between gap-2 rounded-lg border p-3 sm:flex-row sm:items-center"
              >
                <div>
                  <p className="font-medium">
                    {index + 1}. {item.problem.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.problem.type} · {item.problem.difficulty}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {item.marks ?? item.problem.marks} marks
                </span>
              </div>
            ))
          ) : (
            <p className="text-sm text-muted-foreground">
              No problem details available.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
