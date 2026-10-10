'use client'
import {  ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export function FinalCTASection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-slate-950 px-6 py-14 text-center text-white sm:px-12 sm:py-20">
        <div className="pointer-events-none absolute -right-20 -top-24 size-72 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-72 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl">
          <div className="mx-auto mb-5 flex size-12 items-center justify-center rounded-xl bg-white/10">
            <Sparkles className="size-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Your skills deserve to be seen.
          </h2>
          <p className="mt-5 leading-7 text-slate-300">
            Take the next step in your developer journey with DevAssess.
            Start with an assessment and keep growing.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/register"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-slate-950 transition-opacity hover:opacity-90"
            >
              Create your account <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-white/25 px-6 py-3 font-semibold transition-colors hover:bg-white/10"
            >
              Sign in
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-slate-300">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4" /> Structured assessments
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="size-4" /> Performance tracking
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}