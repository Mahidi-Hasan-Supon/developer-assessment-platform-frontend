"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  Cookie,
  Database,
  FileText,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const sections = [
  {
    id: "information",
    number: "01",
    title: "Information We Collect",
    icon: Database,
    content:
      "DevAssess may collect information you provide when creating an account, updating your profile, applying as a company, participating in assessments, or contacting our support team.",
    bullets: [
      "Account information such as your name and email address.",
      "Professional profile details, skills, education, and experience that you choose to provide.",
      "Assessment responses, submissions, scores, and related activity.",
      "Company profile and application information submitted by company representatives.",
    ],
  },
  {
    id: "usage",
    number: "02",
    title: "How We Use Your Information",
    icon: UserRound,
    content:
      "We use information to operate and improve the DevAssess platform, provide assessment services, and support communication between candidates and approved companies.",
    bullets: [
      "Create and manage user accounts and authentication sessions.",
      "Deliver assessments and process submissions and results.",
      "Review company applications and manage platform permissions.",
      "Respond to support requests and communicate important service updates.",
      "Protect the platform, detect suspicious activity, and maintain service reliability.",
    ],
  },
  {
    id: "security",
    number: "03",
    title: "Data Security",
    icon: LockKeyhole,
    content:
      "We use appropriate technical and organizational measures intended to protect information from unauthorized access, alteration, disclosure, or loss. No internet-based service can guarantee absolute security.",
    bullets: [
      "Access to information should be limited to authorized purposes.",
      "Authentication credentials should be protected and never shared.",
      "Users should report suspected account compromise promptly.",
    ],
  },
  {
    id: "cookies",
    number: "04",
    title: "Cookies and Authentication",
    icon: Cookie,
    content:
      "DevAssess may use cookies or similar technologies to maintain authentication sessions, support essential platform functionality, and improve the user experience.",
    bullets: [
      "Authentication cookies may be used to keep you signed in.",
      "Browser settings may allow you to control or clear cookies.",
      "Blocking essential cookies may prevent some features from working correctly.",
    ],
  },
  {
    id: "payments",
    number: "05",
    title: "Payments and Third-Party Services",
    icon: ShieldCheck,
    content:
      "Some assessments may require payment. Payment processing may involve third-party payment providers. Their handling of payment information is also subject to their applicable terms and privacy policies.",
    bullets: [
      "Payment status and transaction references may be used to verify access to paid assessments.",
      "Use payment pages and services only through the platform's intended payment flow.",
      "Do not send passwords, PINs, or full payment credentials through support messages.",
    ],
  },
  {
    id: "sharing",
    number: "06",
    title: "Information Sharing and Retention",
    icon: FileText,
    content:
      "Information may be made available to authorized parties when needed to provide platform services, administer assessments, comply with applicable legal obligations, or protect legitimate platform interests.",
    bullets: [
      "Assessment information may be shared with the relevant assessment-owning company as part of the assessment process.",
      "Service providers may process information on behalf of the platform when necessary.",
      "Information may be retained for as long as reasonably necessary for platform operations, security, dispute resolution, and legal obligations.",
    ],
  },
  {
    id: "rights",
    number: "07",
    title: "Your Choices and Rights",
    icon: UserRound,
    content:
      "Depending on applicable law, you may have rights concerning access to, correction of, or deletion of your personal information.",
    bullets: [
      "Keep your profile information accurate and up to date.",
      "Contact the platform to request help with your personal information.",
      "You may sign out when using a shared or public device.",
      "Some records may need to be retained where required by law or for legitimate security purposes.",
    ],
  },
  {
    id: "changes",
    number: "08",
    title: "Changes to This Policy",
    icon: CalendarDays,
    content:
      "This policy may be updated as the platform, its features, or applicable requirements change. Updated content should be published on this page with a revised effective date.",
    bullets: [
      "Review this page periodically for updates.",
      "Material changes should be communicated where appropriate.",
    ],
  },
];

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("information");

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 top-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
              <ShieldCheck className="h-4 w-4" />
              Your privacy matters
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Privacy{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                Policy
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Learn how DevAssess may collect, use, protect, and manage
              information when you use our developer assessment platform.
            </p>

            <div className="mt-7 inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4 text-primary" />
              Effective date: October 19, 2026
            </div>
          </div>
        </div>
      </section>

      {/* Policy content */}
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-16">
        {/* Table of contents */}
        <aside className="h-fit lg:sticky lg:top-24">
          <div className="rounded-2xl border border-border bg-card p-5">
            <h2 className="text-base font-bold">On this page</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse the policy sections.
            </p>

            <nav
              aria-label="Privacy policy sections"
              className="mt-5 space-y-1"
            >
              {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                      isActive
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span>{section.title}</span>
                    <ChevronRight className="h-4 w-4 shrink-0" />
                  </a>
                );
              })}
            </nav>
          </div>

          <div className="mt-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <Mail className="h-5 w-5 text-emerald-600" />
            <h3 className="mt-3 font-semibold">Have a question?</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Contact our team if you have questions about this policy.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Contact us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </aside>

        {/* Main content */}
        <div className="min-w-0">
          <div className="rounded-2xl border border-border bg-card p-5 sm:p-7">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Our privacy commitment</h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  We aim to handle information responsibly and transparently.
                  This page describes the intended privacy practices for
                  DevAssess. The actual practices of the deployed service should
                  be reviewed and confirmed before this policy is treated as a
                  final legal document.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/30 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-xs font-bold tracking-widest text-primary">
                          {section.number}
                        </span>
                        <h2 className="text-lg font-bold sm:text-xl">
                          {section.title}
                        </h2>
                      </div>

                      <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
                        {section.content}
                      </p>

                      <ul className="mt-4 space-y-3">
                        {section.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Contact CTA */}
          <div className="relative mt-8 overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-emerald-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Mail className="h-4 w-4" />
                Need clarification?
              </div>

              <h2 className="mt-3 text-xl font-bold sm:text-2xl">
                We&apos;re here to help.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                If you have questions about information associated with your
                account or this privacy policy, reach out through our contact
                page.
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Contact DevAssess
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-muted-foreground">
            This template is informational and is not legal advice. Confirm it
            against your actual data practices and applicable laws before
            publishing it as your official policy.
          </p>
        </div>
      </section>
    </main>
  );
}
