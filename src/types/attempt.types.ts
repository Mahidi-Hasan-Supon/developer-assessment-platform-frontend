import { AssessmentStatus } from "./assessment.types";

export type AttemptStatus =
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "EXPIRED"
  | "AUTO_SUBMITTED";

export interface CreateAttemptPayload {
  invitationId: string;
}

export interface AttemptProblem {
  id: string;
  order: number;
  marks: number | null;
  problem: {
    id: string;
    title: string;
    description: string;
    type: "MCQ" | "CODING" | "WRITTEN";
    difficulty: string;
    marks: number;
    options: unknown;
  };
}

export interface CreateAttemptPayload {
  invitationId: string;
}

export interface AttemptQuery {
  searchTerm?: string;
  status?: AttemptStatus;
  assessmentId?: string;
  candidateId?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface AttemptProblem {
  id: string;
  order: number;
  marks: number | null;
  problem: {
    id: string;
    title: string;
    description: string;
    type: "MCQ" | "CODING" | "WRITTEN";
    difficulty: string;
    marks: number;
    options: unknown;
  };
}

export interface Attempt {
  id: string;
  invitationId: string;
  candidateId: string;
  assessmentId: string;
  status: AttemptStatus;
  startedAt: string;
  expiresAt: string;
  submittedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;

  candidate?: {
    id: string;
    name: string;
    email: string;
  };

  assessment: {
    id: string;
    title: string;
    description?: string | null;
    durationMinutes: number;
    totalMarks: number;
    passMarks: number;
    status?: AssessmentStatus;
    assessmentProblems?: AttemptProblem[];
  };

  invitation?: {
    id: string;
    status?: string;
  };

  submission?: {
    id: string;
    status: string;
    totalMarks: number;
    obtainedMarks: number;
  } | null;
}

export interface AttemptListResponse {
  success: boolean;
  message: string;
  data: Attempt[];
  meta: PaginationMeta;
}
