import apiClient from "@/lib/apiClient";

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
