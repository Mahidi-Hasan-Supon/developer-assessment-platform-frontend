
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  Code2,
  Cpu,
  ShieldCheck,
  Terminal,
  Timer,
  Trophy,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type HeroTab = "challenge" | "overview";

const codeLines = [
  { number: 1, code: "function twoSum(nums, target) {" },
  { number: 2, code: "  const seen = new Map();" },
  { number: 3, code: "  for (let i = 0; i < nums.length; i++) {" },
  { number: 4, code: "    const diff = target - nums[i];" },
  { number: 5, code: "    if (seen.has(diff)) {" },
  { number: 6, code: "      return [seen.get(diff), i];" },
  { number: 7, code: "    }" },
  { number: 8, code: "    seen.set(nums[i], i);" },
  { number: 9, code: "  }" },
  { number: 10, code: "  return [];" },
  { number: 11, code: "}" },
];

const slideTransition = {
  duration: 0.3,
  ease: "easeInOut" as const,
};

export default function HeroSection() {
  const [activeTab, setActiveTab] =
    useState<HeroTab>("challenge");

  const shouldReduceMotion = useReducedMotion();

  // Automatically rotate slides unless reduced motion is preferred.
  useEffect(() => {
    if (shouldReduceMotion) return;

    const intervalId = window.setInterval(() => {
      setActiveTab((current) =>
        current === "challenge" ? "overview" : "challenge",
      );
    }, 6500);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  return (
    <section className="relative isolate flex min-h-[60vh] items-center overflow-hidden py-12 sm:py-14 lg:min-h-[65vh] lg:py-16">
      {/* Subtle background decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -right-24 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute -bottom-32 left-[25%] h-64 w-64 rounded-full bg-primary/5 blur-3xl" />

        <div
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(var(--border) 0.7px, transparent 0.7px)",
            backgroundSize: "22px 22px",
            maskImage:
              "linear-gradient(to bottom, black, transparent 85%)",
          }}
        />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-8">
        {/* Left: Hero content */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-2 text-sm font-medium text-primary">
            <Zap className="h-4 w-4" />
            <span>Build skills. Prove your potential.</span>
          </div>

          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.08]">
            Prove your skills.
            <span className="mt-1 block text-primary">
              Build your future.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Take structured technical assessments, solve real-world
            challenges, and showcase your abilities. DevAssess helps
            developers demonstrate what they can actually do.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              nativeButton={false}
              render={<Link href="/register" />}
              className="h-12 gap-2 px-6 shadow-sm shadow-primary/15"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/assessments" />}
              className="h-12 gap-2 px-6"
            >
              Explore Assessments
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Structured evaluation
            </div>

            <div className="flex items-center gap-2">
              <Code2 className="h-4 w-4 text-primary" />
              Practical challenges
            </div>

            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-primary" />
              Track your progress
            </div>
          </div>
        </motion.div>

        {/* Right: Animated slider */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl"
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-black/[0.06] dark:shadow-black/20">
            {/* Window header */}
            <div className="flex items-center justify-between border-b border-border px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                <Terminal className="h-4 w-4" />
                DevAssess Preview
              </div>

              <span className="w-10" aria-hidden="true" />
            </div>

            {/* Slider tabs */}
            <div
              role="tablist"
              aria-label="Hero preview"
              className="grid grid-cols-2 border-b border-border"
            >
              <button
                id="hero-tab-challenge"
                type="button"
                role="tab"
                aria-selected={activeTab === "challenge"}
                aria-controls="hero-panel"
                onClick={() => setActiveTab("challenge")}
                className={`relative flex min-h-14 items-center justify-center gap-2 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-3 ${
                  activeTab === "challenge"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Code2 className="h-4 w-4 shrink-0" />
                <span>Live Challenge</span>

                {activeTab === "challenge" && (
                  <motion.span
                    layoutId="hero-active-tab"
                    className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary sm:inset-x-5"
                    transition={slideTransition}
                  />
                )}
              </button>

              <button
                id="hero-tab-overview"
                type="button"
                role="tab"
                aria-selected={activeTab === "overview"}
                aria-controls="hero-panel"
                onClick={() => setActiveTab("overview")}
                className={`relative flex min-h-14 items-center justify-center gap-2 px-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring sm:px-3 ${
                  activeTab === "overview"
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Cpu className="h-4 w-4 shrink-0" />
                <span>Platform Overview</span>

                {activeTab === "overview" && (
                  <motion.span
                    layoutId="hero-active-tab"
                    className="absolute inset-x-4 bottom-0 h-0.5 rounded-full bg-primary sm:inset-x-5"
                    transition={slideTransition}
                  />
                )}
              </button>
            </div>

            {/* Slide content */}
            <div
              id="hero-panel"
              role="tabpanel"
              aria-labelledby={`hero-tab-${activeTab}`}
              className="min-h-[390px] overflow-hidden p-4 sm:min-h-[410px] sm:p-5"
            >
              <AnimatePresence mode="wait" initial={false}>
                {activeTab === "challenge" ? (
                  <motion.div
                    key="challenge"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: 20 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: 0, x: -20 }
                    }
                    transition={slideTransition}
                    className="space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-semibold text-foreground">
                          Two Sum
                        </h2>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Arrays · JavaScript · Easy
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                        <Timer className="h-3.5 w-3.5" />
                        Timed challenge
                      </span>
                    </div>

                    {/* Code editor preview */}
                    <div className="overflow-hidden rounded-xl border border-border bg-muted/40">
                      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                        <span className="text-xs text-muted-foreground">
                          solution.js
                        </span>
                        <span className="text-xs text-muted-foreground">
                          JavaScript
                        </span>
                      </div>

                      <div className="overflow-x-auto px-3 py-3.5 font-mono text-[11px] leading-[1.8] sm:px-4 sm:text-xs">
                        {codeLines.map((line) => (
                          <div key={line.number} className="flex min-w-max gap-4">
                            <span className="w-4 shrink-0 select-none text-right text-muted-foreground/60">
                              {line.number}
                            </span>

                            <code
                              className={
                                line.code.includes("return")
                                  ? "text-primary"
                                  : line.code.includes("function") ||
                                      line.code.includes("const") ||
                                      line.code.includes("for") ||
                                      line.code.includes("if")
                                    ? "text-foreground"
                                    : "text-muted-foreground"
                              }
                            >
                              {line.code}
                            </code>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Example evaluation result */}
                    <div className="flex items-start gap-3 rounded-xl border border-green-500/20 bg-green-500/5 p-3.5">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          Sample test result
                        </p>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          An illustrative example of a successful evaluation.
                        </p>
                      </div>

                      <span className="ml-auto shrink-0 text-xs font-semibold text-green-700 dark:text-green-400">
                        Passed
                      </span>
                    </div>

                    <p className="text-center text-[11px] text-muted-foreground">
                      Demo preview · Not a live evaluation
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="overview"
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, x: 20 }
                    }
                    animate={{ opacity: 1, x: 0 }}
                    exit={
                      shouldReduceMotion
                        ? undefined
                        : { opacity: 0, x: -20 }
                    }
                    transition={slideTransition}
                    className="space-y-5"
                  >
                    <div>
                      <h2 className="text-lg font-semibold text-foreground">
                        Your skills, your journey.
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        Practise, take assessments, and follow your
                        development in one place.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-border bg-muted/30 p-3.5 sm:p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <ClipboardCheck className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          Assessments
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Explore structured skill evaluations.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/30 p-3.5 sm:p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Timer className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          Timed Attempts
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Practise time management and problem solving.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/30 p-3.5 sm:p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Trophy className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          Results
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Review assessment outcomes.
                        </p>
                      </div>

                      <div className="rounded-xl border border-border bg-muted/30 p-3.5 sm:p-4">
                        <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Code2 className="h-4 w-4" />
                        </div>
                        <h3 className="text-sm font-semibold text-foreground">
                          Coding Practice
                        </h3>
                        <p className="mt-1 text-xs leading-5 text-muted-foreground">
                          Develop practical coding skills.
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                          <Zap className="h-5 w-5" />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-foreground">
                            Ready to get started?
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">
                            Find an assessment that matches your goals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Slider footer */}
            <div className="border-t border-border px-4 py-3 sm:px-5">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="h-2 w-2 rounded-full bg-primary"
                  />
                  <span className="text-xs text-muted-foreground">
                    {activeTab === "challenge"
                      ? "Explore a sample challenge"
                      : "Discover platform features"}
                  </span>
                </div>

                <span className="text-xs font-medium text-muted-foreground">
                  {activeTab === "challenge" ? "01" : "02"} / 02
                </span>
              </div>

              <output
                className="mt-3 flex gap-1.5"
                aria-label={`Slide ${activeTab === "challenge" ? "1" : "2"} of 2`}
              >
                <button
                  type="button"
                  aria-label="Show Live Challenge slide"
                  aria-pressed={activeTab === "challenge"}
                  onClick={() => setActiveTab("challenge")}
                  className={`h-1.5 flex-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activeTab === "challenge"
                      ? "bg-primary"
                      : "bg-muted hover:bg-primary/40"
                  }`}
                />

                <button
                  type="button"
                  aria-label="Show Platform Overview slide"
                  aria-pressed={activeTab === "overview"}
                  onClick={() => setActiveTab("overview")}
                  className={`h-1.5 flex-1 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    activeTab === "overview"
                      ? "bg-primary"
                      : "bg-muted hover:bg-primary/40"
                  }`}
                />
              </output>

              <p className="mt-2 text-[10px] text-muted-foreground">
                Select a tab to explore the preview
              </p>
            </div>
          </div>

          {/* Floating decorative card; not interactive */}
          <motion.div
            animate={
              shouldReduceMotion ? undefined : { y: [0, -5, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -bottom-5 -left-2 hidden items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-lg sm:flex lg:-left-6"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-semibold text-foreground">
                Skills over buzzwords
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Show what you can do
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );     
}
