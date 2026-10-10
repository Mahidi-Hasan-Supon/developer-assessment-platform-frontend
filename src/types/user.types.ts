export type UserStatus = "ACTIVE" | "BLOCKED";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  role: "CANDIDATE";
  status: UserStatus;
  emailVerified: boolean;
  createdAt: string;
}

export interface CandidateListParams {
  search?: string;
  status?: UserStatus;
  page?: number;
  limit?: number;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface CandidateListResponse {
  success: boolean;
  message: string;
  data: Candidate[];
  meta: PaginationMeta;
}

export interface CandidateStatusResponse {
  success: boolean;
  message: string;
  data: Pick<Candidate, "id" | "name" | "email" | "role" | "status"> & {
    updatedAt: string;
  };
}
