"use client";

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

import { useCreateProblem } from "@/hook";
import { createProblemSchema } from "@/validation/problem.validation";
import type {
  CreateProblemPayload,
  Difficulty,
  ProblemType,
} from "@/types/problem.types";

const CreateProblemForm = () => {
  const router = useRouter();

  const { mutate: createProblem, isPending: createProblemPending } =
    useCreateProblem();

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
      onSubmit: createProblemSchema,
    },

    onSubmit: ({ value }) => {
      const problemData: CreateProblemPayload = {
        title: value.title,
        description: value.description,
        type: value.type,
        difficulty: value.difficulty,
        marks: value.marks,
        options: value.options
          ? value.options
              .split("\n")
              .map((option) => option.trim())
              .filter(Boolean)
          : undefined,
        answer: value.answer || undefined,
      };

      createProblem(problemData, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.add({
              title: "Problem creation failed",
              description: "Something went wrong. Please try again.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Problem created successfully",
            description: "The problem has been added successfully.",
            type: "success",
          });

          router.push("/company/problems");
        },

        onError: (err) => {
          toast.add({
            title: "Problem creation failed",
            description:
              err.message || "Something went wrong. Please try again.",
            type: "error",
          });
        },
      });
    },
  });

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create Problem
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Create a problem that can be used in your assessments.
        </p>
      </div>

      {/* Form */}
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
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Problem Title</FieldLabel>

                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="Enter problem title"
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
                    placeholder="Describe the problem"
                    rows={6}
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

          {/* Type + Difficulty */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Type */}
            <form.Field name="type">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Problem Type</FieldLabel>

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value as ProblemType)
                      }
                      aria-invalid={isInvalid}
                      className="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <option value="MCQ">Multiple Choice</option>
                      <option value="WRITTEN">Written</option>
                      <option value="CODING">Coding</option>
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Difficulty */}
            <form.Field name="difficulty">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Difficulty</FieldLabel>

                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) =>
                        field.handleChange(e.target.value as Difficulty)
                      }
                      aria-invalid={isInvalid}
                      className="border-input bg-background ring-offset-background focus:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      <option value="EASY">Easy</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HARD">Hard</option>
                    </select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
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
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Marks</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="number"
                      min={1}
                      placeholder="Enter marks"
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

            {/* Answer */}
            <form.Field name="answer">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Answer</FieldLabel>

                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="Enter the correct answer"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
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

          {/* Options */}
          <form.Subscribe selector={(state) => state.values.type}>
            {(problemType) => (
              <form.Field name="options">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  const options = field.state.value
                    ? field.state.value.split("\n")
                    : ["", "", "", ""];

                  const optionLabels = ["A", "B", "C", "D"];

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
                          <div key={key} className="flex items-center gap-3">
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
                              value={isMcq ? (options[index] ?? "") : ""}
                              onBlur={field.handleBlur}
                              onChange={(e) => {
                                if (!isMcq) return;

                                const updatedOptions = [...options];

                                updatedOptions[index] = e.target.value;

                                field.handleChange(updatedOptions.join("\n"));
                              }}
                              disabled={!isMcq}
                              aria-invalid={isInvalid}
                            />
                          </div>
                        ))}
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
            )}
          </form.Subscribe>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/company/problems")}
            >
              Cancel
            </Button>

            <Button disabled={createProblemPending} type="submit">
              {createProblemPending ? (
                <>
                  <Spinner />
                  Creating problem...
                </>
              ) : (
                "Create Problem"
              )}
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default CreateProblemForm;
