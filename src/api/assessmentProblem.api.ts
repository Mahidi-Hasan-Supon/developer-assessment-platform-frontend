import apiClient from "@/lib/apiClient";

import type {
  ApiResponse,
  AssessmentProblem,
  AssessmentProblemQuery,
  CreateAssessmentProblemPayload,
  UpdateAssessmentProblemPayload,
} from "@/types";

export async function getAssessmentProblems(assessmentId: string) {
  return apiClient<ApiResponse<AssessmentProblem[]>>(
    `/assessmentProblem/${assessmentId}/problems`,
    {
      method: "GET",
    },
  );
}

export async function getAllAssessmentProblems(
  params?: AssessmentProblemQuery,
) {
  return apiClient<ApiResponse<AssessmentProblem[]>>("/assessmentProblem", {
    method: "GET",
    query: params,
  });
}

export async function createAssessmentProblem(
  assessmentId: string,
  payload: CreateAssessmentProblemPayload,
) {
  return apiClient<ApiResponse<AssessmentProblem>>(
    `/assessmentProblem/${assessmentId}/problems`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export async function updateAssessmentProblem(
  assessmentId: string,
  problemId: string,
  payload: UpdateAssessmentProblemPayload,
) {
  return apiClient<ApiResponse<AssessmentProblem>>(
    `/assessmentProblem/${assessmentId}/problems/${problemId}`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export async function deleteAssessmentProblem(
  assessmentId: string,
  problemId: string,
) {
  return apiClient<ApiResponse<AssessmentProblem>>(
    `/assessmentProblem/${assessmentId}/problems/${problemId}`,
    {
      method: "DELETE",
    },
  );
}
