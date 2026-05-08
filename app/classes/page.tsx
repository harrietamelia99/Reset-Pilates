import type { Metadata } from "next";
import Link from "next/link";
import { ClassDetailCard } from "@/components/ClassCard";
import { MotionSection } from "@/components/MotionSection";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { BOOKING_HREF } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Classes | Reformer, Hot Mat & Mat Pilates | Reset Pilates Studio",
    description:
      "Reformer, hot mat and mat Pilates in Nailsea — class levels, what to expect, and how to book.",
    openGraph: {
      title: "Our Classes | Reset Pilates Studio",
      description: "Reformer, hot mat and mat Pilates — designed to make you feel the difference.",
    },
  };
}

export default function ClassesPage() {
  return (
    <div className="page-bg">
      <header className="page-hero">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Nailsea · North Somerset
            </p>
            <div className="rule-section my-5 max-w-xs" aria-hidden />
            <h1 className="text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
              Our Classes
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-mid-grey md:text-[17px]">
              Dynamic Pilates designed to make you feel the difference.
            </p>
          </div>
        </div>
      </header>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border-b border-charcoal pb-4">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Reformer</p>
          <h2 className="mt-3 text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
            Reformer Pilates
          </h2>
        </div>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <ClassDetailCard
            title="RENEW — Beginner Reformer"
            level="Beginner"
            description="Our beginner-friendly reformer class, designed to introduce you to the foundations of Pilates. You'll learn correct alignment, breathing and essential movements at a slower pace — with clear support and guidance. Perfect for first-timers or those returning after a break."
          />
          <ClassDetailCard
            title="REBUILD — Intermediate Reformer"
            level="Intermediate"
            description="Our intermediate reformer class focused on strengthening, control and progression. You'll move through more dynamic sequences designed to challenge stability, coordination and endurance. Expect stronger flows, increased resistance and purposeful movement."
          />
        </div>
      </MotionSection>

      <MotionSection className="border-y border-light-grey bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="border-b border-charcoal pb-4">
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Hot Mat</p>
            <h2 className="mt-3 text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">
              Hot Mat Pilates
            </h2>
          </div>
          <div className="mt-10 grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ClassDetailCard
                title="REIGNITE — Hot Mat Pilates"
                level="All levels"
                description="A dynamic, full-body Pilates flow set in gentle infrared heat. The warmth elevates your workout — helping muscles warm up faster and work more deeply. You'll move through a continuous sequence using light weights and accessories, with a strong focus on core connection and controlled, intentional movement."
              />
            </div>
            <aside className="border border-light-grey bg-white p-8">
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Benefits</p>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-mid-grey">
                <li>
                  Infrared heat challenges your body to engage deeper — expect to sweat more and feel
                  results sooner.
                </li>
                <li>
                  The warmth helps relax tight muscles, ease stiffness and support faster recovery by
                  reducing inflammation.
                </li>
                <li>
                  As circulation increases, wider benefits follow — supporting cardiovascular health and
                  collagen reproduction.
                </li>
                <li>The heat has a calming effect on the mind, stimulating serotonin release to lift mood and reduce stress.</li>
                <li className="pt-2 font-semibold text-charcoal">A total body reset.</li>
              </ul>
            </aside>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6">
        <div className="border-b border-charcoal pb-4">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Mat</p>
          <h2 className="mt-3 text-xl font-bold uppercase tracking-heading text-charcoal md:text-2xl">Mat Pilates</h2>
        </div>
        <div className="mt-8 flex flex-col items-center border border-dashed border-light-grey bg-white p-8 text-center md:p-10">
          <PlaceholderImage
            aspect="video"
            className="mb-8 w-full max-w-xl border-charcoal/10 bg-light-grey/50"
            caption="[ Class photography coming soon ]"
          />
          <p className="text-mid-grey">
            Mat Pilates classes coming soon — we&apos;ll update this page closer to launch.
          </p>
        </div>
      </MotionSection>

      <MotionSection className="border-t border-light-grey bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 md:grid-cols-2 md:px-6 md:gap-x-16">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              What to bring
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-mid-grey">
              <li>All classes: Comfortable activewear, grip socks (mandatory), water bottle</li>
              <li>Hot Mat: Add a grip towel</li>
              <li>All mats and equipment provided by the studio</li>
              <li>Grip socks available to purchase in-studio if you forget</li>
            </ul>
          </div>
          <div className="rule-section md:hidden" aria-hidden />
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              First time?
            </p>
            <p className="mt-6 text-sm leading-relaxed text-mid-grey">
              If it&apos;s your first time on the reformer, let your instructor know before the session.
              They&apos;ll walk you through the equipment, guide you through each exercise and offer
              hands-on support. Doors lock once the session begins — please arrive 10 minutes early and
              wait outside.
            </p>
            {BOOKING_HREF.startsWith("/") ? (
              <Link
                href={BOOKING_HREF}
                className="mt-8 inline-flex items-center justify-center border border-charcoal bg-charcoal px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90"
              >
                Book a class
              </Link>
            ) : (
              <a
                href={BOOKING_HREF}
                className="mt-8 inline-flex items-center justify-center border border-charcoal bg-charcoal px-6 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90"
              >
                Book a class
              </a>
            )}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
