import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  AssessmentQuery,
  CreateAssessmentPayload,
  UpdateAssessmentPayload,
} from "@/types/assessment.types";
import {
  createAssessment,
  deleteAssessment,
  getAssessmentById,
  getAssessments,
  updateAssessment,
} from "@/api";

export function useAssessments(params?: AssessmentQuery) {
  return useQuery({
    queryKey: ["assessments", params],
    queryFn: () => getAssessments(params),
  });
}

export function useAssessmentById(id: string) {
  return useQuery({
    queryKey: ["assessment", id],
    queryFn: () => getAssessmentById(id),
    enabled: !!id,
  });
}

export function useCreateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAssessmentPayload) => createAssessment(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
    },
  });
}

export function useDeleteAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAssessment(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });
    },
  });
}

export function useUpdateAssessment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAssessmentPayload;
    }) => updateAssessment(id, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assessments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["assessment", variables.id],
      });
    },
  });
}
