"use client";

const ITEMS = [
  {
    t: "Dynamic, results-driven movement",
    d: "Not your average stretch session — sessions are built to challenge, refine, and reset.",
  },
  {
    t: "Infrared-heated classes",
    d: "Muscles warm faster, recovery comes sooner — heat with intention.",
  },
  {
    t: "Beginners welcome",
    d: "Every class is inclusive and adjustable. Show up as you are.",
  },
  {
    t: "A space that's yours",
    d: "Intimate, considered, never crowded — room to breathe and move.",
  },
] as const;

export function WhyResetGrid() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-2 md:gap-x-16">
      <div className="pb-10 md:pb-12">
        <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{ITEMS[0].t}</h3>
        <p className="mt-4 text-sm leading-relaxed text-mid-grey">{ITEMS[0].d}</p>
      </div>
      <div className="border-t border-charcoal pb-10 pt-10 md:border-t-0 md:pb-12 md:pt-0">
        <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{ITEMS[1].t}</h3>
        <p className="mt-4 text-sm leading-relaxed text-mid-grey">{ITEMS[1].d}</p>
      </div>

      <div className="col-span-2 rule-section" aria-hidden />

      <div className="pt-10 md:pt-12">
        <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{ITEMS[2].t}</h3>
        <p className="mt-4 text-sm leading-relaxed text-mid-grey">{ITEMS[2].d}</p>
      </div>
      <div className="border-t border-charcoal pt-10 md:border-t-0 md:pt-12">
        <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{ITEMS[3].t}</h3>
        <p className="mt-4 text-sm leading-relaxed text-mid-grey">{ITEMS[3].d}</p>
      </div>
    </div>
  );
}
