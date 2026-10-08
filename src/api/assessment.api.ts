import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import type {
  Assessment,
  AssessmentQuery,
  CreateAssessmentPayload,
} from "@/types/assessment.types";

export async function getAssessments(params?: AssessmentQuery) {
  return apiClient<ApiResponse<Assessment[]>>("/assessment", {
    method: "GET",
    query: params,
  });
}

export async function getAssessmentById(id: string) {
  return apiClient<ApiResponse<Assessment>>(`/assessment/${id}`, {
    method: "GET",
  });
}

export async function createAssessment(payload: CreateAssessmentPayload) {
  return apiClient<ApiResponse<Assessment>>("/assessment", {
    method: "POST",
    body: payload,
  });
}



// export async function updateAssessment(
//   id: string,
//   payload: Partial<CreateAssessmentPayload>,
// ) {
//   return apiClient<ApiResponse<Assessment>>(`/assessment/${id}`, {
//     method: "PATCH",
//     body: payload,
//   });
// }

// export async function deleteAssessment(id: string) {
//   return apiClient<ApiResponse<null>>(`/assessment/${id}`, {
//     method: "DELETE",
//   });
// }
