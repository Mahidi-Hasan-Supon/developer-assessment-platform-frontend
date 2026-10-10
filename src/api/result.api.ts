import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import type { ResultItem } from "@/types/result.types";

export function getMyResults() {
  return apiClient<ApiResponse<ResultItem[]>>("/result/my", {
    method: "GET",
  });
}

export function getResultById(resultId: string) {
  return apiClient<ApiResponse<ResultItem>>(`/result/${resultId}`, {
    method: "GET",
  });
}

export function createResult(submissionId: string) {
  return apiClient<ApiResponse<ResultItem>>("/result", {
    method: "POST",
    body: { submissionId },
  });
}

export function evaluateResult(resultId: string) {
  return apiClient<ApiResponse<ResultItem>>(`/result/${resultId}/evaluate`, {
    method: "PATCH",
  });
}

export function publishResult(resultId: string) {
  return apiClient<ApiResponse<ResultItem>>(`/result/publish/${resultId}`, {
    method: "PATCH",
  });
}
