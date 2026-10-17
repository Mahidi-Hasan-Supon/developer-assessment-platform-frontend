
"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ClipboardCheck,
  Code2,
  ShieldCheck,
  Target,
} from "lucide-react";

const highlights = [
  {
    icon: ClipboardCheck,
    title: "Structured Assessments",
    description:
      "Take organized assessments designed to evaluate your technical knowledge.",
  },
  {
    icon: Code2,
    title: "Practical Challenges",
    description:
      "Explore coding problems that encourage logical thinking and problem solving.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Evaluation",
    description:
      "Review assessment outcomes and understand your performance.",
  },
  {
    icon: Target,
    title: "Career Focused",
    description:
      "Build confidence by demonstrating skills that matter in technical roles.",
  },
];

export default function StatisticsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="platform-highlights-title"
      className="relative border-y border-border/70 bg-muted/30 py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 16 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-2xl text-center sm:mb-12"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
            <Target className="h-4 w-4" />
            <span>Built for skill development</span>
          </div>

          <h2
            id="platform-highlights-title"
            className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl lg:text-4xl"
          >
            More than just an assessment platform
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
            DevAssess brings structured evaluation, practical
            challenges, and clear assessment results together in one
            focused experience.
          </p>
        </motion.div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 18 }
                }
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-colors duration-300 hover:border-primary/40 sm:p-6"
              >
                {/* Subtle hover accent */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                />

                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/15 bg-primary/10 text-primary transition-transform duration-300 group-hover:-translate-y-0.5">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>

        {/* Bottom message */}
        <motion.div
          initial={
            shouldReduceMotion ? false : { opacity: 0, y: 10 }
          }
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-8 flex flex-col items-center justify-center gap-2 text-center sm:mt-10 sm:flex-row sm:gap-3"
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </span>

          <p className="text-sm text-muted-foreground">
            Focus on what matters:{" "}
            <span className="font-medium text-foreground">
              your skills, your progress, your potential.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
