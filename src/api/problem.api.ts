import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";

import type {
  CreateProblemPayload,
  Problem,
  ProblemQuery,
  UpdateProblemPayload,
} from "@/types/problem.types";

export async function getProblems(params?: ProblemQuery) {
  return apiClient<ApiResponse<Problem[]>>("/problem", {
    method: "GET",
    query: params,
  });
}

export async function getProblemById(id: string) {
  return apiClient<ApiResponse<Problem>>(`/problem/${id}`, {
    method: "GET",
  });
}

export async function createProblem(payload: CreateProblemPayload) {
  return apiClient<ApiResponse<Problem>>("/problem", {
    method: "POST",
    body: payload,
  });
}

export async function updateProblem(id: string, payload: UpdateProblemPayload) {
  return apiClient<ApiResponse<Problem>>(`/problem/${id}`, {
    method: "PATCH",
    body: payload,
  });
}

export async function deleteProblem(id: string) {
  return apiClient<ApiResponse<Problem>>(`/problem/${id}`, {
    method: "DELETE",
  });
}
