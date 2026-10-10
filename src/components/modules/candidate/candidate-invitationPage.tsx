"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  FileText,
  CheckCircle2,
  ArrowLeft,
  LoaderCircle,
} from "lucide-react";

import {
  useMyInvitations,
  useUpdateInvitationStatus,
} from "@/hook/invitation.hook";
import { useStartAttempt } from "@/hook";
import { useMyPayments } from "@/hook/payment.hook";

import type { InvitationStatus } from "@/types/invitation.types";
import type { Payment } from "@/api/payment.api";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function getInvitationStatusStyle(status: InvitationStatus) {
  switch (status) {
    case "PENDING":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400";

    case "ACCEPTED":
      return "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400";

    case "REJECTED":
      return "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400";

    case "USED":
      return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400";

    case "EXPIRED":
      return "border-slate-500/30 bg-slate-500/10 text-slate-600 dark:text-slate-400";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export default function CandidateInvitationsPage() {
  const router = useRouter();

  const [feedback, setFeedback] = useState<{
    invitationId: string;
    type: "success" | "error";
    message: string;
  } | null>(null);

  const {
    data: invitationResponse,
    isLoading,
    isError,
  } = useMyInvitations({
    page: 1,
    limit: 100,
  });

  const {
    data: paymentResponse,
    isLoading: isPaymentsLoading,
    isError: isPaymentsError,
  } = useMyPayments();

  const updateInvitation = useUpdateInvitationStatus();
  const startAttemptMutation = useStartAttempt();

  const invitations = Array.isArray(invitationResponse?.data)
    ? invitationResponse.data
    : (invitationResponse?.data?.data ?? []);

  const payments: Payment[] = Array.isArray(paymentResponse?.data)
    ? paymentResponse.data
    : [];

  const getSuccessfulPayment = (assessmentId: string) =>
    payments.find(
      (payment) =>
        payment.assessmentId === assessmentId && payment.status === "SUCCESS",
    );

  const handleStatusUpdate = async (
    invitationId: string,
    status: "ACCEPTED" | "REJECTED",
  ) => {
    setFeedback(null);

    try {
      await updateInvitation.mutateAsync({
        invitationId,
        payload: { status },
      });

      setFeedback({
        invitationId,
        type: "success",
        message:
          status === "ACCEPTED"
            ? "Invitation accepted successfully."
            : "Invitation rejected successfully.",
      });
    } catch (error) {
      setFeedback({
        invitationId,
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to update invitation status. Please try again.",
      });
    }
  };

  const handleStartAttempt = async (invitationId: string) => {
    setFeedback(null);

    try {
      const response = await startAttemptMutation.mutateAsync({ invitationId });

      console.log("START ATTEMPT FULL RESPONSE:", response);

      const attempt = response?.data ?? response;

      console.log("ATTEMPT ID:", attempt?.id);

      if (!attempt?.id || attempt.id === "undefined") {
        throw new Error("Valid Attempt ID পাওয়া যায়নি।");
      }

      router.push(`/attempts/${attempt.id}`);

      if (!attempt?.id) {
        throw new Error("Attempt ID was not returned by the server.");
      }

     router.push(`/attempts/${attempt.id}`);
    } catch (error) {
      setFeedback({
        invitationId,
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to start assessment. Please try again.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-4 md:p-6">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-44 w-full rounded-xl" />
        <Skeleton className="h-44 w-full rounded-xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 md:p-6">
        <Card>
          <CardContent className="py-10 text-center">
            <p className="font-medium">Unable to load your invitations.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Please refresh the page and try again.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 p-4 md:p-6">
      <Button variant="ghost">
        <Link href="/assessments">
          <ArrowLeft className="mr-2 size-4" />
          Back to Assessments
        </Link>
      </Button>

      <div className="space-y-2">
        <p className="text-sm font-semibold tracking-wide text-primary">
          CANDIDATE PORTAL
        </p>

        <h1 className="text-3xl font-bold tracking-tight">My Invitations</h1>

        <p className="max-w-2xl text-muted-foreground">
          Review your assessment invitations, check payment status, and start an
          assessment when you are ready.
        </p>
      </div>

      {invitations.length === 0 ? (
        <Card className="rounded-xl">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <FileText className="size-7 text-muted-foreground" />
            </div>

            <h2 className="mt-4 text-lg font-semibold">No invitations found</h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Company invitations will appear here when you receive them.
            </p>

            <Button className="mt-5" variant="outline">
              <Link href="/candidate/assessments">Browse Assessments</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation) => {
            const assessment = invitation.assessment;

            const isUpdating =
              updateInvitation.isPending &&
              updateInvitation.variables?.invitationId === invitation.id;

            const isStarting =
              startAttemptMutation.isPending &&
              startAttemptMutation.variables?.invitationId === invitation.id;

            const currentFeedback =
              feedback?.invitationId === invitation.id ? feedback : null;

            const successfulPayment = assessment
              ? getSuccessfulPayment(invitation.assessmentId)
              : undefined;

            const isPaidAssessment = (assessment?.price ?? 0) > 0;
            const hasSuccessfulPayment = Boolean(successfulPayment);

            return (
              <Card
                key={invitation.id}
                className="overflow-hidden rounded-xl transition-shadow hover:shadow-sm"
              >
                <CardHeader>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div className="space-y-2">
                      <CardTitle className="text-xl">
                        {assessment?.title ?? "Assessment Invitation"}
                      </CardTitle>

                      <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                        {assessment?.description ??
                          "You have received an invitation to this assessment."}
                      </p>
                    </div>

                    <Badge
                      variant="outline"
                      className={getInvitationStatusStyle(invitation.status)}
                    >
                      {invitation.status}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-5">
                  {assessment && (
                    <>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-lg border bg-muted/20 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock3 className="size-4" />
                            Duration
                          </div>
                          <p className="mt-2 font-semibold">
                            {assessment.durationMinutes} minutes
                          </p>
                        </div>

                        <div className="rounded-lg border bg-muted/20 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="size-4" />
                            Total Marks
                          </div>
                          <p className="mt-2 font-semibold">
                            {assessment.totalMarks}
                          </p>
                        </div>

                        <div className="rounded-lg border bg-muted/20 p-4">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="size-4" />
                            Pass Marks
                          </div>
                          <p className="mt-2 font-semibold">
                            {assessment.passMarks}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p className="flex items-center gap-2">
                            <CalendarDays className="size-4 shrink-0" />
                            Invited:{" "}
                            {invitation.invitedAt
                              ? new Date(
                                  invitation.invitedAt,
                                ).toLocaleDateString()
                              : "Date unavailable"}
                          </p>

                          {invitation.expiresAt && (
                            <p>
                              Expires:{" "}
                              {new Date(
                                invitation.expiresAt,
                              ).toLocaleDateString()}
                            </p>
                          )}

                          {isPaidAssessment && (
                            <p>
                              Price:{" "}
                              <span className="font-semibold text-foreground">
                                ৳{assessment.price}
                              </span>
                            </p>
                          )}
                        </div>

                        <Button variant="outline">
                          <Link
                            href={`/candidate/assessments/${invitation.assessmentId}`}
                          >
                            View Assessment
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}

                  {currentFeedback && (
                    <output
                      aria-live="polite"
                      className={
                        currentFeedback.type === "success"
                          ? "block rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400"
                          : "block rounded-lg bg-destructive/10 p-3 text-sm text-destructive"
                      }
                    >
                      {currentFeedback.message}
                    </output>
                  )}

                  {invitation.status === "PENDING" && (
                    <div className="flex flex-col gap-3 border-t pt-4 sm:flex-row">
                      <Button
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(invitation.id, "ACCEPTED")
                        }
                      >
                        {isUpdating &&
                        updateInvitation.variables?.payload.status ===
                          "ACCEPTED" ? (
                          <LoaderCircle className="mr-2 size-4 animate-spin" />
                        ) : null}
                        Accept Invitation
                      </Button>

                      <Button
                        variant="destructive"
                        disabled={isUpdating}
                        onClick={() =>
                          handleStatusUpdate(invitation.id, "REJECTED")
                        }
                      >
                        {isUpdating &&
                        updateInvitation.variables?.payload.status ===
                          "REJECTED" ? (
                          <LoaderCircle className="mr-2 size-4 animate-spin" />
                        ) : null}
                        Reject Invitation
                      </Button>
                    </div>
                  )}

                  {invitation.status === "ACCEPTED" && assessment && (
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-4">
                      {isPaidAssessment && isPaymentsLoading ? (
                        <Button disabled>
                          <LoaderCircle className="mr-2 size-4 animate-spin" />
                          Checking payment...
                        </Button>
                      ) : isPaidAssessment && isPaymentsError ? (
                        <p className="text-sm text-destructive">
                          Unable to verify payment. Please refresh and try
                          again.
                        </p>
                      ) : (
                        <div className="flex flex-wrap items-center gap-3">
                          {isPaidAssessment && hasSuccessfulPayment && (
                            <Badge
                              variant="outline"
                              className="border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                            >
                              <CheckCircle2 className="mr-1 size-3.5" />
                              Paid
                            </Badge>
                          )}

                          <Button
                            onClick={() => {
                              if (isPaidAssessment && !hasSuccessfulPayment) {
                                router.push(
                                  `/invitations/${invitation.id}/payment`,
                                );
                                return;
                              }

                              handleStartAttempt(invitation.id);
                            }}
                            disabled={isStarting}
                          >
                            {isStarting ? (
                              <>
                                <LoaderCircle className="mr-2 size-4 animate-spin" />
                                Starting...
                              </>
                            ) : isPaidAssessment && !hasSuccessfulPayment ? (
                              `Pay Now · ৳${assessment.price}`
                            ) : (
                              "Start Assessment"
                            )}
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
