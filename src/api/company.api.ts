import apiClient from "@/lib/apiClient";
import {
  ApiResponse,
  CompanyApplication,
  CompanyApplicationPayload,
  CompanyProfile,
  CompanyStatus,
  UpdateCompanyStatusPayload,
} from "@/types/company.types";
import { Candidate, CandidateQuery } from "@/types/invitation.types";

export const createCompanyApplication = async (
  payload: CompanyApplicationPayload,
) => {
  return apiClient<ApiResponse<CompanyProfile>>("/company/apply", {
    method: "POST",
    body: payload,
  });
};

export const getCompanyApplications = async (status?: CompanyStatus) => {
  const query = status ? `?status=${status}` : "";

  return apiClient<ApiResponse<CompanyApplication[]>>(
    `/company/applications${query}`,
    {
      method: "GET",
    },
  );
};

export const updateCompanyApplicationStatus = async ({
  id,
  payload,
}: {
  id: string;
  payload: UpdateCompanyStatusPayload;
}) => {
  return apiClient<ApiResponse<CompanyApplication>>(
    `/company/applications/${id}/status`,
    {
      method: "PATCH",
      body: payload,
    },
  );
};

export function getCandidates(params: CandidateQuery) {
  return apiClient<ApiResponse<Candidate[]>>("/company/candidates", {
    method: "GET",
    query: params,
  });
}
