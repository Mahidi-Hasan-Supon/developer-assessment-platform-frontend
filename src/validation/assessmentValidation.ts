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
