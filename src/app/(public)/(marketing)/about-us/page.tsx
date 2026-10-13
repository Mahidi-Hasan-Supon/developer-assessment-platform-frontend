import {
  ArrowRight,
  BookOpenCheck,
  Building2,
  CheckCircle2,
  Code2,
  ShieldCheck,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Code2,
    title: "Skill-Based Assessments",
    description:
      "Evaluate technical knowledge through coding, multiple-choice, and written assessments.",
  },
  {
    icon: Users,
    title: "Candidate Evaluation",
    description:
      "Give candidates a structured way to demonstrate their skills and track their results.",
  },
  {
    icon: Building2,
    title: "Company Assessment Tools",
    description:
      "Help companies organize assessments and evaluate candidates through a consistent process.",
  },
  {
    icon: ShieldCheck,
    title: "Structured & Secure",
    description:
      "Support a reliable assessment experience with authentication, invitations, and payment handling.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium">
              <Zap className="size-4 text-primary" />
              Skills meet opportunity
            </div>

            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Empowering Skills.
              <span className="mt-2 block text-primary">
                Evaluating Talent.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Development Assessment Platform connects technical skills with
              career opportunities through structured assessments and a
              transparent evaluation process.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/assessments"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Explore Assessments
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Contact Us
              </Link>
            </div>
          </div>

          {/* Visual panel */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
            <div className="relative rounded-3xl border bg-card p-6 shadow-xl sm:p-8">
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BookOpenCheck className="size-6" />
                </div>
                <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs font-semibold text-green-600">
                  Skill focused
                </span>
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                Your skills. Your potential.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A structured space for demonstrating knowledge, completing
                assessments, and reviewing performance.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Coding assessments",
                  "Multiple-choice questions",
                  "Written evaluations",
                  "Performance and results",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-muted/70 p-4">
                <p className="text-sm font-semibold">
                  Learn. Demonstrate. Grow.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Make your skills visible through meaningful assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Who We Are
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Making skill assessment more meaningful
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground">
            Development Assessment Platform is designed to provide candidates
            and companies with a common environment for technical evaluation.
            Candidates can demonstrate their abilities, while companies can
            organize assessments and review performance through a structured
            workflow.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              What We Offer
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Tools for a better assessment experience
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              A focused set of features designed to support assessment
              management and skill evaluation.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className="rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-20 md:grid-cols-2 md:py-24">
        <article className="rounded-2xl border p-7 sm:p-9">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Target className="size-6" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Our Mission</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            To make technical skill assessment more accessible, organized, and
            transparent—and to help candidates showcase their knowledge while
            enabling companies to make informed evaluation decisions.
          </p>
        </article>

        <article className="rounded-2xl border p-7 sm:p-9">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Zap className="size-6" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Our Vision</h2>
          <p className="mt-4 leading-7 text-muted-foreground">
            To build an environment where demonstrated skills and practical
            knowledge help connect talented developers with meaningful
            professional opportunities.
          </p>
        </article>
      </section>

      {/* Commitment */}
      <section className="px-6 pb-20 md:pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-primary px-6 py-12 text-center text-primary-foreground sm:px-12 sm:py-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Discover your skills. Demonstrate your potential.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 opacity-90">
            We are committed to creating a reliable, user-friendly assessment
            experience that supports candidates and companies throughout the
            evaluation process.
          </p>
          <Link
            href="/assessments"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-background px-5 py-3 text-sm font-semibold text-foreground transition-opacity hover:opacity-90"
          >
            Get Started
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
