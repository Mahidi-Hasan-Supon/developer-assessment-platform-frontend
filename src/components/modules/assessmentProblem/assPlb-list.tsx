"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  useAssessments,
  useProblems,
  useCreateAssessmentProblem,
} from "@/hook";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/toast";
import type { AssessmentProblem } from "@/types";
import { getAllAssessmentProblems } from "@/api";
import AssessmentProblemLoading from "./assPlb-table-loading";
import { AssessmentProblemForm } from "@/components/form/assessmentProblemForm";
import EditAssessmentProblemSheet from "./edit-assPlb-sheet";
import RemoveAssessmentProblemSheet from "./remove-assPlb";

export default function AssessmentProblemsPage() {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedProblem, setSelectedProblem] =
    useState<AssessmentProblem | null>(null);   
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const queryClient = useQueryClient();

  const assessmentProblemsQuery = useQuery({
    queryKey: ["assessment-problems"],
    queryFn: () => getAllAssessmentProblems(),
  });

  const { data: assessmentData } = useAssessments({ page: 1, limit: 100 });
  const { data: problemData } = useProblems({ page: 1, limit: 100 });
  const createMutation = useCreateAssessmentProblem();

  const rows = assessmentProblemsQuery.data?.data ?? [];
  const assessments = assessmentData?.data ?? [];
  const problems = problemData?.data ?? [];

  const handleCreate = (
    assessmentId: string,
    payload: { problemId: string; order: number; marks?: number },
  ) => {
    createMutation.mutate(
      { assessmentId, payload },
      {
        onSuccess: async (response) => {
          if (!response.success) {
            toast.add({
              title: "Create failed",
              description: response.message || "Failed to add problem.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Problem added",
            description: "Assessment problem created successfully.",
            type: "success",
          });

          await queryClient.invalidateQueries({
            queryKey: ["assessment-problems"],
          });

          setShowCreateForm(false);
        },
        onError: (error) => {
          toast.add({
            title: "Create failed",
            description: error.message || "Failed to add problem.",
            type: "error",
          });
        },
      },
    );
  };

  if (assessmentProblemsQuery.isLoading) {
    return <AssessmentProblemLoading />;
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Assessment Problems</h1>
          <p className="text-sm text-muted-foreground">
            Manage problems linked to your assessments.
          </p>
        </div>

        <Button onClick={() => setShowCreateForm((open) => !open)}>
          {showCreateForm ? "Close Form" : "Create Assessment Problem"}
        </Button>
      </div>

      {showCreateForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create Assessment Problem</CardTitle>
          </CardHeader>
          <CardContent>
            <AssessmentProblemForm
              assessments={assessments}
              problems={problems}
              isPending={createMutation.isPending}
              onSubmit={handleCreate}
            />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Assessment Problem List</CardTitle>
        </CardHeader>

        <CardContent>
          {assessmentProblemsQuery.isError ? (
            <p className="py-10 text-center text-sm text-destructive">
              Failed to load assessment problems.
            </p>
          ) : rows.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-medium">No assessment problem data found</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Click Create Assessment Problem to add one.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Assessment</TableHead>
                    <TableHead>Problem</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Marks</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rows.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.assessment?.title ?? "Unknown assessment"}
                      </TableCell>
                      <TableCell>
                        {item.problem?.title ?? "Unknown problem"}
                      </TableCell>
                      <TableCell>
                        {item.problem?.type ? (
                          <Badge variant="secondary">{item.problem.type}</Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>
                        {item.problem?.difficulty ? (
                          <Badge variant="outline">
                            {item.problem.difficulty}
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>{item.order}</TableCell>
                      <TableCell>{item.marks ?? "—"}</TableCell>
                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              setSelectedProblem(item);
                              setEditOpen(true);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => {
                              setSelectedProblem(item);
                              setDeleteOpen(true);
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {selectedProblem && (
        <>
          <EditAssessmentProblemSheet
            assessmentId={selectedProblem.assessmentId}
            assessmentProblem={selectedProblem}
            open={editOpen}
            onOpenChange={setEditOpen}
          />

          <RemoveAssessmentProblemSheet
            assessmentId={selectedProblem.assessmentId}
            assessmentProblem={selectedProblem}
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
          />
        </>
      )}
    </div>
  );
}
