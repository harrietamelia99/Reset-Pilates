import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { FaqExperience } from "@/components/FaqExperience";
import { PosterCtaBand } from "@/components/PosterCtaBand";
import { BOOKING_HREF } from "@/lib/constants";
import { CHANGING_INFO, FAQ_GROUPS, HEALTH_BOOKING_NOTE } from "@/lib/studio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "FAQs | Reset Pilates Studio",
    description:
      "Booking, classes, grip socks, parking, cancellations, and first visits, Reset Pilates, Nailsea.",
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
            Jump to a topic with the index below, or expand a question to read the answer. Something missing?{" "}
            <Link href="/contact" className="text-charcoal underline-offset-2 hover:underline">
              Contact us
            </Link>
            .
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection
        className="relative border-b border-light-grey bg-[linear-gradient(180deg,#fafafa_0%,#ffffff_45%)] pb-20 md:pb-28"
        delay={0.05}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `linear-gradient(rgba(43,43,41,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(43,43,41,0.04) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
          <FaqExperience
            groups={FAQ_GROUPS}
            extras={[
              { title: "Changing facilities", body: CHANGING_INFO },
              { title: "Health & declarations", body: HEALTH_BOOKING_NOTE },
            ]}
          />
        </div>
      </MotionSection>

      <PosterCtaBand delay={0.08}>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">Still unsure?</p>
          <div className="rule-section mx-auto my-5 max-w-xs md:mx-0" aria-hidden />
          <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
            Talk to the studio
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mid-grey md:text-[15px]">
            We&apos;re happy to help with bookings, memberships, or anything not covered above.
          </p>
        </div>
        <div className="rule-section shrink-0 md:hidden" aria-hidden />
        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:shrink-0">
          <Link
            href={BOOKING_HREF}
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0"
          >
            Book a class
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
          >
            Contact us
          </Link>
        </div>
      </PosterCtaBand>
    </>
  );
}
