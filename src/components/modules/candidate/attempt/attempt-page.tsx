"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  Send,
} from "lucide-react";

import {
  useAttemptById,
  useCreateAnswer,
  useMyAnswers,
  useSubmitAttempt,
} from "@/hook";
import type { AttemptProblem } from "@/types/attempt.types";

import { toast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Answers = Record<string, string>;

type SavedAnswer = {
  problemId: string;
  answer: string | null;
};

function getOptions(options: unknown): string[] {
  if (Array.isArray(options)) {
    return options
      .map((option) => {
        if (typeof option === "string") return option;

        if (typeof option === "object" && option !== null) {
          const item = option as Record<string, unknown>;

          return String(
            item.label ?? item.text ?? item.value ?? item.option ?? "",
          );
        }

        return String(option ?? "");
      })
      .filter(Boolean);
  }

  if (typeof options === "object" && options !== null) {
    return Object.values(options as Record<string, unknown>)
      .map((option) => {
        if (typeof option === "string") return option;

        if (typeof option === "object" && option !== null) {
          const item = option as Record<string, unknown>;

          return String(item.label ?? item.text ?? item.value ?? "");
        }

        return String(option ?? "");
      })
      .filter(Boolean);
  }

  return [];
}

function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, totalSeconds);
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  return [
    String(hours).padStart(2, "0"),
    String(minutes).padStart(2, "0"),
    String(seconds).padStart(2, "0"),
  ].join(":");
}

function getErrorMessage(error: unknown): string {
  if (typeof error === "object" && error !== null) {
    const err = error as {
      data?: { message?: string };
      message?: string;
    };

    return (
      err.data?.message ??
      err.message ??
      "Something went wrong. Please try again."
    );
  }

  return "Something went wrong. Please try again.";
}

