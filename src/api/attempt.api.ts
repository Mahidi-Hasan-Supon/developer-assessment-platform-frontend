import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import type { Attempt, AttemptListResponse, AttemptQuery, CreateAttemptPayload } from "@/types/attempt.types";

export function startAttempt(payload: CreateAttemptPayload) {
  return apiClient<ApiResponse<Attempt>>("/attempt", {
    method: "POST",
    body: payload,
  });
}

export function getMyAttempts() {
  return apiClient<ApiResponse<Attempt[]>>("/attempt/my");
}

export function getAttemptById(attemptId: string) {
  if (!attemptId || attemptId === "undefined") {
    throw new Error("Attempt ID is missing from the URL.");
  }

  return apiClient<ApiResponse<Attempt>>(
    `/attempt/${encodeURIComponent(attemptId)}`,
  );
}

export function submitAttempt(submissionId: string) {
  console.log("🔥 API received submission ID:", submissionId);

  return apiClient<ApiResponse<Attempt>>(`/submission/${submissionId}/submit`, {
    method: "PATCH",
  });
}



export function getAllAttempts(params: AttemptQuery) {
  return apiClient<AttemptListResponse>("/attempt", {
    method: "GET",
    query: {
      ...(params.searchTerm ? { searchTerm: params.searchTerm } : {}),
      ...(params.status ? { status: params.status } : {}),
      ...(params.assessmentId ? { assessmentId: params.assessmentId } : {}),
      ...(params.candidateId ? { candidateId: params.candidateId } : {}),
      page: params.page ?? 1,
      limit: params.limit ?? 10,
      sortBy: params.sortBy ?? "createdAt",
      sortOrder: params.sortOrder ?? "desc",
    },
  });
}





