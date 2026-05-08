"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqGroup = {
  title: string;
  items: FaqItem[];
};

type Props = {
  groups: FaqGroup[];
};

export function FaqAccordion({ groups }: Props) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="space-y-16">
      {groups.map((group) => (
        <section key={group.title}>
          <h2 className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">{group.title}</h2>
          <div className="rule-section mt-5 max-w-xs" aria-hidden />
          <div className="mt-8 divide-y divide-light-grey overflow-hidden rounded-sm border border-light-grey bg-white/60">
            {group.items.map((item, i) => {
              const id = `${group.title}-${i}`;
              const open = openId === id;
              return (
                <div key={id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : id)}
                    className="flex w-full items-start justify-between gap-4 px-4 py-5 text-left transition-colors hover:bg-light-grey/40 md:px-5"
                    aria-expanded={open}
                  >
                    <span className="text-base font-semibold uppercase tracking-wide text-charcoal">
                      {item.q}
                    </span>
                    <ChevronDown
                      className={cn(
                        "mt-0.5 h-5 w-5 shrink-0 text-warm-grey transition-transform duration-200",
                        open && "rotate-180"
                      )}
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </button>
                  {open && (
                    <div className="overflow-hidden">
                      <p className="px-4 pb-5 pr-10 text-sm leading-relaxed text-mid-grey md:px-5">{item.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
