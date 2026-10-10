
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createAnswer,
  getMyAnswers,
  type CreateAnswerPayload,
} from "@/api/answer.api";

export function useCreateAnswer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAnswerPayload) => createAnswer(payload),

    onSuccess: (_, variables) => {
      return queryClient.invalidateQueries({
        queryKey: ["my-answers", variables.submissionId],
      });
    },
  });
}

export function useMyAnswers(submissionId: string) {
  return useQuery({
    queryKey: ["my-answers", submissionId],
    queryFn: () => getMyAnswers(submissionId),
    enabled: Boolean(submissionId),
  });
}
