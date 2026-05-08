"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { BOOKING_HREF } from "@/lib/constants";
import { PlaceholderImage } from "@/components/PlaceholderImage";

type Props = {
  title: string;
  description: string;
  href?: string;
  linkLabel?: string;
  level?: string;
  className?: string;
  /** Grey media block for future photography — default on */
  imagePlaceholder?: boolean;
  /** When set, shows this photo instead of the placeholder */
  imageSrc?: string;
  imageAlt?: string;
};

export function ClassCard({
  title,
  description,
  href = "/classes",
  linkLabel = "View classes",
  level,
  className,
  imagePlaceholder = true,
  imageSrc,
  imageAlt,
}: Props) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "group flex h-full flex-col overflow-hidden bg-light-grey/35 transition-colors duration-300 hover:bg-light-grey/55",
        className
      )}
    >
      {imagePlaceholder && imageSrc && (
        <div className="relative aspect-video w-full shrink-0 overflow-hidden border-0 border-b border-charcoal/10 bg-white">
          <Image
            src={imageSrc}
            alt={imageAlt ?? title}
            fill
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      {imagePlaceholder && !imageSrc && (
        <PlaceholderImage
          aspect="video"
          className="w-full shrink-0 border-0 border-b border-charcoal/10 bg-white"
        />
      )}
      <div
        className={cn(
          "flex flex-1 flex-col",
          imagePlaceholder ? "px-8 pb-8 pt-6" : "p-8"
        )}
      >
        {level && (
          <span className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">
            {level}
          </span>
        )}
        <h3
          className={cn(
            "text-lg font-bold uppercase tracking-heading text-charcoal",
            level ? "mt-4" : "mt-0"
          )}
        >
          {title}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-mid-grey">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center text-xs font-bold uppercase tracking-wide text-charcoal underline-offset-4 transition-all duration-300 group-hover:translate-x-1 group-hover:underline"
        >
          {linkLabel}
        </Link>
      </div>
    </motion.article>
  );
}

export function ClassDetailCard({
  title,
  description,
  level,
  imagePlaceholder = true,
}: {
  title: string;
  description: string;
  level: string;
  imagePlaceholder?: boolean;
}) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as const }}
      className="flex h-full flex-col overflow-hidden bg-light-grey/35 transition-colors duration-300 hover:bg-light-grey/55"
    >
      {imagePlaceholder && (
        <PlaceholderImage
          aspect="video"
          className="w-full shrink-0 border-0 border-b border-charcoal/10 bg-white"
        />
      )}
      <div
        className={cn(
          "flex flex-1 flex-col",
          imagePlaceholder ? "px-8 pb-8 pt-6" : "p-8"
        )}
      >
        <span className="inline-flex max-w-fit border border-charcoal/25 px-3 py-1 font-accent text-[10px] uppercase tracking-[0.15em] text-mid-grey">
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
      </div>
    </motion.article>
  );
}
