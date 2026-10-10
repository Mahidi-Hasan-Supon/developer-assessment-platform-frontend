"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  FileQuestion,
  Trophy,
  Wallet,
  CalendarDays,
} from "lucide-react";

import { useAssessmentById } from "@/hook/assessment.hook";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMyInvitations } from "@/hook/invitation.hook";

function formatPrice(price: number) {
  if (price === 0) return "Free";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function AssessmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const assessmentId = params.id;
  const { data: invitationResponse } = useMyInvitations({
    page: 1,
    limit: 100,
  });

  const invitations = Array.isArray(invitationResponse?.data)
    ? invitationResponse.data
    : (invitationResponse?.data?.data ?? []);

  const hasInvitation = invitations.some(
    (invitation) => invitation.assessmentId === assessmentId,
  );
//   console.log("hasInvitation", hasInvitation);
//   console.log("assessmentId", assessmentId);

//   console.log("Invitation response:", invitationResponse);
//   console.log("Invitations:", invitations);
//   console.log("Assessment ID:", assessmentId);

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useAssessmentById(assessmentId);

  const assessment = response?.data;

  if (isPending) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !assessment) {
    return (
      <div className="space-y-4">
        <Button variant="ghost">
          <Link href="/dashboard/developer">
            <ArrowLeft className="mr-2 size-4" />
            Back to assessments
          </Link>
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <h2 className="text-lg font-semibold">Assessment not found</h2>
            <p className="text-sm text-muted-foreground">
              We could not load this assessment. It may no longer be available.
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Button variant="ghost" className="-ml-3">
        <Link href="/dashboard/developer" className="flex">
          <ArrowLeft className="mr-2 size-4" />
          Back to assessments
        </Link>
      </Button>

      <Card className="overflow-hidden hover:shadow-2xl">
        <div className="h-1.5 bg-primary" />

        <CardHeader className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Badge variant="secondary">{assessment.status}</Badge>

            <span className="flex items-center gap-2 text-lg font-semibold">
              <Wallet className="size-5 text-muted-foreground" />
              {formatPrice(assessment.price)}
            </span>
          </div>

          <CardTitle className="text-3xl tracking-tight">
            {assessment.title}
          </CardTitle>

          <CardDescription className="max-w-3xl text-base leading-7">
            {assessment.description || "No description provided."}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-4">
              <Clock3 className="mb-3 size-5 text-primary" />
              <p className="text-2xl font-bold">{assessment.durationMinutes}</p>
              <p className="text-sm text-muted-foreground">
                Duration in minutes
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <Trophy className="mb-3 size-5 text-primary" />
              <p className="text-2xl font-bold">{assessment.totalMarks}</p>
              <p className="text-sm text-muted-foreground">Total marks</p>
            </div>

            <div className="rounded-lg border p-4">
              <FileQuestion className="mb-3 size-5 text-primary" />
              <p className="text-2xl font-bold">{assessment.passMarks}</p>
              <p className="text-sm text-muted-foreground">Pass marks</p>
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4">
            <div className="flex items-start gap-3">
              <CalendarDays className="mt-0.5 size-5 text-muted-foreground" />
              <div className="space-y-1">
                <p className="font-medium">Assessment information</p>
                <p className="text-sm text-muted-foreground">
                  Created on{" "}
                  {new Date(assessment.createdAt).toLocaleDateString("en-BD", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t pt-5 sm:flex-row sm:justify-end">
            <Button
              variant="outline"
              className="flex justify-center items-center"
            >
              <Link href="/assessments" className="flex">
                <div>
                  <ArrowLeft className="mr-2 size-4" />
                </div>
                <div>Back to Assessments</div>
              </Link>
            </Button>

            <Button disabled={!hasInvitation}>
              {hasInvitation ? (
                <Link href="/invitations">View Invitation</Link>
              ) : (
                <span>View Invitation</span>
              )}
            </Button>
          </div>

          <div className="border-t pt-5">
            <p className="text-sm leading-6 text-muted-foreground">
              Access to the assessment questions depends on your invitation and
              eligibility. You must meet the required conditions before starting
              an assessment.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
