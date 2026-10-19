
"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  Building2,
  CheckCircle2,
  Code2,
  GraduationCap,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Code2,
    title: "Real-World Assessments",
    description:
      "Evaluate practical development skills through coding challenges, MCQs, and written assessments.",
  },
  {
    icon: BrainCircuit,
    title: "Skill-Based Evaluation",
    description:
      "Help developers understand their strengths and identify areas where they can improve.",
  },
  {
    icon: Building2,
    title: "Company Connections",
    description:
      "Give companies a structured way to assess developer skills and discover promising talent.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Assessment Process",
    description:
      "Keep assessment invitations, submissions, and results organized in one platform.",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description:
      "Register as a candidate or access your approved company account.",
  },
  {
    number: "02",
    title: "Take or Create Assessments",
    description:
      "Candidates attempt available assessments, while companies manage their assessment process.",
  },
  {
    number: "03",
    title: "Review Your Progress",
    description:
      "Explore submissions and results to understand performance and make better decisions.",
  },
];

const values = [
  {
    icon: Target,
    title: "Skill First",
    description:
      "We focus on practical skills and meaningful assessments rather than relying only on resumes.",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description:
      "We bring developers and companies together through a structured assessment experience.",
  },
  {
    icon: Zap,
    title: "Simple and Efficient",
    description:
      "We make assessment workflows easier to manage, from invitations to results.",
  },
];

export default function AboutUs() {
  return (
    <main className="overflow-hidden bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate border-b border-border/60">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
          <div className="absolute right-0 top-40 h-56 w-56 rounded-full bg-primary/5 blur-[90px]" />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-16 lg:px-10 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <BadgeCheck className="size-4" />
              About DevAssess
            </div>

            <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Skills deserve to be{" "}
              <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                recognized.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              DevAssess is a developer assessment platform designed to help
              candidates demonstrate their technical abilities and help
              companies evaluate skills through structured assessments.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assessments"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:-translate-y-0.5 hover:opacity-90"
              >
                Explore Assessments
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contract"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-5 py-3 font-semibold transition hover:bg-accent"
              >
                Contact Us
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>

          {/* Visual feature card */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-cyan-500/10 blur-2xl" />

            <div className="relative rounded-3xl border border-border/80 bg-card/90 p-5 shadow-2xl shadow-primary/5 backdrop-blur sm:p-7">
              <div className="flex items-center justify-between border-b border-border pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <GraduationCap className="size-6" />
                  </div>
                  <div>
                    <p className="font-semibold">Developer Assessment</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Demonstrate your skills
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  Skill focused
                </span>
              </div>

              <div className="space-y-4 py-6">
                {[
                  { name: "Problem Solving", width: "w-[90%]" },
                  { name: "Technical Knowledge", width: "w-[80%]" },
                  { name: "Practical Skills", width: "w-[85%]" },
                ].map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <CheckCircle2 className="size-4 text-primary" />
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted">
                      <div
                        className={`h-full rounded-full bg-gradient-to-r from-primary to-cyan-500 ${skill.width}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <Code2 className="mb-3 size-5 text-primary" />
                  <p className="font-semibold">Practical Tests</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Demonstrate technical ability
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/40 p-4">
                  <ShieldCheck className="mb-3 size-5 text-primary" />
                  <p className="font-semibold">Clear Results</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Review assessment outcomes
                  </p>
                </div>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                A better way to showcase developer skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Mission
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Connecting technical skills with opportunities
          </h2>
          <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
            We aim to make technical skill evaluation more accessible,
            organized, and transparent. DevAssess provides a shared space
            where candidates can demonstrate what they know and companies
            can evaluate talent through a structured workflow.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What We Offer
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything centered around skills
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Tools designed to make the assessment experience more useful
              for both developers and hiring teams.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
                >
                  <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How It Works
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            A straightforward assessment journey
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative rounded-2xl border border-border bg-card p-7"
            >
              <span className="text-4xl font-bold tracking-tight text-primary/30">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-y border-border/60 bg-muted/20">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Our Values
            </span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              What guides our platform
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-border bg-card p-6 sm:p-8"
                >
                  <Icon className="size-8 text-primary" />
                  <h3 className="mt-5 text-xl font-semibold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-primary/5 px-6 py-12 text-center sm:px-12 sm:py-16">
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Code2 className="size-7" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to put your skills to the test?
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Explore assessments, challenge yourself, and take the next step
              in your developer journey with DevAssess.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/assessments"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Browse Assessments
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-background px-6 py-3 font-semibold transition hover:bg-accent"
              >
                Join DevAssess
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
