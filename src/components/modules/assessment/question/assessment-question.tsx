"use client";

import Link from "next/link";

import { ArrowLeft, Plus } from "lucide-react";

import { useAssessmentById, useAssessmentProblems } from "@/hook";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AssessmentQuestionsLoading from "./assessment-question-loading";
import AddQuestionDialog from "./add-question-dialog";
import { Badge } from "@/components/ui/badge";

interface AssessmentQuestionsProps {
  assessmentId: string;
}

const AssessmentQuestions = ({ assessmentId }: AssessmentQuestionsProps) => {
  const { data, isLoading, isError } = useAssessmentById(assessmentId);

  const { data: assessmentProblemsData, isLoading: isProblemsLoading } =
    useAssessmentProblems(assessmentId);

  const assessmentProblems = assessmentProblemsData?.data ?? [];

  if (isLoading) {
    return <AssessmentQuestionsLoading />;
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-4 py-10 sm:mx-6 lg:mx-10">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-destructive">Failed to load assessment.</p>

          <Button className="mt-4" variant="outline">
            <Link href="/dashboard/company/assessments">
              Back to Assessments
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const assessment = data.data;

  return (
    <div className="mx-4 space-y-6 py-6 sm:mx-6 lg:mx-10 lg:py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Button variant="ghost" size="sm" className="-ml-2 mb-2">
            <Link href="/dashboard/company/assessments">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Assessments
            </Link>
          </Button>

          <h1 className="text-2xl font-bold tracking-tight">
            {assessment.title}
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Add questions to this assessment.
          </p>
        </div>

        {/* <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button> */}
        <AddQuestionDialog assessmentId={assessmentId} />
      </div>

      {/* Assessment Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Assessment Overview</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>

              <p className="mt-1 font-semibold">
                {assessment.durationMinutes} minutes
              </p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Total Marks</p>

              <p className="mt-1 font-semibold">{assessment.totalMarks}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Pass Marks</p>

              <p className="mt-1 font-semibold">{assessment.passMarks}</p>
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Status</p>

              <p className="mt-1 font-semibold">{assessment.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Questions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Questions ({assessmentProblems.length})</CardTitle>

          <AddQuestionDialog assessmentId={assessmentId} />
        </CardHeader>

        <CardContent>
          {isProblemsLoading ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="h-20 animate-pulse rounded-lg bg-muted"
                />
              ))}
            </div>
          ) : assessmentProblems.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center text-center">
              <div className="rounded-full bg-muted p-4">
                <Plus className="h-6 w-6 text-muted-foreground" />
              </div>

              <h2 className="mt-4 text-lg font-semibold">
                No questions added yet
              </h2>

              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Add questions to build your assessment.
              </p>

              <div className="mt-4">
                <AddQuestionDialog assessmentId={assessmentId} />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {assessmentProblems.map((assessmentProblem) => (
                <div
                  key={assessmentProblem.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <p className="font-medium">
                      Question #{assessmentProblem.order}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Problem ID: {assessmentProblem.problemId}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">
                      {assessmentProblem.marks ?? "Default"} marks
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentQuestions;
