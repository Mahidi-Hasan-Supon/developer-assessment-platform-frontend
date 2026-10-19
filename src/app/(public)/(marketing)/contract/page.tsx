"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email us",
    description: "Questions or feedback? Send us an email.",
    value: "mahidihasansupon@gmail.com",
    href: "mailto:mahidihasansupon@gmail.com",
  },
  {
    icon: MessageSquare,
    title: "General inquiries",
    description: "Need help with your assessment journey?",
    value: "We're happy to help",
    href: "mailto:mahidihasansupon@gmail.com",
  },
  {
    icon: Clock,
    title: "Response time",
    description: "Our team aims to respond within",
    value: "1–2 business days",
    href: null,
  },
];

const faqs = [
  {
    question: "How do I start an assessment?",
    answer:
      "Create your candidate account, explore published assessments, and follow the invitation and payment requirements shown for each assessment.",
  },
  {
    question: "I'm a company. How can I publish an assessment?",
    answer:
      "Submit a company application first. Once your company profile is approved, you can create and publish assessments from your company dashboard.",
  },
  {
    question: "What if I have a technical issue?",
    answer:
      "Send us a message using the contact form with a description of the issue. Please avoid including passwords or other sensitive information.",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    const { name, value } = event.target;

    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: "" }));
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.subject) nextErrors.subject = "Please select a subject.";

    if (form.message.trim().length < 10) {
      nextErrors.message = "Message must be at least 10 characters.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    // UI validation only: connect this form to your contact API or email service.
    setSubmitted(true);
  }

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
              <Sparkles className="h-4 w-4" />
              We&apos;re here to help
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s start a{" "}
              <span className="bg-gradient-to-r from-primary to-emerald-500 bg-clip-text text-transparent">
                conversation.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Have a question about assessments, need technical support, or want
              to work with us? Send a message and let&apos;s figure it out
              together.
            </p>
          </div>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-[0.85fr_1.15fr] lg:px-8 lg:py-20">
        {/* Contact information */}
        <div className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Get in touch
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              We&apos;d love to hear from you
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
              Whether you&apos;re a developer preparing for your next
              opportunity or a company looking for talented people, the
              DevAssess team is ready to help.
            </p>
          </div>

          <div className="space-y-4">
            {contactDetails.map((item) => {
              const Icon = item.icon;

              // লুপের ভেতরের মূল কন্টেন্ট (যা দুই জায়গাতেই ব্যবহার হবে)
              const contentInner = (
                <>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {item.description}
                    </p>
                    <p className="mt-2 break-words text-sm font-medium text-primary">
                      {item.value}
                    </p>
                  </div>
                </>
              );

              // কমন ক্লাসনমগুলো এখানে রাখা হয়েছে যেন কোড ডুপ্লিকেট না হয়
              const containerClasses =
                "flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40";

              return item.href ? (
                <a
                  key={item.title} // প্রধান প্যারেন্ট এলিমেন্টে ইউনিক কি (Key)
                  href={item.href}
                  className={`block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${containerClasses}`}
                >
                  {contentInner}
                </a>
              ) : (
                <div
                  key={item.title} // প্রধান প্যারেন্ট এলিমেন্টে ইউনিক কি (Key)
                  className={containerClasses}
                >
                  {contentInner}
                </div>
              );
            })}
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <h3 className="font-semibold">Your privacy matters</h3>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Please don&apos;t include passwords, payment credentials, or
                  other sensitive information in your message.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-8 lg:p-10">
          <div className="mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Send className="h-5 w-5" />
            </div>

            <h2 className="mt-5 text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Fill out the form below. All fields are required.
            </p>
          </div>

          {submitted ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-6">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
              <h3 className="mt-4 text-lg font-semibold">Form validated!</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Your information passed validation, but this demo form has not
                sent your message yet. Connect a backend endpoint or email
                service to enable delivery.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-5 text-sm font-semibold text-primary hover:underline"
              >
                Back to the form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="text-sm font-medium">
                    Full name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? "contact-name-error" : undefined
                    }
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.name && (
                    <p
                      id="contact-name-error"
                      className="text-xs text-destructive"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-medium"
                  >
                    Email address
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={
                      errors.email ? "contact-email-error" : undefined
                    }
                    className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                  {errors.email && (
                    <p
                      id="contact-email-error"
                      className="text-xs text-destructive"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-subject"
                  className="text-sm font-medium"
                >
                  What can we help you with?
                </label>
                <select
                  id="contact-subject"
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={
                    errors.subject ? "contact-subject-error" : undefined
                  }
                  className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General inquiry</option>
                  <option value="technical">Technical support</option>
                  <option value="assessment">Assessment question</option>
                  <option value="company">Company partnership</option>
                  <option value="feedback">Feedback or suggestion</option>
                </select>
                {errors.subject && (
                  <p
                    id="contact-subject-error"
                    className="text-xs text-destructive"
                  >
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium"
                >
                  Your message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tell us how we can help..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? "contact-message-error" : undefined
                  }
                  className="w-full resize-y rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                {errors.message && (
                  <p
                    id="contact-message-error"
                    className="text-xs text-destructive"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Validate message
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                We respect your privacy and will only use your details to
                respond to your inquiry.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <div className="mb-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Frequently asked questions
            </h2>
            <p className="mt-3 text-muted-foreground">
              Quick answers to common questions about DevAssess.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-border bg-card p-5 open:border-primary/30"
              >
                <summary className="cursor-pointer list-none pr-6 font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-xl text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Want to explore the platform first?
            </p>
            <Link
              href="/assessments"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Explore assessments
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
