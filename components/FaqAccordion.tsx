"use client";

import { useState } from "react";

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
          <h2 className="border-b border-transparent pb-2 text-[10px] uppercase tracking-heading text-warm-grey">
            {group.title}
          </h2>
          <div className="mt-6 divide-y divide-light-grey border-y border-light-grey">
            {group.items.map((item, i) => {
              const id = `${group.title}-${i}`;
              const open = openId === id;
              return (
                <div key={id}>
                  <button
                    type="button"
                    onClick={() => setOpenId(open ? null : id)}
                    className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:bg-white/50"
                    aria-expanded={open}
                  >
                    <span className="text-base font-semibold uppercase tracking-wide text-charcoal">
                      {item.q}
                    </span>
                    <span className="mt-0.5 shrink-0 font-accent text-xs text-warm-grey">
                      {open ? "−" : "+"}
                    </span>
                  </button>
                  {open && (
                    <div className="overflow-hidden">
                      <p className="pb-5 pr-8 text-sm leading-relaxed text-mid-grey">{item.a}</p>
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
