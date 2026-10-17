"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Code2, LoaderCircle } from "lucide-react";

export default function HomePageLoading() {
  const reduceMotion = useReducedMotion();

  return (
    <output
      className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center overflow-hidden bg-background"
      
      aria-label="Loading DevAssess homepage"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 -top-32 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 size-96 rounded-full bg-primary/10 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.border/0.25)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.border/0.25)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      <div className="relative flex w-full max-w-md flex-col items-center px-6 text-center">
        {/* Animated logo */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.06, 1],
                  rotate: [0, 3, -3, 0],
                }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex size-20 items-center justify-center rounded-3xl border border-primary/20 bg-primary/10 shadow-lg shadow-primary/10"
        >
          <div className="absolute inset-2 rounded-2xl border border-primary/20" />

          <Code2 className="size-9 text-primary" />
        </motion.div>

        {/* Brand */}
        <h1 className="mt-7 text-3xl font-extrabold tracking-tight text-foreground">
          Dev<span className="text-primary">Assess</span>
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Prepare. Practice. Prove your skills.
        </p>

        {/* Loading indicator */}
        <div className="mt-9 flex w-full max-w-[240px] flex-col items-center gap-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full w-1/3 rounded-full bg-primary"
              animate={reduceMotion ? undefined : { x: ["0%", "200%", "0%"] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <LoaderCircle className="size-4 animate-spin text-primary" />
            <span>Preparing your experience...</span>
          </div>
        </div>
      </div>
    </output>
  );
}
