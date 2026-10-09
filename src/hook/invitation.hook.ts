
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  createInvitation,
  getMyInvitations,
  getAssessmentInvitations,
  updateInvitationStatus,
  deleteInvitation,
} from "@/api/invitation.api";

import type {
  InvitationQuery,
  UpdateInvitationStatusPayload,
} from "@/types/invitation.types";

export const invitationKeys = {
  all: ["invitations"] as const,

  my: (params: InvitationQuery = {}) =>
    [...invitationKeys.all, "my", params] as const,

  assessment: (assessmentId: string) =>
    [...invitationKeys.all, "assessment", assessmentId] as const,
};

// Create invitation — Company
export function useCreateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createInvitation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invitationKeys.all,
      });
    },
  });
}

// Get candidate's own invitations
export function useMyInvitations(params: InvitationQuery = {}) {
  return useQuery({
    queryKey: invitationKeys.my(params),
    queryFn: () => getMyInvitations(params),
  });
}

// Get invitations for a specific assessment — Company
export function useAssessmentInvitations(assessmentId: string) {
  return useQuery({
    queryKey: invitationKeys.assessment(assessmentId),
    queryFn: () => getAssessmentInvitations(assessmentId),
    enabled: Boolean(assessmentId),
  });
}

// Accept or reject invitation — Candidate
export function useUpdateInvitationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      invitationId,
      payload,
    }: {
      invitationId: string;
      payload: UpdateInvitationStatusPayload;
    }) => updateInvitationStatus(invitationId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invitationKeys.all,
      });
    },
  });
}

// Delete invitation — Company
export function useDeleteInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteInvitation,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: invitationKeys.all,
      });
    },
  });
}

