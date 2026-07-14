"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, CalendarDays, Home } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { PosterCtaBand } from "@/components/PosterCtaBand";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { BOOKING_HREF, CONTACT } from "@/lib/constants";
import { cn } from "@/lib/cn";

export type ComingSoonProps = {
  /** Matches nav label, shown in the flyer eyebrow */
  label: string;
  /** Main headline inside the poster card */
  headline: string;
  /** Supporting paragraph (sentence case is fine; rendered centered) */
  description: string;
};

function BookOrPricingLink({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  if (BOOKING_HREF.startsWith("/")) {
    return (
      <Link href={BOOKING_HREF} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={BOOKING_HREF} className={className}>
      {children}
    </a>
  );
}

export function ComingSoon({ label, headline, description }: ComingSoonProps) {
  return (
    <>
      <MotionSection className="surface-editorial-dark relative overflow-hidden border-b border-white/10 py-14 md:py-20 lg:py-24">
        <div className="grain-layer opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="mx-auto w-full max-w-[min(42rem,100%)]">
            <PaperSheet
              poster
              pin={false}
              className="px-5 py-6 sm:px-8 sm:py-8 md:px-10 md:py-10 lg:px-11 lg:py-11"
            >
              <p className="text-center font-accent text-[9px] uppercase tracking-[0.2em] text-charcoal md:text-[10px]">
                {label}
              </p>

              <div className="rule-section my-2.5 md:my-4" />

              <p className="text-center font-sans text-[10px] uppercase tracking-[0.28em] text-charcoal md:text-[11px]">
                Nailsea · North Somerset
              </p>

              <h1 className="mt-4 text-center text-2xl font-bold uppercase leading-[1.05] tracking-heading text-charcoal sm:text-3xl md:mt-6 md:text-4xl md:leading-[1] lg:text-[2.5rem]">
                {headline}
              </h1>

              <div className="rule-section my-4 md:my-5" />

              <p className="text-center font-accent text-sm leading-relaxed tracking-[0.02em] text-charcoal md:text-[15px]">
                {description}
              </p>

              <div className="rule-section my-5 md:my-6" />

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                <Link
                  href="/"
                  className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0"
                >
                  <Home className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                  Back to home
                </Link>
                <BookOrPricingLink
                  className={cn(
                    "inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-white px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
                  )}
                >
                  <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                  Booking &amp; pricing
                </BookOrPricingLink>
              </div>

              <p className="mt-5 text-center font-accent text-[9px] uppercase tracking-[0.16em] text-charcoal/80 md:text-[10px]">
                Booking via Momence.
              </p>
            </PaperSheet>
          </div>
        </div>
      </MotionSection>

      <PosterCtaBand delay={0.06}>
            <div className="min-w-0 flex-1 text-center md:text-left">
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">Stay in the loop</p>
              <div className="rule-section mx-auto my-5 max-w-xs md:mx-0" aria-hidden />
              <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
                More on the home page
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-mid-grey md:text-[15px]">
                Memberships, class packs, studio imagery, and email signup all live on the
                homepage while we finish this section.
              </p>
            </div>
            <div className="rule-section shrink-0 md:hidden" aria-hidden />
            <div className="flex w-full min-w-0 flex-col flex-wrap gap-3 sm:flex-row sm:items-center md:w-auto md:justify-end">
              <Link
                href="/"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0 sm:min-w-[11rem]"
              >
                Home
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              </Link>
              <a
                href={CONTACT.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0 sm:min-w-[11rem]"
              >
                <InstagramGlyph className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                {CONTACT.instagram.handle}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0 sm:min-w-[11rem]"
              >
                Email the studio
              </a>
            </div>
      </PosterCtaBand>

      <PosterCtaBand delay={0.1} sheetClassName="gap-6 px-6 py-8 md:flex-row md:items-center md:gap-8 md:px-10 md:py-10">
            <div className="min-w-0 flex-1 text-center md:text-left">
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">{label}</p>
              <div className="rule-section mx-auto my-4 max-w-xs md:mx-0" aria-hidden />
              <p className="text-sm leading-relaxed text-mid-grey">
                This page is being updated. In the meantime, explore the rest of the site.
              </p>
            </div>
            <div className="rule-section shrink-0 md:hidden" aria-hidden />
            <Link
              href="/"
              className="inline-flex shrink-0 items-center justify-center gap-2 border border-charcoal bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0 md:self-center"
            >
              <Home className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Return home
            </Link>
      </PosterCtaBand>
    </>
  );
}
