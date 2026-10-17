"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  Fingerprint,
  GitCompareArrows,
  ShieldCheck,
  Target,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const reasons = [
  {
    icon: Target,
    title: "Focused on Technical Skills",
    description:
      "Keep the focus on technical knowledge, coding ability, and structured problem-solving assessments.",
  },
  {
    icon: GitCompareArrows,
    title: "Multiple Assessment Formats",
    description:
      "Support different ways to demonstrate knowledge, including multiple-choice, coding, and written questions.",
  },
  {
    icon: Eye,
    title: "A Clear Assessment Journey",
    description:
      "Follow a structured workflow from assessment discovery and invitations to attempts and available results.",
  },
  {
    icon: ShieldCheck,
    title: "Role-Based Workspaces",
    description:
      "Keep candidate and company workflows organized through role-specific platform experiences.",
  },
];

const principles = [
  {
    icon: ClipboardCheck,
    title: "Structured",
    description: "Organized assessment workflows",
  },
  {
    icon: Fingerprint,
    title: "Role-aware",
    description: "Experiences for different users",
  },
  {
    icon: Users,
    title: "Collaborative",
    description: "Candidate and company workflows",
  },
];

export default function WhyDevAssessSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="why-devassess"
      aria-labelledby="why-devassess-title"
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
            <ShieldCheck className="h-4 w-4" />
            <span>Built with purpose</span>
          </div>

          <h2
            id="why-devassess-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Why choose <span className="text-primary">DevAssess</span>?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            A focused platform for organizing technical assessments,
            demonstrating skills, and managing evaluation workflows without
            unnecessary complexity.
          </p>
        </motion.div>

        {/* Reasons */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;

            return (
              <motion.article
                key={reason.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="group flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-base font-semibold text-foreground sm:text-lg">
                    {reason.title}
                  </h3>

                  <p className="mt-2 text-sm leading-7 text-muted-foreground">
                    {reason.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Platform principles */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="mt-8 grid grid-cols-1 gap-3 rounded-3xl border border-border bg-card p-5 sm:mt-10 sm:grid-cols-3 sm:p-7 lg:p-8"
        >
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <div
                key={principle.title}
                className={`flex items-center gap-4 p-3 ${
                  index > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""
                }`}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {principle.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {principle.description}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Closing statement and CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12"
        >
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>One platform for a more organized assessment journey.</span>
          </div>

          <Button
            render={<Link href="/assessments" />}
            nativeButton={false}
            className="group h-11 rounded-xl px-5"
          >
            Explore DevAssess
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
