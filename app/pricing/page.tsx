import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { MotionSection } from "@/components/MotionSection";
import { MotionStaggerGrid } from "@/components/MotionStaggerGrid";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { BOOKING_HREF } from "@/lib/constants";
import {
  INFRARED_BENEFITS,
  OFFERS_SUMMARY,
  PRICING_CLASS_PACKS,
  PRICING_CLASS_PACKS_NOTE,
  PRICING_DROP_INS,
  PRICING_FOUNDING,
  PRICING_HOT_MAT_PROMO_PACK,
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

const tierArticle =
  "flex h-full min-h-0 flex-col items-center border border-charcoal/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7";

const packArticle =
  "flex h-full flex-col border border-charcoal/10 bg-white p-5 text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-6";

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

function DarkBandBg() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <div className="absolute inset-0 bg-[#1f1f22]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#141416]/92 via-[#1e1e22]/88 to-[#141416]/92" />
        <div className="absolute inset-0 bg-[#0f0f10]/55" />
      </div>
      <div className="grain-layer z-[1] opacity-15" aria-hidden />
    </>
  );
}

function WhiteTierCard({
  eyebrow,
  price,
  priceSuffix,
  body,
  cta,
}: {
  eyebrow: string;
  price: string;
  priceSuffix?: string;
  body: string;
  cta: ReactNode;
}) {
  return (
    <article className={tierArticle}>
      <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-mid-grey">{eyebrow}</p>
      <p className="mt-5 font-sans text-2xl font-semibold tabular-nums tracking-tight text-charcoal md:text-3xl">
        {price}
        {priceSuffix ? (
          <span className="text-base font-medium text-mid-grey md:text-lg">{priceSuffix}</span>
        ) : null}
      </p>
      <p className="mt-3 flex-1 font-accent text-sm font-normal leading-relaxed text-mid-grey">{body}</p>
      <div className="mt-6 w-full shrink-0 md:mt-7">{cta}</div>
    </article>
  );
}

