'use client'

import { ArrowRight, BriefcaseBusiness, LineChart, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
const benefits = [
  {
    icon: ShieldCheck,
    title: "Structured evaluation",
    description:
      "Use organized assessments to evaluate technical knowledge and practical skills.",
  },
  {
    icon: Zap,
    title: "Timed challenges",
    description:
      "Practice working within assessment time limits and improve your efficiency.",
  },
  {
    icon: LineChart,
    title: "Performance insights",
    description:
      "Review your assessment results and identify opportunities to grow.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Developer & company workflows",
    description:
      "Give developers a way to demonstrate skills and companies a way to organize assessments.",
  },
];
export function WhyDevAssessSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Why DevAssess
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            More than a test. A clearer picture of your skills.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            DevAssess brings assessments, evaluation, and performance tracking
            together in one place, helping developers and companies make better
            use of technical assessments.
          </p>

          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get started <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="rounded-2xl border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <benefit.icon className="size-5" />
              </div>
              <h3 className="font-semibold">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
