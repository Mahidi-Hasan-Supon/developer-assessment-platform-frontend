"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/toast";

import { useDeleteAssessmentProblem } from "@/hook";

import type { AssessmentProblem } from "@/types";

interface RemoveAssessmentProblemSheetProps {
  assessmentId: string;
  assessmentProblem: AssessmentProblem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RemoveAssessmentProblemSheet = ({
  assessmentId,
  assessmentProblem,
  open,
  onOpenChange,
}: RemoveAssessmentProblemSheetProps) => {
  const deleteMutation = useDeleteAssessmentProblem();

  const handleRemove = () => {
    if (!assessmentProblem) return;

    deleteMutation.mutate(
      {
        assessmentId,
        problemId: assessmentProblem.problemId,
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Remove failed",
              description: response.message || "Failed to remove problem.",
              type: "error",
            });

            return;
          }

          toast.add({
            title: "Problem removed",
            description: "Problem has been removed from this assessment.",
            type: "success",
          });

          onOpenChange(false);
        },

        onError: (error) => {
          toast.add({
            title: "Remove failed",
            description: error.message || "Failed to remove problem.",
            type: "error",
          });
        },
      },
    );
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Remove Problem</SheetTitle>

          <SheetDescription>
            Are you sure you want to remove this problem from the assessment?
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-6">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-medium">
              {assessmentProblem?.problem?.title || "Unknown Problem"}
            </p>

            {assessmentProblem?.problem?.description && (
              <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">
                {assessmentProblem.problem.description}
              </p>
            )}

            <div className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Type</p>

                <p className="mt-1 text-sm font-medium">
                  {assessmentProblem?.problem?.type || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Difficulty</p>

                <p className="mt-1 text-sm font-medium">
                  {assessmentProblem?.problem?.difficulty || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Marks</p>

                <p className="mt-1 text-sm font-medium">
                  {assessmentProblem?.marks ??
                    assessmentProblem?.problem?.marks ??
                    "-"}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            This will only remove the problem from this assessment. The original
            problem will not be deleted.
          </p>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={deleteMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            onClick={handleRemove}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending && <Spinner />}
            Confirm Remove
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default RemoveAssessmentProblemSheet;
