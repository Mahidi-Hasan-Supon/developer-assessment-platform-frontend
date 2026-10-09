
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
import { useUpdateAssessment } from "@/hook";
import type { Assessment } from "@/types/assessment.types";

interface StartAssessmentSheetProps {
  assessment: Assessment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const StartAssessmentSheet = ({
  assessment,
  open,
  onOpenChange,
}: StartAssessmentSheetProps) => {
  const updateMutation = useUpdateAssessment();

  const handleStart = () => {
    if (!assessment || assessment.status !== "PUBLISHED") return;

    updateMutation.mutate(
      {
        id: assessment.id,
        payload: { status: "ONGOING" },
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Failed to start",
              description:
                response.message || "Could not start this assessment.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Assessment started",
            description: "The assessment status is now ONGOING.",
            type: "success",
          });

          onOpenChange(false);
        },
        onError: (error) => {
          toast.add({
            title: "Failed to start",
            description: error.message || "Could not start this assessment.",
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
          <SheetTitle>Start Assessment</SheetTitle>
          <SheetDescription>
            Are you sure you want to move this published assessment to ongoing?
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-6">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-medium">
              {assessment?.title || "Assessment"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Once started, the status will change from PUBLISHED to ONGOING.
            </p>
          </div>
        </div>

        <SheetFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleStart}
            disabled={
              updateMutation.isPending ||
              assessment?.status !== "PUBLISHED"
            }
          >
            {updateMutation.isPending && <Spinner />}
            Confirm Start
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default StartAssessmentSheet;

