"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProblems } from "@/hook";
import ProblemTableLoading from "./problem-table-loading";
import ProblemTable from "./problem-table";


const ProblemList = () => {
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useProblems({
    page: 1,
    limit: 10,
    searchTerm: searchTerm || undefined,
  });

  const problems = data?.data ?? [];

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Problems
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage problems for your assessments.
          </p>
        </div>

        <Button
          type="button"
          onClick={() => router.push("/company/problems/create")}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create Problem
        </Button>
      </div>

      {/* Search */}
      <div className="mt-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search problems..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-6">
        {isLoading && <ProblemTableLoading />}

        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-center">
            <p className="text-sm text-destructive">Failed to load problems.</p>
          </div>
        )}

        {!isLoading && !isError && problems.length === 0 && (
          <div className="rounded-lg border p-10 text-center">
            <h2 className="text-lg font-semibold">No problems found</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Create your first problem to use it in an assessment.
            </p>

            <Button
              type="button"
              className="mt-4"
              onClick={() => router.push("/company/problems/create")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Problem
            </Button>
          </div>
        )}

        {!isLoading && !isError && problems.length > 0 && (
          <ProblemTable problems={problems} />
        )}
      </div>
    </div>
  );
};

export default ProblemList;
