export type ResultStatus = "PENDING" | "PASSED" | "FAILED";

export interface ResultItem {
  id: string;
  totalMarks: number;
  obtainedMarks: number;
  percentage: number;
  status: ResultStatus;
  evaluatedAt: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  submissionId: string;
  candidateId: string;
  assessmentId: string;

  assessment: {
    id: string;
    title: string;
    description?: string | null;
    durationMinutes?: number;
    totalMarks?: number;
    passMarks?: number;
  };

  submission: {
    id: string;
    submittedAt: string | null;
    totalMarks: number;
    obtainedMarks: number;
  };
}