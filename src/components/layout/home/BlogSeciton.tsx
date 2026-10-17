"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Lightbulb,
} from "lucide-react";

const resources = [
  {
    icon: BrainCircuit,
    category: "Assessment Preparation",
    number: "01",
    title: "How to Prepare for Technical Assessments",
    description:
      "Learn how to review core concepts, understand assessment instructions, and prepare for technical evaluation.",
    takeaways: [
      "Review relevant fundamentals",
      "Understand the assessment format",
      "Plan your time carefully",
    ],
  },
  {
    icon: Code2,
    category: "Coding Practice",
    number: "02",
    title: "Build a Better Problem-Solving Approach",
    description:
      "Explore a practical approach to understanding coding problems, breaking them into smaller steps, and testing solutions.",
    takeaways: [
      "Understand the problem first",
      "Consider edge cases",
      "Test your solution",
    ],
  },
  {
    icon: BriefcaseBusiness,
    category: "Career Development",
    number: "03",
    title: "Showcase Your Technical Skills",
    description:
      "Discover ways to communicate your technical experience and prepare to demonstrate your skills to potential employers.",
    takeaways: [
      "Build meaningful projects",
      "Explain your decisions",
      "Keep learning consistently",
    ],
  },
];

export default function BlogSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="learning-resources"
      aria-labelledby="learning-resources-title"
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mb-12 flex flex-col gap-5 sm:mb-16 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              <span>Learn and grow</span>
            </div>

            <h2
              id="learning-resources-title"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Resources for your <span className="text-primary">next step</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Explore useful topics around technical assessments, problem
              solving, and career development.
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Lightbulb className="h-4 w-4 text-primary" />
            <span>Practical ideas for continuous learning</span>
          </div>
        </motion.div>

        {/* Resource cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon;

            return (
              <motion.article
                key={resource.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
              >
                {/* Card visual */}
                <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-border bg-muted/40 sm:h-44">
                  <div
                    aria-hidden="true"
                    className="absolute h-36 w-36 rounded-full border border-primary/10 transition-transform duration-500 group-hover:scale-125"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute h-24 w-24 rounded-full border border-primary/15"
                  />

                  <div className="absolute left-5 top-5 rounded-full border border-border bg-card/90 px-3 py-1.5 text-xs font-medium text-muted-foreground">
                    {resource.category}
                  </div>

                  <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>

                  <span className="absolute bottom-4 right-5 text-4xl font-bold tracking-tight text-primary/15">
                    {resource.number}
                  </span>
                </div>

                {/* Card content */}
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary sm:text-xl">
                    {resource.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {resource.description}
                  </p>

                  <div className="mt-5 border-t border-border pt-5">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      What you will explore
                    </p>

                    <ul className="space-y-2.5">
                      {resource.takeaways.map((takeaway) => (
                        <li key={takeaway} className="flex items-start gap-2.5">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          <span className="text-sm leading-6 text-foreground/80">
                            {takeaway}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto pt-6">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Learning guide
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Footer note */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-9 flex flex-col items-center gap-3 text-center"
        >
          <p className="max-w-xl text-sm leading-6 text-muted-foreground">
            Keep practicing, explore new concepts, and use each assessment as an
            opportunity to learn.
          </p>

          <Link
            href="/assessments"
            className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary outline-none transition-colors hover:text-primary/80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background"
          >
            Explore Assessments
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
