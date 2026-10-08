import {
  createAssessmentProblem,
  deleteAssessmentProblem,
  getAssessmentProblems,
  updateAssessmentProblem,
} from "@/api";
import {
  CreateAssessmentProblemPayload,
  UpdateAssessmentProblemPayload,
} from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAssessmentProblems(assessmentId: string) {
  return useQuery({
    queryKey: ["assessment-problems", assessmentId],
    queryFn: () => getAssessmentProblems(assessmentId),
    enabled: !!assessmentId,
  });
}
export function useCreateAssessmentProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assessmentId,
      payload,
    }: {
      assessmentId: string;
      payload: CreateAssessmentProblemPayload;
    }) => createAssessmentProblem(assessmentId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-problems", variables.assessmentId],
      });
    },
  });
}

export function useUpdateAssessmentProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assessmentId,
      problemId,
      payload,
    }: {
      assessmentId: string;
      problemId: string;
      payload: UpdateAssessmentProblemPayload;
    }) => updateAssessmentProblem(assessmentId, problemId, payload),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-problems", variables.assessmentId],
      });
    },
  });
}

export function useDeleteAssessmentProblem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      assessmentId,
      problemId,
    }: {
      assessmentId: string;
      problemId: string;
    }) => deleteAssessmentProblem(assessmentId, problemId),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["assessment-problems", variables.assessmentId],
      });
    },
  });
}
