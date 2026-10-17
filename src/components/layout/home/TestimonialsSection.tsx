"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Code2,
  MessageSquareQuote,
  Target,
  Users,
} from "lucide-react";

const perspectives = [
  {
    icon: Code2,
    audience: "For Developers",
    title: "A chance to demonstrate your skills",
    description:
      "Technical assessments should give candidates an opportunity to demonstrate their knowledge through practical challenges, not just describe what they know.",
    priorities: [
      "Relevant technical challenges",
      "Clear assessment instructions",
      "Access to available results",
    ],
  },
  {
    icon: BriefcaseBusiness,
    audience: "For Companies",
    title: "A more organized evaluation process",
    description:
      "Hiring teams need a structured way to prepare assessments, invite candidates, review submissions, and manage evaluation outcomes.",
    priorities: [
      "Organized assessment workflows",
      "Candidate invitation management",
      "Submission and result review",
    ],
  },
];

export default function TestimonialsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="assessment-experience"
      aria-labelledby="assessment-experience-title"
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
            <MessageSquareQuote className="h-4 w-4" />
            <span>Designed around real needs</span>
          </div>

          <h2
            id="assessment-experience-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            What makes a better{" "}
            <span className="text-primary">assessment experience</span>?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            A useful assessment platform should support both sides of the
            process: candidates demonstrating their skills and companies
            evaluating them in an organized way.
          </p>
        </motion.div>

        {/* Perspective cards */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7">
          {perspectives.map((perspective, index) => {
            const Icon = perspective.icon;

            return (
              <motion.article
                key={perspective.audience}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40 sm:p-8 lg:p-9"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-125"
                />

                <div className="relative flex items-center justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {perspective.audience}
                  </span>
                </div>

                <div className="relative mt-7">
                  <MessageSquareQuote className="mb-3 h-6 w-6 text-primary/70" />

                  <h3 className="max-w-md text-xl font-bold leading-snug text-foreground sm:text-2xl">
                    {perspective.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                    {perspective.description}
                  </p>
                </div>

                <div className="relative mt-7 border-t border-border pt-6">
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    Key priorities
                  </p>

                  <ul className="space-y-3">
                    {perspective.priorities.map((priority) => (
                      <li key={priority} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-sm leading-6 text-foreground/85">
                          {priority}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Closing note */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-col items-center gap-3 rounded-2xl border border-border bg-muted/30 px-5 py-6 text-center sm:mt-10 sm:flex-row sm:justify-center sm:gap-4 sm:px-7"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target className="h-5 w-5" />
          </div>

          <div>
            <h3 className="font-semibold text-foreground">
              Built around skills, clarity, and progress
            </h3>
            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Our focus is a structured assessment experience for candidates and
              companies.
            </p>
          </div>

          <Users className="hidden h-5 w-5 shrink-0 text-primary sm:ml-3 sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
