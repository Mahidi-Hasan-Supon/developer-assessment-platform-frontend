"use client";

import { useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { useAssessmentById, useUpdateAssessment } from "@/hook";

import type { UpdateAssessmentPayload } from "@/types/assessment.types";
import { updateAssessmentSchema } from "@/validation/assessmentValidation";


interface EditAssessmentFormProps {
  assessmentId: string;
}

const EditAssessmentForm = ({ assessmentId }: EditAssessmentFormProps) => {
  const router = useRouter();

  const { data, isLoading, isError } = useAssessmentById(assessmentId);

  const { mutate: updateAssessment, isPending: updateAssessmentPending } =
    useUpdateAssessment();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      durationMinutes: 60,
      totalMarks: 100,
      passMarks: 40,
      price: 0,
    },

    validators: {
      onSubmit: updateAssessmentSchema,
    },

    onSubmit: ({ value }) => {
      const assessmentData: UpdateAssessmentPayload = {
        title: value.title,
        description: value.description || undefined,
        durationMinutes: value.durationMinutes,
        totalMarks: value.totalMarks,
        passMarks: value.passMarks,
        price: value.price,
      };

      updateAssessment(
        {
          id: assessmentId,
          payload: assessmentData,
        },
        {
          onSuccess: (response) => {
            toast.add({
              title: "Assessment updated",
              description:
                response.message || "Assessment updated successfully.",
              type: "success",
            });

            router.push("/company/assessments");
          },

          onError: (error) => {
            toast.add({
              title: "Failed to update assessment",
              description:
                error instanceof Error
                  ? error.message
                  : "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    const assessment = data?.data;

    if (!assessment) return;

    form.setFieldValue("title", assessment.title);
    form.setFieldValue("description", assessment.description ?? "");
    form.setFieldValue("durationMinutes", assessment.durationMinutes);
    form.setFieldValue("totalMarks", assessment.totalMarks);
    form.setFieldValue("passMarks", assessment.passMarks);
    form.setFieldValue("price", assessment.price);
  }, [data, form]);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-10 text-center">
        <p className="text-destructive">Failed to load assessment.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mb-6 sm:mb-8 lg:mb-10">
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl lg:text-3xl">
          Edit Assessment
        </h1>

        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
          Update the basic information of your assessment.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Title */}
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Assessment Title</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g. Full Stack Web Development Assessment"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Description</FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    placeholder="Describe what this assessment covers..."
                    rows={4}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Duration + Price */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
            <form.Field name="durationMinutes">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Duration (minutes)
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            <form.Field name="price">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Price (BDT)</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={0}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

          {/* Total Marks + Pass Marks */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:gap-8">
            <form.Field name="totalMarks">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Total Marks</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

            <form.Field name="passMarks">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Pass Marks</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(Number(e.target.value))
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

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-end sm:pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateAssessmentPending}
              className="w-full sm:w-auto"
            >
              {updateAssessmentPending ? (
                <>
                  <Spinner />
                  Updating assessment...
                </>
              ) : (
                "Update Assessment"
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default EditAssessmentForm;
