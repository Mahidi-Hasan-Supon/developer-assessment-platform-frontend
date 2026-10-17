"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "success" | "error";

export default function NewsletterSection() {
  const shouldReduceMotion = useReducedMotion();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // No subscription API is connected yet.
    setStatus("success");
    setMessage(
      "Your email passed validation. Newsletter subscription is not connected yet.",
    );
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    setStatus("idle");
    setMessage("");
  }

  return (
    <section
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45 }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card"
        >
          {/* Decorative background */}
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          />

          <div className="relative grid gap-10 p-6 sm:p-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14 lg:p-12">
            {/* Left content */}
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                <span>Stay in the loop</span>
              </div>

              <h2
                id="newsletter-title"
                className="max-w-xl text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              >
                Keep learning.{" "}
                <span className="text-primary">Keep growing.</span>
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
                Get updates about technical assessments, coding practice,
                platform improvements, and resources to support your development
                journey.
              </p>

              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3">
                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Learning resources</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-foreground/80">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Platform updates</span>
                </div>
              </div>
            </div>

            {/* Subscription form */}
            <div className="rounded-2xl border border-border bg-background/80 p-5 sm:p-6">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </div>

              <h3 className="text-lg font-semibold text-foreground">
                Subscribe to our newsletter
              </h3>

              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter your email to get started.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
                noValidate
              >
                <div className="space-y-2">
                  <label
                    htmlFor="newsletter-email"
                    className="text-sm font-medium text-foreground"
                  >
                    Email address
                  </label>

                  <Input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(event) => handleEmailChange(event.target.value)}
                    aria-invalid={status === "error"}
                    aria-describedby={
                      message ? "newsletter-feedback" : undefined
                    }
                    className="h-11 rounded-xl"
                  />
                </div>

                <Button type="submit" className="group h-11 w-full rounded-xl">
                  Subscribe
                  <Send className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Button>

                {message && (
                  <motion.p
                    id="newsletter-feedback"
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    role="status"
                    aria-live="polite"
                    className={`text-sm leading-6 ${
                      status === "error" ? "text-destructive" : "text-primary"
                    }`}
                  >
                    {message}
                  </motion.p>
                )}
              </form>

              <div className="mt-5 flex items-start gap-2 border-t border-border pt-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <p className="text-xs leading-5 text-muted-foreground">
                  Your email is only validated in this demo. It is not saved or
                  subscribed to a mailing list.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
