"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileCheck2,
  MailPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const benefits = [
  {
    icon: ClipboardList,
    title: "Organize Assessments",
    description:
      "Create and manage technical assessments with questions designed around the skills your team needs to evaluate.",
  },
  {
    icon: Users,
    title: "Invite Candidates",
    description:
      "Manage assessment invitations and give eligible candidates a clear process for accepting and participating.",
  },
  {
    icon: FileCheck2,
    title: "Review Submissions",
    description:
      "Access candidate submissions and follow the evaluation workflow supported by the platform.",
  },
  {
    icon: BarChart3,
    title: "Manage Results",
    description:
      "Review assessment outcomes and manage result publication through the company workflow.",
  },
];

const workflow = [
  {
    icon: ClipboardList,
    title: "Create",
    description: "Prepare an assessment",
  },
  {
    icon: MailPlus,
    title: "Invite",
    description: "Send candidate invitations",
  },
  {
    icon: FileCheck2,
    title: "Evaluate",
    description: "Review submitted work",
  },
];

export default function CompanyBenefitsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="company-benefits"
      aria-labelledby="company-benefits-title"
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
            <BadgeCheck className="h-4 w-4" />
            <span>For companies and hiring teams</span>
          </div>

          <h2
            id="company-benefits-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Evaluate talent with a{" "}
            <span className="text-primary">clearer workflow</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Organize technical evaluations in one place—from preparing
            assessments and inviting candidates to reviewing submissions and
            managing results.
          </p>
        </motion.div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : index * 0.08,
                }}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-7"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-lg font-semibold text-foreground">
                      {benefit.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {benefit.description}
                    </p>
                  </div>
                </div>

                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full"
                />
              </motion.article>
            );
          })}
        </div>

        {/* Workflow panel */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-8 overflow-hidden rounded-3xl border border-border bg-muted/30 p-5 sm:mt-10 sm:p-8 lg:p-10"
        >
          <div className="grid items-center gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
            <div>
              <p className="text-sm font-semibold text-primary">
                A structured process
              </p>

              <h3 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                From assessment creation to results
              </h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Keep the evaluation process organized with a workflow that helps
                your team manage each stage.
              </p>

              <div className="mt-5 flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <p className="text-sm leading-6 text-foreground/80">
                  Manage assessments from your company workspace.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {workflow.map((step, index) => {
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.title}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                      duration: 0.35,
                      delay: shouldReduceMotion ? 0 : index * 0.1,
                    }}
                    className="relative rounded-2xl border border-border bg-card p-5"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h4 className="font-semibold text-foreground">
                      {step.title}
                    </h4>

                    <p className="mt-2 text-xs leading-5 text-muted-foreground sm:text-sm">
                      {step.description}
                    </p>

                    <span className="mt-4 inline-block text-xs font-semibold tracking-wider text-primary">
                      STEP 0{index + 1}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center gap-4 text-center sm:mt-12"
        >
          <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base">
            Looking for a structured way to evaluate technical skills? Explore
            DevAssess and get started.
          </p>

          <Button
            render={<Link href="/register" />}
            nativeButton={false}
            className="group h-11 rounded-xl px-5"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
