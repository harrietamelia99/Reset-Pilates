"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { MotionSection } from "@/components/MotionSection";
import { CONTACT } from "@/lib/constants";
import { INSTAGRAM_HOME_GRID } from "@/lib/home-instagram";

export function HomeInstagramSection() {
  return (
    <MotionSection className="relative border-t border-light-grey bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey">Instagram</p>
            <h2 className="mt-3 text-3xl font-bold uppercase tracking-heading text-charcoal md:text-4xl">
              Studio snapshots
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-mid-grey md:text-base">
              A glimpse of life at Reset, follow for opening news, timetables, and behind the scenes.
            </p>
          </div>
          <Link
            href={CONTACT.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 self-start border border-charcoal bg-charcoal px-6 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0 md:self-auto"
          >
            <InstagramGlyph className="h-4 w-4 shrink-0 text-white" aria-hidden />
            {CONTACT.instagram.handle}
          </Link>
        </div>

        <div className="rule-section mt-10 w-full max-w-xs" aria-hidden />

        <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
          {INSTAGRAM_HOME_GRID.map((item, i) => (
            <motion.li
              key={item.src}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.48,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative aspect-square overflow-hidden border border-charcoal/10 bg-light-grey/20"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.06]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            </motion.li>
          ))}
        </ul>

        <p className="mt-6 font-accent text-[11px] uppercase tracking-[0.12em] text-warm-grey">
          Images are curated for the site, follow Instagram for the latest posts.
        </p>
      </div>
    </MotionSection>
  );
}
