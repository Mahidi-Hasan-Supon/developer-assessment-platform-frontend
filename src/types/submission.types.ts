import type { ResultItem } from "@/types/result.types";
import { ProblemType } from "./problem.types";

export type SubmissionStatus = "PENDING" | "EVALUATED";

export interface MySubmissionsMeta {
  page?: number;
  limit?: number;
  total?: number;
  status?:string;
  totalPages?: number;
}

export interface SubmissionProblem {
  id: string;
  title: string;
  description: string;
  type: ProblemType;
  difficulty: string;
  marks: number;
  options?: unknown;
}

export interface SubmissionAnswer {
  id: string;
  submissionId: string;
  problemId: string;
  answer: string | null;
  marks: number | null;
  isCorrect: boolean | null;
  evaluatedAt: string | null;
  problem: SubmissionProblem;
}

export interface CompanySubmission {
  id: string;
  status: SubmissionStatus;
  totalMarks: number;
  obtainedMarks: number;
  createdAt: string;
  evaluatedAt: string | null;
  attempt: {
    id: string;
    candidateId: string;
    assessmentId: string;
    assessment: {
      id: string;
      title: string;
      description?: string | null;
      totalMarks: number;
      passMarks: number;
    };
  };
  answers: SubmissionAnswer[];
  result?: ResultItem | null;
}

export interface EvaluateAnswerPayload {
  marks: number;
}

export interface MySubmission {
  id: string;
  status: SubmissionStatus;
  totalMarks: number;
  obtainedMarks: number;
  createdAt: string;
  evaluatedAt: string | null;
  attempt: {
    id: string;
    candidateId: string;
    submittedAt?: string | null;
    assessmentId: string;
    assessment: {
      id: string;
      title: string;
      description?: string | null;
      totalMarks: number;
      passMarks: number;
    };
  };
}
