"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpenCheck,
  Clock3,
  LoaderCircle,
  RefreshCw,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Assessment } from "@/types/assessment.types";
import { useAssessments } from "@/hook";

function AssessmentSkeleton() {
  return (
    <Card className="h-full overflow-hidden border-border bg-card">
      <CardContent className="space-y-5 p-6">
        <div className="h-6 w-24 animate-pulse rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
        <div className="h-px bg-border" />
        <div className="flex justify-between gap-3">
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  );
}

function formatPrice(price: number) {
  if (price === 0) return "Free";

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
    maximumFractionDigits: 2,
  }).format(price);
}

function AssessmentCard({
  assessment,
  index,
  reduceMotion,
}: {
  assessment: Assessment;
  index: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: reduceMotion ? 0 : 0.4,
        delay: reduceMotion ? 0 : index * 0.08,
      }}
      whileHover={reduceMotion ? undefined : { y: -5 }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden border-border bg-card transition-colors duration-300 hover:border-primary/40">
        <CardContent className="flex flex-1 flex-col p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <BookOpenCheck className="size-3.5" />
              Published
            </span>

            <span className="text-sm font-semibold text-foreground">
              {formatPrice(assessment.price)}
            </span>
          </div>

          <h3 className="line-clamp-2 text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {assessment.title}
          </h3>

          <p className="mt-3 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-muted-foreground">
            {assessment.description?.trim() ||
              "Explore this assessment and challenge your current skills."}
          </p>

          <div className="my-5 h-px bg-border" />

          {/* <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock3 className="size-4 shrink-0 text-primary" />
              <span>{assessment.durationMinutes} min</span>
            </div>

            <div className="flex items-center gap-2 text-muted-foreground">
              <Trophy className="size-4 shrink-0 text-primary" />
              <span>{assessment.totalMarks} marks</span>
            </div>
          </div> */}
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Clock3 className="size-4 shrink-0 text-primary" />
                <span className="text-xs">Duration</span>
              </span>
              <span className="font-semibold text-foreground">
                {assessment.durationMinutes} min
              </span>
            </div>

            <div className="flex flex-col gap-1.5 border-x border-border px-2">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <Trophy className="size-4 shrink-0 text-primary" />
                <span className="text-xs">Total Marks</span>
              </span>
              <span className="font-semibold text-foreground">
                {assessment.totalMarks}
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <BookOpenCheck className="size-4 shrink-0 text-primary" />
                <span className="text-xs">Pass Marks</span>
              </span>
              <span className="font-semibold text-foreground">
                {assessment.passMarks}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-1 items-end">
            <Button
              render={<Link href={`/assessments/${assessment.id}`} />}
              nativeButton={false}
              variant="outline"
              className="w-full border-border transition-colors group-hover:border-primary group-hover:text-primary"
            >
              View assessment
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function PopularAssessmentsSection() {
  const reduceMotion = useReducedMotion();

  const {
    data: response,
    isPending,
    isError,
    refetch,
    isFetching,
  } = useAssessments({
    page: 1,
    limit: 6,
    status: "PUBLISHED",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const assessments = (response?.data ?? [])
    .filter((assessment) => assessment.status === "PUBLISHED")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 6);

  return (
    <section
      id="popular-assessments"
      className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="pointer-events-none absolute -left-32 top-24 size-72 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <BookOpenCheck className="size-4" />
              Explore assessments
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Find your next <span className="text-primary">challenge.</span>
            </h2>

            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Explore the latest published assessments and take the next step in
              your skill development journey.
            </p>
          </div>

          <Button
            render={<Link href="/assessments" />}
            nativeButton={false}
            variant="outline"
            className="w-fit shrink-0"
          >
            View all assessments
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </motion.div>

        {isPending ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <AssessmentSkeleton key={Number(index)} />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center">
            <h3 className="text-lg font-semibold text-foreground">
              Assessments couldn&apos;t be loaded
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground">
              Something went wrong while fetching assessments. Please try again.
            </p>
            <Button
              onClick={() => refetch()}
              disabled={isFetching}
              className="mt-5"
            >
              {isFetching ? (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 size-4" />
              )}
              Try again
            </Button>
          </div>
        ) : assessments.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card px-6 py-14 text-center">
            <BookOpenCheck className="mx-auto size-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              No published assessments yet
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              New assessments will appear here when they are published.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {assessments.map((assessment, index) => (
              <AssessmentCard
                key={assessment.id}
                assessment={assessment}
                index={index}
                reduceMotion={Boolean(reduceMotion)}
              />
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Button
            render={<Link href="/assessments" />}
            nativeButton={false}
            size="lg"
            className="shadow-sm shadow-primary/20"
          >
            Explore all assessments
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
