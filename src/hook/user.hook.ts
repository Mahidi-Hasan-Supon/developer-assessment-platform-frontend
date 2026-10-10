import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { getAllCandidates, updateCandidateStatus } from "@/api/user.api";

import type { CandidateListParams, UserStatus } from "@/types/user.types";

export const candidateKeys = {
  all: ["candidates"] as const,
  list: (params: CandidateListParams) =>
    ["candidates", "list", params] as const,
};

export function useAllCandidates(params: CandidateListParams) {
  return useQuery({
    queryKey: candidateKeys.list(params),
    queryFn: () => getAllCandidates(params),
    staleTime: 60 * 1000,
  });
}

export function useUpdateCandidateStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: UserStatus }) =>
      updateCandidateStatus(id, status),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: candidateKeys.all,
      });

      await queryClient.invalidateQueries({
        queryKey: ["analytics", "admin"],
      });
    },
  });
}
