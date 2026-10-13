"use client";

import { Candidate } from "@/types/invitation.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

interface CandidatesTableProps {
  candidates: Candidate[];
  onSelectCandidate: (candidate: Candidate) => void;
}

export default function CandidatesTable({
  candidates,
  onSelectCandidate,
}: CandidatesTableProps) {
  if (!candidates.length) {
    return (
      <div className="rounded-lg border px-4 py-12 text-center">
        <p className="font-medium">No candidates found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Try another search term.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Candidate</TableHead>
            <TableHead className="hidden md:table-cell">Phone</TableHead>
            <TableHead className="hidden lg:table-cell">Skills</TableHead>
            <TableHead className="hidden sm:table-cell">Joined</TableHead>
            <TableHead className="text-right">Details</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {candidates.map((candidate) => {
            const profile = candidate.candidateProfile;
            const initials = candidate.name
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0])
              .join("")
              .toUpperCase();

            return (
              <TableRow
                key={candidate.id}
                className="cursor-pointer"
                onClick={() => onSelectCandidate(candidate)}
              >
                <TableCell>
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-9 shrink-0">
                      <AvatarImage
                        src={profile?.profileImage ?? undefined}
                        alt={candidate.name}
                      />
                      <AvatarFallback>{initials || "C"}</AvatarFallback>
                    </Avatar>

                    <div className="min-w-0">
                      <p className="font-medium">{candidate.name}</p>
                      <p className="max-w-[220px] truncate text-sm text-muted-foreground">
                        {candidate.email}
                      </p>
                    </div>
                  </div>
                </TableCell>

                <TableCell className="hidden md:table-cell">
                  {profile?.phone || "—"}
                </TableCell>

                <TableCell className="hidden lg:table-cell">
                  <div className="flex max-w-[260px] flex-wrap gap-1">
                    {profile?.skills?.length ? (
                      <>
                        {profile.skills.slice(0, 2).map((skill:any, index:any) => (
                          <Badge key={`${skill}-${index}`} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                        {profile.skills.length > 2 && (
                          <Badge variant="outline">
                            +{profile.skills.length - 2}
                          </Badge>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        No skills
                      </span>
                    )}
                 </div>
                </TableCell>

                <TableCell className="hidden sm:table-cell">
                  {new Date(candidate.createdAt).toLocaleDateString()}
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectCandidate(candidate);
                    }}
                  >
                    <Eye className="mr-2 size-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
