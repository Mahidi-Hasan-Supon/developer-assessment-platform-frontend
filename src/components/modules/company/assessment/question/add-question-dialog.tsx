"use client";

import { useState } from "react";

import { Plus, Search } from "lucide-react";

import { useProblems } from "@/hook";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddQuestionDialogProps {
  assessmentId: string;
}

const AddQuestionDialog = ({ assessmentId }: AddQuestionDialogProps) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(
    null,
  );

  const { data, isLoading, isError } = useProblems({
    page: 1,
    limit: 20,
    searchTerm: searchTerm || undefined,
  });

  const problems = data?.data ?? [];

  const handleSelect = (problemId: string) => {
    setSelectedProblemId(problemId);
  };

  const handleContinue = () => {
    if (!selectedProblemId) return;

    console.log({
      assessmentId,
      problemId: selectedProblemId,
    });

    // পরের ধাপে এখানে AssessmentProblem API call হবে।
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Question
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Question</DialogTitle>

          <DialogDescription>
            Select a problem to add to this assessment.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              placeholder="Search problems..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="pl-9"
            />
          </div>

          {/* Problems */}
          <ScrollArea className="h-80 pr-4">
            {isLoading && (
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-20 animate-pulse rounded-lg bg-muted"
                  />
                ))}
              </div>
            )}

            {isError && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-center">
                <p className="text-sm text-destructive">
                  Failed to load problems.
                </p>
              </div>
            )}

            {!isLoading && !isError && problems.length === 0 && (
              <div className="py-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No problems found.
                </p>
              </div>
            )}

            {!isLoading && !isError && problems.length > 0 && (
              <div className="space-y-2">
                {problems.map((problem) => {
                  const isSelected = selectedProblemId === problem.id;

                  return (
                    <button
                      key={problem.id}
                      type="button"
                      onClick={() => handleSelect(problem.id)}
                      className={`w-full rounded-lg border p-4 text-left transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="font-medium">{problem.title}</h3>

                          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                            {problem.description}
                          </p>
                        </div>

                        <Badge variant="outline">{problem.type}</Badge>
                      </div>

                      <div className="mt-3 flex gap-2">
                        <Badge variant="secondary">{problem.difficulty}</Badge>

                        <Badge variant="secondary">{problem.marks} marks</Badge>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </ScrollArea>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              disabled={!selectedProblemId}
              onClick={handleContinue}
            >
              Add Question
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionDialog;
