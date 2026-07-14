"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { MotionSection } from "@/components/MotionSection";
import { CONTACT, MAP_EXTERNAL_URL, MAP_IFRAME_SRC } from "@/lib/constants";

export function HomeMapSection() {
  return (
    <MotionSection className="relative border-t border-light-grey bg-cream py-16 md:py-24">
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

        {/* Equal-width columns; square tiles so text panel matches map footprint */}
        <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:gap-10">
          <address className="not-italic">
            <motion.div
              className="flex aspect-[4/3] w-full flex-col justify-between border border-charcoal/10 bg-white p-6 md:p-8 lg:aspect-square lg:p-10"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex min-h-0 flex-1 flex-col justify-center gap-6">
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-charcoal/55" strokeWidth={1.5} aria-hidden />
                  <div className="space-y-3">
                    <p className="font-accent text-base font-medium leading-snug text-charcoal whitespace-pre-line">
                      {CONTACT.addressLine}
                    </p>
                    <p className="font-accent text-sm leading-relaxed text-mid-grey">{CONTACT.hours}</p>
                  </div>
                </div>
              </div>
              <Link
                href={MAP_EXTERNAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 pt-4 font-accent text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 transition-all duration-300 hover:translate-x-1 hover:underline lg:pt-6"
              >
                Open in Google Maps
              </Link>
            </motion.div>
          </address>

          <div className="relative aspect-[4/3] w-full overflow-hidden border border-charcoal/10 bg-light-grey/30 lg:aspect-square">
            <iframe
              title="Map of Reset Pilates Studio, Nailsea"
              src={MAP_IFRAME_SRC}
              className="absolute inset-0 h-full w-full border-0 grayscale contrast-[1.06] brightness-[1.02]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
