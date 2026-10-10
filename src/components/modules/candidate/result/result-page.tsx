
"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock3,
  FileText,
  LoaderCircle,
  RefreshCw,
  XCircle,
} from "lucide-react";

import { useMyResults } from "@/hook/result.hook";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function formatDate(date: string | null | undefined) {
  if (!date) return "Not available";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Not available";
  }

  return parsedDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function ResultsPage() {
  const {
    data: resultsResponse,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useMyResults();

  const results = resultsResponse?.data ?? [];

  const errorMessage =
    error instanceof Error ? error.message : "Unable to load results.";

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoaderCircle className="mr-2 h-6 w-6 animate-spin" />
        <span className="text-sm text-muted-foreground">
          Loading your results...
        </span>
      </div>
    );
  }

  return (
    <main className="space-y-6 p-4 md:p-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            Candidate Dashboard
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            My Results
          </h1>

          <p className="text-sm text-muted-foreground">
            View your published assessment results and scores.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => void refetch()}
          disabled={isFetching}
        >
          {isFetching ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      {isError ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <AlertCircle className="h-10 w-10 text-muted-foreground" />

            <h2 className="text-lg font-semibold">
              Unable to load results
            </h2>

            <p className="max-w-md text-sm text-muted-foreground">
              {errorMessage}
            </p>

            <p className="text-sm text-muted-foreground">
              If your result has not been published yet, it will appear here
              after the company publishes it.
            </p>

            <Button onClick={() => void refetch()} variant="outline">
              Try again
            </Button>
          </CardContent>
        </Card>
      ) : results.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
            <div className="rounded-full bg-muted p-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>

            <h2 className="text-xl font-semibold">
              No published results yet
            </h2>

            <p className="max-w-md text-sm text-muted-foreground">
              Your results will appear here after your assessment has been
              evaluated and published by the company.
            </p>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-muted p-3">
                  <Award className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">
                    Published results
                  </p>
                  <p className="text-2xl font-bold">{results.length}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-muted p-3">
                  <CheckCircle2 className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Passed</p>
                  <p className="text-2xl font-bold">
                    {results.filter((result) => result.status === "PASSED").length}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-5">
                <div className="rounded-lg bg-muted p-3">
                  <XCircle className="h-6 w-6" />
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <p className="text-2xl font-bold">
                    {results.filter((result) => result.status === "FAILED").length}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <section className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold">Assessment history</h2>
              <p className="text-sm text-muted-foreground">
                Your published assessment scores.
              </p>
            </div>

            <div className="grid gap-4">
              {results.map((result) => (
                <Card key={result.id}>
                  <CardHeader>
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">
                          {result.assessment?.title ?? "Assessment"}
                        </CardTitle>

                        <CardDescription>
                          Published on {formatDate(result.publishedAt)}
                        </CardDescription>
                      </div>

                      <Badge
                        variant={
                          result.status === "PASSED"
                            ? "default"
                            : result.status === "FAILED"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {result.status.replaceAll("_", " ")}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Obtained marks
                        </p>
                        <p className="mt-1 text-2xl font-bold">
                          {result.obtainedMarks}
                          <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            / {result.totalMarks}
                          </span>
                        </p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Percentage
                        </p>
                        <p className="mt-1 text-2xl font-bold">
                          {Number(result.percentage).toFixed(2)}%
                        </p>
                      </div>

                      <div className="rounded-lg border p-4">
                        <p className="text-sm text-muted-foreground">
                          Submitted on
                        </p>
                        <p className="mt-2 flex items-center gap-2 text-sm font-medium">
                          <Clock3 className="h-4 w-4 text-muted-foreground" />
                          {formatDate(result.submission?.submittedAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex justify-end border-t pt-4">
                      <Button variant="outline">
                        <Link href={`/candidate/results/${result.id}`}>
                          View details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}
