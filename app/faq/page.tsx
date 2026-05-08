import type { Metadata } from "next";
import { FaqAccordion } from "@/components/FaqAccordion";
import { FAQ_GROUPS } from "@/lib/faq-data";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQs | Reset Pilates Studio",
    description:
      "Booking, classes, health & safety, cancellations and practical info — Reset Pilates Studio.",
    openGraph: {
      title: "FAQs | Reset Pilates Studio",
      description: "Answers before you step into the studio.",
    },
  };
}

export default function FaqPage() {
  return (
    <div className="page-bg">
      <header className="page-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
              FAQs
            </h1>
            <div className="rule-section mt-8 max-w-lg" aria-hidden />
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mid-grey md:text-[17px]">
              Straight answers — so you can book with confidence.
            </p>
          </div>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-6 md:py-20">
        <FaqAccordion groups={FAQ_GROUPS} />
      </div>
    </div>
  );
}
