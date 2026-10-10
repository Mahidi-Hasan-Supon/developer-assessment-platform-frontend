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

interface PublishAssessmentSheetProps {
  assessment: Assessment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PublishAssessmentSheet = ({
  assessment,
  open,
  onOpenChange,
}: PublishAssessmentSheetProps) => {
  const updateMutation = useUpdateAssessment();

  const handlePublish = () => {
    if (!assessment || assessment.status !== "DRAFT") return;

    updateMutation.mutate(
      {
        id: assessment.id,
        payload: { status: "PUBLISHED" },
      },
      {
        onSuccess: (response) => {
          if (!response.success) {
            toast.add({
              title: "Publish failed",
              description: response.message || "Failed to publish assessment.",
              type: "error",
            });
            return;
          }

          toast.add({
            title: "Assessment published",
            description: "Your assessment is now published.",
            type: "success",
          });

          onOpenChange(false);
        },

        onError: (error) => {
          const apiError = error as Error & {
            data?: { message?: string };
            response?: {
              _data?: { message?: string };
              data?: { message?: string };
            };
          };

          const message =
            apiError.response?._data?.message ??
            apiError.response?.data?.message ??
            apiError.data?.message ??
            apiError.message;

          const isMarksMismatch =
            message?.includes("Total question marks") &&
            message?.includes("must equal assessment total marks");

          toast.add({
            title: isMarksMismatch
              ? "Assessment marks don't match"
              : "Publish failed",
            description: isMarksMismatch
              ? message.replace("Cannot publish assessment. ", "")
              : message || "Failed to publish assessment.",
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
          <SheetTitle>Publish Assessment</SheetTitle>
          <SheetDescription>
            Are you sure you want to publish this assessment? Check the
            assessment details and its problems before publishing.
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 py-6">
          <div className="rounded-lg border bg-muted/30 p-4">
            <p className="font-medium">{assessment?.title || "Assessment"}</p>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-muted-foreground">Duration</p>
                <p className="mt-1 font-medium">
                  {assessment?.durationMinutes} min
                </p>
              </div>

              <div>
                <p className="text-muted-foreground">Total Marks</p>
                <p className="mt-1 font-medium">{assessment?.totalMarks}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Pass Marks</p>
                <p className="mt-1 font-medium">{assessment?.passMarks}</p>
              </div>

              <div>
                <p className="text-muted-foreground">Price</p>
                <p className="mt-1 font-medium">
                  {assessment?.price === 0 ? "Free" : `৳${assessment?.price}`}
                </p>
              </div>
            </div>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            After publishing, the assessment will no longer be a draft. Make
            sure its configuration is correct.
          </p>
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
            onClick={handlePublish}
            disabled={
              updateMutation.isPending || assessment?.status !== "DRAFT"
            }
          >
            {updateMutation.isPending && <Spinner />}
            Confirm Publish
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default PublishAssessmentSheet;
