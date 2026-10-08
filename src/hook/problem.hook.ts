import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type { CreateProblemPayload, ProblemQuery, UpdateProblemPayload } from "@/types/problem.types";
import { createProblem, deleteProblem, getProblemById, getProblems, updateProblem } from "@/api";

export function useProblems(params?: ProblemQuery) {
  return useQuery({
    queryKey: ["problems", params],
    queryFn: () => getProblems(params),
  });
}

export function useCreateProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateProblemPayload) => createProblem(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["problems"],
      });
    },
  });
}

export function useProblemById(id: string) {
  return useQuery({
    queryKey: ["problem", id],
    queryFn: () => getProblemById(id),
    enabled: !!id,
  });
}

export function useUpdateProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateProblemPayload;
    }) => updateProblem(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["problems"],
      });

      queryClient.invalidateQueries({
        queryKey: ["problem", variables.id],
      });
    },
  });
}

export function useDeleteProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProblem(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["problems"],
      });
    },
  });
}


