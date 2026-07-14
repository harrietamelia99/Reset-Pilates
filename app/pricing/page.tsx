import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { EditorialVideoBackdrop } from "@/components/EditorialVideoBackdrop";
import { MotionSection } from "@/components/MotionSection";
import { MotionStaggerGrid } from "@/components/MotionStaggerGrid";
import { PosterCtaBand } from "@/components/PosterCtaBand";
import { BOOKING_HREF } from "@/lib/constants";
import {
  INFRARED_BENEFITS,
  OFFERS_SUMMARY,
  PRICING_CLASS_PACKS,
  PRICING_CLASS_PACKS_NOTE,
  PRICING_MEMBERSHIPS,
  PRICING_MEMBERSHIPS_NOTE,
} from "@/lib/studio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Pricing | Reset Pilates Studio",
    description:
      "Reformer and hot mat memberships and class packs at Reset Pilates, Nailsea.",
    openGraph: {
      title: "Pricing | Reset Pilates Studio",
      description: "Reformer and hot mat Pilates pricing at Reset Pilates.",
    },
  };
}

const tierArticle =
  "flex h-full min-h-0 flex-col items-center border border-charcoal/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7";

const packCardBase =
  "group relative flex h-full flex-col overflow-hidden rounded-sm border border-charcoal/[0.11] bg-white p-6 text-left shadow-[0_14px_42px_-28px_rgba(43,43,41,0.35)] ring-1 ring-black/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-charcoal/18 hover:shadow-[0_22px_50px_-22px_rgba(43,43,41,0.28)] md:p-7";

function ClassPackCard({ row }: { row: (typeof PRICING_CLASS_PACKS)[number] }) {
  return (
    <article className={packCardBase}>
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-charcoal/35 to-transparent"
        aria-hidden
      />
      <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-warm-grey">Class pack</p>
      <p className="mt-5 font-sans text-3xl font-semibold tabular-nums tracking-tight text-charcoal md:text-4xl">
        {row.price}
      </p>
      <div className="rule-section my-5 max-w-[2.75rem] opacity-70" aria-hidden />
      <p className="flex-1 font-accent text-sm font-normal leading-relaxed text-mid-grey md:text-[15px]">{row.label}</p>
    </article>
  );
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

function DarkBandBg() {
  return (
    <>
      <EditorialVideoBackdrop variant="deep" preload="metadata" />
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
  const sep = ", ";
  const idx = label.indexOf(sep);
  if (idx === -1) {
    return { eyebrow: "Membership", body: label };
  }
  return {
    eyebrow: label.slice(0, idx).trim(),
    body: label.slice(idx + sep.length).trim(),
  };
}

export default function PricingPage() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Pricing</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Memberships &amp; class packs
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            {OFFERS_SUMMARY} Book and manage sessions in Momence.
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection
        className="surface-editorial-dark-deep relative overflow-hidden text-white"
        delay={0.05}
      >
        <DarkBandBg />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 text-center md:px-6 md:py-20 lg:py-20">
          <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/55">Memberships</p>
          <div className="mx-auto mt-4 h-px w-14 bg-white/30" aria-hidden />

          <h2 className="mt-5 text-3xl font-bold uppercase tracking-heading text-white md:text-4xl">
            Monthly memberships
          </h2>
          <p className="mx-auto mt-4 max-w-2xl font-accent text-[13px] font-normal leading-relaxed tracking-[0.02em] text-white/85 md:text-sm">
            Reformer, hot mat, and combined tiers. {PRICING_MEMBERSHIPS_NOTE}
          </p>

          <MotionStaggerGrid className="mx-auto mt-8 grid w-full max-w-5xl gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {PRICING_MEMBERSHIPS.map((row) => {
              const { eyebrow, body } = splitMembershipLabel(row.label);
              return (
                <WhiteTierCard
                  key={row.label}
                  eyebrow={eyebrow}
                  price={row.price}
                  priceSuffix="/month"
                  body={body}
                  cta={
                    <BookLink className="inline-flex w-full min-h-[44px] items-center justify-center bg-charcoal px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0" />
                  }
                />
              );
            })}
          </MotionStaggerGrid>
        </div>
      </MotionSection>

      <MotionSection className="relative grain-muted border-t border-light-grey py-16 md:py-24" delay={0.06}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="max-w-3xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Class packs</p>
            <h2 className="mt-3 text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">
              Bundles
            </h2>
            <p className="mt-3 font-accent text-xs uppercase leading-relaxed tracking-[0.12em] text-warm-grey">
              {PRICING_CLASS_PACKS_NOTE}
            </p>
          </div>
          <div className="rule-section mt-8 max-w-xs" aria-hidden />

          <MotionStaggerGrid className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {PRICING_CLASS_PACKS.map((row) => (
              <ClassPackCard key={row.label} row={row} />
            ))}
          </MotionStaggerGrid>

          <div className="mt-12 flex flex-col items-stretch gap-3 border-t border-charcoal/10 pt-10 sm:flex-row sm:items-center sm:justify-center sm:gap-4 md:mt-14">
            <BookLink className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0" />
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center justify-center border border-charcoal/20 bg-transparent px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:border-charcoal/40 hover:bg-charcoal/[0.04] active:translate-y-0"
            >
              Ask about packs
            </Link>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="relative border-t border-light-grey bg-cream py-14 md:py-20" delay={0.08}>
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

      <PosterCtaBand id="book" className="scroll-mt-28" delay={0.1}>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">Booking</p>
          <div className="rule-section mx-auto my-5 max-w-xs md:mx-0" aria-hidden />
          <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
            Book through Momence
          </h2>
          <p className="mt-3 font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
            Reserve reformer and hot mat sessions on our live timetable.
          </p>
        </div>
        <div className="rule-section shrink-0 md:hidden" aria-hidden />
        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:shrink-0">
          <BookLink className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0" />
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
          >
            Contact the studio
          </Link>
        </div>
      </PosterCtaBand>
    </>
  );
}
