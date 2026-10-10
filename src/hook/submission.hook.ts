import { evaluateAnswer, getCompanySubmissions, getMySubmissions, getSubmissionAnswers } from "@/api/submission.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useMySubmissions() {
  return useQuery({
    queryKey: ["my-submissions"],
    queryFn: () => getMySubmissions({ page: 1, limit: 20 }),
  });
}

export function useCompanySubmissions() {
  return useQuery({
    queryKey: ["submissions", "company"],
    queryFn: getCompanySubmissions,
    staleTime: 30 * 1000,
  });
}

export function useSubmissionAnswers(submissionId: string) {
  return useQuery({
    queryKey: ["submissions", submissionId, "answers"],
    queryFn: () => getSubmissionAnswers(submissionId),
    enabled: Boolean(submissionId),
  });
}

export function useEvaluateAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ answerId, marks }: { answerId: string; marks: number }) =>
      evaluateAnswer(answerId, { marks }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["submissions", "company"],
      });

      await queryClient.invalidateQueries({
        queryKey: ["submissions"],
      });
    },
  });
}
