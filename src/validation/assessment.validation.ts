

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
      .string()
      .min(1, "Duration is required")
      .refine((value) => Number.isInteger(Number(value)) && Number(value) > 0, {
        message: "Duration must be a positive whole number",
      }),

    totalMarks: z
      .string()
      .min(1, "Total marks are required")
      .refine((value) => Number(value) > 0, {
        message: "Total marks must be greater than 0",
      }),

    passMarks: z
      .string()
      .min(1, "Pass marks are required")
      .refine((value) => Number(value) >= 0, {
        message: "Pass marks cannot be negative",
      }),

    price: z
      .string()
      .min(1, "Price is required")
      .refine((value) => Number(value) >= 0, {
        message: "Price cannot be negative",
      }),
  })
  .refine(
    (data) => Number(data.passMarks) <= Number(data.totalMarks),
    {
      message: "Pass marks cannot be greater than total marks",
      path: ["passMarks"],
    },
  );
