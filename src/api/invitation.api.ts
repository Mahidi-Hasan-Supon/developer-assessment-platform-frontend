import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types";
import type {
  Candidate,
  CandidateMeta,
  Invitation,
  InvitationQuery,
  CreateInvitationPayload,
  UpdateInvitationStatusPayload,
} from "@/types/invitation.types";

interface PaginatedResponse<T> {
  data: T[];
  meta: CandidateMeta;
}

export function createInvitation(payload: CreateInvitationPayload) {
  return apiClient<ApiResponse<Invitation>>("/invitation", {
    method: "POST",
    body: payload,
  });
}

export function getMyInvitations(params: InvitationQuery = {}) {
  return apiClient<ApiResponse<PaginatedResponse<Invitation>>>(
    "/invitation/my",
    {
      method: "GET",
      query: params,
    },
  );
}

export function getAssessmentInvitations(assessmentId: string) {
  return apiClient<ApiResponse<Invitation[]>>(
    `/invitation/assessment/${assessmentId}`,
    {
      method: "GET",
    },
  );
}

export function updateInvitationStatus(
  invitationId: string,
  payload: UpdateInvitationStatusPayload,
) {
  return apiClient<ApiResponse<Invitation>>(
    `/invitation/${invitationId}/status`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function deleteInvitation(invitationId: string) {
  return apiClient<ApiResponse<Invitation>>(`/invitation/${invitationId}`, {
    method: "DELETE",
  });
}
