"use client";

import { useState } from "react";
import {
  Search,
  Users,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  ShieldBan,
  RefreshCw,
} from "lucide-react";

import { useAllCandidates, useUpdateCandidateStatus } from "@/hook/user.hook";
import type { UserStatus } from "@/types/user.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CandidatesManagementPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"ALL" | UserStatus>("ALL");
  const [page, setPage] = useState(1);

  const limit = 10;

  const params = {
    search: search.trim() || undefined,
    status: status === "ALL" ? undefined : status,
    page,
    limit,
  };

  const {
    data: response,
    isPending,
    isError,
    error,
    refetch,
    isFetching,
  } = useAllCandidates(params);

  const updateStatus = useUpdateCandidateStatus();

  const candidates = response?.data ?? [];
  const meta = response?.meta;

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusFilter = (
  value: "ALL" | UserStatus | null,
) => {
  if (value === null) return;

  setStatus(value);
  setPage(1);
};
  const handleToggleStatus = (
    id: string,
    name: string,
    currentStatus: UserStatus,
  ) => {
    const nextStatus: UserStatus =
      currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";

    const action = nextStatus === "BLOCKED" ? "block" : "unblock";

    const confirmed = window.confirm(
      `Are you sure you want to ${action} ${name}?`,
    );

    if (!confirmed) return;

    updateStatus.mutate({ id, status: nextStatus });
  };

  const formatDate = (date: string) =>
    new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Candidates Management
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage candidate accounts and their access status.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isFetching}
        >
          <RefreshCw
            className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Total Candidates</p>
            <Users className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {isPending ? <Skeleton className="h-9 w-20" /> : (meta?.total ?? 0)}
          </p>
        </div>

        <div className="rounded-xl border bg-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Current Page</p>
            <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          </div>

          <p className="mt-3 text-3xl font-bold">
            {isPending ? (
              <Skeleton className="h-9 w-20" />
            ) : (
              `${meta?.page ?? 1} / ${meta?.totalPages ?? 0}`
            )}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by candidate name or email..."
            value={search}
            onChange={(event) => handleSearch(event.target.value)}
            className="pl-9"
          />
        </div>

        <Select value={status} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="BLOCKED">Blocked</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {updateStatus.isError && (
        <div className="flex flex-col gap-2 rounded-lg border border-destructive/30 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-destructive">
            {updateStatus.error instanceof Error
              ? updateStatus.error.message
              : "Failed to update candidate status."}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateStatus.reset()}
          >
            Dismiss
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-xl border bg-card">
        {isError ? (
          <div className="flex flex-col items-center justify-center gap-3 p-10 text-center">
            <p className="font-medium">Could not load candidates.</p>
            <p className="text-sm text-muted-foreground">
              {error instanceof Error ? error.message : "Something went wrong."}
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Try again
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Email verification</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {isPending ? (
                    Array.from({ length: 5 }, (_, index) => (
                      <TableRow key={`candidate-skeleton-${index}`}>
                        <TableCell>
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-3 w-44" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="ml-auto h-8 w-24" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : candidates.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="h-32 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-8 w-8 text-muted-foreground" />
                          <p className="font-medium">No candidates found</p>
                          <p className="text-sm text-muted-foreground">
                            Try changing your search or status filter.
                          </p>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    candidates.map((candidate) => (
                      <TableRow key={candidate.id}>
                        <TableCell>
                          <div className="font-medium">{candidate.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {candidate.email}
                          </div>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              candidate.emailVerified ? "default" : "secondary"
                            }
                          >
                            {candidate.emailVerified
                              ? "Verified"
                              : "Unverified"}
                          </Badge>
                        </TableCell>

                        <TableCell>
                          <Badge
                            variant={
                              candidate.status === "ACTIVE"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {candidate.status}
                          </Badge>
                        </TableCell>

                        <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                          {formatDate(candidate.createdAt)}
                        </TableCell>

                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant={
                              candidate.status === "ACTIVE"
                                ? "destructive"
                                : "outline"
                            }
                            disabled={updateStatus.isPending}
                            onClick={() =>
                              handleToggleStatus(
                                candidate.id,
                                candidate.name,
                                candidate.status,
                              )
                            }
                          >
                            {candidate.status === "ACTIVE" ? (
                              <>
                                <ShieldBan className="mr-2 h-4 w-4" />
                                Block
                              </>
                            ) : (
                              <>
                                <ShieldCheck className="mr-2 h-4 w-4" />
                                Unblock
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="flex flex-col gap-3 border-t p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Showing {candidates.length > 0 ? (page - 1) * limit + 1 : 0}
                {"–"}
                {(page - 1) * limit + candidates.length} of {meta?.total ?? 0}{" "}
                candidates
              </p>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={page <= 1 || isFetching}
                  onClick={() => setPage((current) => current - 1)}
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  disabled={page >= (meta?.totalPages ?? 0) || isFetching}
                  onClick={() => setPage((current) => current + 1)}
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
