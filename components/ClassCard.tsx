"use client";

import Link from "next/link";
import { Activity, Flame, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { BOOKING_HREF } from "@/lib/constants";

const CLASS_CARD_ICONS = {
  reformer: Activity,
  hotMat: Flame,
  mat: LayoutGrid,
} as const;

export type ClassCardIconKey = keyof typeof CLASS_CARD_ICONS;

type Props = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  level?: string;
  className?: string;
  icon?: ClassCardIconKey;
};

export function ClassCard({
  title,
  description,
  href = "/classes",
  linkLabel = "View classes",
  level,
  className,
  icon,
}: Props) {
  const Icon = icon ? CLASS_CARD_ICONS[icon] : null;
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "group flex h-full flex-col border border-charcoal bg-white p-8 shadow-sm transition-all duration-300 hover:bg-light-grey/40 hover:shadow-editorial",
        className
      )}
    >
      {Icon && (
        <div
          className="mb-5 inline-flex h-11 w-11 items-center justify-center border border-charcoal/12 bg-light-grey/35 text-charcoal"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={1.25} />
        </div>
      )}
      {level && (
        <span className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
          {level}
        </span>
      )}
      <h3 className="mt-3 text-lg font-bold uppercase tracking-heading text-charcoal">{title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-mid-grey">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 transition group-hover:underline"
      >
        {linkLabel}
      </Link>
    </motion.article>
  );
}

export function ClassDetailCard({
  title,
  description,
  level,
}: {
  title: string;
  description: string;
  level: string;
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex h-full flex-col border border-charcoal bg-white p-8 shadow-sm transition-all duration-300 hover:bg-light-grey/40 hover:shadow-editorial"
    >
      <span className="inline-flex max-w-fit rounded-full border border-charcoal/25 px-3 py-1 font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
        {level}
      </span>
      <h3 className="mt-4 text-lg font-bold uppercase tracking-heading text-charcoal">{title}</h3>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-mid-grey">{description}</p>
      {BOOKING_HREF.startsWith("/") ? (
        <Link
          href={BOOKING_HREF}
          className="mt-8 inline-flex w-fit items-center justify-center border border-charcoal bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90"
        >
          Book this class
        </Link>
      ) : (
        <a
          href={BOOKING_HREF}
          className="mt-8 inline-flex w-fit items-center justify-center border border-charcoal bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90"
        >
          Book this class
        </a>
      )}
      {/* TODO: Update BOOKING_HREF (lib/constants.ts) with live Momence URL. */}
    </motion.article>
  );
}
