'use client'
import { ArrowRight, BriefcaseBusiness, GraduationCap } from "lucide-react";
import Link from "next/link";

export function AudienceSection() {
  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-white/15">
            <GraduationCap className="size-6" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Ready to prove your skills?
          </h2>
          <p className="mt-4 max-w-md leading-7 text-primary-foreground/80">
            Take technical assessments, review your performance, and keep
            developing your skills as a software developer.
          </p>
          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-background px-5 py-3 font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Join as a developer <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="rounded-3xl border bg-card p-8 sm:p-10">
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <BriefcaseBusiness className="size-6" />
          </div>
          <h2 className="text-2xl font-bold sm:text-3xl">
            Looking for technical talent?
          </h2>
          <p className="mt-4 max-w-md leading-7 text-muted-foreground">
            Organize assessments, invite candidates, and evaluate technical
            ability through a structured assessment workflow.
          </p>
          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-semibold transition-colors hover:bg-muted"
          >
            Join as a company <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
