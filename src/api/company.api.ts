import apiClient from "@/lib/apiClient";
import { ApiResponse, CompanyApplicationPayload, CompanyProfile } from "@/types/company.types";

export const createCompanyApplication = async (
  payload: CompanyApplicationPayload,
) => {
  return apiClient<ApiResponse<CompanyProfile>>("/company/apply", {
    method: "POST",
    body: payload,
  });
};
