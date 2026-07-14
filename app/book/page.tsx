import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MotionSection } from "@/components/MotionSection";
import { BookingWidget } from "@/components/BookingWidget";
import { CONTACT } from "@/lib/constants";
import { hasMomenceScheduleEmbed } from "@/lib/booking-config";

/** Embed URL comes from env — evaluate on each request so toggling Momence doesn’t require a stale `/book` shell. */
export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Book a class | Reset Pilates Studio",
    description: "Reserve reformer and hot mat Pilates in Nailsea with Reset Pilates (Momence).",
    openGraph: {
      title: "Book a class | Reset Pilates Studio",
      description: "Schedule your next class at Reset Pilates, Nailsea.",
    },
  };
}

export default function BookPage() {
  if (!hasMomenceScheduleEmbed()) {
    redirect("/pricing#book");
  }

  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Book</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            Schedule your class
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            Choose a slot below. Prefer to browse pricing or membership first?{" "}
            <Link href="/pricing" className="font-medium text-charcoal underline underline-offset-4 hover:opacity-80">
              Pricing
            </Link>{" "}
            · Questions?{" "}
            <a
              href={`mailto:${CONTACT.email}`}
              className="font-medium text-charcoal underline underline-offset-4 hover:opacity-80"
            >
              {CONTACT.email}
            </a>
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="bg-cream pb-16 md:pb-24" delay={0.05}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <BookingWidget />
        </div>
      </MotionSection>
    </>
  );
}
