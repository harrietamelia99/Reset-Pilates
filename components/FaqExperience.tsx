"use client";

import { useCallback, useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export type FaqGroup = {
  readonly title: string;
  readonly items: readonly { readonly q: string; readonly a: string }[];
};

type ExtraBlock = { title: string; body: string };

type Props = {
  groups: readonly FaqGroup[];
  extras: readonly ExtraBlock[];
};

export function FaqExperience({ groups, extras }: Props) {
  const baseId = useId();
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = useCallback((key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  }, []);

  const scrollToCat = (gi: number) => {
    document.getElementById(`faq-cat-${gi}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full max-w-3xl">
      <nav
        aria-label="FAQ categories"
        className="sticky top-[calc(5.5rem+env(safe-area-inset-top,0px))] z-20 -mx-1 mb-10 flex flex-wrap items-center gap-2 border-b border-charcoal/10 bg-cream/90 px-1 py-4 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75 md:gap-2"
      >
        {groups.map((g, gi) => (
          <button
            key={g.title}
            type="button"
            onClick={() => scrollToCat(gi)}
            className="group inline-flex items-baseline gap-1.5 rounded-sm border border-transparent px-2.5 py-1.5 text-left font-accent text-[11px] uppercase tracking-[0.14em] text-mid-grey transition hover:border-charcoal/15 hover:bg-charcoal/[0.03] hover:text-charcoal"
          >
            <span className="font-sans text-[10px] tabular-nums text-warm-grey group-hover:text-charcoal">
              {String(gi + 1).padStart(2, "0")}
            </span>
            <span className="max-w-[10rem] truncate sm:max-w-none">{g.title}</span>
          </button>
        ))}
      </nav>

      <div className="space-y-12">
        {groups.map((group, gi) => (
          <section
            key={group.title}
            id={`faq-cat-${gi}`}
            className="scroll-mt-[calc(6.5rem+env(safe-area-inset-top,0px))]"
            aria-labelledby={`${baseId}-heading-${gi}`}
          >
            <div className="flex items-end justify-between gap-4 border-b border-charcoal pb-3">
              <h2
                id={`${baseId}-heading-${gi}`}
                className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-charcoal"
              >
                {group.title}
              </h2>
              <span className="font-accent text-[10px] tabular-nums text-warm-grey">{group.items.length} topics</span>
            </div>

            <ul className="mt-1 divide-y divide-charcoal/10" role="list">
              {group.items.map((item, qi) => {
                const key = `${gi}-${qi}`;
                const isOpen = openKey === key;
                const panelId = `faq-panel-${gi}-${qi}`;
                const btnId = `faq-btn-${gi}-${qi}`;

                return (
                  <li key={key} className="list-none">
                    <h3 className="m-0">
                      <button
                        id={btnId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => toggle(key)}
                        className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:bg-charcoal/[0.02] md:py-5"
                      >
                        <span className="font-sans text-[13px] font-semibold uppercase leading-snug tracking-wide text-charcoal md:text-sm">
                          {item.q}
                        </span>
                        <span
                          className={cn(
                            "mt-0.5 shrink-0 rounded-sm border border-charcoal/15 p-1 text-charcoal transition-colors",
                            isOpen && "border-charcoal/25 bg-charcoal/[0.04]"
                          )}
                          aria-hidden
                        >
                          <ChevronDown
                            className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")}
                            strokeWidth={1.75}
                          />
                        </span>
                      </button>
                    </h3>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      )}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <div className="border-l-2 border-charcoal/15 pl-4 pr-2 pb-4 md:pb-5">
                          <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        <section className="border-t border-charcoal/10 pt-10" aria-labelledby={`${baseId}-extras`}>
          <h2 id={`${baseId}-extras`} className="sr-only">
            Also good to know
          </h2>
          <ul className="divide-y divide-charcoal/10" role="list">
            {extras.map((ex, ei) => {
              const key = `x-${ei}`;
              const isOpen = openKey === key;
              const panelId = `${baseId}-extra-${ei}`;
              const btnId = `${panelId}-btn`;

              return (
                <li key={key} className="list-none">
                  <h3 className="m-0">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggle(key)}
                      className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:bg-charcoal/[0.02] md:py-5"
                    >
                      <span className="font-sans text-[13px] font-semibold uppercase leading-snug tracking-wide text-charcoal md:text-sm">
                        {ex.title}
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 shrink-0 rounded-sm border border-charcoal/15 p-1 text-charcoal transition-colors",
                          isOpen && "border-charcoal/25 bg-charcoal/[0.04]"
                        )}
                        aria-hidden
                      >
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform duration-300", isOpen && "rotate-180")}
                          strokeWidth={1.75}
                        />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className={cn(
                      "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    )}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="border-l-2 border-charcoal/15 pl-4 pr-2 pb-4 md:pb-5">
                        <p className="font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">{ex.body}</p>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </div>
  );
}
