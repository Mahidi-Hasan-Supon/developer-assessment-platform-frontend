import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCompanyResults,
  getMyResults,
  getResultById,
} from "@/api/result.api";
import { AdminResultsMeta, AdminResultsQuery, ApiResponse, CompanyResultItem, CompanyResultsQuery, ResultItem } from "@/types";
import apiClient from "@/lib/apiClient";
import { createResult, evaluateResult, publishResult } from "@/api";

export function useMyResults() {
  return useQuery({
    queryKey: ["results", "my"],
    queryFn: getMyResults,
    staleTime: 60 * 1000,
  });
}

export function useResultById(resultId: string) {
  return useQuery({
    queryKey: ["results", resultId],
    queryFn: () => getResultById(resultId),
    enabled: Boolean(resultId),
    staleTime: 60 * 1000,
  });
}

export function useCreateResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createResult,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["submissions", "company"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["results"],
      });
    },
  });
}

export function useEvaluateResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: evaluateResult,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["submissions", "company"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["results"],
      });
    },
  });
}

export function usePublishResult() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: publishResult,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["submissions", "company"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["results"],
      });
    },
  });
}

export function useCompanyResults(params?: CompanyResultsQuery) {
  return useQuery({
    queryKey: ["results", "company", params],
    queryFn: () => getCompanyResults(params),
    staleTime: 60 * 1000,
  });
}

type AdminResultsResponse = ApiResponse<CompanyResultItem[]> & {
  meta?: AdminResultsMeta;
};

export function getAdminResults(params?: AdminResultsQuery) {
  return apiClient<AdminResultsResponse>("/result/admin/results", {
    method: "GET",
    query: params,
  });
}

export function useAdminResults(params?: AdminResultsQuery) {
  return useQuery({
    queryKey: ["results", "admin", params],
    queryFn: () => getAdminResults(params),
    staleTime: 60 * 1000,
  });
}
