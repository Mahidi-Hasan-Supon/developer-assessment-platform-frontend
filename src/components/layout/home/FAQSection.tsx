
"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  MessageCircleQuestion,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const faqs = [
  {
    question: "What is DevAssess?",
    answer:
      "DevAssess is a developer assessment platform designed to help candidates demonstrate their technical knowledge and help companies organize and review assessments.",
  },
  {
    question: "Which types of assessments are supported?",
    answer:
      "DevAssess supports multiple-choice questions (MCQ), coding challenges, and written assessments. The available question types depend on the assessment.",
  },
  {
    question: "How can I start an assessment?",
    answer:
      "Explore the available assessments and follow the instructions shown for your chosen assessment. If you receive an invitation, accept it first and complete any required steps before starting.",
  },
  {
    question: "Can I start an assessment that is still a draft?",
    answer:
      "No. Draft assessments are not available for candidates to attempt. An assessment must be published and you must meet its access requirements before you can start.",
  },
  {
    question: "Do all assessments require payment?",
    answer:
      "Not necessarily. Some assessments may be free, while others may require payment. If payment is required, it must be completed successfully before you can begin the attempt.",
  },
  {
    question: "When can I see my assessment results?",
    answer:
      "Results depend on the assessment and its evaluation process. Some answers may be evaluated automatically, while other submissions may need company review before results are published.",
  },
  {
    question: "Can companies create and manage assessments?",
    answer:
      "Company users can use the platform's assessment workflow to organize assessments, invite candidates, and review submissions and results. Company access may require an application or approval.",
  },
  {
    question: "What should I do if I cannot access an assessment?",
    answer:
      "Check that you are signed in to the correct account, that you have accepted the invitation if one is required, and that you have completed any required payment. Also confirm that the assessment is published and available to you.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-primary/5 blur-3xl"
      />

      <div className="container relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-14"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <CircleHelp className="h-4 w-4" />
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Got questions?
            <span className="mt-2 block text-primary">
              We have answers.
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
            Find answers about assessments, invitations, payments, and results
            on DevAssess.
          </p>
        </motion.div>

        {/* FAQ accordion */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
          {/* Left information panel */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col self-center rounded-2xl border border-border bg-card p-6 sm:p-8"
          >
            <div>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MessageCircleQuestion className="h-6 w-6" />
              </div>

              <h3 className="text-2xl font-semibold text-foreground">
                Still have questions?
              </h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                Explore the available assessments to understand the process,
                or create an account to get started.
              </p>
            </div>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button
                className="w-full gap-2"
                render={<Link href="/assessments" />}
                nativeButton={false}
              >
                Explore Assessments
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                className="w-full border-border"
                render={<Link href="/register" />}
                nativeButton={false}
              >
                Create an Account
              </Button>
            </div>
          </motion.div>

          {/* Questions list */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : 0.1 }}
            className="space-y-3"
          >
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              const answerId = `faq-answer-${index}`;

              return (
                <div
                  key={faq.question}
                  className={`overflow-hidden rounded-xl border transition-colors duration-200 ${
                    isOpen
                      ? "border-primary/40 bg-card"
                      : "border-border bg-card/70 hover:border-primary/25"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-4 py-5 text-left sm:px-5"
                  >
                    <span
                      className={`text-sm font-semibold leading-6 sm:text-base ${
                        isOpen ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isOpen
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={answerId}
                        key="answer"
                        initial={
                          shouldReduceMotion
                            ? false
                            : { height: 0, opacity: 0 }
                        }
                        animate={{ height: "auto", opacity: 1 }}
                        exit={
                          shouldReduceMotion
                            ? undefined
                            : { height: 0, opacity: 0 }
                        }
                        transition={{ duration: 0.22, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border/70 px-4 pb-5 pt-4 sm:px-5">
                          <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
