"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useResultById } from "@/hook/result.hook";

export default function ResultDetailsPage() {
  const params = useParams<{ id: string }>();
  const resultId = params.id;

  const { data, isLoading, isError, refetch } = useResultById(resultId);

  if (isLoading) {
    return <div className="p-6">Loading result details...</div>;
  }

  if (isError || !data?.data) {
    return (
      <div className="space-y-4 p-6">
        <h1 className="text-xl font-semibold">Unable to load result</h1>
        <p className="text-sm text-muted-foreground">
          The result could not be found or loaded.
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => refetch()}
            className="rounded-md border px-4 py-2"
          >
            Try again
          </button>
          <Link
            href="/candidate/results"
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
          >
            Back to My Results
          </Link>
        </div>
      </div>
    );
  }

  const result = data.data;
  const percentage =
    result.totalMarks > 0
      ? (result.obtainedMarks / result.totalMarks) * 100
      : 0;

  const passed =
    result.assessment?.passMarks != null &&
    result.obtainedMarks >= result.assessment.passMarks;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <Link
        href="/candidate/results"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to My Results
      </Link>

      <div>
        <h1 className="text-2xl font-bold">Result Details</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your published assessment result and score.
        </p>
      </div>

      <div className="space-y-5 rounded-xl border bg-card p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-semibold">
            {result.assessment?.title ?? "Assessment"}
          </h2>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            {result.status}
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Obtained Marks</p>
            <p className="mt-2 text-2xl font-bold">
              {result.obtainedMarks} / {result.totalMarks}
            </p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Percentage</p>
            <p className="mt-2 text-2xl font-bold">{percentage.toFixed(2)}%</p>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">Final Result</p>
            <p className="mt-2 text-2xl font-bold">
              {result.assessment?.passMarks == null
                ? "—"
                : passed
                  ? "Passed"
                  : "Failed"}
            </p>
          </div>
        </div>

        {result.assessment?.passMarks != null && (
          <p className="text-sm text-muted-foreground">
            Required passing marks: {result.assessment.passMarks}
          </p>
        )}
      </div>
    </div>
  );
}
