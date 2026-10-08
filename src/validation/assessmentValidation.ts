import { z } from "zod";

export const createAssessmentProblemSchema = z.object({
  problemId: z.string().min(1, "Problem ID is required"),

  order: z
    .number()
    .int("Order must be an integer")
    .positive("Order must be greater than 0"),

  marks: z
    .number()
    .int("Marks must be an integer")
    .positive("Marks must be greater than 0")
    .optional(),
});

export const updateAssessmentSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    durationMinutes: z
      .number()
      .int("Duration must be an integer")
      .positive("Duration must be greater than 0"),
    totalMarks: z
      .number()
      .int("Total marks must be an integer")
      .positive("Total marks must be greater than 0"),
    passMarks: z
      .number()
      .int("Pass marks must be an integer")
      .positive("Pass marks must be greater than 0"),
    price: z.number().min(0, "Price cannot be negative"),
  })
  .refine((data) => data.passMarks <= data.totalMarks, {
    path: ["passMarks"],
    message: "Pass marks cannot exceed total marks",
  });
