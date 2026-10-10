
'use client'
import { Code2, Trophy, Users } from "lucide-react";




const steps = [
  {
    number: "01",
    icon: Users,
    title: "Create your account",
    description:
      "Sign up as a developer and build your professional profile.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Take an assessment",
    description:
      "Choose an available assessment and demonstrate your technical skills.",
  },
  {
    number: "03",
    icon: Trophy,
    title: "Review your results",
    description:
      "Track your performance and discover where you can improve.",
  },
];




export function HowItWorksSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From learning to proving your skills
          </h2>
          <p className="mt-4 text-muted-foreground">
            A simple process to assess your abilities, understand your
            performance, and keep moving forward.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative rounded-2xl border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <step.icon className="size-6" />
                </div>
                <span className="text-3xl font-bold text-muted-foreground/30">
                  {step.number}
                </span>
              </div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
