"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  FileText,
  Layers3,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const categories = [
  {
    icon: BookOpen,
    number: "01",
    title: "Multiple Choice",
    label: "MCQ Assessments",
    description:
      "Test your technical knowledge, concepts, and problem-solving fundamentals through structured multiple-choice questions.",
    skills: ["Technical concepts", "Quick thinking", "Core knowledge"],
  },
  {
    icon: Code2,
    number: "02",
    title: "Coding Challenges",
    label: "Practical Assessments",
    description:
      "Demonstrate your programming ability by solving coding problems and applying logical thinking to real challenges.",
    skills: ["Algorithms", "Problem solving", "Programming"],
  },
  {
    icon: FileText,
    number: "03",
    title: "Written Assessments",
    label: "Knowledge & Reasoning",
    description:
      "Explain your understanding, communicate technical ideas, and demonstrate how you approach open-ended questions.",
    skills: ["Technical writing", "Reasoning", "Communication"],
  },
];

export default function AssessmentCategoriesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="assessment-categories"
      aria-labelledby="assessment-categories-title"
      className="relative overflow-hidden bg-muted/30 py-16 sm:py-20 lg:py-24"
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
            <Layers3 className="h-4 w-4" />
            <span>Choose your challenge</span>
          </div>

          <h2
            id="assessment-categories-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            One platform, <span className="text-primary">multiple ways</span> to
            prove your skills
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Explore different assessment formats and demonstrate your knowledge,
            coding ability, and technical reasoning.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.article
                key={category.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.1,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7"
              >
                {/* Decorative corner */}
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
                />

                <div className="relative flex items-start justify-between gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">
                    {category.label}
                  </span>
                </div>

                <div className="relative mt-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Category {category.number}
                  </p>

                  <h3 className="mt-2 text-xl font-bold text-foreground sm:text-2xl">
                    {category.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {category.description}
                  </p>
                </div>

                <div className="mt-6 space-y-3 border-t border-border pt-5">
                  {category.skills.map((skill) => (
                    <div key={skill} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                      <span className="text-sm text-foreground/80">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-7">
                  <Link
                    href="/assessments"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary outline-none transition-colors hover:text-primary/80 focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    Explore assessments
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12"
        >
          <p className="max-w-lg text-sm leading-6 text-muted-foreground">
            Not sure where to start? Browse the available assessments and choose
            a challenge that fits your goals.
          </p>

          <Button
            render={<Link href="/assessments" />}
            nativeButton={false}
            className="group h-11 rounded-xl px-5"
          >
            Browse All Assessments
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
