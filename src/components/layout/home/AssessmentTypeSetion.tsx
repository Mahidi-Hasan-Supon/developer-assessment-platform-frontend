'use client'
import { ArrowRight, BookOpen, Code2, Target } from "lucide-react";
import Link from "next/link";

const assessmentTypes = [
  {
    icon: Code2,
    title: "Coding Challenges",
    description:
      "Solve practical programming problems and demonstrate your problem-solving skills.",
    label: "Hands-on practice",
    color:
      "bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300",
  },
  {
    icon: BookOpen,
    title: "Technical Knowledge",
    description:
      "Test your understanding of programming concepts, frameworks, and technologies.",
    label: "MCQ & theory",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
  },
  {
    icon: Target,
    title: "Skill Assessments",
    description:
      "Measure your strengths through structured assessments designed around technical skills.",
    label: "Skill evaluation",
    color:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  },
];

export function AssessmentTypesSection() {
  return (
    <section className="bg-muted/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Explore assessments
            </span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Put your technical skills to the test
            </h2>
            <p className="mt-4 text-muted-foreground">
              Explore different assessment formats designed to evaluate
              technical knowledge and problem-solving ability.
            </p>
          </div>

          <Link
            href="/assessments"
            className="inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:opacity-80"
          >
            Explore assessments <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {assessmentTypes.map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl"
            >
              <div className="mb-5 flex items-center justify-between">
                <div
                  className={`flex size-12 items-center justify-center rounded-xl ${item.color}`}
                >
                  <item.icon className="size-6" />
                </div>
                <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                  {item.label}
                </span>
              </div>

              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 min-h-20 leading-7 text-muted-foreground">
                {item.description}
              </p>

              <Link
                href="/assessments"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Explore now
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
