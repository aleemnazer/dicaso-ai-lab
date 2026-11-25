"use client";

import { useState } from "react";

// PLACEHOLDER content – replace before launch
const FAQS = [
  {
    question: "What does Dicaso AI Lab do?",
    answer:
      "We design and build custom software and AI solutions: LLM assistants, ML models, automation and the web apps around them.",
  },
  {
    question: "How long does a typical project take?",
    answer:
      "A focused prototype usually takes 3–6 weeks; production systems take 2–4 months depending on scope.",
  },
  {
    question: "Do you work with our existing data and systems?",
    answer:
      "Yes. We integrate with your databases, APIs and tools, and we never move data without your approval.",
  },
  {
    question: "How do you handle data privacy and security?",
    answer:
      "We follow least-privilege access, sign NDAs, and can deploy models in your own cloud account.",
  },
  {
    question: "What happens after launch?",
    answer:
      "We offer support and maintenance plans, including monitoring, model updates and new features.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="w-full px-6 py-16 text-left sm:py-20"
    >
      <div className="mx-auto w-full max-w-3xl">
        <h2
          id="faq-heading"
          className="text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-gray-200 border-y border-gray-200">
          {FAQS.map((faq, index) => {
            const n = index + 1;
            const open = openIndex === index;

            return (
              <div key={faq.question}>
                <h3>
                  <button
                    type="button"
                    id={`faq-button-${n}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${n}`}
                    onClick={() => setOpenIndex(open ? null : index)}
                    className="group flex w-full items-center justify-between gap-4 rounded-sm py-4 text-left text-base font-semibold text-gray-900 hover:text-gray-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:py-5 sm:text-lg"
                  >
                    <span className="min-w-0">{faq.question}</span>
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 motion-reduce:transition-none group-hover:text-gray-900 ${
                        open ? "rotate-45 text-gray-900" : "text-gray-500"
                      }`}
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${n}`}
                  role="region"
                  aria-labelledby={`faq-button-${n}`}
                  hidden={!open}
                  className="pb-5 pr-0 text-gray-700 sm:pr-10"
                >
                  {faq.answer}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
