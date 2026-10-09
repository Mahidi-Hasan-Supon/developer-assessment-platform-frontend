import type { AssessmentStatus } from "./assessment.types";

export type InvitationStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "USED"
  | "EXPIRED";

export interface InvitationAssessment {
  id: string;
  title: string;
  description?: string | null;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  price: number;
  status: AssessmentStatus;
}

export interface Invitation {
  id: string;
  assessmentId: string;
  candidateId: string;
  status: InvitationStatus;
  invitedAt?: string;
  acceptedAt?: string | null;
  expiresAt?: string | null;
  createdAt: string;
  candidate?: Candidate;
  assessment?: InvitationAssessment;
}

export interface CreateInvitationPayload {
  assessmentId: string;
  candidateId: string;
  expiresAt?: string;
}

export interface UpdateInvitationStatusPayload {
  status: "ACCEPTED" | "REJECTED";
}

export interface InvitationQuery {
  searchTerm?: string;
  status?: InvitationStatus;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface Candidate {
  id: string;
  name: string;
  email: string;
}

export interface CandidateQuery {
  searchTerm?: string;
  page?: number;
  limit?: number;
}

export interface CandidateMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
