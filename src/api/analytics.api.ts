import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import { AdminAnalytics, CandidateAnalytics, CompanyAnalytics } from "@/types/analytics.types";

export function getCompanyAnalytics() {
  return apiClient<ApiResponse<CompanyAnalytics>>("/analytics/company", {
    method: "GET",
  });
}


export function getCandidateAnalytics() {
  return apiClient<ApiResponse<CandidateAnalytics>>("/analytics/candidate", {
    method: "GET",
  });
}



export function getAdminAnalytics() {
  return apiClient<ApiResponse<AdminAnalytics>>("/analytics/admin", {
    method: "GET",
  });
}