function splitMembershipLabel(label: string): { eyebrow: string; body: string } {
  const parts = label.split("\u2014").map((s) => s.trim());
  if (parts.length >= 2) {
    return { eyebrow: parts[0] ?? label, body: parts.slice(1).join(" \u2014 ") };
  }
  return { eyebrow: "Membership", body: label };
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
            {OFFERS_SUMMARY} Final checkout will be in Momence when booking opens.
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="border-b border-light-grey bg-white pb-10 md:pb-12" delay={0.03}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <ImagePlaceholder
            aspect="wide"
            caption="Campaign or lifestyle imagery — optional strip above tiers (replace when art-directed)."
          />
        </div>
      </MotionSection>

      <MotionSection
        className="surface-editorial-dark-deep relative overflow-hidden text-white"
        delay={0.05}
      >
        <DarkBandBg />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 text-center md:px-6 md:py-20 lg:py-20">
          <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/55">Intro bundles</p>
          <div className="mx-auto mt-4 h-px w-14 bg-white/30" aria-hidden />

          <h2 className="mt-5 text-3xl font-bold uppercase tracking-heading text-white md:text-4xl">
            Start with an intro pack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-accent text-[13px] font-normal leading-relaxed tracking-[0.02em] text-white/85 md:text-sm">
            Try three classes before you commit to a membership or class pack.
          </p>

          <MotionStaggerGrid className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:mt-10 sm:gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
            <WhiteTierCard
              eyebrow="Reformer or hot mat"
              price="£45"
              body="Three reformer or hot mat Pilates classes — ideal if you want to feel the kit and the heat."
              cta={
                <BookLink className="inline-flex w-full min-h-[44px] items-center justify-center bg-charcoal px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0" />
              }
            />
            <WhiteTierCard
              eyebrow="Mat"
              price="£30"
              body="Three mat-only classes — a gentle way into the studio."
              cta={
                <BookLink className="inline-flex w-full min-h-[44px] items-center justify-center border border-charcoal bg-white px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0" />
              }
            />
          </MotionStaggerGrid>

          <div className="mx-auto mt-12 max-w-3xl border-t border-white/[0.1] pt-8 text-center md:mt-14 md:pt-10">
            <p className="font-accent text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
              {PRICING_MEMBERSHIPS_NOTE} · {PRICING_FOUNDING.headline}
            </p>
          </div>

          <h2 className="mt-10 text-2xl font-bold uppercase tracking-heading text-white md:mt-12 md:text-3xl">
            Monthly memberships
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-accent text-[13px] leading-relaxed text-white/80 md:text-sm">
            Four or eight classes per month on reformer or mat — upgrade path as your practice grows.
          </p>

          <MotionStaggerGrid className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:gap-6">
            {PRICING_MEMBERSHIPS.map((row) => {
              const { eyebrow, body } = splitMembershipLabel(row.label);
              return (
                <WhiteTierCard
                  key={row.label}
                  eyebrow={eyebrow}
                  price={row.price}
                  body={body}
                  cta={
                    <BookLink className="inline-flex w-full min-h-[44px] items-center justify-center bg-charcoal px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0" />
                  }
                />
              );
            })}
          </MotionStaggerGrid>

          <h2 className="mt-14 text-2xl font-bold uppercase tracking-heading text-white md:mt-16 md:text-3xl">
            Founding memberships
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-accent text-[13px] leading-relaxed text-white/80 md:text-sm">
            First 30 members — preferential rate locked for your first 12 months. Same structure as on the home
            page.
          </p>

          <MotionStaggerGrid className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:mt-10 sm:gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
            <WhiteTierCard
              eyebrow="Founding · Reformer"
              price="£65"
              priceSuffix="/month"
              body="4 reformer sessions per month — founding cohort pricing."
              cta={
                <BookLink className="inline-flex w-full min-h-[44px] items-center justify-center bg-charcoal px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0" />
              }
            />
            <WhiteTierCard
              eyebrow="Founding · Mat"
              price="£35"
              priceSuffix="/month"
              body="4 mat sessions per month — founding cohort pricing."
              cta={
                <BookLink className="inline-flex w-full min-h-[44px] items-center justify-center border border-charcoal bg-white px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0" />
              }
            />
          </MotionStaggerGrid>

          <p className="mx-auto mt-10 max-w-3xl font-accent text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/45 md:mt-12">
            Founding cohort · 30 places · rate locked 12 months · closes at opening
          </p>
        </div>
      </MotionSection>

      <MotionSection className="relative grain-muted border-t border-light-grey py-16 md:py-24" delay={0.06}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Class packs</p>
            <h2 className="mt-3 text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">
              Bundles &amp; drop-in
            </h2>
            <p className="mt-3 font-accent text-xs uppercase leading-relaxed tracking-[0.12em] text-warm-grey">
              {PRICING_CLASS_PACKS_NOTE}
            </p>
          </div>
          <div className="rule-section mt-8 max-w-xs" aria-hidden />

          <MotionStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {PRICING_CLASS_PACKS.map((row) => (
              <article key={row.label} className={packArticle}>
                <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-warm-grey">Class pack</p>
                <p className="mt-2 font-sans text-lg font-semibold text-charcoal">{row.price}</p>
                <p className="mt-2 font-accent text-sm leading-relaxed text-mid-grey">{row.label}</p>
              </article>
            ))}
          </MotionStaggerGrid>

          <p className="mt-8 max-w-3xl border-t border-charcoal/10 pt-8 font-accent text-sm leading-relaxed text-mid-grey">
            {PRICING_HOT_MAT_PROMO_PACK}
          </p>

          <h3 className="mt-12 text-xs font-bold uppercase tracking-wide text-charcoal">Drop-in</h3>
          <div className="rule-section my-4 max-w-[8rem]" aria-hidden />
          <MotionStaggerGrid className="grid gap-4 sm:grid-cols-3 sm:gap-5">
            {PRICING_DROP_INS.map((row) => (
              <article key={row.label} className={packArticle}>
                <p className="font-accent text-[10px] uppercase tracking-[0.16em] text-warm-grey">{row.label}</p>
                <p className="mt-3 font-sans text-xl font-semibold tabular-nums text-charcoal">{row.price}</p>
                <p className="mt-2 font-accent text-xs text-mid-grey">Single class</p>
              </article>
            ))}
          </MotionStaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="relative border-t border-light-grey bg-white py-14 md:py-20" delay={0.08}>
        <div className="mx-auto max-w-3xl px-4 md:px-6">
          <h2 className="text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">
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
        </div>
      </MotionSection>

      <MotionSection
        id="book"
        className="surface-editorial-dark-deep relative overflow-hidden scroll-mt-28 text-white"
        delay={0.1}
      >
        <DarkBandBg />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-14 text-center md:px-6 md:py-20">
          <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/60">Booking</p>
          <h2 className="mt-4 text-2xl font-bold uppercase tracking-heading text-white md:text-3xl">
            Book through Momence
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-accent text-sm leading-relaxed text-white/80 md:text-[15px]">
            We&apos;re finishing the live timetable in Momence. Use Book a class when your link is active — until
            then, everything above is your reference for rates and bundles.
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
