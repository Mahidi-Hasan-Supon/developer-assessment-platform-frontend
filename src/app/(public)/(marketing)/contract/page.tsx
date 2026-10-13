'use client'
import {
  ArrowRight,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us your questions or feedback.",
    value: "mahidihasansupon@gmail.com",
    href: "mailto:mahidihasansupon@gmail.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Talk to us about your questions.",
    value: "+880 1742169682",
    href: "tel:+880 1742169682",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "Our usual support hours.",
    value: "Sunday – Thursday",
    href: undefined,
  },
];

const faqs = [
  {
    question: "How can I take an assessment?",
    answer:
      "Browse available assessments and follow the invitation and eligibility requirements to get started.",
  },
  {
    question: "How can a company create assessments?",
    answer:
      "Companies can apply for access and use the platform's assessment management features after approval.",
  },
  {
    question: "Where can I check my results?",
    answer:
      "Sign in to your account and visit your assessment attempts or results area when results are available.",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="border-b bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="mx-auto max-w-7xl px-6 py-16 text-center sm:py-20">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <MessageSquare className="size-7" />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Contact Us
          </p>

          <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            We’re here to help you
          </h1>

          <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
            Have a question about assessments, your account, or our platform?
            Reach out to us and let us know how we can help.
          </p>
        </div>
      </section>

      {/* Contact content */}
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[0.85fr_1.15fr] lg:py-20">
        <div>
          <h2 className="text-2xl font-bold sm:text-3xl">Get in touch</h2>

          <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
            We welcome questions, feedback, and suggestions from candidates and
            companies using Development Assessment Platform.
          </p>

          <div className="mt-8 space-y-4">
            {contactInfo.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex gap-4 rounded-2xl border bg-card p-5"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>

                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-2 inline-block break-all text-sm font-medium text-primary hover:underline"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-2 text-sm font-medium">{item.value}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-dashed p-5">
            <div className="flex items-center gap-2 font-semibold">
              <MapPin className="size-5 text-primary" />
              Our Platform
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Connect with us online for questions about technical assessments
              and platform support.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
          <h2 className="text-2xl font-bold">Send us a message</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Fill out the form below and tell us how we can help.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(event) => {
              event.preventDefault();
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  required
                  className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                placeholder="What is your message about?"
                required
                className="h-11 w-full rounded-md border bg-background px-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                placeholder="Write your message here..."
                required
                className="w-full resize-y rounded-md border bg-background px-3 py-3 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <button
              type="submit"
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Send Message
              <ArrowRight className="size-4" />
            </button>

            <p className="text-center text-xs text-muted-foreground">
              Your message form needs a backend endpoint before it can send
              messages.
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-muted/30">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border bg-card p-5"
              >
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-xl text-primary transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>

                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
