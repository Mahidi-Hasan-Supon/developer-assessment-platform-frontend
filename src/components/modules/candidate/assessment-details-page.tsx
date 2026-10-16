"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Clock3,
  Trophy,
  Wallet,
  CalendarDays,
  CheckCircle2,
  AlertCircle,
  FileQuestion,
  ShieldCheck,
  RefreshCw,
  ListChecks,
} from "lucide-react";

import { useAssessmentById } from "@/hook/assessment.hook";
import { useMyInvitations } from "@/hook/invitation.hook";
import { useAssessmentProblems } from "@/hook";

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

function formatPrice(price: number) {
  if (price === 0) return "Free";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 0,
  }).format(price);
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function AssessmentDetailsPage() {
  const params = useParams<{ id: string }>();
  const assessmentId = params.id;

  const {
    data: response,
    isPending,
    isError,
    refetch,
  } = useAssessmentById(assessmentId);

  const {
    data: problemsResponse,
    isPending: problemsPending,
    isError: problemsError,
    refetch: refetchProblems,
  } = useAssessmentProblems(assessmentId);

  const { data: invitationResponse, isPending: invitationsPending } =
    useMyInvitations({
      page: 1,
      limit: 100,
    });

  const assessment = response?.data;

  const invitations = Array.isArray(invitationResponse?.data)
    ? invitationResponse.data
    : (invitationResponse?.data?.data ?? []);

  const assessmentInvitation = invitations.find(
    (invitation) => invitation.assessmentId === assessmentId,
  );

  const hasInvitation = Boolean(assessmentInvitation);

  const isInvitationAccepted = assessmentInvitation?.status === "ACCEPTED";

  const isInvitationPending = assessmentInvitation?.status === "PENDING";

  const assessmentProblems = problemsResponse?.data ?? [];

  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !assessment) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 p-4">
        <Button variant="ghost">
          <Link href="/dashboard/developer">
            <ArrowLeft className="mr-2 size-4" />
            Back to dashboard
          </Link>
        </Button>

        <Card>
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-7 text-destructive" />
            </div>

            <h2 className="text-xl font-semibold">Assessment not found</h2>

            <p className="max-w-md text-sm text-muted-foreground">
              We could not load this assessment. It may no longer be available,
              or you may not have permission to access it.
            </p>

            <Button onClick={() => refetch()}>
              <RefreshCw className="mr-2 size-4" />
              Try again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-4 pb-10">
      {/* Back navigation */}
      <Button variant="ghost" className="-ml-3">
        <Link href="/dashboard/developer">
          <ArrowLeft className="mr-2 size-4" />
          Back to dashboard
        </Link>
      </Button>

      {/* Assessment header */}
      <Card className="overflow-hidden border-border/70 shadow-sm">
        <div className="h-1.5 bg-primary" />

        <CardHeader className="space-y-5 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant={
                  assessment.status === "PUBLISHED" ? "default" : "secondary"
                }
                className="px-3 py-1"
              >
                {assessment.status}
              </Badge>

              {invitationsPending ? (
                <Badge variant="outline">Checking invitation...</Badge>
              ) : !hasInvitation ? (
                <Badge variant="outline" className="gap-1">
                  <AlertCircle className="size-3.5" />
                  Invitation Required
                </Badge>
              ) : isInvitationAccepted ? (
                <Badge
                  variant="outline"
                  className="gap-1 border-emerald-500/30 text-emerald-600"
                >
                  <CheckCircle2 className="size-3.5" />
                  Invitation Accepted
                </Badge>
              ) : isInvitationPending ? (
                <Badge
                  variant="outline"
                  className="gap-1 border-amber-500/30 text-amber-600"
                >
                  <Clock3 className="size-3.5" />
                  Invitation Pending
                </Badge>
              ) : (
                <Badge variant="outline">
                  {assessmentInvitation?.status ?? "Invitation Found"}
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2.5">
              <Wallet className="size-5 text-primary" />
              <span className="text-lg font-bold">
                {formatPrice(assessment.price)}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-primary">
              DEVELOPER ASSESSMENT
            </p>

            <CardTitle className="text-2xl leading-tight tracking-tight sm:text-4xl">
              {assessment.title}
            </CardTitle>

            <CardDescription className="max-w-3xl text-sm leading-7 sm:text-base">
              {assessment.description || "No description provided."}
            </CardDescription>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t pt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="size-4" />
              Created {formatDate(assessment.createdAt)}
            </span>

            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4" />
              Invitation-based access
            </span>
          </div>
        </CardHeader>
      </Card>

      {/* Assessment metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
              <Clock3 className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Duration</p>
              <p className="text-2xl font-bold">
                {assessment.durationMinutes}
                <span className="ml-1 text-sm font-medium text-muted-foreground">
                  mins
                </span>
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-violet-500/10 text-violet-600">
              <Trophy className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total marks</p>
              <p className="text-2xl font-bold">{assessment.totalMarks}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Pass marks</p>
              <p className="text-2xl font-bold">{assessment.passMarks}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="transition-shadow hover:shadow-md">
          <CardContent className="flex items-center gap-4 p-5">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Wallet className="size-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Assessment fee</p>
              <p className="text-2xl font-bold">
                {formatPrice(assessment.price)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Assessment problems */}
      <Card className="border-border/70 shadow-sm">
        <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ListChecks className="size-5" />
              </div>
              <CardTitle className="text-xl">Assessment Problems</CardTitle>
            </div>

            <CardDescription className="pt-2">
              Preview the problems included in this assessment.
            </CardDescription>
          </div>

          {!problemsPending && !problemsError && (
            <Badge variant="secondary">
              {assessmentProblems.length}{" "}
              {assessmentProblems.length === 1 ? "problem" : "problems"}
            </Badge>
          )}
        </CardHeader>

        <CardContent>
          {problemsPending ? (
            <div className="flex min-h-32 items-center justify-center">
              <Spinner />
            </div>
          ) : problemsError ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-8 text-center">
              <AlertCircle className="size-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Unable to load the assessment problems.
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetchProblems()}
              >
                <RefreshCw className="mr-2 size-4" />
                Retry
              </Button>
            </div>
          ) : assessmentProblems.length === 0 ? (
            <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed p-8 text-center">
              <FileQuestion className="size-8 text-muted-foreground" />
              <p className="font-medium">No problems available</p>
              <p className="max-w-md text-sm text-muted-foreground">
                No problems have been added to this assessment yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {assessmentProblems.map((item, index) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-4 rounded-xl border p-4 transition-colors hover:bg-muted/30 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex min-w-0 items-start gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted font-semibold">
                      {item.order ?? index + 1}
                    </div>

                    <div className="min-w-0 space-y-2">
                      <p className="font-semibold">
                        {item.problem?.title ?? `Problem ${index + 1}`}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">
                          {item.problem?.type ?? "Problem"}
                        </Badge>

                        {item.problem?.difficulty && (
                          <Badge variant="secondary">
                            {item.problem.difficulty}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 sm:justify-end">
                    <Trophy className="size-4 text-muted-foreground" />
                    <span className="font-semibold">
                      {item.marks} {item.marks === 1 ? "mark" : "marks"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>



      {/* Invitation and next step */}
      <Card className="overflow-hidden border-primary/20 shadow-sm">
        <div className="h-1 bg-primary/70" />

        <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex items-start gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              {hasInvitation ? (
                <CheckCircle2 className="size-5" />
              ) : (
                <ShieldCheck className="size-5" />
              )}
            </div>

            <div className="space-y-1">
              <h3 className="font-semibold">
                {hasInvitation
                  ? "You have received an invitation"
                  : "Waiting for company invitation"}
              </h3>

              <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                {hasInvitation
                  ? "Your invitation is available. View it to review the details and continue."
                  : "Please wait for company invitations. You can view your invitation here once a company sends one."}
              </p>
            </div>
          </div>

          <Button
            // asChild={hasInvitation}
            className="w-full shrink-0 sm:w-auto"
            disabled={!hasInvitation || invitationsPending}
          >
            {hasInvitation ? (
              <Link href="/invitations">View Invitation</Link>
            ) : (
              <span>View Invitation</span>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="border-t pt-5">
        <p className="max-w-2xl text-xs leading-5 text-muted-foreground">
          Your assessment attempt and access to questions are subject to
          invitation status, payment requirements, and assessment eligibility.
        </p>
      </div>
    </div>
  );
}
