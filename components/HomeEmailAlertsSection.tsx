"use client";

import { EmailAlertsForm } from "@/components/EmailAlertsForm";
import { PosterCtaBand } from "@/components/PosterCtaBand";

export function HomeEmailAlertsSection() {
  return (
    <PosterCtaBand sheetClassName="flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
      <div className="min-w-0 flex-1 lg:max-w-md">
        <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">Stay in the loop</p>
        <div className="rule-section my-5 max-w-xs" aria-hidden />
        <h2 className="text-xl font-bold uppercase tracking-heading text-editorial-ink md:text-2xl">Email alerts</h2>
        <p className="mt-3 font-accent text-sm leading-relaxed text-mid-grey md:text-base">
          Be first to hear about launch week, founding offers, and when booking goes live.
        </p>
      </div>
      <div className="min-w-0 w-full shrink-0 lg:max-w-md lg:pt-1">
        <EmailAlertsForm variant="light" />
      </div>
    </PosterCtaBand>
  );
}
