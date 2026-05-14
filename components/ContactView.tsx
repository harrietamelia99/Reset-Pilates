"use client";

import Link from "next/link";
import { Clock, Mail, MapPin } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { PosterCtaBand } from "@/components/PosterCtaBand";
import { ContactForm } from "@/components/ContactForm";
import { HomeMapSection } from "@/components/HomeMapSection";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BOOKING_HREF, CONTACT, MAP_EXTERNAL_URL } from "@/lib/constants";

export function ContactView() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Contact</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Get in touch
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            Questions about classes, founding memberships, or the studio before we open? Send a message
            below, email us directly, or say hello on Instagram.
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="relative bg-white pb-16 md:pb-24" delay={0.05}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] lg:items-stretch lg:gap-14">
            <PaperSheet flat pin={false} className="flex h-full min-h-0 flex-col p-6 md:p-8 lg:p-10">
              <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
                Send a message
              </h2>
              <p className="mt-3 max-w-md font-accent text-sm leading-relaxed text-mid-grey">
                We read every enquiry, you&apos;ll usually hear back within a few working days.
              </p>
              <div className="rule-section my-8 max-w-[10rem]" aria-hidden />
              <ContactForm balanceWithColumn className="min-h-0 flex-1" />
            </PaperSheet>

            <aside className="flex h-full min-h-0 flex-col gap-8">
              <div className="mt-8 shrink-0 md:mt-10 lg:mt-0">
                <ImagePlaceholder
                  aspect="4/3"
                  caption="Reception or entrance, wayfinding / studio arrival photo."
                />
              </div>

              <PaperSheet flat pin={false} className="flex flex-1 flex-col p-6 md:p-8 lg:p-10">
                <h2 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Studio</h2>
                <div className="rule-section my-6 max-w-[10rem]" aria-hidden />
                <div className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-charcoal/50" strokeWidth={1.5} aria-hidden />
                  <div className="space-y-2">
                    <p className="font-accent text-sm font-medium leading-snug text-charcoal whitespace-pre-line">
                      {CONTACT.addressLine}
                    </p>
                    <p className="font-accent text-xs leading-relaxed text-mid-grey">{CONTACT.locationNote}</p>
                  </div>
                </div>
                <div className="mt-6 flex gap-3 border-t border-charcoal/10 pt-6">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-charcoal/50" strokeWidth={1.5} aria-hidden />
                  <p className="font-accent text-sm leading-relaxed text-charcoal">{CONTACT.hours}</p>
                </div>
                <Link
                  href={MAP_EXTERNAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex font-accent text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 transition-all duration-300 hover:translate-x-0.5 hover:underline"
                >
                  Get directions
                </Link>

                <div className="mt-auto border-t border-charcoal/10 pt-10">
                  <h3 className="text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Direct</h3>
                  <div className="rule-section my-6 max-w-[10rem]" aria-hidden />
                  <ul className="space-y-5">
                    <li>
                      <a
                        href={`mailto:${CONTACT.email}`}
                        className="group inline-flex items-start gap-3 text-sm text-charcoal transition hover:opacity-80"
                      >
                        <Mail
                          className="mt-0.5 h-5 w-5 shrink-0 text-charcoal/50 transition group-hover:text-charcoal"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <span className="font-accent leading-snug underline-offset-4 group-hover:underline">
                          {CONTACT.email}
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href={CONTACT.instagram.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0 sm:w-auto sm:min-w-[12rem]"
                      >
                        <InstagramGlyph className="h-4 w-4 shrink-0 text-white" strokeWidth={1.5} />
                        {CONTACT.instagram.handle}
                      </a>
                    </li>
                  </ul>
                </div>
              </PaperSheet>
            </aside>
          </div>
        </div>
      </MotionSection>

      <PosterCtaBand delay={0.06} breathAfterStack>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">Visit</p>
          <div className="rule-section mx-auto my-5 max-w-xs md:mx-0" aria-hidden />
          <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
            Plan your visit
          </h2>
          <p className="mt-3 font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
            {CONTACT.locationNote}
          </p>
        </div>
        <div className="rule-section shrink-0 md:hidden" aria-hidden />
        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:shrink-0">
          <Link
            href={MAP_EXTERNAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0"
          >
            Get directions
          </Link>
          <Link
            href={BOOKING_HREF}
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
          >
            Book a class
          </Link>
        </div>
      </PosterCtaBand>

      <HomeMapSection />
    </>
  );
}
