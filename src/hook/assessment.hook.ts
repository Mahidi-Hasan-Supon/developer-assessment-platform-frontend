import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import type {
  AssessmentQuery,
  CreateAssessmentPayload,
} from "@/types/assessment.types";
import { createAssessment, getAssessmentById, getAssessments } from "@/api";

export function useAssessments(params?: AssessmentQuery) {
  return useQuery({
    queryKey: ["assessments", params],
    queryFn: () => getAssessments(params),
  });
}

export function useCreateAssessment() {
  return useMutation({
    mutationFn: (payload: CreateAssessmentPayload) => createAssessment(payload),
  });
}


export function useAssessmentById(id: string) {
  return useQuery({
    queryKey: ["assessment", id],
    queryFn: () => getAssessmentById(id),
    enabled: !!id,
  });
}
