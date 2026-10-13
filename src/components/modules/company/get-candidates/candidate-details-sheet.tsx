"use client";

import { Candidate } from "@/types/invitation.types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ExternalLink, Mail, Phone, UserRound } from "lucide-react";

interface CandidateDetailsSheetProps {
  candidate: Candidate | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CandidateDetailsSheet({
  candidate,
  open,
  onOpenChange,
}: CandidateDetailsSheetProps) {
  if (!candidate) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" />
      </Sheet>
    );
  }

  const profile = candidate.candidateProfile;

  const initials = candidate.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Candidate details</SheetTitle>
          <SheetDescription>
            View candidate contact information and profile.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6 px-4 pb-6">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage
                src={profile?.profileImage ?? undefined}
                alt={candidate.name}
              />
              <AvatarFallback className="text-lg">
                {initials || <UserRound />}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0">
              <h3 className="break-words text-lg font-semibold">
                {candidate.name}
              </h3>
              <p className="break-all text-sm text-muted-foreground">
                {candidate.email}
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-muted-foreground" />
              <div className="min-w-0">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="break-all text-sm">{candidate.email}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="text-sm">{profile?.phone || "Not provided"}</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-sm text-muted-foreground">Joined</p>
              <p className="text-sm">
                {new Date(candidate.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <section>
            <h4 className="mb-2 font-medium">About</h4>
            <p className="whitespace-pre-wrap break-words text-sm leading-6 text-muted-foreground">
              {profile?.bio || "No bio provided."}
            </p>
          </section>

          <section>
            <h4 className="mb-3 font-medium">Skills</h4>
            {profile?.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, index) => (
                  <Badge key={`${skill}-${index}`} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills added.</p>
            )}
          </section>

          {/* <section>
            <h4 className="mb-3 font-medium">Resume</h4>
            {profile?.resume ? (
              <Button variant="outline">
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View resume
                  <ExternalLink className="ml-2 size-4" />
                </a>
              </Button>
            ) : (
              <p className="text-sm text-muted-foreground">
                No resume uploaded.
              </p>
            )}
          </section> */}
        </div>
      </SheetContent>
    </Sheet>
  );
}
