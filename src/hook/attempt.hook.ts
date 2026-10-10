
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAttemptById,
  startAttempt,
  submitAttempt,
} from "@/api/attempt.api";

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
