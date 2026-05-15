"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

export type EditorialVideoBackdropProps = {
  /**
   * `deep` matches founding / footer bands (#2e2e30 family).
   * `mid` softens overlays for `surface-editorial-dark` (#545456) so light PaperSheet blocks still read.
   */
  variant?: "deep" | "mid";
  /** Use `auto` only for one prominent above-the-fold band; `metadata` limits eager fetch elsewhere. */
  preload?: "auto" | "metadata" | "none";
  className?: string;
};

/**
 * Full-bleed loop used behind founding pricing and other editorial-dark / poster bands.
 * Pauses when `prefers-reduced-motion: reduce`.
 */
export function EditorialVideoBackdrop({
  variant = "deep",
  preload = "metadata",
  className,
}: EditorialVideoBackdropProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (mq.matches) {
        v.pause();
        v.removeAttribute("autoplay");
      } else {
        v.muted = true;
        v.setAttribute("autoplay", "");
        void v.play().catch(() => {});
      }
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const overlays =
    variant === "deep" ? (
      <>
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#141416]/90 via-[#1e1e22]/88 to-[#141416]/92"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#0f0f10]/55" aria-hidden />
      </>
    ) : (
      <>
        <div
          className="absolute inset-0 bg-gradient-to-b from-[#2f2f32]/82 via-[#404043]/78 to-[#2f2f32]/84"
          aria-hidden
        />
        <div className="absolute inset-0 bg-[#252527]/50" aria-hidden />
      </>
    );

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-0", className)} aria-hidden>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.42] saturate-[0.35] contrast-[1.05]"
        autoPlay
        muted
        loop
        playsInline
        preload={preload}
      >
        <source src="/videos/founding-member-bg.mp4" type="video/mp4" />
        <source src="/videos/founding-member-bg.mov" type="video/quicktime" />
      </video>
      {overlays}
    </div>
  );
}
