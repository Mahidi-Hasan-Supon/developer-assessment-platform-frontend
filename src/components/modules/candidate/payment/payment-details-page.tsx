"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  CreditCard,
  LoaderCircle,
  ShieldCheck,
} from "lucide-react";

import { useMyInvitations } from "@/hook/invitation.hook";
import { useCreatePayment } from "@/hook/payment.hook";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface PaymentAssessment {
  id: string;
  title: string;
  description?: string | null;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  price: number;
}

interface PaymentInvitation {
  id: string;
  status: string;
  assessment?: PaymentAssessment | null;
}

type InvitationResponse = {
  data?: PaymentInvitation[] | { data?: PaymentInvitation[] } | null;
};

function getInvitations(
  response: InvitationResponse | PaymentInvitation[] | undefined,
): PaymentInvitation[] {
  if (Array.isArray(response)) {
    return response;
  }

  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (data && !Array.isArray(data) && Array.isArray(data.data)) {
    return data.data;
  }

  return [];
}

export default function PaymentDetailsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const invitationId = params.id;

  console.log("URL invitation ID:", invitationId);

  const paymentMutation = useCreatePayment();

  const {
    data: invitationResponse,
    isLoading,
    isError,
    error,
  } = useMyInvitations({ page: 1, limit: 100 });

  const invitations = useMemo(
    () =>
      getInvitations(
        invitationResponse as
          | InvitationResponse
          | PaymentInvitation[]
          | undefined,
      ),
    [invitationResponse],
  );

  const invitation = useMemo(
    () => invitations.find((item) => item.id === invitationId),
    [invitations, invitationId],
  );

  const assessment = invitation?.assessment;

  console.log("URL invitation ID:", invitationId);
  console.log("Invitations:", invitations);
  console.log("Matched invitation:", invitation);

  async function handlePayNow() {
    if (!assessment || !invitation || paymentMutation.isPending) {
      return;
    }

    try {
      const response = await paymentMutation.mutateAsync({
        assessmentId: assessment.id,
      });

      const paymentUrl = response?.data?.paymentUrl;

      if (!paymentUrl) {
        throw new Error(
          "Payment URL was not returned by the server. Please try again.",
        );
      }

      // Redirect to the bKash checkout page.
      window.location.assign(paymentUrl);
    } catch (error) {
      // The mutation error is shown in the UI below.
      console.error("Failed to initiate payment:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 p-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-72 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <CardTitle>Unable to load invitations</CardTitle>
            <CardDescription>
              {error instanceof Error
                ? error.message
                : "Please check your connection and try again."}
            </CardDescription>
            <Button onClick={() => router.push("/invitations")}>
              Back to invitations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!invitation || !assessment) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <CardTitle>Payment details unavailable</CardTitle>
            <CardDescription>
              We couldn't find this invitation or its assessment details. Please
              return to your invitations and open the payment page again.
            </CardDescription>
            <Button onClick={() => router.push("/invitations")}>
              <ArrowLeft className="mr-2 size-4" />
              Back to invitations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (invitation.status !== "ACCEPTED") {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <CardTitle>Invitation acceptance required</CardTitle>
            <CardDescription>
              Accept this invitation before proceeding to payment.
            </CardDescription>
            <Button onClick={() => router.push("/invitations")}>
              Back to invitations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (assessment.price <= 0) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <Card>
          <CardContent className="space-y-4 p-8 text-center">
            <CardTitle>This assessment is free</CardTitle>
            <CardDescription>
              No payment is required. Return to your invitation to start the
              assessment.
            </CardDescription>
            <Button onClick={() => router.push("/invitations")}>
              Back to invitations
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 p-4 md:p-8">
      <Button variant="ghost">
        <Link href="/invitations">
          <ArrowLeft className="mr-2 size-4" />
          Back to invitations
        </Link>
      </Button>

      <div>
        <p className="text-sm font-medium text-primary">ASSESSMENT PAYMENT</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight md:text-3xl">
          Review and pay
        </h1>
        <p className="mt-2 text-muted-foreground">
          Review the assessment details before continuing to bKash.
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle>{assessment.title}</CardTitle>
          <CardDescription>
            {assessment.description || "Assessment details and payment summary"}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5 p-5 md:p-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border p-4">
              <Clock3 className="mb-3 size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="mt-1 font-semibold">
                {assessment.durationMinutes} minutes
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <CheckCircle2 className="mb-3 size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Total marks</p>
              <p className="mt-1 font-semibold">{assessment.totalMarks}</p>
            </div>

            <div className="rounded-lg border p-4">
              <ShieldCheck className="mb-3 size-5 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">Pass marks</p>
              <p className="mt-1 font-semibold">{assessment.passMarks}</p>
            </div>
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">Payment summary</p>
            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="font-medium">Assessment fee</span>
              <span className="text-xl font-bold">
                ৳{Number(assessment.price).toLocaleString("en-BD")}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Amount shown in Bangladeshi Taka (BDT).
            </p>
          </div>

          <div className="flex gap-3 rounded-lg bg-muted/50 p-4">
            <CreditCard className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium">Pay securely with bKash</p>
              <p className="mt-1 text-sm text-muted-foreground">
                You will be redirected to the bKash checkout page to complete
                your payment.
              </p>
            </div>
          </div>

          {paymentMutation.isError && (
            <p role="alert" className="text-sm text-destructive">
              {paymentMutation.error instanceof Error
                ? paymentMutation.error.message
                : "Unable to start payment. Please try again."}
            </p>
          )}

          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              onClick={() => router.push("/invitations")}
              disabled={paymentMutation.isPending}
            >
              Cancel
            </Button>

            <Button onClick={handlePayNow} disabled={paymentMutation.isPending}>
              {paymentMutation.isPending ? (
                <>
                  <LoaderCircle className="mr-2 size-4 animate-spin" />
                  Connecting to bKash...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 size-4" />
                  Pay Now
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
