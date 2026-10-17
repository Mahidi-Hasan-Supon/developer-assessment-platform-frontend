"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  CreditCard,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: ClipboardCheck,
    title: "Structured Assessments",
    description:
      "Work through organized assessments with clear questions and a focused evaluation process.",
    tag: "Assessment flow",
  },
  {
    icon: Code2,
    title: "Practical Coding Tasks",
    description:
      "Demonstrate programming knowledge and problem-solving skills through coding challenges.",
    tag: "Hands-on practice",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Results",
    description:
      "Review your assessment outcomes when results are available and understand your performance.",
    tag: "Performance insights",
  },
  {
    icon: BellRing,
    title: "Invitation-Based Access",
    description:
      "Keep track of assessment invitations and follow the required steps before starting a challenge.",
    tag: "Stay organized",
  },
  {
    icon: LockKeyhole,
    title: "Secure Authentication",
    description:
      "Access platform features through authenticated accounts and role-based permissions.",
    tag: "Account security",
  },
  {
    icon: UserCheck,
    title: "Role-Based Experience",
    description:
      "Get a relevant workspace based on your account role, with separate candidate and company workflows.",
    tag: "Purpose-built dashboards",
  },
  {
    icon: CreditCard,
    title: "Integrated Payments",
    description:
      "Complete the payment process when a paid assessment requires it before you begin.",
    tag: "Paid assessments",
  },
  {
    icon: RefreshCw,
    title: "Clear Assessment Workflow",
    description:
      "Follow the assessment process from invitation and eligibility checks to attempting and submitting your work.",
    tag: "Step by step",
  },
];

export default function FeaturesSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="features"
      aria-labelledby="features-title"
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
            <span>Everything in one place</span>
          </div>

          <h2
            id="features-title"
            className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            Features built around{" "}
            <span className="text-primary">your goals</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            A focused assessment experience that helps candidates demonstrate
            their skills and gives companies a structured way to manage
            technical evaluations.
          </p>
        </motion.div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{
                  duration: 0.4,
                  delay: shouldReduceMotion ? 0 : (index % 4) * 0.07,
                }}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-6"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150"
                />

                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="relative text-base font-semibold text-foreground sm:text-lg">
                  {feature.title}
                </h3>

                <p className="relative mt-3 flex-1 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>

                <div className="relative mt-5 border-t border-border pt-4">
                  <span className="inline-flex items-center gap-2 text-xs font-medium text-primary">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature.tag}
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 text-center sm:mt-12"
        >
          <p className="text-sm text-muted-foreground sm:text-base">
            Ready to put your knowledge into practice?
          </p>

          <Button
            render={<Link href="/assessments" />}
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
