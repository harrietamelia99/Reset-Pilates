"use client";

import { MotionSection } from "@/components/MotionSection";
import { EmailAlertsForm } from "@/components/EmailAlertsForm";

export function HomeEmailAlertsSection() {
  return (
    <MotionSection className="surface-editorial-dark-deep relative overflow-hidden border-t border-white/10 py-16 text-white md:py-24">
      <div className="grain-layer z-[1] opacity-15" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
          <div>
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-white/55">
              Stay in the loop
            </p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-heading text-white md:text-4xl">
              Email alerts
            </h2>
            <p className="mt-4 max-w-md font-accent text-sm leading-relaxed text-white/75 md:text-base">
              Be first to hear about launch week, founding offers, and when booking goes live.
            </p>
            <div className="rule-section-dark mt-8 max-w-xs opacity-80" aria-hidden />
          </div>
          <div className="lg:pt-1">
            <EmailAlertsForm variant="dark" />
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
