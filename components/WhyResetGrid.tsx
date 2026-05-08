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
    <div className="mt-14 grid border-l border-t border-charcoal md:grid-cols-2">
      {ITEMS.map(({ t, d }) => (
        <div
          key={t}
          className="border-b border-r border-charcoal p-8 transition-colors duration-300 hover:bg-light-grey/35 md:p-10"
        >
          <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{t}</h3>
          <p className="mt-3 text-sm leading-relaxed text-mid-grey">{d}</p>
        </div>
      ))}
    </div>
  );
}
