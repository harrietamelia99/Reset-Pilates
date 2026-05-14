"use client";

import { motion } from "framer-motion";
import { fadeItem, staggerContainer, scrollViewport } from "@/lib/motion";

const ITEMS = [
  {
    t: "Dynamic, results-driven movement",
    d: "Not your average stretch session, sessions are built to challenge, refine, and reset.",
  },
  {
    t: "Infrared-heated classes",
    d: "Muscles warm faster, recovery comes sooner, heat with intention.",
  },
  {
    t: "Beginners welcome",
    d: "Every class is inclusive and adjustable. Show up as you are.",
  },
  {
    t: "A space that's yours",
    d: "Intimate, considered, never crowded, room to breathe and move.",
  },
] as const;

export function WhyResetGrid() {
  const itemTitleClass =
    "text-base font-bold uppercase leading-snug tracking-[0.1em] text-charcoal sm:text-lg md:leading-tight md:tracking-heading";
  const itemBodyClass = "mt-3 min-w-0 text-sm leading-relaxed text-mid-grey sm:mt-4";

  return (
    <motion.div
      className="mt-12 grid min-w-0 grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-16"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
    >
      <motion.div variants={fadeItem} className="min-w-0 pb-10 md:pb-12">
        <h3 className={itemTitleClass}>{ITEMS[0].t}</h3>
        <p className={itemBodyClass}>{ITEMS[0].d}</p>
      </motion.div>
      <motion.div
        variants={fadeItem}
        className="min-w-0 border-t border-charcoal pb-10 pt-10 md:border-t-0 md:pb-12 md:pt-0"
      >
        <h3 className={itemTitleClass}>{ITEMS[1].t}</h3>
        <p className={itemBodyClass}>{ITEMS[1].d}</p>
      </motion.div>

      <div className="col-span-full rule-section min-w-0" aria-hidden />

      <motion.div variants={fadeItem} className="min-w-0 pb-10 pt-10 md:pb-12 md:pt-12">
        <h3 className={itemTitleClass}>{ITEMS[2].t}</h3>
        <p className={itemBodyClass}>{ITEMS[2].d}</p>
      </motion.div>
      <motion.div variants={fadeItem} className="min-w-0 border-t border-charcoal pt-10 md:border-t-0 md:pt-12">
        <h3 className={itemTitleClass}>{ITEMS[3].t}</h3>
        <p className={itemBodyClass}>{ITEMS[3].d}</p>
      </motion.div>
    </motion.div>
  );
}
