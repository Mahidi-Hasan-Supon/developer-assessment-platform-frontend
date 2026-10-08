import apiClient from "@/lib/apiClient";
import type { ApiResponse, AssessmentProblem } from "@/types";
import { CreateAssessmentProblemPayload } from "@/types/assessmentProblem.types";

export async function createAssessmentProblem(
  assessmentId: string,
  payload: CreateAssessmentProblemPayload,
) {
  return apiClient<ApiResponse<unknown>>(
    `/assessment-problem/${assessmentId}/problems`,
    {
      method: "POST",
      body: payload,
    },
  );
}


export async function getAssessmentProblems(assessmentId: string) {
  return apiClient<ApiResponse<AssessmentProblem[]>>(
    `/assessment-problem/${assessmentId}/problems`,
    {
      method: "GET",
    },
  );
}
