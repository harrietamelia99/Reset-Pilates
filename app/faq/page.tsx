import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { CHANGING_INFO, FAQ_GROUPS, HEALTH_BOOKING_NOTE } from "@/lib/studio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQs | Reset Pilates Studio",
    description:
      "Booking, classes, grip socks, parking, cancellations, and first visits — Reset Pilates, Nailsea.",
    openGraph: {
      title: "FAQs | Reset Pilates Studio",
      description: "Answers about reformer, hot mat, and mat Pilates at Reset.",
    },
  };
}

export default function FaqPage() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">FAQ</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Questions &amp; answers
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            Straight answers from your onboarding brief — if something isn&apos;t covered,{" "}
            <Link href="/contact" className="text-charcoal underline-offset-2 hover:underline">
              contact us
            </Link>
            .
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="relative bg-white pb-16 md:pb-24" delay={0.05}>
        <div className="mx-auto max-w-6xl space-y-14 px-4 md:px-6">
          {FAQ_GROUPS.map((group, gi) => (
            <section key={group.title} aria-labelledby={`faq-section-${gi}`}>
              <PaperSheet flat pin={false} className="p-6 md:p-8 lg:p-10">
                <h2
                  id={`faq-section-${gi}`}
                  className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl"
                >
                  {group.title}
                </h2>
                <div className="rule-section my-6 w-full max-w-[12rem]" aria-hidden />
                <dl className="divide-y divide-charcoal/10">
                  {group.items.map((item) => (
                    <div key={item.q} className="py-6 first:pt-0">
                      <dt className="font-sans text-sm font-bold uppercase tracking-wide text-charcoal md:text-[15px]">
                        {item.q}
                      </dt>
                      <dd className="mt-3 font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
                        {item.a}
                      </dd>
                    </div>
                  ))}
                </dl>
              </PaperSheet>
            </section>
          ))}

          <PaperSheet flat pin={false} className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
              Changing facilities
            </h2>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{CHANGING_INFO}</p>
          </PaperSheet>

          <PaperSheet flat pin={false} className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
              Health &amp; declarations
            </h2>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{HEALTH_BOOKING_NOTE}</p>
          </PaperSheet>
        </div>
      </MotionSection>
    </>
  );
}
