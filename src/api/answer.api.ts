
import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";

export interface CreateAnswerPayload {
  submissionId: string;
  problemId: string;
  answer: string;
}

export interface Answer {
  id: string;
  submissionId: string;
  problemId: string;
  answer: string | null;
  marks: number;
  isCorrect: boolean | null;
  evaluatedAt: string | null;
}

export function createAnswer(payload: CreateAnswerPayload) {
  return apiClient<ApiResponse<Answer>>("/answer", {
    method: "POST",
    body: payload,
  });
}

export function getMyAnswers(submissionId: string) {
  return apiClient<ApiResponse<Answer[]>>(
    `/answer/my/${encodeURIComponent(submissionId)}`,
  );
}
