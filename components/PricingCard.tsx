"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Props = {
  title: string;
  subtitle?: string;
  price: string;
  detail?: string;
  emphasis?: boolean;
  className?: string;
};

export function PricingCard({
  title,
  subtitle,
  price,
  detail,
  emphasis = false,
  className,
}: Props) {
  return (
    <motion.div
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "flex flex-col border p-8 transition-colors",
        emphasis
          ? "border-charcoal bg-charcoal text-white"
          : "border-light-grey bg-white hover:border-charcoal/25",
        className
      )}
    >
      <p
        className={cn(
          "font-accent text-[10px] uppercase tracking-[0.15em]",
          emphasis ? "text-white/70" : "text-warm-grey"
        )}
      >
        {title}
      </p>
      {subtitle && (
        <p
          className={cn(
            "mt-2 text-sm",
            emphasis ? "text-white/85" : "text-mid-grey"
          )}
        >
          {subtitle}
        </p>
      )}
      <p
        className={cn(
          "mt-6 text-2xl font-bold tracking-tight display-track md:text-3xl",
          emphasis ? "text-white" : "text-charcoal"
        )}
      >
        {price}
      </p>
      {detail && (
        <p
          className={cn(
            "mt-3 text-sm",
            emphasis ? "text-white/80" : "text-mid-grey"
          )}
        >
          {detail}
        </p>
      )}
    </motion.div>
  );
}
