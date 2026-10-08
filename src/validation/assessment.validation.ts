import { z } from "zod";

export const createAssessmentSchema = z
  .object({
    title: z
      .string()
      .min(3, "Title must be at least 3 characters")
      .max(100, "Title cannot exceed 100 characters"),

    description: z
      .string()
      .max(500, "Description cannot exceed 500 characters"),

    durationMinutes: z
      .number({
        error: "Duration is required",
      })
      .min(1, "Duration must be at least 1 minute")
      .max(300, "Duration cannot exceed 300 minutes"),

    totalMarks: z
      .number({
        error: "Total marks is required",
      })
      .min(1, "Total marks must be at least 1"),

    passMarks: z
      .number({
        error: "Pass marks is required",
      })
      .min(1, "Pass marks must be at least 1"),

    price: z
      .number({
        error: "Price is required",
      })
      .min(0, "Price cannot be negative"),
  })
  .refine((data) => data.passMarks <= data.totalMarks, {
    message: "Pass marks cannot be greater than total marks",
    path: ["passMarks"],
  });

