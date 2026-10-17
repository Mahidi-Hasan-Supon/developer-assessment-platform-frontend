
"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowDownRight,
  ArrowRight,
  CheckCircle2,
  Code2,
  Sparkles,
  Target,
  Users,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  {
    icon: Code2,
    label: "Practical challenges",
  },
  {
    icon: Target,
    label: "Skill-focused assessments",
  },
  {
    icon: Users,
    label: "Candidate and company workflows",
  },
];

export default function FinalCTASection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute -left-32 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "36px 36px",
          }}
        />
      </div>

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card shadow-xl shadow-primary/5"
        >
          {/* Inner glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          />

          <div className="grid items-center gap-10 p-6 sm:p-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 lg:p-14">
            {/* Main content */}
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Your next step starts here
              </div>

              <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Ready to put your
                <span className="block text-primary">
                  skills to the test?
                </span>
              </h2>

              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Explore technical assessments, challenge your knowledge, and
                take the next step in your developer journey with DevAssess.
              </p>

              {/* Highlights */}
              <div className="mt-7 flex flex-col gap-3">
                {highlights.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 text-sm text-foreground sm:text-base"
                    >
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* Actions */}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button
                  size="lg"
                  className="group gap-2"
                  render={<Link href="/assessments" />}
                  nativeButton={false}
                >
                  Explore Assessments
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="gap-2 border-border"
                  render={<Link href="/register" />}
                  nativeButton={false}
                >
                  Get Started
                  <ArrowDownRight className="h-4 w-4" />
                </Button>
              </div>

              <p className="mt-4 text-xs leading-5 text-muted-foreground">
                Assessment access, invitations, and payment requirements may
                vary by assessment.
              </p>
            </div>

            {/* Visual card */}
            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, scale: 0.94, y: 12 }
              }
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: shouldReduceMotion ? 0 : 0.12,
              }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="rounded-2xl border border-border bg-background p-5 shadow-lg sm:p-6">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-border pb-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                      DevAssess
                    </p>
                    <h3 className="mt-1 text-lg font-semibold text-foreground">
                      Your skills. Your journey.
                    </h3>
                  </div>

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Zap className="h-5 w-5" />
                  </div>
                </div>

                {/* Assessment types */}
                <div className="space-y-3 py-5">
                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary/40">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Target className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        Multiple Choice
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Test your technical knowledge
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary/40">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        Coding Challenges
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Work through practical problems
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  </div>

                  <div className="flex items-center gap-4 rounded-xl border border-border p-4 transition-colors hover:border-primary/40">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <Code2 className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground">
                        Written Assessments
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Explain your approach clearly
                      </p>
                    </div>

                    <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                  </div>
                </div>

                {/* Bottom label */}
                <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4">
                  <Sparkles className="h-5 w-5 shrink-0 text-primary" />

                  <p className="text-sm leading-6 text-foreground">
                    Every challenge is an opportunity to learn and improve.
                  </p>
                </div>
              </div>

              {/* Floating accent */}
              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -7, 0], rotate: [0, 2, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -right-3 -top-4 hidden rounded-xl border border-primary/20 bg-card p-3 shadow-lg sm:block"
              >
                <Sparkles className="h-5 w-5 text-primary" />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
