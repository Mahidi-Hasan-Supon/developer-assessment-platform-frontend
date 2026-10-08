"use client";

import { useDeleteAssessment } from "@/hook";
import type { Assessment } from "@/types/assessment.types";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { Spinner } from "@/components/ui/spinner";

interface DeleteAssessmentSheetProps {
  assessment: Assessment;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteAssessmentSheet = ({
  assessment,
  open,
  onOpenChange,
}: DeleteAssessmentSheetProps) => {
  const { mutate: deleteAssessment, isPending } = useDeleteAssessment();

  const handleDelete = () => {
    deleteAssessment(assessment.id, {
      onSuccess: (response) => {
        toast.add({
          title: "Assessment deleted",
          description: response.message || "Assessment deleted successfully.",
          type: "success",
        });

        onOpenChange(false);
      },

      onError: (error) => {
        toast.add({
          title: "Failed to delete assessment",
          description:
            error instanceof Error
              ? error.message
              : "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Assessment</SheetTitle>

          <SheetDescription>
            Are you sure you want to delete this assessment? This action cannot
            be undone.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4 px-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Title</p>

                <p className="font-medium">{assessment.title}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Duration</p>

                  <p className="font-medium">
                    {assessment.durationMinutes} minutes
                  </p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Price</p>

                  <p className="font-medium">
                    {assessment.price === 0 ? "Free" : `৳${assessment.price}`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Total Marks</p>

                  <p className="font-medium">{assessment.totalMarks}</p>
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">Pass Marks</p>

                  <p className="font-medium">{assessment.passMarks}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <p className="text-sm text-destructive">
              Deleting this assessment will remove it from your assessment list.
            </p>
          </div>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isPending}
            onClick={handleDelete}
          >
            {isPending ? (
              <>
                <Spinner />
                Deleting...
              </>
            ) : (
              "Confirm Delete"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DeleteAssessmentSheet;
