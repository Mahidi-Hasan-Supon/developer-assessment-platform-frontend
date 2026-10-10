import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  CompanySubmission,
  EvaluateAnswerPayload,
  ResultItem,
  SubmissionAnswer,
} from "@/types";

export function getMySubmissions(params?: {
  page?: number;
  limit?: number;
  status?: string;
}) {
  return apiClient("/submission/my", {
    method: "GET",
    query: params,
  });
}

export function getCompanySubmissions() {
  return apiClient<ApiResponse<CompanySubmission[]>>(
    "/submission/company/submissions",
    { method: "GET" },
  );
}

export function getSubmissionAnswers(submissionId: string) {
  return apiClient<ApiResponse<SubmissionAnswer[]>>(
    `/answer/submission/${submissionId}`,
    { method: "GET" },
  );
}

export function evaluateAnswer(
  answerId: string,
  payload: EvaluateAnswerPayload,
) {
  return apiClient<ApiResponse<SubmissionAnswer>>(
    `/answer/${answerId}/evaluate`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

