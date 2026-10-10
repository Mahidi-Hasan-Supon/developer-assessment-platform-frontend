import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import type { Attempt, CreateAttemptPayload } from "@/types/attempt.types";

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

export function submitAttempt(attemptId: string) {
  return apiClient<ApiResponse<Attempt>>(`/attempt/${attemptId}/submit`, {
    method: "PATCH",
  });
}
