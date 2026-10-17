
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  ArrowRight,
  Building2,
} from "lucide-react";

import { useAssessmentById } from "@/hook/assessment.hook";
import { useMyInvitations } from "@/hook/invitation.hook";
import { useAssessmentProblems } from "@/hook";
import { useGetMe } from "@/hook/auth.hook";

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
import { toast } from "@/components/ui/toast";
import Loading from "./assessment-detail-loading-page";

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
  const router = useRouter();

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

  const {
    data: userResponse,
    isPending: userPending,
  } = useGetMe();

  const currentUser = userResponse?.data;
  const isLoggedIn = Boolean(currentUser);

  const {
    data: invitationResponse,
    isPending: invitationsPending,
  } = useMyInvitations(
    { page: 1, limit: 100 },
    !userPending && isLoggedIn,
  );

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

  const handleViewInvitation = () => {
    if (userPending) return;

    if (!isLoggedIn) {
      router.push(`/login?redirect=${encodeURIComponent(`/assessments/${assessmentId}`)}`);
      return;
    }

    if (invitationsPending) return;

    if (!hasInvitation) {
      toast.add({
        title: "Waiting for company invitation",
        description: "Please wait for company invitation.",
        type: "info",
      });
      return;
    }

    router.push("/candidate/invitations");
  };

  if (isPending) {
    return (
      <Loading/>
    );
  }
  // if (isPending) {
  //   return (
  //     <div className="flex min-h-[60vh] items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  if (isError || !assessment) {
    return (
      <div className="mx-auto max-w-3xl space-y-5 px-4 py-10">
        <Button  variant="ghost">
          <Link href="/assessments">
            <ArrowLeft className="mr-2 size-4" />
            Back to assessments
          </Link>
        </Button>

        <Card className="border-border/70 shadow-sm">
          <CardContent className="flex flex-col items-center gap-4 py-14 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="size-7 text-destructive" />
            </div>

            <h2 className="text-xl font-semibold">Assessment not found</h2>

            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              We could not load this assessment. It may no longer be available
              or the request may have failed.
            </p>

            <div className="flex flex-wrap justify-center gap-3">
              <Button onClick={() => refetch()}>
                <RefreshCw className="mr-2 size-4" />
                Try again
              </Button>

              <Button  variant="outline">
                <Link href="/assessments">Browse assessments</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-muted/20">
      <div className="mx-auto max-w-6xl space-y-7 px-4 py-6 pb-12 sm:px-6 lg:px-8">
        {/* Back navigation */}
        <Button  variant="ghost" className="-ml-3">
          <Link href="/assessments">
            <ArrowLeft className="mr-2 size-4" />
            All assessments
          </Link>
        </Button>

        {/* Assessment overview */}
        <Card className="overflow-hidden border-border/70 shadow-sm">
          <div className="h-1.5 bg-primary" />

          <CardHeader className="space-y-6 p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  variant={
                    assessment.status === "PUBLISHED" ? "default" : "secondary"
                  }
                >
                  {assessment.status}
                </Badge>

                <Badge variant="outline" className="gap-1.5">
                  <ShieldCheck className="size-3.5" />
                  Invitation-based
                </Badge>
              </div>

              <div className="flex w-fit items-center gap-3 rounded-xl border bg-primary/5 px-4 py-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Wallet className="size-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">
                    Assessment fee
                  </p>
                  <p className="text-lg font-bold">
                    {formatPrice(assessment.price)}
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-3xl space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Developer assessment
              </p>

              <CardTitle className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                {assessment.title}
              </CardTitle>

              <CardDescription className="text-sm leading-7 sm:text-base">
                {assessment.description || "No description provided."}
              </CardDescription>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" />
                Created {formatDate(assessment.createdAt)}
              </span>

              <span className="flex items-center gap-2">
                <Building2 className="size-4" />
                Company invitation required
              </span>
            </div>
          </CardHeader>
        </Card>

        {/* Assessment metrics */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            icon={<Clock3 className="size-5" />}
            label="Duration"
            value={String(assessment.durationMinutes)}
            suffix="minutes"
            iconClass="bg-blue-500/10 text-blue-600"
          />

          <MetricCard
            icon={<Trophy className="size-5" />}
            label="Total marks"
            value={String(assessment.totalMarks)}
            suffix="marks"
            iconClass="bg-violet-500/10 text-violet-600"
          />

          <MetricCard
            icon={<CheckCircle2 className="size-5" />}
            label="Passing score"
            value={String(assessment.passMarks)}
            suffix="marks"
            iconClass="bg-emerald-500/10 text-emerald-600"
          />

          <MetricCard
            icon={<Wallet className="size-5" />}
            label="Assessment fee"
            value={formatPrice(assessment.price)}
            iconClass="bg-amber-500/10 text-amber-600"
          />
        </section>

        {/* Problem preview */}
        <Card className="border-border/70 shadow-sm">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ListChecks className="size-5" />
              </div>

              <div className="space-y-1">
                <CardTitle className="text-xl">
                  Assessment problems
                </CardTitle>
                <CardDescription className="leading-6">
                  Preview the question types, difficulty levels, and marks.
                </CardDescription>
              </div>
            </div>

            {!problemsPending && !problemsError && (
              <Badge variant="secondary" className="w-fit">
                {assessmentProblems.length}{" "}
                {assessmentProblems.length === 1 ? "problem" : "problems"}
              </Badge>
            )}
          </CardHeader>

          <CardContent>
            {problemsPending ? (
              <div className="flex min-h-36 items-center justify-center">
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
                <p className="max-w-md text-sm leading-6 text-muted-foreground">
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
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-sm font-semibold">
                        {item.order ?? index + 1}
                      </div>

                      <div className="min-w-0 space-y-2">
                        <p className="break-words font-semibold">
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

                    <div className="flex shrink-0 items-center gap-2 text-sm">
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

        {/* Invitation action */}
        <Card className="overflow-hidden border-primary/20 shadow-sm">
          <div className="h-1 bg-primary/70" />

          <CardContent className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-3">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                {hasInvitation ? (
                  <CheckCircle2 className="size-5" />
                ) : (
                  <ShieldCheck className="size-5" />
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold">
                  {!isLoggedIn
                    ? "Sign in to check your invitation"
                    : hasInvitation
                      ? "You have received an invitation"
                      : "Waiting for company invitation"}
                </h3>

                <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                  {!isLoggedIn
                    ? "Sign in to your account to check whether a company has invited you to this assessment."
                    : hasInvitation
                      ? "Your invitation is available. Open your invitations to review its details and continue."
                      : "Please wait for company invitation. Once a company invites you, you can review it from your invitations page."}
                </p>

                {isLoggedIn && hasInvitation && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    <Badge
                      variant="outline"
                      className={
                        isInvitationAccepted
                          ? "border-emerald-500/40 text-emerald-600"
                          : isInvitationPending
                            ? "border-amber-500/40 text-amber-600"
                            : ""
                      }
                    >
                      {assessmentInvitation?.status}
                    </Badge>
                  </div>
                )}
              </div>
            </div>

            <Button
              className="w-full shrink-0 sm:w-auto"
              disabled={
                userPending ||
                (isLoggedIn && invitationsPending)
              }
              onClick={handleViewInvitation}
            >
              {userPending ? (
                <>
                  <Spinner />
                  Checking...
                </>
              ) : !isLoggedIn ? (
                <>
                  Login to continue
                  <ArrowRight className="ml-2 size-4" />
                </>
              ) : invitationsPending ? (
                <>
                  <Spinner />
                  Checking invitation...
                </>
              ) : hasInvitation ? (
                <>
                  View Invitation
                  <ArrowRight className="ml-2 size-4" />
                </>
              ) : (
                "View Invitation"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="border-t pt-5">
          <p className="max-w-2xl text-xs leading-5 text-muted-foreground">
            Assessment access depends on company invitation, invitation status,
            payment requirements, and assessment eligibility.
          </p>
        </div>
      </div>
    </main>
  );
}

function MetricCard({
  icon,
  label,
  value,
  suffix,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  suffix?: string;
  iconClass: string;
}) {
  return (
    <Card className="border-border/70 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="break-words text-xl font-bold sm:text-2xl">{value}</p>
          {suffix && (
            <p className="text-xs text-muted-foreground">{suffix}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
