"use client";

import { useEffect, useState } from "react";
import {
  useCompanySubmissions,
  useEvaluateAnswer,
  useSubmissionAnswers,
} from "@/hook/submission.hook";
import { useCreateResult, useEvaluateResult, usePublishResult } from "@/hook";
import type {
  CompanySubmission,
  SubmissionAnswer,
} from "@/types/submission.types";
import { Button } from "@/components/ui/button";

export default function CompanySubmissionsPage() {
  const [selectedId, setSelectedId] = useState("");
  const [marks, setMarks] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  const submissionsQuery = useCompanySubmissions();
  const answersQuery = useSubmissionAnswers(selectedId);

  const evaluateAnswerMutation = useEvaluateAnswer();
  const createResultMutation = useCreateResult();
  const evaluateResultMutation = useEvaluateResult();
  const publishResultMutation = usePublishResult();

  const submissions: CompanySubmission[] = submissionsQuery.data?.data ?? [];

  const answers: SubmissionAnswer[] = answersQuery.data?.data ?? [];

  const selectedSubmission = submissions.find(
    (submission) => submission.id === selectedId,
  );

  useEffect(() => {
    setMarks(
      Object.fromEntries(
        answers.map((answer) => [
          answer.id,
          answer.marks == null ? "" : String(answer.marks),
        ]),
      ),
    );
  }, [answers]);

  async function handleEvaluateAnswer(answer: SubmissionAnswer) {
    if (answer.evaluatedAt) {
      setMessage("This answer has already been evaluated.");
      return;
    }

    const value = marks[answer.id];

    if (value === undefined || value.trim() === "") {
      setMessage("Please enter marks first.");
      return;
    }

    const numericMarks = Number(value);
    const maxMarks = answer.problem.marks;

    if (
      !Number.isFinite(numericMarks) ||
      numericMarks < 0 ||
      numericMarks > maxMarks
    ) {
      setMessage(`Marks must be between 0 and ${maxMarks}.`);
      return;
    }

    try {
      setMessage("");

      await evaluateAnswerMutation.mutateAsync({
        answerId: answer.id,
        marks: numericMarks,
      });

      // Immediately lock this answer in the UI.
      // The refreshed answer data will confirm the saved evaluation.
      setMessage("Answer evaluated successfully.");

      await answersQuery.refetch();
      await submissionsQuery.refetch();
    } catch {
      setMessage("Failed to evaluate answer. Please try again.");
    }
  }

  async function handleCreateResult(submissionId: string) {
    try {
      setMessage("");
      await createResultMutation.mutateAsync(submissionId);
      await submissionsQuery.refetch();
      setMessage("Result created successfully.");
    } catch {
      setMessage("Could not create result. Check the submission status.");
    }
  }

  async function handleEvaluateResult(resultId: string) {
    try {
      setMessage("");
      await evaluateResultMutation.mutateAsync(resultId);
      await submissionsQuery.refetch();
      setMessage("Result evaluated successfully.");
    } catch {
      setMessage("Could not evaluate result.");
    }
  }

  async function handlePublishResult(resultId: string) {
    try {
      setMessage("");
      await publishResultMutation.mutateAsync(resultId);
      await submissionsQuery.refetch();
      setMessage("Result published successfully.");
    } catch {
      setMessage("Could not publish result.");
    }
  }

  if (submissionsQuery.isLoading) {
    return <main className="p-6">Loading submissions...</main>;
  }

  if (submissionsQuery.isError) {
    return (
      <main className="p-6">
        <h1 className="text-xl font-semibold">Company Submissions</h1>
        <p className="mt-3 text-sm text-destructive">
          Failed to load submissions. Please check your API endpoint and login.
        </p>
        <Button
          className="mt-3"
          variant="outline"
          onClick={() => submissionsQuery.refetch()}
        >
          Try again
        </Button>
      </main>
    );
  }

  return (
    <main className="space-y-6 p-4 md:p-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">
          Company Submissions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Review candidate answers, evaluate marks, and publish results.
        </p>
      </header>

      {message && (
        <p role="status" className="rounded-md border p-3 text-sm">
          {message}
        </p>
      )}

      {submissions.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h2 className="font-semibold">No submissions yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Candidate submissions will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
          <section className="space-y-3">
            <h2 className="font-semibold">
              Submissions ({submissions.length})
            </h2>

            {submissions.map((submission: CompanySubmission) => {
              const result = submission.result;

              return (
                <article
                  key={submission.id}
                  className={`space-y-3 rounded-xl border p-4 ${
                    selectedId === submission.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <div>
                    <h3 className="font-semibold">
                      {submission.attempt.assessment.title}
                    </h3>
                    <p className="mt-1 break-all text-xs text-muted-foreground">
                      Submission: {submission.id}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="rounded-full border px-2 py-1">
                      {submission.status}
                    </span>
                    <span className="rounded-full border px-2 py-1">
                      {submission.obtainedMarks ?? 0} / {submission.totalMarks}{" "}
                      marks
                    </span>
                    {result && (
                      <span className="rounded-full border px-2 py-1">
                        {result.publishedAt ? "PUBLISHED" : result.status}
                      </span>
                    )}
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSelectedId(submission.id);
                      setMessage("");
                    }}
                  >
                    Review submission
                  </Button>

                  {submission.status === "EVALUATED" && !result && (
                    <Button
                      className="ml-2"
                      disabled={createResultMutation.isPending}
                      onClick={() => handleCreateResult(submission.id)}
                    >
                      {createResultMutation.isPending
                        ? "Creating..."
                        : "Create Result"}
                    </Button>
                  )}

                  {result && !result.publishedAt && (
                    <div className="flex flex-wrap gap-2">
                      {result.status === "PENDING" && (
                        <Button
                          variant="outline"
                          disabled={evaluateResultMutation.isPending}
                          onClick={() => handleEvaluateResult(result.id)}
                        >
                          {evaluateResultMutation.isPending
                            ? "Evaluating..."
                            : "Evaluate Result"}
                        </Button>
                      )}

                      {(result.status === "PASSED" ||
                        result.status === "FAILED") && (
                        <Button
                          disabled={publishResultMutation.isPending}
                          onClick={() => handlePublishResult(result.id)}
                        >
                          {publishResultMutation.isPending
                            ? "Publishing..."
                            : "Publish Result"}
                        </Button>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>

          <section className="min-w-0 space-y-4">
            <h2 className="font-semibold">Answer Evaluation</h2>

            {!selectedId ? (
              <div className="rounded-xl border border-dashed p-8 text-center text-sm text-muted-foreground">
                Select a submission to review its answers.
              </div>
            ) : answersQuery.isLoading ? (
              <p className="text-sm text-muted-foreground">
                Loading answers...
              </p>
            ) : answersQuery.isError ? (
              <p className="text-sm text-destructive">
                Could not load answers. Check the company answer endpoint.
              </p>
            ) : answers.length === 0 ? (
              <p className="rounded-xl border p-6 text-sm text-muted-foreground">
                No answers found for this submission.
              </p>
            ) : (
              answers.map((answer: SubmissionAnswer) => {
                const manuallyEvaluated =
                  answer.problem.type === "WRITTEN" ||
                  answer.problem.type === "CODING";

                // Important: evaluate each answer independently.
                const isAnswerEvaluated = Boolean(answer.evaluatedAt);

                return (
                  <article
                    key={answer.id}
                    className="space-y-3 rounded-xl border p-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-semibold">{answer.problem.title}</h3>
                      <span className="rounded-full border px-2 py-1 text-xs">
                        {answer.problem.type}
                      </span>
                    </div>

                    <p className="whitespace-pre-wrap text-sm text-muted-foreground">
                      {answer.problem.description}
                    </p>

                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="mb-1 text-xs font-medium">
                        Candidate answer
                      </p>
                      <p className="whitespace-pre-wrap break-words text-sm">
                        {answer.answer || "No answer provided"}
                      </p>
                    </div>

                    {manuallyEvaluated ? (
                      <div className="flex flex-wrap items-end gap-3">
                        <label className="space-y-1">
                          <span className="block text-xs text-muted-foreground">
                            Marks (max {answer.problem.marks})
                          </span>
                          <input
                            type="number"
                            min={0}
                            max={answer.problem.marks}
                            step="any"
                            value={marks[answer.id] ?? ""}
                            disabled={
                              isAnswerEvaluated ||
                              evaluateAnswerMutation.isPending
                            }
                            onChange={(event) =>
                              setMarks((previous) => ({
                                ...previous,
                                [answer.id]: event.target.value,
                              }))
                            }
                            className="h-10 w-32 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
                          />
                        </label>

                        <Button
                          type="button"
                          disabled={
                            isAnswerEvaluated ||
                            evaluateAnswerMutation.isPending
                          }
                          onClick={() => handleEvaluateAnswer(answer)}
                        >
                          {isAnswerEvaluated
                            ? "Previously evaluated"
                            : evaluateAnswerMutation.isPending
                              ? "Saving..."
                              : "Save Marks"}
                        </Button>

                        {isAnswerEvaluated && (
                          <span className="text-xs text-muted-foreground">
                            Saved: {answer.marks ?? 0} marks
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Automatic MCQ score: {answer.marks ?? 0} /{" "}
                        {answer.problem.marks}
                      </p>
                    )}
                  </article>
                );
              })
            )}

            {selectedSubmission?.status === "EVALUATED" && (
              <p className="text-sm text-muted-foreground">
                This submission has been evaluated. You can create its result
                from the submission card.
              </p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
