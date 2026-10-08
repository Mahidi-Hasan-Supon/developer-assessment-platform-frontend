import { z } from "zod";

export const createProblemSchema = z
  .object({
    title: z.string().min(1, "Title is required"),

    description: z.string().min(1, "Description is required"),

    type: z.enum(["MCQ", "WRITTEN", "CODING"]),

    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),

    marks: z
      .number()
      .int("Marks must be an integer")
      .positive("Marks must be greater than 0"),

    options: z.string(),

    answer: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "MCQ" && !data.options.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Options are required for MCQ",
      });
    }

    if (data.type === "MCQ" && !data.answer.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["answer"],
        message: "Answer is required for MCQ",
      });
    }
  });

export type CreateProblemFormValues = z.infer<
  typeof createProblemSchema
>;


export const updateProblemSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    type: z.enum(["MCQ", "WRITTEN", "CODING"]),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"]),
    marks: z
      .number()
      .int("Marks must be an integer")
      .positive("Marks must be greater than 0"),
    options: z.string(),
    answer: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "MCQ" && !data.options.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["options"],
        message: "Options are required for MCQ",
      });
    }

    if (data.type === "MCQ" && !data.answer.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["answer"],
        message: "Answer is required for MCQ",
      });
    }
  });