export default function AttemptPage() {
  const params = useParams<{ id: string }>();
  const attemptId = params.id;

  const {
    data: attemptResponse,
    isLoading,
    isError,
    refetch,
  } = useAttemptById(attemptId);

  const submitMutation = useSubmitAttempt();
  const answerMutation = useCreateAnswer();

  const [answers, setAnswers] = useState<Answers>({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  const autoSubmitStarted = useRef(false);
  const answersRestoredFor = useRef<string | null>(null);

  // API response: { success, data: attempt }
  const attempt = attemptResponse?.data;
  const submissionId = attempt?.submission?.id ?? "";

  // Fetch answers already saved in the backend.
  const { data: savedAnswersResponse, isLoading: isSavedAnswersLoading } =
    useMyAnswers(submissionId);

  const problems: AttemptProblem[] =
    attempt?.assessment?.assessmentProblems ?? [];

  const isInProgress = attempt?.status === "IN_PROGRESS";
  const isSubmitting = submitMutation.isPending;

  // Restore answers after the attempt and saved answers have loaded.
  useEffect(() => {
    if (!submissionId || !savedAnswersResponse) return;

    // Prevent an unnecessary overwrite of answers while navigating.
    if (answersRestoredFor.current === submissionId) return;

    const responseData = savedAnswersResponse.data;

    // Supports either { data: [...] } or { data: { answers: [...] } }.
    const savedAnswers: SavedAnswer[] = Array.isArray(responseData)
      ? responseData
      : Array.isArray(
            (responseData as { answers?: SavedAnswer[] } | undefined)?.answers,
          )
        ? (responseData as { answers: SavedAnswer[] }).answers
        : [];

    const restoredAnswers: Answers = {};

    savedAnswers.forEach((item) => {
      if (item.problemId) {
        restoredAnswers[item.problemId] = item.answer ?? "";
      }
    });

    setAnswers((previous) => ({
      ...restoredAnswers,
      ...previous,
    }));

    answersRestoredFor.current = submissionId;
  }, [submissionId, savedAnswersResponse]);

  const saveAnswer = async (problemId: string, answer: string) => {
    if (!submissionId) {
      toast.add({
        title: "Save failed",
        description: "Submission ID পাওয়া যায়নি।",
        type: "error",
      });
      return;
    }

    try {
      const response = await answerMutation.mutateAsync({
        submissionId,
        problemId,
        answer,
      });

      console.log("Answer saved:", response);
    } catch (error) {
      console.error("Answer save failed:", error);

      toast.add({
        title: "Answer save failed",
        description: getErrorMessage(error),
        type: "error",
      });

      throw error;
    }
  };

  const activeProblem = problems[activeIndex];

  const answeredCount = useMemo(
    () =>
      problems.filter(
        (item) => (answers[item.problem.id] ?? "").trim().length > 0,
      ).length,
    [answers, problems],
  );

  // Keep the timer synchronized with the backend's expiresAt.
  useEffect(() => {
    if (!attempt?.expiresAt || !isInProgress) return;

    const updateTimer = () => {
      const seconds = Math.max(
        0,
        Math.ceil((new Date(attempt.expiresAt).getTime() - Date.now()) / 1000),
      );

      setRemainingSeconds(seconds);
    };

    updateTimer();

    const intervalId = window.setInterval(updateTimer, 1000);

    return () => window.clearInterval(intervalId);
  }, [attempt?.expiresAt, isInProgress]);

  // const submissionId = attempt?.submission?.id ?? "";
  const handleSubmit = async (automatic = false) => {
    if (!attempt?.id || !isInProgress || isSubmitting) return;
    if (autoSubmitStarted.current) return;

    autoSubmitStarted.current = true;
    setSubmitDialogOpen(false);

    try {
      if (!submissionId) {
        throw new Error("Submission ID not found");
      }

      console.log("🔥 ATTEMPT ID:", attempt.id);
      console.log("🔥 SUBMISSION ID:", submissionId);

      const response = await submitMutation.mutateAsync(submissionId);

      if (response && response.success === false) {
        throw new Error(
          response.message ?? "Your attempt could not be submitted.",
        );
      }

      toast.add({
        title: automatic ? "Time is up" : "Attempt submitted",
        description: "Your attempt was submitted successfully.",
        type: "success",
      });

      await refetch();
    } catch (error) {
      autoSubmitStarted.current = false;

      toast.add({
        title: "Submission failed",
        description: getErrorMessage(error),
        type: "error",
      });
    }
  };
  // Auto-submit only when the backend expiry time has actually passed.
  useEffect(() => {
    if (
      remainingSeconds !== 0 ||
      !attempt?.expiresAt ||
      !isInProgress ||
      isLoading ||
      autoSubmitStarted.current
    ) {
      return;
    }

    const expiresAt = new Date(attempt.expiresAt).getTime();

    if (!Number.isFinite(expiresAt)) return;
    if (expiresAt > Date.now()) return;

    void handleSubmit(true);
  }, [remainingSeconds, attempt?.expiresAt, isInProgress, isLoading]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
        <span>Loading assessment...</span>
      </div>
    );
  }

  if (isError || !attempt) {
    return (
      <div className="mx-auto max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Unable to load attempt</CardTitle>
            <CardDescription>
              The attempt could not be loaded. It may not exist, or you may not
              have permission to access it.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void refetch()} variant="outline">
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!activeProblem && problems.length > 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>Assessment questions unavailable</CardTitle>
            <CardDescription>
              Please reload the attempt to load the questions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void refetch()} variant="outline">
              Reload questions
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const isFinished = !isInProgress;

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl space-y-6 p-4 md:p-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Development Assessment
          </p>

          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            {attempt.assessment.title}
          </h1>

          {attempt.assessment.description && (
            <p className="max-w-2xl text-sm text-muted-foreground">
              {attempt.assessment.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2 pt-1">
            <Badge variant="outline">{problems.length} Questions</Badge>
            <Badge variant="outline">
              {attempt.assessment.totalMarks} Marks
            </Badge>
            <Badge variant={isInProgress ? "default" : "secondary"}>
              {attempt.status.replaceAll("_", " ")}
            </Badge>
          </div>
        </div>

        <Card className="w-full md:w-64">
          <CardContent className="flex items-center gap-3 p-4">
            <Clock3 className="h-6 w-6 shrink-0 text-primary" />

            <div>
              <p className="text-sm text-muted-foreground">
                {isInProgress ? "Time remaining" : "Attempt status"}
              </p>
              <p
                className={`font-mono text-2xl font-bold ${
                  remainingSeconds <= 300 && isInProgress
                    ? "text-destructive"
                    : ""
                }`}
              >
                {isInProgress
                  ? formatTime(remainingSeconds)
                  : attempt.status.replaceAll("_", " ")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isFinished && (
        <div className="flex items-start gap-3 rounded-lg border p-4">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="font-medium">This attempt is no longer active.</p>
            <p className="text-sm text-muted-foreground">
              Status: {attempt.status.replaceAll("_", " ")}
            </p>
          </div>
        </div>
      )}

      {problems.length === 0 ? (
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">
              No questions are available for this assessment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="min-w-0">
            {activeProblem && (
              <Card>
                <CardHeader>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="outline">
                      Question {activeIndex + 1} of {problems.length}
                    </Badge>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">
                        {activeProblem.problem.type}
                      </Badge>
                      <Badge variant="outline">
                        {activeProblem.marks ?? activeProblem.problem.marks}{" "}
                        Marks
                      </Badge>
                    </div>
                  </div>

                  <CardTitle className="pt-3 text-xl">
                    {activeProblem.problem.title}
                  </CardTitle>

                  <CardDescription className="whitespace-pre-wrap text-sm leading-7">
                    {activeProblem.problem.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-5">
                  {activeProblem.problem.type === "MCQ" ? (
                    <div className="space-y-3">
                      {getOptions(activeProblem.problem.options).map(
                        (option, index) => {
                          const selected =
                            answers[activeProblem.problem.id] === option;

                          return (
                            <label
                              key={`${activeProblem.problem.id}-${index}`}
                              className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                                selected
                                  ? "border-primary bg-primary/5"
                                  : "hover:bg-muted/50"
                              } ${
                                !isInProgress
                                  ? "cursor-not-allowed opacity-70"
                                  : "cursor-pointer"
                              }`}
                            >
                              <input
                                type="radio"
                                name={activeProblem.problem.id}
                                value={option}
                                checked={selected}
                                disabled={!isInProgress}
                                onChange={() => {
                                  const problemId = activeProblem.problem.id;

                                  setAnswers((previous) => ({
                                    ...previous,
                                    [problemId]: option,
                                  }));

                                  void saveAnswer(problemId, option).catch(
                                    () => {},
                                  );
                                }}
                                className="mt-1 accent-primary"
                              />

                              <span className="text-sm leading-6">
                                {option}
                              </span>
                            </label>
                          );
                        },
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label
                        htmlFor={`answer-${activeProblem.problem.id}`}
                        className="text-sm font-medium"
                      >
                        {activeProblem.problem.type === "CODING"
                          ? "Your code"
                          : "Your answer"}
                      </label>

                      <Textarea
                        id={`answer-${activeProblem.problem.id}`}
                        value={answers[activeProblem.problem.id] ?? ""}
                        disabled={!isInProgress}
                        onChange={(event) =>
                          setAnswers((previous) => ({
                            ...previous,
                            [activeProblem.problem.id]: event.target.value,
                          }))
                        }
                        onBlur={(event) => {
                          const problemId = activeProblem.problem.id;
                          const answer = event.target.value;

                          void saveAnswer(problemId, answer).catch(() => {});
                        }}
                        placeholder={
                          activeProblem.problem.type === "CODING"
                            ? "Write your code here..."
                            : "Write your answer here..."
                        }
                        className={`min-h-48 ${
                          activeProblem.problem.type === "CODING"
                            ? "font-mono"
                            : ""
                        }`}
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                    <Button
                      variant="outline"
                      disabled={activeIndex === 0}
                      onClick={() => setActiveIndex((index) => index - 1)}
                    >
                      Previous
                    </Button>

                    <span className="text-sm text-muted-foreground">
                      {answers[activeProblem.problem.id]?.trim()
                        ? "Answer entered"
                        : "Not answered"}
                    </span>

                    <Button
                      disabled={activeIndex === problems.length - 1}
                      onClick={() => setActiveIndex((index) => index + 1)}
                    >
                      Next question
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </section>

          <aside className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Question navigation</CardTitle>
                <CardDescription>
                  Select a question to go directly to it.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {problems.map((item, index) => {
                    const answered = Boolean(answers[item.problem.id]?.trim());

                    return (
                      <Button
                        key={item.id}
                        type="button"
                        size="icon"
                        variant={
                          activeIndex === index
                            ? "default"
                            : answered
                              ? "secondary"
                              : "outline"
                        }
                        onClick={() => setActiveIndex(index)}
                        aria-label={`Go to question ${index + 1}`}
                        className="h-10 w-full"
                      >
                        {index + 1}
                      </Button>
                    );
                  })}
                </div>

                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Answered</span>
                    <span className="font-medium text-foreground">
                      {answeredCount}/{problems.length}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{
                        width: `${
                          problems.length
                            ? (answeredCount / problems.length) * 100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {isInProgress && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Submit assessment</CardTitle>
                  <CardDescription>
                    Review your answers before submitting.
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <p>
                      You have answered {answeredCount} of {problems.length}{" "}
                      questions.
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    onClick={() => setSubmitDialogOpen(true)}
                    disabled={isSubmitting || autoSubmitStarted.current}
                  >
                    {isSubmitting ? (
                      <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="mr-2 h-4 w-4" />
                    )}
                    Submit attempt
                  </Button>
                </CardContent>
              </Card>
            )}
          </aside>
        </div>
      )}

      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit your assessment?</AlertDialogTitle>

            <AlertDialogDescription>
              You have answered {answeredCount} of {problems.length} questions.
              After submission, you cannot continue this attempt. Are you sure
              you want to submit?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Continue assessment
            </AlertDialogCancel>

            <AlertDialogAction
              disabled={isSubmitting}
              onClick={(event) => {
                event.preventDefault();
                void handleSubmit();
              }}
            >
              {isSubmitting ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Confirm submission"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}
