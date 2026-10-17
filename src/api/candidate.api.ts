import apiClient from "@/lib/apiClient";
import { ApiResponse, CandidateProfile, UpdateCandidateProfilePayload } from "@/types";


export function getMyCandidateProfile() {
  return apiClient<ApiResponse<CandidateProfile>>("/candidate/me", {
    method: "GET",
  });
}

export function updateMyCandidateProfile(
  payload: UpdateCandidateProfilePayload,
) {
  return apiClient<ApiResponse<CandidateProfile>>("/candidate/me", {
    method: "PATCH",
    body: payload,
  });
}
