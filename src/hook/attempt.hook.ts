import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllAttempts, getAttemptById, startAttempt, submitAttempt } from "@/api/attempt.api";
import { AttemptQuery } from "@/types";

export function useStartAttempt() {
  return useMutation({
    mutationFn: startAttempt,
  });
}

export function useAttemptById(attemptId: string) {
  return useQuery({
    queryKey: ["attempt", attemptId],
    queryFn: () => getAttemptById(attemptId),
    enabled: Boolean(attemptId),
    refetchInterval: (query) => {
      const attempt = query.state.data?.data;

      return attempt?.status === "IN_PROGRESS" ? 15_000 : false;
    },
  });
}

export function useSubmitAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitAttempt,

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["attempt"] }),
        queryClient.invalidateQueries({ queryKey: ["my-attempts"] }),
        queryClient.invalidateQueries({ queryKey: ["my-submissions"] }),
      ]);
    },
  });
}


export const attemptKeys = {
  all: ["attempts"] as const,
  list: (params: AttemptQuery) => ["attempts", "list", params] as const,
  detail: (id: string) => ["attempts", "detail", id] as const,
};

export function useAllAttempts(params: AttemptQuery) {
  return useQuery({
    queryKey: attemptKeys.list(params),
    queryFn: () => getAllAttempts(params),
    staleTime: 60_000,
  });
}


