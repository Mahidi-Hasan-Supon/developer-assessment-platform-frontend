import type { Problem } from "@/types/problem.types";
import type { Assessment } from "@/types/assessment.types";

export interface AssessmentProblem {
  id: string;
  assessmentId: string;
  problemId: string;
  order: number;
  marks: number | null;
  createdAt: string;
  updatedAt: string;

  problem?: Problem;
  assessment?: Assessment;
}

export interface CreateAssessmentProblemPayload {
  problemId: string;
  order: number;
  marks?: number;
}

export interface UpdateAssessmentProblemPayload {
  order?: number;
  marks?: number;
}

export interface AssessmentProblemQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  sortOrder?: "asc" | "desc";
}
