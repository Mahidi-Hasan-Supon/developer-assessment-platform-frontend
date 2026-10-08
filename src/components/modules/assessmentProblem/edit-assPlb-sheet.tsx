"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";



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
import { toast } from "@/components/ui/toast";
import { AssessmentProblem } from "@/types";
import { useUpdateAssessmentProblem } from "@/hook";

interface EditAssessmentProblemSheetProps {
  assessmentId: string;
  assessmentProblem: AssessmentProblem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditAssessmentProblemSheet = ({
  assessmentId,
  assessmentProblem,
  open,
  onOpenChange,
}: EditAssessmentProblemSheetProps) => {
  const updateMutation = useUpdateAssessmentProblem();

  const form = useForm({
    defaultValues: {
      order: 1,
      marks: 0,
    },

    onSubmit: ({ value }) => {
      if (!assessmentProblem) return;

      const payload = {
        order: value.order,
        marks: value.marks > 0 ? value.marks : undefined,
      };

      updateMutation.mutate(
        {
          assessmentId,
          problemId: assessmentProblem.problemId,
          payload,
        },
        {
          onSuccess: (response) => {
            if (!response.success) {
              toast.add({
                title: "Update failed",
                description: response.message || "Failed to update problem.",
                type: "error",
              });

              return;
            }

            toast.add({
              title: "Problem updated",
              description: "Assessment problem has been updated.",
              type: "success",
            });

            onOpenChange(false);
          },

          onError: (error) => {
            toast.add({
              title: "Update failed",
              description: error.message || "Failed to update problem.",
              type: "error",
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    if (!assessmentProblem) return;

    form.setFieldValue("order", assessmentProblem.order);

    form.setFieldValue("marks", assessmentProblem.marks ?? 0);
  }, [assessmentProblem, form]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Edit Assessment Problem</SheetTitle>

          <SheetDescription>
            Update the order and marks for this problem.
          </SheetDescription>
        </SheetHeader>

        <form
          id="edit-assessment-problem-form"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            form.handleSubmit();
          }}
          className="flex flex-1 flex-col"
        >
          <FieldGroup className="flex-1 px-4 py-6">
            <Field>
              <FieldLabel>Problem</FieldLabel>

              <div className="rounded-md border bg-muted/30 px-3 py-2">
                <p className="text-sm font-medium">
                  {assessmentProblem?.problem?.title || "Problem"}
                </p>

                {assessmentProblem?.problem?.description && (
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                    {assessmentProblem.problem.description}
                  </p>
                )}
              </div>
            </Field>

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
              form="edit-assessment-problem-form"
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending && <Spinner />}
              Update Problem
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default EditAssessmentProblemSheet;
