
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  BrainCircuit,
  ChartNoAxesCombined,
  CheckCircle2,
  Code2,
  Target,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: Code2,
    title: "Demonstrate Practical Skills",
    description:
      "Show how you approach coding problems and apply your programming knowledge to technical challenges.",
  },
  {
    icon: BrainCircuit,
    title: "Strengthen Problem Solving",
    description:
      "Challenge yourself with assessments that encourage logical thinking and technical reasoning.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Review Your Performance",
    description:
      "Use available assessment results to understand your performance and identify areas for improvement.",
  },
  {
    icon: BookOpen,
    title: "Build Technical Confidence",
    description:
      "Get familiar with structured technical evaluations and prepare to demonstrate what you know.",
  },
];

const highlights = [
  "Explore assessments that match your interests",
  "Keep track of invitations and attempts",
  "Review results when they become available",
  "Build experience with different question formats",
];

export default function DeveloperBenefitsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="developer-benefits"
      aria-labelledby="developer-benefits-title"
      className="relative overflow-hidden bg-muted/30 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left content */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
              <Target className="h-4 w-4" />
              <span>For developers and candidates</span>
            </div>

            <h2
              id="developer-benefits-title"
              className="text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Turn your technical knowledge into{" "}
              <span className="text-primary">demonstrable skills</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Your skills deserve more than a list on a resume.
              DevAssess gives you a structured way to take technical
              assessments, attempt coding challenges, and review your
              results when they are available.
            </p>

            <div className="mt-7 space-y-3.5">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-start gap-3"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-foreground/85 sm:text-base">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                render={<Link href="/assessments" />}
                nativeButton={false}
                className="group h-11 rounded-xl px-5"
              >
                Explore Assessments
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Button>

              <Button
                render={<Link href="/register" />}
                nativeButton={false}
                variant="outline"
                className="h-11 rounded-xl px-5"
              >
                Create an Account
              </Button>
            </div>
          </motion.div>

          {/* Right visual panel */}
          <motion.div
            initial={
              shouldReduceMotion ? false : { opacity: 0, x: 20, scale: 0.98 }
            }
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/5 blur-2xl" />

            <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
              {/* Panel header */}
              <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <BrainCircuit className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      Your Skills Journey
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      A focused path to improvement
                    </p>
                  </div>
                </div>

                <span className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                  Get started
                </span>
              </div>

              {/* Skill journey steps */}
              <div className="space-y-5 p-5 sm:p-7">
                <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <BookOpen className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-foreground">
                        Discover
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Find an assessment that suits your interests and
                        current skill level.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-9 h-5 border-l-2 border-dashed border-primary/30" />

                <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-foreground">
                        Demonstrate
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Work through the questions and submit your
                        assessment according to its instructions.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="ml-9 h-5 border-l-2 border-dashed border-primary/30" />

                <div className="rounded-2xl border border-border bg-background p-4 sm:p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <ChartNoAxesCombined className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h4 className="font-semibold text-foreground">
                        Review & Improve
                      </h4>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Review your available results and use them to
                        guide your next learning steps.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Panel footer */}
              <div className="border-t border-border bg-muted/30 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-2.5">
                  <BadgeCheck className="h-5 w-5 shrink-0 text-primary" />
                  <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                    Focus on progress, practical skills, and continuous
                    improvement.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
