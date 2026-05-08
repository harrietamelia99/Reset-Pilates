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
    <div className="mt-12 grid gap-0 md:grid-cols-2 md:gap-x-16 md:gap-y-0">
      {ITEMS.map(({ t, d }, i) => (
        <div
          key={t}
          className={
            i === 0
              ? "pb-10 md:pb-12"
              : i === 1
                ? "border-t border-charcoal pt-10 md:border-t-0 md:pt-0 md:pb-12"
                : "border-t border-charcoal pt-10 md:pt-12"
          }
        >
          <h3 className="text-lg font-bold uppercase tracking-heading text-charcoal">{t}</h3>
          <p className="mt-4 text-sm leading-relaxed text-mid-grey">{d}</p>
        </div>
      ))}
    </div>
  );
}
