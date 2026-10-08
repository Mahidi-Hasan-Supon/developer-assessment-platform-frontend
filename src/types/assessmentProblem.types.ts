
export interface CreateAssessmentProblemPayload {
  problemId: string;
  order: number;
  marks?: number;
}

export interface AssessmentProblem {
  id: string;
  assessmentId: string;
  problemId: string;
  order: number;
  marks: number | null;
  createdAt: string;
  updatedAt: string;
}