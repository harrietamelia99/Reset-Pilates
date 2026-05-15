import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Tag } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { HomeHero } from "@/components/HomeHero";
import { WhyResetGrid } from "@/components/WhyResetGrid";
import { MotionSection } from "@/components/MotionSection";
import { MotionStaggerGrid } from "@/components/MotionStaggerGrid";
import { ClassCard } from "@/components/ClassCard";
import { PaperSheet } from "@/components/PaperSheet";
import { HomeMapSection } from "@/components/HomeMapSection";
import { HomeInstagramSection } from "@/components/HomeInstagramSection";
import { HomeEmailAlertsSection } from "@/components/HomeEmailAlertsSection";
import { EditorialVideoBackdrop } from "@/components/EditorialVideoBackdrop";
import { PosterCtaBand } from "@/components/PosterCtaBand";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
    description:
      "Premium boutique Pilates in Nailsea. Reformer, hot mat and mat classes, opening June 2026. Founding memberships available.",
    openGraph: {
      title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
      description:
        "Premium boutique Pilates in Nailsea. Founding memberships available.",
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <MotionSection className="surface-editorial-dark relative overflow-hidden border-t border-white/10 py-16 md:py-24">
        <EditorialVideoBackdrop variant="mid" preload="metadata" />
        <div className="grain-layer z-[1] opacity-20" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
          <PaperSheet flat className="mx-auto overflow-hidden p-0">
            <MotionStaggerGrid
              soft
              className="grid w-full max-w-5xl overflow-hidden p-0 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-stretch"
            >
            <figure className="group relative aspect-[5/3] w-full min-h-[200px] overflow-hidden md:aspect-auto md:min-h-[280px] md:h-full md:self-stretch">
              <Image
                src="/images/reset-studio-sign.png"
                alt="Reset Pilates Studio exterior sign, Pilates Studio, Est. 2026"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </figure>
            <div className="flex flex-col justify-center gap-6 border-t border-charcoal/10 px-8 py-10 md:border-l md:border-t-0 md:px-12 md:py-12 lg:px-14 lg:py-14">
              <header className="space-y-4">
                <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
                  Intro offer
                </p>
                <div className="rule-section max-w-[12rem]" aria-hidden />
                <h2 className="text-[clamp(1.375rem,3.5vw,1.875rem)] font-bold uppercase leading-snug tracking-heading text-editorial-ink">
                  <span className="inline-block sm:inline">New to</span>{" "}
                  <span className="inline-block sm:inline">Reset?</span>
                </h2>
              </header>
              <div className="space-y-4 text-mid-grey">
                <p className="max-w-md text-[15px] leading-relaxed">
                  Start with a three-class bundle, £45 for reformer or hot mat, or £30 for mat-only, so you can feel the space before you commit.
                </p>
              </div>
              <Link
                href="/pricing"
                className="inline-flex w-full items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0 sm:w-auto sm:self-start"
              >
                <Tag className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                View intro bundles
              </Link>
            </div>
            </MotionStaggerGrid>
          </PaperSheet>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-28">
        <div className="max-w-3xl">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
            What we offer
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
            Movement that meets you where you are.
          </h2>
        </div>
        <div className="rule-section mt-10 w-full" aria-hidden />
        <MotionStaggerGrid className="mt-12 grid gap-8 md:grid-cols-3">
          <ClassCard
            title="Reformer Pilates"
            description="Dynamic movement on the reformer machine. Strength, control and flow."
            imageSrc="/images/reformer-pilates.png"
            imageAlt="Reformer Pilates, kneeling exercise with straps on the Merrithew reformer"
          />
          <ClassCard
            title="Hot Mat Pilates"
            description="Infrared-heated Pilates designed to deepen your practice and elevate results."
            imageSrc="/images/hot-mat-pilates.png"
            imageAlt="Hot Mat Pilates, side plank with lifted knee on a studio mat"
          />
          <ClassCard
            title="Mat Pilates"
            description="Foundation-led mat classes for all levels. Available pending final scheduling."
            imageSrc="/images/mat-pilates.png"
            imageAlt="Mat Pilates class, tabletop leg extension on a studio mat"
          />
        </MotionStaggerGrid>
      </MotionSection>

      <MotionSection className="surface-editorial-dark-deep relative overflow-hidden text-white">
        <EditorialVideoBackdrop variant="deep" preload="auto" />
        <div className="grain-layer z-[1] opacity-15" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 text-center md:px-6 md:py-18 lg:py-20">
          <p className="font-accent text-[10px] uppercase tracking-[0.2em] text-white/55">
            Pre-launch · Limited
          </p>
          <div className="mx-auto mt-4 h-px w-14 bg-white/30" aria-hidden />

          <h2 className="mt-5 text-3xl font-bold uppercase tracking-heading text-white md:text-4xl">
            Become a founding member.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-accent text-[13px] font-normal leading-relaxed tracking-[0.02em] text-white/85 md:text-sm">
            Be among the first 30 members and lock in a preferential rate for your first 12 months, this
            invitation closes once we open.
          </p>

          <div className="mt-10 border-t border-white/[0.1] pt-6 md:mt-12 md:pt-8">
            <p className="mx-auto max-w-3xl font-accent text-[10px] uppercase leading-relaxed tracking-[0.16em] text-white/45">
              Founding cohort · 30 places · rate locked 12 months · closes at opening
            </p>
          </div>

          <MotionStaggerGrid className="mx-auto mt-8 grid w-full max-w-4xl gap-4 sm:mt-10 sm:gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-6">
            <article className="flex flex-col items-center border border-charcoal/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7">
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-mid-grey">Reformer</p>
              <p className="mt-5 font-sans text-2xl font-semibold tabular-nums tracking-tight text-charcoal md:text-3xl">
                £65
                <span className="text-base font-medium text-mid-grey md:text-lg">/month</span>
              </p>
              <p className="mt-3 font-accent text-sm font-normal leading-relaxed text-mid-grey">
                4 classes per month
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex w-full min-h-[44px] items-center justify-center bg-charcoal px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0 md:mt-7"
              >
                Secure your spot
              </Link>
            </article>

            <article className="flex flex-col items-center border border-charcoal/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md md:p-7">
              <p className="font-accent text-[10px] uppercase tracking-[0.18em] text-mid-grey">Mat</p>
              <p className="mt-5 font-sans text-2xl font-semibold tabular-nums tracking-tight text-charcoal md:text-3xl">
                £35
                <span className="text-base font-medium text-mid-grey md:text-lg">/month</span>
              </p>
              <p className="mt-3 font-accent text-sm font-normal leading-relaxed text-mid-grey">
                4 classes per month
              </p>
              <Link
                href="/pricing"
                className="mt-6 inline-flex w-full min-h-[44px] items-center justify-center border border-charcoal bg-white px-5 py-3 text-center font-accent text-[11px] font-medium uppercase tracking-[0.14em] text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0 md:mt-7"
              >
                View pricing &amp; tiers
              </Link>
            </article>
          </MotionStaggerGrid>

          <p className="mx-auto mt-8 max-w-xl font-accent text-xs leading-relaxed tracking-[0.03em] text-white/50 md:mt-10 md:text-[13px]">
            Intro bundles and founding membership rates are listed on pricing, choose what suits your
            practice.
          </p>
        </div>
      </MotionSection>

      <MotionSection className="relative grain-muted border-t border-light-grey">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-28">
          <div className="max-w-2xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
              Why Reset
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
              Pilates with purpose.
            </h2>
          </div>
          <div className="rule-section mt-8 w-full" aria-hidden />
          <WhyResetGrid />
        </div>
      </MotionSection>

      <MotionSection className="relative border-t border-light-grey bg-white py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
          <PaperSheet pin={false} flat className="overflow-hidden px-0 py-12 md:px-14 md:py-16">
            <MotionStaggerGrid
              soft
              className="grid gap-10 px-0 md:grid-cols-2 md:items-center md:gap-16"
            >
            <figure className="group relative aspect-[3/4] w-full min-h-[260px] overflow-hidden md:min-h-0">
              <Image
                src="/images/the-studio.png"
                alt="Reset Pilates studio, equipment wall with arches, timber shelving and matte black props"
                fill
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </figure>
            <div className="flex flex-col items-start text-left">
              <h2 className="text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
                The studio
              </h2>
              <div className="rule-section my-6 max-w-xs" aria-hidden />
              <blockquote className="m-0 max-w-none border-0 p-0 font-accent text-lg font-normal leading-relaxed tracking-[0.02em] text-charcoal md:text-xl">
                Reset. was created to be more than just a workout. It&apos;s a space to step away, slow
                down, and reconnect with your body.
              </blockquote>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 transition-all duration-300 hover:translate-x-1 hover:underline"
              >
                Meet the founder
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              </Link>
            </div>
            </MotionStaggerGrid>
          </PaperSheet>
        </div>
      </MotionSection>

      <HomeMapSection />
      <HomeInstagramSection />
      <HomeEmailAlertsSection />

      <PosterCtaBand>
            <div className="min-w-0 flex-1">
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
                Stay close to launch
              </p>
              <div className="rule-section my-5 max-w-xs" aria-hidden />
              <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
                Join the conversation.
              </h2>
              <p className="mt-2 text-sm text-mid-grey">
                Follow along for opening updates, offers, and studio life.
              </p>
            </div>
            <div className="rule-section shrink-0 md:hidden" aria-hidden />
            <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center md:shrink-0">
              <a
                href="https://www.instagram.com/reset_pilatesstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0"
              >
                <InstagramGlyph className="h-4 w-4 shrink-0 text-white" />
                @reset_pilatesstudio
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal hover:text-white hover:shadow-md active:translate-y-0"
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                Email the studio
              </Link>
            </div>
      </PosterCtaBand>
    </>
  );
}
