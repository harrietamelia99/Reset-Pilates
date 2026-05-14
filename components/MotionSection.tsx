"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
};

export function MotionSection({ children, className, delay = 0, id }: Props) {
  return (
    <motion.section
      id={id}
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.06, margin: "0px 0px -8% 0px" }}
      variants={{
        hidden: fadeUp.hidden,
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1] as const,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.section>
  );
}
