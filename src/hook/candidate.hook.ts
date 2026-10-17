import { getMyCandidateProfile, updateMyCandidateProfile } from "@/api";
import { UpdateCandidateProfilePayload } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export function useMyCandidateProfile() {
  return useQuery({
    queryKey: ["candidate-profile"],
    queryFn: getMyCandidateProfile,
    staleTime: 30_000,
  });
}

export function useUpdateMyCandidateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateCandidateProfilePayload) =>
      updateMyCandidateProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["candidate-profile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
    },
  });
}