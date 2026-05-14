import type { Metadata } from "next";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { PosterCtaBand } from "@/components/PosterCtaBand";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BOOKING_HREF } from "@/lib/constants";
import {
  ABOUT_STORY_PARAGRAPHS,
  FOUNDER_NAME,
  IDEAL_CLIENT,
  STUDIO_DIFFERENTIATOR,
  STUDIO_ETHOS_WELCOME,
} from "@/lib/studio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About | Reset Pilates Studio",
    description: `Meet ${FOUNDER_NAME}, founder of Reset Pilates in Nailsea, reformer, hot mat & mat Pilates opening June 2026.`,
    openGraph: {
      title: "About | Reset Pilates Studio",
      description:
        "The story behind Reset, boutique Pilates in Crown Glass, Nailsea, North Somerset.",
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

export default function AboutPage() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-white py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">About</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Who we are
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            Reset. is a Nailsea studio for reformer, hot mat, and mat Pilates, opening June 2026.
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="relative bg-white pb-16 md:pb-20" delay={0.05}>
        <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-12 md:items-start md:gap-10 md:px-6 lg:gap-12">
          <div className="mt-8 md:col-span-5 md:mt-10 lg:col-span-4 lg:mt-12">
            <ImagePlaceholder
              aspect="3/4"
              caption="Founder portrait or studio photography, replace when assets are ready."
            />
          </div>
          <div className="md:col-span-7 lg:col-span-8">
            <PaperSheet flat pin={false} className="h-full w-full p-6 md:p-8 lg:p-10">
              <div className="space-y-6 text-center md:text-left">
                {ABOUT_STORY_PARAGRAPHS.map((p, i) => (
                  <p
                    key={i}
                    className="font-accent text-[15px] leading-relaxed tracking-[0.02em] text-charcoal md:text-base"
                  >
                    {p}
                  </p>
                ))}
              </div>
              <div className="rule-section my-10 max-w-[12rem] md:mx-0" aria-hidden />
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookLink className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0" />
                <Link
                  href="/classes"
                  className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-transparent px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
                >
                  View classes
                </Link>
              </div>
            </PaperSheet>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative border-t border-light-grey bg-white py-14 md:py-20" delay={0.08}>
        <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-2 md:gap-12 md:px-6">
          <PaperSheet flat pin={false} className="p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wide text-charcoal">Who Reset is for</h2>
            <div className="rule-section my-4 max-w-[8rem]" aria-hidden />
            <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{IDEAL_CLIENT}</p>
          </PaperSheet>
          <PaperSheet flat pin={false} className="p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wide text-charcoal">How we&apos;re different</h2>
            <div className="rule-section my-4 max-w-[8rem]" aria-hidden />
            <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
              {STUDIO_DIFFERENTIATOR}
            </p>
          </PaperSheet>
        </div>
      </MotionSection>

      <PosterCtaBand
        delay={0.1}
        breathAfterStack
        sheetClassName="flex-col items-center justify-center py-12 text-center md:flex-col md:py-14"
      >
        <div className="mx-auto max-w-3xl">
          <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-mid-grey">Ethos</p>
          <div className="rule-section mx-auto my-5 max-w-xs" aria-hidden />
          <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-base">
            {STUDIO_ETHOS_WELCOME}
          </p>
        </div>
      </PosterCtaBand>
    </>
  );
}
