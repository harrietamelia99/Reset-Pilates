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
    <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-x-16 md:gap-y-16">
      {ITEMS.map(({ t, d }) => (
        <div key={t}>
          <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{t}</h3>
          <p className="mt-4 text-sm leading-relaxed text-mid-grey">{d}</p>
        </div>
      ))}
    </div>
  );
}
