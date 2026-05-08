import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, Tag } from "lucide-react";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { HomeHero } from "@/components/HomeHero";
import { WhyResetGrid } from "@/components/WhyResetGrid";
import { MotionSection } from "@/components/MotionSection";
import { ClassCard } from "@/components/ClassCard";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { PaperSheet } from "@/components/PaperSheet";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Reset Pilates Studio | Reformer & Hot Mat Pilates in Nailsea",
    description:
      "Premium boutique Pilates in Nailsea. Reformer, hot mat and mat classes — opening June 2026. Founding memberships available.",
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

      <MotionSection className="relative border-t border-light-grey bg-white py-16 md:py-24">
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
          <PaperSheet className="flex flex-col gap-8 px-8 py-12 md:flex-row md:items-center md:justify-between md:px-14 md:py-14">
            <div className="relative flex-1">
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
                Intro offer
              </p>
              <div className="rule-editorial my-6 max-w-md" />
              <h2 className="text-2xl font-bold uppercase tracking-heading text-editorial-ink md:text-3xl">
                New to Reset?
              </h2>
              <p className="mt-4 max-w-xl text-mid-grey">
                Try three classes for £45 (reformer or hot mat) or three mat classes for £30. The perfect
                way to find your flow.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex shrink-0 items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90 md:self-end"
            >
              <Tag className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Claim your intro deal
            </Link>
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
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          <ClassCard
            title="Reformer Pilates"
            description="Dynamic movement on the reformer machine. Strength, control and flow."
          />
          <ClassCard
            title="Hot Mat Pilates"
            description="Infrared-heated Pilates designed to deepen your practice and elevate results."
          />
          <ClassCard
            title="Mat Pilates"
            description="Foundation-led mat classes for all levels. Available pending final scheduling."
          />
        </div>
      </MotionSection>

      <MotionSection className="surface-editorial-dark relative text-white">
        <div className="relative z-10 mx-auto max-w-6xl px-4 py-20 md:px-6">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/55">
            Pre-launch · Limited
          </p>
          <h2 className="mt-10 text-3xl font-bold uppercase tracking-heading md:mt-12 md:text-4xl">
            Become a founding member.
          </h2>
          <p className="mt-5 max-w-2xl text-white/85">
            Be one of the first 30 members and lock in a special rate for your first 12 months. This
            offer won&apos;t last.
          </p>
          <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-x-20 lg:gap-x-28">
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/55">
                Reformer
              </p>
              <p className="mt-5 text-3xl font-bold display-track md:text-4xl">£65/month</p>
              <p className="mt-2 text-sm text-white/75">4 classes per month</p>
            </div>
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/55">Mat</p>
              <p className="mt-5 text-3xl font-bold display-track md:text-4xl">£35/month</p>
              <p className="mt-2 text-sm text-white/75">4 classes per month</p>
            </div>
          </div>
          <Link
            href="/pricing"
            className="mt-14 inline-flex items-center justify-center bg-white px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-white/90"
          >
            Secure your spot
          </Link>
        </div>
      </MotionSection>

      <MotionSection className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-28">
        <div className="max-w-2xl">
          <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
            Why Reset
          </p>
          <h2 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
            Pilates with purpose.
          </h2>
        </div>
        <WhyResetGrid />
      </MotionSection>

      <MotionSection className="surface-editorial-dark relative py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
          <PaperSheet
            pin={false}
            flat
            className="grid gap-12 px-8 py-14 md:grid-cols-2 md:items-center md:gap-16 md:px-14 md:py-16"
          >
            <PlaceholderImage aspect="portrait" className="w-full" />
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
                The studio
              </p>
              <blockquote className="mt-8 font-playfair text-balance text-xl font-normal leading-snug text-editorial-ink md:text-2xl">
                Reset. was created to be more than just a workout. It&apos;s a space to step away, slow
                down, and reconnect with your body.
              </blockquote>
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 hover:underline"
              >
                Meet Mari
                <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </PaperSheet>
        </div>
      </MotionSection>

      <MotionSection className="surface-editorial-dark relative py-16 md:py-20">
        <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
          <PaperSheet flat className="flex flex-col justify-between gap-8 px-8 py-10 md:flex-row md:items-center md:px-12 md:py-12">
            <div>
              <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
                Stay close to launch
              </p>
              <h2 className="mt-4 text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">
                Join the conversation.
              </h2>
              <p className="mt-2 text-sm text-mid-grey">
                Follow along for opening updates, offers, and studio life.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="https://www.instagram.com/reset_pilatesstudio/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90"
              >
                <InstagramGlyph className="h-4 w-4 shrink-0 text-white" />
                @reset_pilatesstudio
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 border border-charcoal bg-transparent px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white"
              >
                <Mail className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                Email the studio
              </Link>
            </div>
          </PaperSheet>
        </div>
      </MotionSection>
    </>
  );
}
