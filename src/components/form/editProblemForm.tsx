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

import { useProblemById, useUpdateProblem } from "@/hook";

import type {
  Difficulty,
  ProblemType,
  UpdateProblemPayload,
} from "@/types/problem.types";
import { updateProblemSchema } from "@/validation";


interface EditProblemFormProps {
  problemId: string;
}

const EditProblemForm = ({
  problemId,
}: EditProblemFormProps) => {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useProblemById(problemId);

  const {
    mutate: updateProblem,
    isPending: updateProblemPending,
  } = useUpdateProblem();

  const form = useForm({
    defaultValues: {
      title: "",
      description: "",
      type: "MCQ" as ProblemType,
      difficulty: "EASY" as Difficulty,
      marks: 1,
      options: "",
      answer: "",
    },

    validators: {
      onSubmit: updateProblemSchema,
    },

    onSubmit: ({ value }) => {
      const problemData: UpdateProblemPayload = {
        title: value.title,
        description: value.description,
        type: value.type,
        difficulty: value.difficulty,
        marks: value.marks,
        options:
          value.type === "MCQ" && value.options
            ? value.options
                .split("\n")
                .map((option) => option.trim())
                .filter(Boolean)
            : undefined,
        answer: value.answer || undefined,
      };

      updateProblem(
        {
          id: problemId,
          payload: problemData,
        },
        {
          onSuccess: (res) => {
            if (!res.success) {
              toast.add({
                title: "Problem update failed",
                description:
                  "Something went wrong. Please try again.",
                type: "error",
              });

              return;
            }

            toast.add({
              title: "Problem updated successfully",
              description:
                "The problem has been updated successfully.",
              type: "success",
            });

            router.push("/company/problems");
          },

          onError: (err) => {
            toast.add({
              title: "Problem update failed",
              description:
                err.message ||
                "Something went wrong. Please try again.",
              type: "error",
            });
          },
        },
      );
    },
  });

  useEffect(() => {
    const problem = data?.data;

    if (!problem) return;

    const problemOptions = Array.isArray(problem.options)
      ? problem.options.join("\n")
      : "";

    form.setFieldValue("title", problem.title);
    form.setFieldValue(
      "description",
      problem.description,
    );
    form.setFieldValue("type", problem.type);
    form.setFieldValue(
      "difficulty",
      problem.difficulty,
    );
    form.setFieldValue("marks", problem.marks);
    form.setFieldValue("options", problemOptions);
    form.setFieldValue(
      "answer",
      problem.answer ?? "",
    );
  }, [data, form]);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <p className="text-sm text-muted-foreground">
          Loading problem...
        </p>
      </div>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-10">
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">
            Failed to load problem.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Edit Problem
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Update the problem details.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Title */}
          <form.Field name="title">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Title
                  </FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Description */}
          <form.Field name="description">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched &&
                !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>
                    Description
                  </FieldLabel>

                  <Textarea
                    id={field.name}
                    name={field.name}
                    rows={5}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) =>
                      field.handleChange(e.target.value)
                    }
                    aria-invalid={isInvalid}
                  />

                  {isInvalid && (
                    <FieldError
                      errors={field.state.meta.errors}
                    />
                  )}
                </Field>
              );
            }}
          </form.Field>

          {/* Type + Difficulty */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Type */}
            <form.Field name="type">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Problem Type
                    </FieldLabel>

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as ProblemType,
                        )
                      }
                      aria-invalid={isInvalid}
                      className="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <option value="MCQ">
                        Multiple Choice
                      </option>

                      <option value="WRITTEN">
                        Written
                      </option>

                      <option value="CODING">
                        Coding
                      </option>
                    </select>

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Difficulty */}
            <form.Field name="difficulty">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Difficulty
                    </FieldLabel>

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          e.target.value as Difficulty,
                        )
                      }
                      aria-invalid={isInvalid}
                      className="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Marks + Answer */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Marks */}
            <form.Field name="marks">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Marks
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(
                          Number(e.target.value),
                        )
                      }
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Answer */}
            <form.Field name="answer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Answer
                    </FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                      aria-invalid={isInvalid}
                    />

                    {isInvalid && (
                      <FieldError
                        errors={field.state.meta.errors}
                      />
                    )}
                  </Field>
                );
              }}
            </form.Field>
          </div>

          {/* Options */}
          <form.Subscribe
            selector={(state) => state.values.type}
          >
            {(problemType) => (
              <form.Field name="options">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched &&
                    !field.state.meta.isValid;

                  const options = field.state.value
                    ? field.state.value.split("\n")
                    : ["", "", "", ""];

                  const optionLabels = [
                    "A",
                    "B",
                    "C",
                    "D",
                  ];

                  const optionKeys = [
                    "option-a",
                    "option-b",
                    "option-c",
                    "option-d",
                  ];

                  const isMcq = problemType === "MCQ";

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Options</FieldLabel>

                      <div className="space-y-3">
                        {optionKeys.map((key, index) => (
                          <div
                            key={key}
                            className="flex items-center gap-3"
                          >
                            <span className="w-6 font-medium">
                              {optionLabels[index]}
                            </span>

                            <Input
                              type="text"
                              placeholder={
                                isMcq
                                  ? `Option ${optionLabels[index]}`
                                  : "Not available for this type"
                              }
                              value={
                                isMcq
                                  ? (options[index] ?? "")
                                  : ""
                              }
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                if (!isMcq) return;

                                const updatedOptions = [
                                  ...options,
                                ];

                                updatedOptions[index] =
                                  e.target.value;

                                field.handleChange(
                                  updatedOptions.join("\n"),
                                );
                              }}
                              disabled={!isMcq}
                              aria-invalid={isInvalid}
                            />
                          </div>
                        ))}
                      </div>

                      {isInvalid && (
                        <FieldError
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            )}
          </form.Subscribe>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                router.push("/company/problems")
              }
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={updateProblemPending}
            >
              {updateProblemPending && <Spinner />}
              Update Problem
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default EditProblemForm;