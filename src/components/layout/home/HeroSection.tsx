"use client";

import Link from "next/link";
import {
  ArrowRight,
  ChartNoAxesCombined,
  Code2,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Code2,
    title: "Coding Challenges",
    description:
      "Solve technical problems and demonstrate your programming skills.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Track Your Progress",
    description:
      "Review your assessment results and discover areas to improve.",
  },
];

export default function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/10 via-background to-background" />

      <div className="absolute -right-24 -top-24 -z-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:gap-16">
        {/* Hero content */}
        <div className="space-y-7">
          <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-2 text-sm font-medium shadow-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            The smarter way to assess talent
          </div>

          <div className="space-y-5">
            <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Prove your skills.
              <span className="block text-primary">Build your future.</span>
            </h1>

            <p className="max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
              Test your technical skills, solve coding challenges, and
              demonstrate what you can do with DevAssess — a platform designed
              to make developer assessment simple and meaningful.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" >
              <Link href="/register">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>

            <Button size="lg" variant="outline" >
              <Link href="/assessments">
                <PlayCircle className="mr-2 h-4 w-4" />
                Explore Assessments
              </Link>
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Structured assessments
            </span>
            <span className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              Practical challenges
            </span>
          </div>
        </div>

        {/* Feature panel */}
        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-primary/10 blur-2xl" />

          <div className="rounded-3xl border bg-card/90 p-5 shadow-2xl shadow-primary/5 backdrop-blur sm:p-7">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Your developer journey
                </p>
                <h2 className="mt-1 text-xl font-semibold">
                  Ready to level up?
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Code2 className="h-6 w-6" />
              </div>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="flex gap-4 rounded-2xl border bg-background p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm leading-6 text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>

                    <span className="ml-auto text-sm text-muted-foreground">
                      0{index + 1}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl bg-primary/5 p-4">
              <p className="text-sm font-medium">
                Every challenge is an opportunity to grow.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Practice, assess, and keep improving your skills.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>




















  );
}
