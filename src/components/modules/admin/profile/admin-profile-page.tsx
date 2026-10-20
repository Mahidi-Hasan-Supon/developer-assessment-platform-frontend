"use client";

import { useGetMe } from "@/hook";
import { UserRound, Mail, ShieldCheck, Sparkles } from "lucide-react";
import { Spinner } from "@/components/ui/spinner"; // Apnar project-er spinner/loader

export default function AdminProfileView() {
  const { data, isLoading, isError } = useGetMe();

  const user = data?.data;

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-destructive">
        Failed to load profile details. Please try again.
      </div>
    );
  }

  const initial = user?.name?.trim()?.charAt(0)?.toUpperCase() || "A";

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 sm:p-6">
      {/* Header Banner / Card */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          {/* Avatar Icon */}
          <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-2xl font-bold text-primary ring-4 ring-primary/5">
            {initial}
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:justify-start">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {user.name}
              </h1>
              <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                <Sparkles className="size-3" />
                Administrator
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Info Details Section */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold tracking-tight">
          Profile Information
        </h2>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Name Field */}
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <UserRound className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">
                Full Name
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {user.name || "N/A"}
              </p>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Mail className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">
                Email Address
              </p>
              <p className="truncate text-sm font-semibold text-foreground">
                {user.email || "N/A"}
              </p>
            </div>
          </div>

          {/* Role Field */}
          <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/30 p-3.5 sm:col-span-2">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-medium text-muted-foreground">Role</p>
              <p className="truncate text-sm font-semibold text-foreground capitalize">
                {user.role || "ADMIN"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
