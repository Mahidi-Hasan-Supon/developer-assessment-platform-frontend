"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import type { CompanyApplication } from "@/types/company.types";
import { useUpdateCompanyStatus } from "@/hook/company.hook";
import { toast } from "@/components/ui/toast";

interface CompanyApproveSheetProps {
  company: CompanyApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const CompanyApproveSheet = ({
  company,
  open,
  onOpenChange,
  onSuccess,
}: CompanyApproveSheetProps) => {
  const [reviewNote, setReviewNote] = useState("");

  const { mutate: updateStatus, isPending } = useUpdateCompanyStatus();

  const handleReject = () => {
    if (!company) return;

    if (reviewNote.trim().length < 5) {
      toast.add({
        title: "Invalid Review Note",
        description:
          "Please provide at least 5 characters as the rejection reason.",
        type: "error",
      });
      return;
    }

    updateStatus(
      {
        id: company.id,
        payload: {
          status: "REJECTED",
          reviewNote: reviewNote.trim(),
        },
      },
      {
        onSuccess: () => {
          toast.add({
            title: "Application Rejected",
            description:
              "The company application has been rejected successfully.",
            type: "success",
          });

          setReviewNote("");
          onOpenChange(false);
          onSuccess();
        },

        onError: () => {
          toast.add({
            title: "Rejection Failed",
            description:
              "Failed to reject the company application. Please try again.",
            type: "error",
          });
        },
      },
    );
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      setReviewNote("");
    }

    onOpenChange(value);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Reject Company Application</SheetTitle>

          <SheetDescription>
            Review the company application and provide a reason before rejecting
            it.
          </SheetDescription>
        </SheetHeader>

        {company && (
          <div className="space-y-6 px-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Company</p>

              <p className="text-muted-foreground text-sm">
                {company.companyName || "N/A"}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Applicant</p>

              <p className="text-muted-foreground text-sm">
                {company.user.name}
              </p>

              <p className="text-muted-foreground text-sm">
                {company.user.email}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reviewNote">Review Note</Label>

              <Textarea
                id="reviewNote"
                placeholder="Write the reason for rejecting this application..."
                value={reviewNote}
                onChange={(event) => setReviewNote(event.target.value)}
                rows={6}
                disabled={isPending}
              />

              <p className="text-muted-foreground text-xs">
                Minimum 5 characters.
              </p>
            </div>
          </div>
        )}

        <SheetFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            type="button"
            variant="destructive"
            disabled={isPending || reviewNote.trim().length < 5}
            onClick={handleReject}
          >
            {isPending ? "Rejecting..." : "Reject Application"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CompanyApproveSheet;
