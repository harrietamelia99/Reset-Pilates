import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
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
import { PosterCtaBand } from "@/components/PosterCtaBand";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
    description:
      "Premium boutique Pilates in Nailsea. Reformer and hot mat classes.",
    openGraph: {
      title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
      description:
        "Premium boutique Pilates in Nailsea. Reformer and hot mat classes.",
    },
  };
}

export default function HomePage() {
  return (
    <>
      <HomeHero />

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
        <MotionStaggerGrid className="mt-12 grid gap-8 md:grid-cols-2">
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
        </MotionStaggerGrid>
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

      <MotionSection className="relative border-t border-light-grey bg-cream py-16 md:py-20">
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
