"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Difficulty, Problem, ProblemType } from "@/types/problem.types";

import DeleteProblemSheet from "./delete-problem-sheet";

interface ProblemTableProps {
  problems: Problem[];
}

const getProblemTypeClass = (type: ProblemType) => {
  switch (type) {
    case "MCQ":
      return "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-300";

    case "WRITTEN":
      return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300";

    case "CODING":
      return "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-800 dark:bg-purple-950 dark:text-purple-300";

    default:
      return "";
  }
};

const getDifficultyClass = (difficulty: Difficulty) => {
  switch (difficulty) {
    case "EASY":
      return "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-300";

    case "MEDIUM":
      return "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-300";

    case "HARD":
      return "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300";

    default:
      return "";
  }
};

const ProblemTable = ({ problems }: ProblemTableProps) => {
  const router = useRouter();

  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);

  const handleDeleteClick = (problem: Problem) => {
    setSelectedProblem(problem);
  };

  return (
    <>
      <div className="rounded-lg border">
        <div className="grid grid-cols-5 gap-4 border-b bg-muted/40 px-4 py-3 text-sm font-medium">
          <div>Title</div>
          <div>Type</div>
          <div>Difficulty</div>
          <div>Marks</div>
          <div>Action</div>
        </div>

        <div className="divide-y">
          {problems.map((problem) => (
            <div
              key={problem.id}
              className="grid grid-cols-5 items-center gap-4 px-4 py-4"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{problem.title}</p>

                <p className="mt-1 truncate text-sm text-muted-foreground">
                  {problem.description}
                </p>
              </div>

              <div>
                <Badge
                  variant="outline"
                  className={getProblemTypeClass(problem.type)}
                >
                  {problem.type}
                </Badge>
              </div>

              <div>
                <Badge
                  variant="outline"
                  className={getDifficultyClass(problem.difficulty)}
                >
                  {problem.difficulty}
                </Badge>
              </div>

              <div className="font-medium">{problem.marks}</div>

              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    router.push(`/company/problems/${problem.id}/edit`)
                  }
                >
                  Edit
                </Button>

                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteClick(problem)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProblem && (
        <DeleteProblemSheet
          problem={selectedProblem}
          open={!!selectedProblem}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedProblem(null);
            }
          }}
        />
      )}
    </>
  );
};

export default ProblemTable;
