"use client";

import { useForm } from "@tanstack/react-form";
import { createAssessmentProblemSchema } from "@/validation/assessmentProblem.validation";
import type { CreateAssessmentProblemPayload } from "@/types/assessmentProblem.types";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type AssessmentOption = {
  id: string;
  title: string;
  status: string;
  durationMinutes: number;
  totalMarks: number;
  description?: string | null;
};

type ProblemOption = {
  id: string;
  title: string;
  type: string;
  difficulty: string;
  marks: number;
  description?: string | null;
};

type AssessmentProblemFormProps = {
  assessments: AssessmentOption[];
  problems: ProblemOption[];
  isPending: boolean;
  onSubmit: (
    assessmentId: string,
    payload: CreateAssessmentProblemPayload,
  ) => void;
};

export function AssessmentProblemForm({
  assessments,
  problems,
  isPending,
  onSubmit,
}: AssessmentProblemFormProps) {
  const form = useForm({
    defaultValues: {
      assessmentId: "",
      problemId: "",
      order: 1,
      marks: undefined as number | undefined,
    },

    validators: {
      onSubmit: ({ value }) => {
        if (!value.assessmentId) {
          return "Please select an assessment.";
        }

        const result = createAssessmentProblemSchema.safeParse({
          problemId: value.problemId,
          order: value.order,
          ...(value.marks !== undefined ? { marks: value.marks } : {}),
        });

        return result.success
          ? undefined
          : (result.error.issues[0]?.message ?? "Please check the form.");
      },
    },

    onSubmit: async ({ value }) => {
      const result = createAssessmentProblemSchema.safeParse({
        problemId: value.problemId,
        order: value.order,
        ...(value.marks !== undefined ? { marks: value.marks } : {}),
      });

      if (!result.success || !value.assessmentId) return;

      onSubmit(value.assessmentId, result.data);
    },
  });

  const values = form.state.values;

  const selectedAssessment = assessments.find(
    (item) => item.id === values.assessmentId,
  );

  const selectedProblem = problems.find((item) => item.id === values.problemId);

  return (
    <form
      className="space-y-5"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="assessmentId">
        {(field) => (
          <div className="space-y-2">
            <Label>Assessment</Label>

            <Select
              value={field.state.value}
              onValueChange={(value) => {
                if (value !== null) field.handleChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select assessment" />
              </SelectTrigger>
              <SelectContent>
                {assessments.map((assessment) => (
                  <SelectItem key={assessment.id} value={assessment.id}>
                    {assessment.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedAssessment && (
              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{selectedAssessment.title}</p>
                  <Badge variant="outline">{selectedAssessment.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Duration: {selectedAssessment.durationMinutes} minutes · Total
                  marks: {selectedAssessment.totalMarks}
                </p>
                {selectedAssessment.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedAssessment.description}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </form.Field>

      <form.Field name="problemId">
        {(field) => (
          <div className="space-y-2">
            <Label>Problem</Label>

            <Select
              value={field.state.value}
              onValueChange={(value) => {
                if (value !== null) field.handleChange(value);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select problem" />
              </SelectTrigger>
              <SelectContent>
                {problems.map((problem) => (
                  <SelectItem key={problem.id} value={problem.id}>
                    {problem.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {selectedProblem && (
              <div className="space-y-2 rounded-lg border p-4">
                <p className="font-medium">{selectedProblem.title}</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{selectedProblem.type}</Badge>
                  <Badge variant="outline">{selectedProblem.difficulty}</Badge>
                  <Badge>{selectedProblem.marks} marks</Badge>
                </div>
                {selectedProblem.description && (
                  <p className="text-sm text-muted-foreground">
                    {selectedProblem.description}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </form.Field>

      <form.Field
        name="order"
        validators={{
          onChange: ({ value }) => {
            const result =
              createAssessmentProblemSchema.shape.order.safeParse(value);
            return result.success ? undefined : result.error.issues[0]?.message;
          },
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label>Order</Label>
            <Input
              type="number"
              min={1}
              step={1}
              value={String(field.state.value)}
              onBlur={field.handleBlur}
              onChange={(event) =>
                field.handleChange(event.target.valueAsNumber)
              }
            />
            {field.state.meta.errors.map((error) => (
              <p key={String(error)} className="text-sm text-destructive">
                {String(error)}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <form.Field
        name="marks"
        validators={{
          onChange: ({ value }) => {
            if (value === undefined) return undefined;
            const result =
              createAssessmentProblemSchema.shape.marks.safeParse(value);
            return result.success ? undefined : result.error.issues[0]?.message;
          },
        }}
      >
        {(field) => (
          <div className="space-y-2">
            <Label>Marks (optional)</Label>
            <Input
              type="number"
              min={1}
              step={1}
              placeholder="Enter marks"
              value={
                field.state.value === undefined ? "" : String(field.state.value)
              }
              onBlur={field.handleBlur}
              onChange={(event) => {
                const rawValue = event.target.value;
                field.handleChange(
                  rawValue === "" ? undefined : event.target.valueAsNumber,
                );
              }}
            />
            {field.state.meta.errors.map((error) => (
              <p key={String(error)} className="text-sm text-destructive">
                {String(error)}
              </p>
            ))}
          </div>
        )}
      </form.Field>

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Creating..." : "Create Assessment Problem"}
      </Button>
    </form>
  );
}
