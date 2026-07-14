import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LevelsVisualGrid } from "@/components/LevelsVisualGrid";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { PosterCtaBand } from "@/components/PosterCtaBand";
import { BOOKING_HREF } from "@/lib/constants";
import {
  GRIP_SOCKS_POLICY,
  HOT_MAT_CLASS,
  LEVELS_OFFERED,
  LEVELS_TILES,
  PARKING_INFO,
  REFORMER_CLASSES,
  TRANSPORT_INFO,
  WHAT_TO_BRING_HOT,
} from "@/lib/studio-content";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Classes | Reset Pilates Studio",
    description:
      "Renew and Rebuild reformer and Reignite hot mat Pilates in Nailsea, levels, what to bring, and practical info.",
    openGraph: {
      title: "Our Classes | Reset Pilates Studio",
      description:
        "Class types and levels at Reset Pilates, Crown Glass, Nailsea.",
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

export default function ClassesPage() {
  return (
    <>
      <MotionSection className="relative border-b border-light-grey bg-cream py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Classes</p>
          <h1 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl lg:text-[2.5rem]">
            What we teach
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-mid-grey md:text-base">
            Reformer and hot mat Pilates, dynamic, strength-informed movement for visible results. Timetables
            are live in Momence.
          </p>
          <div className="rule-section mt-10 max-w-xs" aria-hidden />
        </div>
      </MotionSection>

      <MotionSection className="relative bg-cream pb-6 md:pb-10" delay={0.05}>
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <PaperSheet flat pin={false} className="p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wide text-charcoal">Levels</h2>
            <div className="rule-section my-4 max-w-[8rem]" aria-hidden />
            <p className="sr-only">{LEVELS_OFFERED}</p>
            <LevelsVisualGrid tiles={LEVELS_TILES} />
          </PaperSheet>
        </div>
      </MotionSection>

      <MotionSection className="relative bg-cream pb-16 md:pb-20" delay={0.06}>
        <div className="mx-auto max-w-6xl space-y-10 px-4 md:px-6">
          <h2 className="text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">Reformer</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-light-grey bg-light-grey/20">
              <Image
                src="/images/classes-renew-reformer.png"
                alt="A woman on a Pilates reformer, legs in straps, in a bright studio."
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 576px"
              />
            </div>
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-light-grey bg-light-grey/20">
              <Image
                src="/images/classes-rebuild-reformer.png"
                alt="A woman kneeling on a Pilates reformer, pulling straps overhead, in a bright studio."
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 576px"
              />
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {REFORMER_CLASSES.map((c) => (
              <PaperSheet key={c.name} flat pin={false} className="p-6 md:p-8">
                <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-warm-grey">{c.level}</p>
                <h3 className="mt-2 text-xl font-bold uppercase tracking-heading text-charcoal">{c.name}</h3>
                <div className="rule-section my-4 max-w-[10rem]" aria-hidden />
                <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{c.body}</p>
              </PaperSheet>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-bold uppercase tracking-heading text-charcoal md:text-3xl">Hot mat</h2>
            <div className="mt-6">
              <div className="relative aspect-[4/3] w-full max-w-2xl overflow-hidden border border-light-grey bg-light-grey/20">
                <Image
                  src="/images/classes-hot-mat.png"
                  alt="A woman in black athletic wear performing a Pilates mat exercise with a silver ball under her back, one leg extended vertically, in a sunlit studio with a large mirror."
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 1152px) 50vw, 576px"
                />
              </div>
            </div>
            <PaperSheet flat pin={false} className="mt-6 max-w-2xl p-6 md:p-8">
              <h3 className="text-xl font-bold uppercase tracking-heading text-charcoal">{HOT_MAT_CLASS.name}</h3>
              <div className="rule-section my-4 max-w-[10rem]" aria-hidden />
              <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{HOT_MAT_CLASS.body}</p>
            </PaperSheet>
          </div>

          <PaperSheet flat pin={false} className="p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wide text-charcoal">What to bring</h2>
            <div className="rule-section my-4 max-w-[8rem]" aria-hidden />
            <p className="font-accent text-sm font-medium text-charcoal">Hot Pilates</p>
            <p className="mt-2 font-accent text-sm leading-relaxed text-mid-grey">{WHAT_TO_BRING_HOT}</p>
            <p className="mt-6 font-accent text-sm leading-relaxed text-mid-grey">{GRIP_SOCKS_POLICY}</p>
          </PaperSheet>

          <PaperSheet flat pin={false} className="p-6 md:p-8">
            <h2 className="text-xs font-bold uppercase tracking-wide text-charcoal">Parking &amp; buses</h2>
            <div className="rule-section my-4 max-w-[8rem]" aria-hidden />
            <p className="font-accent text-sm leading-relaxed text-mid-grey">{PARKING_INFO}</p>
            <p className="mt-4 font-accent text-sm leading-relaxed text-mid-grey">{TRANSPORT_INFO}</p>
            <p className="mt-6">
              <Link href="/faq" className="text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 hover:underline">
                More in FAQs
              </Link>
            </p>
          </PaperSheet>
        </div>
      </MotionSection>

      <PosterCtaBand delay={0.07}>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">Classes</p>
          <div className="rule-section mx-auto my-5 max-w-xs md:mx-0" aria-hidden />
          <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
            Book your next class
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-mid-grey md:text-[15px]">
            Memberships and class packs are on our pricing page. Use Book a class to reserve your spot.
          </p>
        </div>
        <div className="rule-section shrink-0 md:hidden" aria-hidden />
        <div className="flex w-full min-w-0 flex-col gap-3 sm:flex-row sm:items-center md:w-auto md:shrink-0">
          <BookLink className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0" />
          <Link
            href="/pricing"
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-transparent px-6 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
          >
            View pricing
          </Link>
        </div>
      </PosterCtaBand>
    </>
  );
}
