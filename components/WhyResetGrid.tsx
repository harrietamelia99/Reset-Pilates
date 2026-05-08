"use client";

import { Activity, Flame, HeartHandshake, Home } from "lucide-react";

const ITEMS = [
  {
    Icon: Activity,
    t: "Dynamic, results-driven movement",
    d: "Not your average stretch session — sessions are built to challenge, refine, and reset.",
  },
  {
    Icon: Flame,
    t: "Infrared-heated classes",
    d: "Muscles warm faster, recovery comes sooner — heat with intention.",
  },
  {
    Icon: HeartHandshake,
    t: "Beginners welcome",
    d: "Every class is inclusive and adjustable. Show up as you are.",
  },
  {
    Icon: Home,
    t: "A space that's yours",
    d: "Intimate, considered, never crowded — room to breathe and move.",
  },
] as const;

export function WhyResetGrid() {
  return (
    <div className="mt-14 grid border-l border-t border-charcoal md:grid-cols-2">
      {ITEMS.map(({ Icon, t, d }) => (
        <div
          key={t}
          className="border-b border-r border-charcoal p-8 transition-colors duration-300 hover:bg-light-grey/35 md:p-10"
        >
          <Icon className="h-6 w-6 text-charcoal/70" strokeWidth={1.25} aria-hidden />
          <h3 className="mt-4 text-lg font-bold uppercase tracking-heading text-charcoal">{t}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mid-grey">{d}</p>
        </div>
      ))}
    </div>
  );
}
