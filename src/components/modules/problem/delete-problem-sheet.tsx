"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useDeleteProblem } from "@/hook";
import type { Problem } from "@/types/problem.types";
import { toast } from "@/components/ui/toast";

interface DeleteProblemSheetProps {
  problem: Problem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteProblemSheet = ({
  problem,
  open,
  onOpenChange,
}: DeleteProblemSheetProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const { mutate: deleteProblem } = useDeleteProblem();

  const handleDelete = () => {
    setIsDeleting(true);

    deleteProblem(problem.id, {
      onSuccess: (res) => {
        setIsDeleting(false);

        if (!res.success) {
          toast.add({
            title: "Delete failed",
            description: "Something went wrong. Please try again.",
            type: "error",
          });

          return;
        }

        toast.add({
          title: "Problem deleted",
          description: "The problem has been deleted successfully.",
          type: "success",
        });

        onOpenChange(false);
      },

      onError: (err) => {
        setIsDeleting(false);

        toast.add({
          title: "Delete failed",
          description: err.message || "Something went wrong. Please try again.",
          type: "error",
        });
      },
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Delete Problem</SheetTitle>

          <SheetDescription>
            Are you sure you want to delete this problem? This action cannot be
            undone.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-5 px-4">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div>
              <p className="text-sm text-muted-foreground">Title</p>

              <p className="mt-1 font-medium">{problem.title}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Type</p>

              <p className="mt-1 font-medium">{problem.type}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Difficulty</p>

              <p className="mt-1 font-medium">{problem.difficulty}</p>
            </div>

            <div className="mt-4">
              <p className="text-sm text-muted-foreground">Marks</p>

              <p className="mt-1 font-medium">{problem.marks}</p>
            </div>
          </div>

          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
            <div className="flex gap-3">
              <Trash2 className="mt-0.5 h-5 w-5 text-destructive" />

              <div>
                <p className="font-medium text-destructive">
                  This problem will be deleted
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Make sure you want to remove this problem before confirming.
                </p>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter>
          <SheetClose >
            <Button type="button" className="w-full" variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </SheetClose>

          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting && <span className="mr-2">...</span>}
            Confirm Delete
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default DeleteProblemSheet;
