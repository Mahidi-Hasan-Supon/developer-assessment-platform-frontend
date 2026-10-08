import { createAssessmentProblem, getAssessmentProblems } from "@/api";
import { CreateAssessmentProblemPayload } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";



export function useCreateAssessmentProblem() {
  return useMutation({
    mutationFn: ({
      assessmentId,
      payload,
    }: {
      assessmentId: string;
      payload: CreateAssessmentProblemPayload;
    }) => createAssessmentProblem(assessmentId, payload),
  });
}

export function useAssessmentProblems(
  assessmentId: string,
) {
  return useQuery({
    queryKey: ["assessment-problems", assessmentId],
    queryFn: () =>
      getAssessmentProblems(assessmentId),
    enabled: !!assessmentId,
  });
}


