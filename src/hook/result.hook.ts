import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMyResults, getResultById } from "@/api/result.api";
import { ApiResponse, ResultItem } from "@/types";
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
