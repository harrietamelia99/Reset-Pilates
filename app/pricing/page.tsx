import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { BOOKING_HREF } from "@/lib/constants";
import {
  INFRARED_BENEFITS,
  OFFERS_SUMMARY,
  PRICING_CLASS_PACKS,
  PRICING_CLASS_PACKS_NOTE,
  PRICING_DROP_INS,
  PRICING_FOUNDING,
  PRICING_HOT_MAT_PROMO_PACK,
  PRICING_INTRO,
  PRICING_MEMBERSHIPS,
  PRICING_MEMBERSHIPS_NOTE,
} from "@/lib/studio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing | Reset Pilates Studio",
    description:
      "Intro bundles, class packs, memberships, founding rates, and drop-ins — Reset Pilates, Nailsea. Opening June 2026.",
    openGraph: {
      title: "Pricing | Reset Pilates Studio",
      description: "Reformer, hot mat, and mat Pilates pricing at Reset Pilates.",
    },
  };
}

function BookLink({ className }: { className: string }) {
  if (BOOKING_HREF.startsWith("/")) {
    return (
      <Link href={BOOKING_HREF} className={className}>
        Book a class
      </Link>
    );
  }
  return (
    <a href={BOOKING_HREF} className={className}>
      Book a class
    </a>
  );
}

function PriceRow({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex flex-col gap-1 border-b border-charcoal/10 py-4 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <span className="font-accent text-sm leading-snug text-charcoal md:text-[15px]">{label}</span>
      <span className="shrink-0 font-sans text-base font-semibold tabular-nums text-charcoal md:text-lg">
        {price}
      </span>
    </div>
  );
}

export default function PricingPage() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Pricing</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Intro offers, packs &amp; memberships
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            {OFFERS_SUMMARY} All prices are correct as submitted for launch planning — final checkout lives in
            Momence when booking opens.
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="relative bg-white pb-10 md:pb-14" delay={0.05}>
        <div className="mx-auto max-w-6xl space-y-12 px-4 md:px-6">
          <PaperSheet flat className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Intro offers</h2>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <ul className="space-y-3 font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
              <li>{PRICING_INTRO.reformerOrHotMat}</li>
              <li>{PRICING_INTRO.matOnly}</li>
            </ul>
          </PaperSheet>

          <PaperSheet flat className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Class packs</h2>
            <p className="mt-3 font-accent text-xs uppercase leading-relaxed tracking-[0.12em] text-warm-grey">
              {PRICING_CLASS_PACKS_NOTE}
            </p>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <div>
              {PRICING_CLASS_PACKS.map((row) => (
                <PriceRow key={row.label} label={row.label} price={row.price} />
              ))}
            </div>
            <p className="mt-6 border-t border-charcoal/10 pt-6 font-accent text-sm leading-relaxed text-mid-grey">
              {PRICING_HOT_MAT_PROMO_PACK}
            </p>
          </PaperSheet>

          <PaperSheet flat className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Memberships</h2>
            <p className="mt-3 font-accent text-xs uppercase leading-relaxed tracking-[0.12em] text-warm-grey">
              {PRICING_MEMBERSHIPS_NOTE}
            </p>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <div>
              {PRICING_MEMBERSHIPS.map((row) => (
                <PriceRow key={row.label} label={row.label} price={row.price} />
              ))}
            </div>
          </PaperSheet>

          <PaperSheet flat className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
              {PRICING_FOUNDING.headline}
            </h2>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <ul className="space-y-4 font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
              <li>{PRICING_FOUNDING.reformer}</li>
              <li>{PRICING_FOUNDING.mat}</li>
            </ul>
          </PaperSheet>

          <PaperSheet flat className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Drop-in</h2>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <div>
              {PRICING_DROP_INS.map((row) => (
                <PriceRow key={row.label} label={row.label} price={row.price} />
              ))}
            </div>
          </PaperSheet>

          <PaperSheet flat className="p-6 md:p-8 lg:p-10">
            <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
              Why infrared hot mat
            </h2>
            <div className="rule-section my-5 max-w-[10rem]" aria-hidden />
            <ul className="list-inside list-disc space-y-3 font-accent text-sm leading-relaxed text-mid-grey marker:text-charcoal md:text-[15px]">
              {INFRARED_BENEFITS.map((t, i) => (
                <li key={i} className="pl-1">
                  {t}
                </li>
              ))}
            </ul>
          </PaperSheet>
        </div>
      </MotionSection>

      <MotionSection
        id="book"
        className="surface-editorial-dark relative overflow-hidden scroll-mt-28 py-14 md:py-20"
        delay={0.08}
      >
        <div className="grain-layer opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/60">Booking</p>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-heading text-white md:text-3xl">
            Book through Momence
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-accent text-sm leading-relaxed text-white/80 md:text-[15px]">
            We&apos;re finishing the live timetable in Momence. Use Book a class when your link is active — until
            then, intro and founding offers are summarised above and on the homepage.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <BookLink className="inline-flex min-h-[44px] items-center justify-center border border-white bg-white px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/90 hover:shadow-md active:translate-y-0" />
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center border border-white/40 bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 active:translate-y-0"
            >
              Contact the studio
            </Link>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
