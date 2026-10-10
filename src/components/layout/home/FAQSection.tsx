'use client'
export function FAQSection() {
  const faqs = [
    {
      question: "What is DevAssess?",
      answer:
        "DevAssess is a platform for creating, taking, and managing technical assessments for developers and companies.",
    },
    {
      question: "What types of assessments are available?",
      answer:
        "The platform supports assessment formats such as coding challenges, multiple-choice questions, and written technical questions, depending on the assessment.",
    },
    {
      question: "Can companies invite candidates?",
      answer:
        "Companies can use the platform's assessment workflow to organize assessments and invite candidates according to the platform's access rules.",
    },
    {
      question: "Can I review my assessment performance?",
      answer:
        "You can review results for assessments that you have completed and that have been evaluated and made available to you.",
    },
  ];

  return (
    <section className="bg-muted/40 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            FAQ
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted-foreground">
            Learn more about assessments and how DevAssess works.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border bg-card p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                {faq.question}
                <span className="text-xl text-primary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 leading-7 text-muted-foreground">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
