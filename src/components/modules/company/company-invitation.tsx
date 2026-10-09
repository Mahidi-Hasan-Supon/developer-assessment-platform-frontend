"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileText,
  HelpCircle,
  Search,
  Send,
  Trophy,
  Users,
} from "lucide-react";

import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

import { useCreateInvitation } from "@/hook/invitation.hook";
import { useCandidates } from "@/hook/company.hook";
import { useAssessments } from "@/hook";

import { Label } from "@/components/ui/label";
import CompanyInvitationsLoading from "./company-invitation-loading";

export default function CompanyInvitationsPage() {
  const [assessmentId, setAssessmentId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState("");

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

  const { mutate: createInvite, isPending: sending } = useCreateInvitation();
  if (assessmentsLoading) {
    return <CompanyInvitationsLoading />;
  }

  const candidates = candidatesResponse?.data ?? [];
  const assessments = assessmentsResponse?.data ?? [];

  const publishedAssessments = assessments.filter(
    (assessment) => assessment.status === "PUBLISHED",
  );

  const selectedAssessment = publishedAssessments.find(
    (a) => a.id === assessmentId,
  );
  const selectedCandidate = candidates.find(
    (c) => c.id === selectedCandidateId,
  );

  function handleSendInvitation() {
    if (!assessmentId || !selectedCandidateId) {
      toast.add({
        title: "Please select both an assessment and a candidate",
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
            title: "Invitation sent successfully",
            description: `${selectedCandidate?.name || "Candidate"} has been invited to "${selectedAssessment?.title}".`,
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
  }

  return (
    <main className="space-y-8 p-4 md:p-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col gap-1 border-b pb-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Candidate Invitations
        </h1>
        <p className="text-sm text-muted-foreground">
          Invite candidates to participate in your published assessments.
        </p>
      </div>

      {/* 1. Select Assessment Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <FileText className="size-4 text-primary" />
            Select Assessment
          </CardTitle>
          <CardDescription>
            Choose the published assessment you want to invite candidates to.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Select
            value={assessmentId}
            onValueChange={(value) => setAssessmentId(value ?? "")}
            disabled={publishedAssessments.length === 0}
          >
            <SelectTrigger className="w-full">
              <SelectValue
                placeholder={
                  publishedAssessments.length === 0
                    ? "No published assessments available"
                    : "Choose an assessment"
                }
              >
                {selectedAssessment ? selectedAssessment.title : undefined}
              </SelectValue>
            </SelectTrigger>

            <SelectContent>
              {publishedAssessments.map((assessment) => (
                <SelectItem key={assessment.id} value={assessment.id}>
                  {assessment.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {assessmentsError && (
            <p className="text-xs text-destructive">
              Failed to load assessments. Please refresh.
            </p>
          )}

          {/* Selected Assessment Info Details */}
          {selectedAssessment && (
            <div className="rounded-xl border p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-primary/10 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-primary shrink-0" />
                  <span className="text-sm font-semibold text-foreground">
                    {selectedAssessment.title}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className="bg-background text-primary border-primary/30 text-xs"
                >
                  {selectedAssessment.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Clock className="size-3.5" />
                  <span>
                    Duration:{" "}
                    <strong className="font-medium text-foreground">
                      {selectedAssessment.durationMinutes} mins
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Trophy className="size-3.5" />
                  <span>
                    Pass Marks:{" "}
                    <strong className="font-medium text-foreground">
                      {selectedAssessment.passMarks}
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <FileText className="size-3.5" />
                  <span>
                    Total Marks:{" "}
                    <strong className="font-medium text-foreground">
                      {selectedAssessment.totalMarks}
                    </strong>
                  </span>
                </div>
              </div>

              {selectedAssessment.description && (
                <p className="text-xs text-muted-foreground italic border-t border-primary/10 pt-2 line-clamp-2">
                  "{selectedAssessment.description}"
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Standalone Search Candidate Field */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold text-foreground flex items-center gap-2">
          <Search className="size-4 text-primary" />
          Search Candidate
        </Label>
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type candidate name or email to search..."
            className="pl-9 bg-background shadow-sm"
          />
        </div>
      </div>

      {/* 3. Candidates Table Component */}
      <Card className="border shadow-sm">
        <CardHeader className="border-b bg-muted/30">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="size-4 text-primary" />
            Candidate List
          </CardTitle>
          <CardDescription>
            Select a candidate below to assign the selected assessment.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px] text-center">Action</TableHead>
                <TableHead>Candidate Name</TableHead>
                <TableHead>Email Address</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {candidatesLoading ? (
                <TableRow>
                  <TableCell colSpan={3} className="py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Spinner />
                      Searching candidates...
                    </div>
                  </TableCell>
                </TableRow>
              ) : candidatesError ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-8 text-center text-sm text-destructive"
                  >
                    Failed to load candidate list.
                  </TableCell>
                </TableRow>
              ) : candidates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="py-10 text-center text-sm text-muted-foreground"
                  >
                    No candidate found matching "{searchTerm}".
                  </TableCell>
                </TableRow>
              ) : (
                candidates.map((candidate) => {
                  const isSelected = selectedCandidateId === candidate.id;

                  return (
                    <TableRow
                      key={candidate.id}
                      onClick={() => setSelectedCandidateId(candidate.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10 font-medium"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name="candidate-select"
                          checked={isSelected}
                          onChange={() => setSelectedCandidateId(candidate.id)}
                          className="size-4 cursor-pointer accent-primary"
                        />
                      </TableCell>

                      <TableCell className="text-sm font-medium">
                        {candidate.name}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {candidate.email}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>

            <TableBody>
              {candidatesError ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-8 text-sm text-destructive"
                  >
                    Failed to load candidate list.
                  </TableCell>
                </TableRow>
              ) : candidates.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-10 text-sm text-muted-foreground"
                  >
                    No candidate found matching "{searchTerm}".
                  </TableCell>
                </TableRow>
              ) : (
                candidates.map((candidate) => {
                  const isSelected = selectedCandidateId === candidate.id;
                  return (
                    <TableRow
                      key={candidate.id}
                      onClick={() => setSelectedCandidateId(candidate.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-primary/10 font-medium"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <TableCell className="text-center">
                        <input
                          type="radio"
                          name="candidate-select"
                          checked={isSelected}
                          onChange={() => setSelectedCandidateId(candidate.id)}
                          className="size-4 accent-primary cursor-pointer"
                        />
                      </TableCell>

                      <TableCell className="text-sm font-medium">
                        {candidate.name}
                      </TableCell>

                      <TableCell className="text-sm text-muted-foreground">
                        {candidate.email}
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>

          {/* Action & Status Bar at Bottom */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t bg-muted/10">
            <div className="text-sm text-muted-foreground">
              {selectedCandidate && selectedAssessment ? (
                <span>
                  Ready to invite{" "}
                  <strong className="text-foreground">
                    {selectedCandidate.name}
                  </strong>{" "}
                  to{" "}
                  <Badge variant="secondary" className="mx-1">
                    {selectedAssessment.title}
                  </Badge>
                </span>
              ) : (
                <span>
                  Please select an assessment and a candidate to enable sending.
                </span>
              )}
            </div>

            <Button
              type="button"
              onClick={handleSendInvitation}
              disabled={
                sending ||
                !assessmentId ||
                !selectedCandidateId ||
                publishedAssessments.length === 0
              }
              className="w-full sm:w-auto"
            >
              {sending ? (
                <>
                  <Spinner className="mr-2" />
                  Sending Invitation...
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
    </main>
  );
}
