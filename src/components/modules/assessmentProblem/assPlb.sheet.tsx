"use client";

import { useForm } from "@tanstack/react-form";

import { useCreateAssessmentProblem, useProblems } from "@/hook";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";

interface AddAssessmentProblemSheetProps {
  assessmentId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddAssessmentProblemSheet = ({
  assessmentId,
  open,
  onOpenChange,
}: AddAssessmentProblemSheetProps) => {
  const { data, isLoading } = useProblems({
    page: 1,
    limit: 100,
  });

  const createMutation = useCreateAssessmentProblem();

  const problems = data?.data ?? [];

  const form = useForm({
    defaultValues: {
      problemId: "",
      order: 1,
      marks: 0,
    },

    onSubmit: ({ value }) => {
      const payload = {
        problemId: value.problemId,
        order: value.order,
        marks: value.marks > 0 ? value.marks : undefined,
      };

      createMutation.mutate(
        {
          assessmentId,
          payload,
        },
        {
          onSuccess: (response) => {
            if (!response.success) {
              toast.add({
                title: "Failed",
                description: response.message || "Failed to add problem.",
                type: "error",
              });

              return;
            }

            toast.add({
              title: "Problem added",
              description: "Problem has been added to the assessment.",
              type: "success",
            });

            form.reset();
            onOpenChange(false);
          },

          onError: (error) => {
            toast.add({
              title: "Failed",
              description: error.message || "Failed to add problem.",
              type: "error",
            });
          },
        },
      );
    },
  });

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-lg ">
        <SheetHeader>
          <SheetTitle>Add Problem</SheetTitle>

          <SheetDescription>
            Select an existing problem and add it to this assessment.
          </SheetDescription>
        </SheetHeader>

        <form
          id="add-assessment-problem-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-1 flex-col"
        >
          <FieldGroup className="flex-1 px-4 py-6 border border-amber-200">
            {/* Problem */}
            <form.Field name="problemId">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Problem</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) => field.handleChange(value || "")}
                      disabled={isLoading}
                    >
                      <SelectTrigger id={field.name} aria-invalid={isInvalid}>
                        <SelectValue
                          placeholder={
                            isLoading
                              ? "Loading problems..."
                              : "Select a problem"
                          }
                        />
                      </SelectTrigger>

                      <SelectContent>
                        {problems.length === 0 ? (
                          <SelectItem value="no-problems" disabled>
                            No problems found
                          </SelectItem>
                        ) : (
                          problems.map((problem) => (
                            <SelectItem key={problem.id} value={problem.id}>
                              <div className="flex w-full items-center justify-between gap-4">
                                <div className="min-w-0">
                                  <p className="truncate font-medium">
                                    {problem.title}
                                  </p>

                                  <div className="mt-1 flex items-center gap-2 text-xs">
                                    <span
                                      className={
                                        problem.type === "MCQ"
                                          ? "text-blue-600 dark:text-blue-400"
                                          : problem.type === "WRITTEN"
                                            ? "text-purple-600 dark:text-purple-400"
                                            : "text-orange-600 dark:text-orange-400"
                                      }
                                    >
                                      {problem.type}
                                    </span>

                                    <span className="text-muted-foreground">
                                      •
                                    </span>

                                    <span
                                      className={
                                        problem.difficulty === "EASY"
                                          ? "text-green-600 dark:text-green-400"
                                          : problem.difficulty === "MEDIUM"
                                            ? "text-yellow-600 dark:text-yellow-400"
                                            : "text-red-600 dark:text-red-400"
                                      }
                                    >
                                      {problem.difficulty}
                                    </span>
                                  </div>
                                </div>

                                <span className="shrink-0 text-xs text-muted-foreground">
                                  {problem.marks} marks
                                </span>
                              </div>
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Selected Problem Preview */}
            <form.Subscribe selector={(state) => state.values.problemId}>
              {(problemId) => {
                const selectedProblem = problems.find(
                  (problem) => problem.id === problemId,
                );

                if (!selectedProblem) {
                  return null;
                }

                return (
                  <div className="rounded-lg border bg-muted/30 p-4">
                    <p className="font-medium">{selectedProblem.title}</p>

                    <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                      {selectedProblem.description}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <Badge
                        className={
                          selectedProblem.type === "MCQ"
                            ? "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300"
                            : selectedProblem.type === "WRITTEN"
                              ? "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300"
                              : "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-300"
                        }
                      >
                        {selectedProblem.type}
                      </Badge>

                      <Badge
                        className={
                          selectedProblem.difficulty === "EASY"
                            ? "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300"
                            : selectedProblem.difficulty === "MEDIUM"
                              ? "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300"
                              : "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300"
                        }
                      >
                        {selectedProblem.difficulty}
                      </Badge>

                      <Badge variant="outline">
                        {selectedProblem.marks} marks
                      </Badge>
                    </div>
                  </div>
                );
              }}
            </form.Subscribe>

            <div className="grid gap-4 sm:grid-cols-2">
              {/* Order */}
              <form.Field name="order">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Order</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={1}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(Number(event.target.value))
                        }
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Marks */}
              <form.Field name="marks">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Marks</FieldLabel>

                      <Input
                        id={field.name}
                        name={field.name}
                        type="number"
                        min={1}
                        placeholder="Optional"
                        value={field.state.value || ""}
                        onBlur={field.handleBlur}
                        onChange={(event) =>
                          field.handleChange(Number(event.target.value))
                        }
                        aria-invalid={isInvalid}
                      />

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            </div>
          </FieldGroup>

          <SheetFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              form="add-assessment-problem-form"
              disabled={createMutation.isPending}
            >
              {createMutation.isPending && <Spinner />}
              Add Problem
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default AddAssessmentProblemSheet;
