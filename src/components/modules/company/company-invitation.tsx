
"use client";

import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileText,
  Search,
  Send,
  Trash2,
  Trophy,
  Users,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  useAssessmentInvitations,
  useCreateInvitation,
  useDeleteInvitation,
} from "@/hook/invitation.hook";

import { useCandidates } from "@/hook/company.hook";
import { useAssessments } from "@/hook";
import type { InvitationStatus } from "@/types/invitation.types";

import CompanyInvitationsLoading from "./company-invitation-loading";

const ASSESSMENT_STORAGE_KEY = "company-invitation-assessment-id";

function getInvitationStatusStyle(status: InvitationStatus) {
  switch (status) {
    case "PENDING":
      return "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-400";

    case "ACCEPTED":
      return "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400";

    case "REJECTED":
      return "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400";

    case "USED":
      return "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400";

    case "EXPIRED":
      return "border-muted-foreground/30 bg-muted text-muted-foreground";

    default:
      return "border-border bg-muted text-muted-foreground";
  }
}

export default function CompanyInvitationsPage() {
  const [assessmentId, setAssessmentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [assessmentSearch, setAssessmentSearch] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");

  const [invitationToDelete, setInvitationToDelete] = useState<{
    id: string;
    candidateName: string;
    candidateEmail: string;
  } | null>(null);

  const {
    data: candidatesResponse,
    isPending: candidatesLoading,
    isError: candidatesError,
  } = useCandidates({
    searchTerm,
    page: 1,
    limit: 20,
  });

  const {
    data: assessmentsResponse,
    isPending: assessmentsLoading,
    isError: assessmentsError,
  } = useAssessments({
    page: 1,
    limit: 100,
  });

  const {
    mutate: createInvite,
    isPending: sending,
  } = useCreateInvitation();

  const {
    data: invitationsResponse,
    isPending: invitationsLoading,
    isError: invitationsError,
  } = useAssessmentInvitations(assessmentId);

  const {
    mutate: deleteInvite,
    isPending: deletingInvitation,
  } = useDeleteInvitation();

  const candidates = candidatesResponse?.data ?? [];
  const assessments = assessmentsResponse?.data ?? [];
  const invitations = invitationsResponse?.data ?? [];

  const publishedAssessments = assessments.filter(
    (assessment) => assessment.status === "PUBLISHED",
  );

  const selectedAssessment = publishedAssessments.find(
    (assessment) => assessment.id === assessmentId,
  );

  const selectedCandidate = candidates.find(
    (candidate) => candidate.id === selectedCandidateId,
  );

  // Restore the selected assessment after a reload.
  useEffect(() => {
    const savedAssessmentId = localStorage.getItem(
      ASSESSMENT_STORAGE_KEY,
    );

    if (savedAssessmentId) {
      setAssessmentId(savedAssessmentId);
    }
  }, []);

  const handleAssessmentSelect = (id: string) => {
    setAssessmentId(id);
    setSelectedCandidateId("");

    localStorage.setItem(ASSESSMENT_STORAGE_KEY, id);
  };

  // Invitations are fetched for the currently selected assessment.
  const invitedCandidateIds = new Set(
    invitations.map((invitation) => invitation.candidateId),
  );

  const selectedCandidateAlreadyInvited =
    Boolean(selectedCandidateId) &&
    invitedCandidateIds.has(selectedCandidateId);

  const handleSendInvitation = () => {
    if (!assessmentId || !selectedCandidateId) {
      toast.add({
        title: "Selection required",
        description: "Select an assessment and a candidate first.",
        type: "error",
      });
      return;
    }

    if (selectedCandidateAlreadyInvited) {
      toast.add({
        title: "Already invited",
        description:
          "This candidate has already been invited to this assessment.",
        type: "error",
      });
      return;
    }

    createInvite(
      {
        assessmentId,
        candidateId: selectedCandidateId,
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Invitation sent",
            description: `${selectedCandidate?.name ?? "Candidate"} has been invited successfully.`,
            type: "success",
          });

          setSelectedCandidateId("");
        },
        onError: (error) => {
          toast.add({
            title: "Failed to send invitation",
            description: error.message,
            type: "error",
          });
        },
      },
    );
  };

  const handleDeleteInvitation = () => {
    if (!invitationToDelete) return;

    deleteInvite(invitationToDelete.id, {
      onSuccess: () => {
        toast.add({
          title: "Invitation deleted",
          description: "The invitation was deleted successfully.",
          type: "success",
        });

        setInvitationToDelete(null);
      },
      onError: (error) => {
        toast.add({
          title: "Failed to delete invitation",
          description: error.message,
          type: "error",
        });
      },
    });
  };

  if (assessmentsLoading) {
    return <CompanyInvitationsLoading />;
  }

  const filteredAssessments = publishedAssessments.filter((assessment) =>
    assessment.title
      .toLowerCase()
      .includes(assessmentSearch.trim().toLowerCase()),
  );

  return (
    <main className="mx-auto max-w-6xl space-y-8 p-4 md:p-6">
      {/* Page heading */}
      <div className="space-y-1 border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Candidate Invitations
        </h1>
        <p className="text-sm text-muted-foreground">
          Invite candidates to your published assessments and manage
          their invitations.
        </p>
      </div>

      {/* Assessment selection */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="size-5 text-primary" />
            Select Assessment
          </CardTitle>
          <CardDescription>
            Choose the published assessment for your invitations.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:p-6">
          <div className="space-y-2">
            <Label htmlFor="assessment-search">Assessment</Label>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="assessment-search"
                value={assessmentSearch}
                onChange={(event) =>
                  setAssessmentSearch(event.target.value)
                }
                placeholder="Search assessment by title..."
                className="pl-9"
                disabled={publishedAssessments.length === 0}
              />
            </div>

            <div className="max-h-64 space-y-2 overflow-y-auto rounded-lg border p-2">
              {filteredAssessments.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  {publishedAssessments.length === 0
                    ? "No published assessments available."
                    : "No assessments match your search."}
                </p>
              ) : (
                filteredAssessments.map((assessment) => {
                  const isSelected = assessmentId === assessment.id;

                  return (
                    <button
                      key={assessment.id}
                      type="button"
                      onClick={() =>
                        handleAssessmentSelect(assessment.id)
                      }
                      aria-pressed={isSelected}
                      className={`w-full rounded-md border p-3 text-left transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                          : "border-transparent hover:border-border hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 space-y-1">
                          <p className="break-words text-sm font-medium">
                            {assessment.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {assessment.durationMinutes} minutes
                            {" · "}
                            {assessment.totalMarks} total marks
                            {" · "}
                            {assessment.passMarks} pass marks
                          </p>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <Badge variant="outline">Published</Badge>
                          {isSelected && (
                            <CheckCircle2 className="size-4 text-primary" />
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {selectedAssessment && (
            <div className="rounded-lg border bg-muted/20 p-4">
              <div className="flex items-start gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <FileText className="size-5 text-primary" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">
                    Selected assessment
                  </p>
                  <h3 className="mt-1 break-words font-semibold">
                    {selectedAssessment.title}
                  </h3>

                  {selectedAssessment.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                      {selectedAssessment.description}
                    </p>
                  )}
                </div>

                <Badge variant="secondary">Selected</Badge>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-4">
                <div className="rounded-md bg-background p-3">
                  <Clock className="mb-2 size-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">
                    {selectedAssessment.durationMinutes}
                  </p>
                  <p className="text-xs text-muted-foreground">Minutes</p>
                </div>

                <div className="rounded-md bg-background p-3">
                  <Trophy className="mb-2 size-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">
                    {selectedAssessment.passMarks}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Pass marks
                  </p>
                </div>

                <div className="rounded-md bg-background p-3">
                  <FileText className="mb-2 size-4 text-muted-foreground" />
                  <p className="text-lg font-semibold">
                    {selectedAssessment.totalMarks}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Total marks
                  </p>
                </div>
              </div>
            </div>
          )}

          {assessmentsError && (
            <p className="text-sm text-destructive">
              Failed to load assessments. Please refresh and try again.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Candidate search */}
      <div className="max-w-md space-y-2">
        <Label
          htmlFor="candidate-search"
          className="flex items-center gap-2 font-semibold"
        >
          <Search className="size-4 text-primary" />
          Search Candidate
        </Label>

        <Input
          id="candidate-search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by candidate name or email..."
        />
      </div>

      {/* Candidate list */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-4 text-primary" />
            Candidate List
          </CardTitle>
          <CardDescription>
            Select a candidate. Candidates already invited to this
            assessment cannot be invited again.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-20 text-center">
                  Select
                </TableHead>
                <TableHead>Candidate Name</TableHead>
                <TableHead>Email Address</TableHead>
                <TableHead className="text-right">
                  Invitation
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {candidatesLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Spinner />
                      Loading candidates...
                    </div>
                  </TableCell>
                </TableRow>
              ) : candidatesError ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-8 text-center text-sm text-destructive"
                  >
                    Failed to load candidates.
                  </TableCell>
                </TableRow>
              ) : candidates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No candidates found matching "{searchTerm}".
                  </TableCell>
                </TableRow>
              ) : (
                candidates.map((candidate) => {
                  const isSelected =
                    selectedCandidateId === candidate.id;

                  const alreadyInvited =
                    invitedCandidateIds.has(candidate.id);

                  return (
                    <TableRow
                      key={candidate.id}
                      data-state={isSelected ? "selected" : undefined}
                      onClick={() =>
                        setSelectedCandidateId(candidate.id)
                      }
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name="candidate-select"
                          aria-label={`Select ${candidate.name}`}
                          checked={isSelected}
                          onChange={() =>
                            setSelectedCandidateId(candidate.id)
                          }
                          onClick={(event) => event.stopPropagation()}
                          className="size-4 cursor-pointer accent-primary"
                        />
                      </TableCell>

                      <TableCell className="font-medium">
                        {candidate.name}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {candidate.email}
                      </TableCell>

                      <TableCell className="text-right">
                        {alreadyInvited ? (
                          <Badge
                            variant="outline"
                            className="border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400"
                          >
                            Already Invited
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Not Invited
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Send invitation action */}
          <div className="flex flex-col items-start justify-between gap-4 border-t bg-muted/10 p-4 sm:flex-row sm:items-center">
            <div className="min-w-0 text-sm text-muted-foreground">
              {selectedCandidate && selectedAssessment ? (
                selectedCandidateAlreadyInvited ? (
                  <p>
                    <strong className="text-foreground">
                      {selectedCandidate.name}
                    </strong>{" "}
                    has already been invited to{" "}
                    <strong className="text-foreground">
                      {selectedAssessment.title}
                    </strong>
                    .
                  </p>
                ) : (
                  <p>
                    Ready to invite{" "}
                    <strong className="text-foreground">
                      {selectedCandidate.name}
                    </strong>{" "}
                    to{" "}
                    <strong className="text-foreground">
                      {selectedAssessment.title}
                    </strong>
                    .
                  </p>
                )
              ) : (
                <p>Select an assessment and a candidate to continue.</p>
              )}
            </div>

            <Button
              type="button"
              onClick={handleSendInvitation}
              disabled={
                sending ||
                !assessmentId ||
                !selectedCandidateId ||
                selectedCandidateAlreadyInvited ||
                publishedAssessments.length === 0
              }
              className="w-full sm:w-auto"
            >
              {sending ? (
                <>
                  <Spinner className="mr-2" />
                  Sending Invitation...
                </>
              ) : selectedCandidateAlreadyInvited ? (
                <>
                  <CheckCircle2 className="mr-2 size-4" />
                  Already Invited
                </>
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  Send Invitation
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sent invitations */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="flex items-center gap-2 text-base">
            <Send className="size-4 text-primary" />
            Sent Invitations
          </CardTitle>
          <CardDescription>
            View invitation details and manage sent invitations.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          {!assessmentId ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Select an assessment to view its invitations.
            </p>
          ) : invitationsLoading ? (
            <div className="flex justify-center py-10">
              <Spinner />
            </div>
          ) : invitationsError ? (
            <p className="py-10 text-center text-sm text-destructive">
              Failed to load invitations.
            </p>
          ) : invitations.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No invitations sent for this assessment yet.
            </p>
          ) : (
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead>Candidate</TableHead>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Invited At</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {invitations.map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell>
                      <p className="font-medium">
                        {invitation.candidate?.name ??
                          "Unknown candidate"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {invitation.candidate?.email ??
                          "Email unavailable"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <p className="font-medium">
                        {invitation.assessment?.title ??
                          selectedAssessment?.title ??
                          "Unknown assessment"}
                      </p>
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getInvitationStatusStyle(
                          invitation.status,
                        )}
                      >
                        {invitation.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                      {new Date(
                        invitation.invitedAt ?? invitation.createdAt,
                      ).toLocaleDateString()}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        disabled={deletingInvitation}
                        aria-label={`Delete invitation for ${invitation.candidate?.name ?? "candidate"}`}
                        onClick={() =>
                          setInvitationToDelete({
                            id: invitation.id,
                            candidateName:
                              invitation.candidate?.name ??
                              "this candidate",
                            candidateEmail:
                              invitation.candidate?.email ?? "",
                          })
                        }
                      >
                        <Trash2 className="size-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation sheet */}
      <Sheet
        open={Boolean(invitationToDelete)}
        onOpenChange={(open) => {
          if (!open && !deletingInvitation) {
            setInvitationToDelete(null);
          }
        }}
      >
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Delete invitation?</SheetTitle>
            <SheetDescription>
              This will delete the invitation sent to{" "}
              <strong className="text-foreground">
                {invitationToDelete?.candidateName}
              </strong>
              {invitationToDelete?.candidateEmail && (
                <>
                  {" "}({invitationToDelete.candidateEmail})
                </>
              )}
              . This action cannot be undone.
            </SheetDescription>
          </SheetHeader>

          <SheetFooter className="mt-6 flex-row justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={deletingInvitation}
              onClick={() => setInvitationToDelete(null)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={deletingInvitation || !invitationToDelete}
              onClick={handleDeleteInvitation}
            >
              {deletingInvitation ? (
                <>
                  <Spinner className="mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 size-4" />
                  Delete Invitation
                </>
              )}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </main>
  );
}

