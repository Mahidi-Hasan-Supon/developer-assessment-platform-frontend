"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardList,
  Search,
  Trophy,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore Assessments",
    description:
      "Discover available technical assessments and choose a challenge that matches your skills and interests.",
    detail: "Find your next challenge",
  },
  {
    number: "02",
    icon: ClipboardList,
    title: "Take the Challenge",
    description:
      "Accept an invitation or choose an available assessment, then demonstrate your knowledge through practical tasks.",
    detail: "Put your skills to the test",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Review Your Results",
    description:
      "Submit your answers and review your assessment results when they become available.",
    detail: "Track your performance",
  },
];

export default function HowItWorksSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-12 max-w-2xl text-center sm:mb-16"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
            <CheckCircle2 className="h-4 w-4" />
            <span>Simple process, meaningful progress</span>
          </div>

          <h2
            id="how-it-works-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            How <span className="text-primary">DevAssess</span> works
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            From choosing an assessment to reviewing your results, follow a
            clear process designed to help you demonstrate your technical
            skills.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-8">
          {/* Connecting line on desktop */}
          <div
            aria-hidden="true"
            className="absolute left-[20%] right-[20%] top-10 hidden border-t border-dashed border-primary/30 md:block"
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.45,
                  delay: shouldReduceMotion ? 0 : index * 0.12,
                }}
                className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7 lg:p-8"
              >
                <div className="relative z-10 mb-7 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="text-3xl font-bold tracking-tight text-primary/20 sm:text-4xl">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {step.description}
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-border pt-5 text-sm font-medium text-foreground">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                  <span>{step.detail}</span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:mt-12"
        >
          <p className="text-sm text-muted-foreground sm:text-base">
            Ready to discover what you can do?
          </p>

          <Button
            render={<Link href="/assessments" />}
            nativeButton={false}
            className="group h-11 rounded-xl px-5"
          >
            Explore Assessments
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
