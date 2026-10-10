import apiClient from "@/lib/apiClient";
import type {
  CandidateListParams,
  CandidateListResponse,
  CandidateStatusResponse,
  UserStatus,
} from "@/types/user.types";

export function getAllCandidates(params: CandidateListParams) {
  return apiClient<CandidateListResponse>("/users/candidates", {
    method: "GET",
    query: {
      ...(params.search ? { search: params.search } : {}),
      ...(params.status ? { status: params.status } : {}),
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  });
}

export function updateCandidateStatus(id: string, status: UserStatus) {
  return apiClient<CandidateStatusResponse>(`/users/candidates/${id}/status`, {
    method: "PATCH",
    body: { status },
  });
}
