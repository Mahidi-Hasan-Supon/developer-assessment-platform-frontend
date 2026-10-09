"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/spinner";
import { AssessmentProblem } from "@/types";
import { useAssessmentProblems, useDeleteAssessmentProblem } from "@/hook";
import AddAssessmentProblemSheet from "./assPlb.sheet";
import EditAssessmentProblemSheet from "./edit-assPlb-sheet";
import RemoveAssessmentProblemSheet from "./remove-assPlb";
import AssessmentProblemLoading from "./assPlb-table-loading";

interface AssessmentProblemListProps {
  assessmentId: string;
}

const AssessmentProblemList = ({
  assessmentId,
}: AssessmentProblemListProps) => {
  const [addOpen, setAddOpen] = useState(false);
  const [removingProblem, setRemovingProblem] =
    useState<AssessmentProblem | null>(null);

  const [removeOpen, setRemoveOpen] = useState(false);

  const [editingProblem, setEditingProblem] =
    useState<AssessmentProblem | null>(null);

  const [editOpen, setEditOpen] = useState(false);

  const { data, isLoading, isError } = useAssessmentProblems(assessmentId);


  const assessmentProblems = data?.data ?? [];

  const handleEdit = (assessmentProblem: AssessmentProblem) => {
    setEditingProblem(assessmentProblem);
    setEditOpen(true);
  };

  const handleRemove = (assessmentProblem: AssessmentProblem) => {
    setRemovingProblem(assessmentProblem);
    setRemoveOpen(true);
  };

  if (isLoading) {
    return (
      <AssessmentProblemLoading/>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-destructive">
          Failed to load assessment problems.
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Assessment Problems</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Add and manage problems for this assessment.
            </p>
          </div>

          <Button onClick={() => setAddOpen(true)}>Add Problem</Button>
        </div>

        {/* Table */}
        {assessmentProblems.length === 0 ? (
          <div className="rounded-lg border border-dashed px-6 py-12 text-center">
            <p className="font-medium">No problems added</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add existing problems to this assessment.
            </p>

            <Button className="mt-4" onClick={() => setAddOpen(true)}>
              Add Problem
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Problem</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {assessmentProblems.map((assessmentProblem) => (
                  <TableRow key={assessmentProblem.id}>
                    <TableCell className="font-medium">
                      {assessmentProblem.order}
                    </TableCell>

                    <TableCell>
                      <div className="max-w-[350px]">
                        <p className="truncate font-medium">
                          {assessmentProblem.problem?.title ||
                            "Unknown Problem"}
                        </p>

                        {assessmentProblem.problem?.description && (
                          <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                            {assessmentProblem.problem.description}
                          </p>
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span
                        className={
                          assessmentProblem.problem?.type === "MCQ"
                            ? "font-medium text-blue-600 dark:text-blue-400"
                            : assessmentProblem.problem?.type === "WRITTEN"
                              ? "font-medium text-purple-600 dark:text-purple-400"
                              : "font-medium text-orange-600 dark:text-orange-400"
                        }
                      >
                        {assessmentProblem.problem?.type || "-"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span
                        className={
                          assessmentProblem.problem?.difficulty === "EASY"
                            ? "font-medium text-green-600 dark:text-green-400"
                            : assessmentProblem.problem?.difficulty === "MEDIUM"
                              ? "font-medium text-yellow-600 dark:text-yellow-400"
                              : "font-medium text-red-600 dark:text-red-400"
                        }
                      >
                        {assessmentProblem.problem?.difficulty || "-"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium text-foreground">
                        {assessmentProblem.marks ??
                          assessmentProblem.problem?.marks ??
                          "-"}
                      </span>
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(assessmentProblem)}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemove(assessmentProblem)}
                        >
                          Remove
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <AddAssessmentProblemSheet
        assessmentId={assessmentId}
        open={addOpen}
        onOpenChange={setAddOpen}
      />

      <EditAssessmentProblemSheet
        assessmentId={assessmentId}
        assessmentProblem={editingProblem}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
      <RemoveAssessmentProblemSheet
        assessmentId={assessmentId}
        assessmentProblem={removingProblem}
        open={removeOpen}
        onOpenChange={setRemoveOpen}
      />
    </>
  );
};

export default AssessmentProblemList;
