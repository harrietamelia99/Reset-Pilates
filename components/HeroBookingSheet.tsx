"use client";

import Link from "next/link";
import { CalendarDays, LayoutList } from "lucide-react";
import { BOOKING_HREF } from "@/lib/constants";
import { cn } from "@/lib/cn";
import { PaperSheet } from "@/components/PaperSheet";

type Props = {
  /** Passed through to the underlying `PaperSheet` (padding overrides, etc.) */
  className?: string;
};

/**
 * Pre-launch flyer card for the home hero — announcement, location, headline,
 * class types, opening line, booking CTAs, and Momence note (matches studio poster layout).
 */
export function HeroBookingSheet({ className }: Props) {
  return (
    <PaperSheet
      poster
      className={cn(
        "px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-7 lg:px-11 lg:py-8",
        className
      )}
    >
      <p className="text-center font-accent text-[9px] uppercase tracking-[0.2em] text-charcoal md:text-[10px]">
        Pre-launch announcement
      </p>

      <div className="rule-section my-2.5 md:my-4" />

      <p className="text-center font-sans text-[10px] uppercase tracking-[0.28em] text-charcoal md:text-[11px]">
        Nailsea · North Somerset
      </p>

      <h1 className="mt-3 text-center text-2xl font-bold uppercase leading-[1.05] tracking-heading text-charcoal sm:text-3xl md:mt-6 md:text-4xl md:leading-[1] lg:mt-8 lg:text-[2.85rem]">
        <span className="block">Your new</span>
        <span className="block">
          <span className="relative mx-auto inline-block">
            Reset ritual
            <span className="absolute bottom-[0.08em] left-full ml-[0.06em] inline-block leading-none">
              .
            </span>
          </span>
        </span>
      </h1>

      <div className="rule-section my-3 md:my-5 lg:my-6" />

      <p className="text-center font-accent text-[13px] uppercase leading-snug tracking-[0.06em] text-charcoal md:text-sm">
        Reformer, hot mat &amp; mat Pilates.
      </p>

      <p className="mt-2.5 text-center font-accent text-[9px] uppercase tracking-[0.18em] text-charcoal md:mt-3 md:text-[10px]">
        Opening 1st June 2026 — founding memberships now available
      </p>

      <div className="rule-section my-4 md:my-6 lg:my-7" />

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        {BOOKING_HREF.startsWith("/") ? (
          <Link
            href={BOOKING_HREF}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0"
          >
            <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
            Book a class
          </Link>
        ) : (
          <a
            href={BOOKING_HREF}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0"
          >
            <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
            Book a class
          </a>
        )}
        <Link
          href="/classes"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal/40 bg-white px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-charcoal/65 hover:bg-light-grey hover:shadow-md active:translate-y-0"
        >
          <LayoutList className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
          View classes
        </Link>
      </div>

      <div className="mt-4 border-t border-charcoal pt-3 md:mt-6 md:pt-5">
        <p className="font-accent text-[8px] uppercase leading-relaxed tracking-[0.14em] text-charcoal md:text-[9px]">
          Booking via Momence — link updates before launch.
        </p>
      </div>
    </PaperSheet>
  );
}
