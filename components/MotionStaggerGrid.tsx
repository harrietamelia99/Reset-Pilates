"use client";

import { Children, type ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeItem, fadeItemSoft, scrollViewport, staggerContainer } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: ReactNode;
  className?: string;
  /** Softer motion for image-heavy rows */
  soft?: boolean;
};

/**
 * Wraps each child in a staggered scroll reveal (fade + lift). Parent keeps grid/flex classes.
 */
export function MotionStaggerGrid({ children, className, soft }: Props) {
  const itemVariants = soft ? fadeItemSoft : fadeItem;
  const arr = Children.toArray(children);

  return (
    <motion.div
      className={cn(className)}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
    >
      {arr.map((child, i) => (
        <motion.div key={i} variants={itemVariants} className="min-w-0 h-full">
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
