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

export interface Attempt {
  id: string;
  invitationId: string;
  candidateId: string;
  assessmentId: string;
  status: "IN_PROGRESS" | "SUBMITTED" | "EXPIRED" | "AUTO_SUBMITTED";
  startedAt: string;
  expiresAt: string;
  submittedAt?: string | null;
  assessment: {
    id: string;
    title: string;
    description?: string | null;
    durationMinutes: number;
    totalMarks: number;
    passMarks: number;
    assessmentProblems: AttemptProblem[];
  };
  submission?: {
    id: string;
    status: string;
    totalMarks: number;
    obtainedMarks: number;
  } | null;
}
