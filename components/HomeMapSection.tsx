"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { CONTACT, MAP_EXTERNAL_URL, MAP_IFRAME_SRC } from "@/lib/constants";

export function HomeMapSection() {
  return (
    <MotionSection className="relative border-t border-light-grey bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Visit us</p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
            Find us in Nailsea
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mid-grey md:text-base">
            {CONTACT.locationNote}
          </p>
        </div>
        <div className="rule-section mt-10 max-w-xs" aria-hidden />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-stretch lg:gap-14">
          <address className="not-italic lg:pt-1">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-charcoal/55" strokeWidth={1.5} aria-hidden />
              <div className="space-y-3">
                <p className="font-sans text-base font-medium leading-snug text-charcoal">{CONTACT.addressLine}</p>
                <p className="font-accent text-sm text-mid-grey">{CONTACT.hours}</p>
                <Link
                  href={MAP_EXTERNAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 transition hover:underline"
                >
                  Open in Google Maps
                </Link>
              </div>
            </div>
          </address>

          <div className="relative min-h-[260px] w-full overflow-hidden border border-charcoal/10 bg-light-grey/25 md:min-h-[300px] lg:min-h-[320px]">
            <iframe
              title="Map of Reset Pilates Studio, Nailsea"
              src={MAP_IFRAME_SRC}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
