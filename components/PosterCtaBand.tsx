"use client";

import type { ReactNode } from "react";
import { MotionSection } from "@/components/MotionSection";
import { PaperSheet } from "@/components/PaperSheet";
import { PosterHeroBackdrop } from "@/components/PosterHeroBackdrop";
import { cn } from "@/lib/cn";

/** Default inner layout: matches home “Join the conversation” strip */
export const POSTER_CTA_SHEET_LAYOUT =
  "flex flex-col justify-between gap-8 px-8 py-10 md:flex-row md:items-center md:px-12 md:py-12";

type Props = {
  children: ReactNode;
  className?: string;
  sheetClassName?: string;
  /** Children already include layout / multiple roots; skip PaperSheet wrapper */
  bare?: boolean;
  delay?: number;
  id?: string;
};

export function PosterCtaBand({ children, className, sheetClassName, bare, delay, id }: Props) {
  return (
    <MotionSection
      id={id}
      delay={delay}
      className={cn(
        "surface-poster-hero relative overflow-hidden border-t border-white/10 py-16 md:py-20",
        className
      )}
    >
      <PosterHeroBackdrop />
      <div className="grain-layer z-[1]" aria-hidden />
      <div className="vignette-layer z-[1]" aria-hidden />
      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        {bare ? (
          children
        ) : (
          <PaperSheet flat className={cn(POSTER_CTA_SHEET_LAYOUT, sheetClassName)}>
            {children}
          </PaperSheet>
        )}
      </div>
    </MotionSection>
  );
}
