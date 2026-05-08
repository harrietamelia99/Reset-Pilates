"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { staggerContainer, fadeItem } from "@/lib/motion";
import { HeroBookingSheet } from "@/components/HeroBookingSheet";
import { LogoWordmark } from "@/components/LogoWordmark";
import { cn } from "@/lib/cn";

export function HomeHero() {
  const slotRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);

  const [fit, setFit] = useState({ scale: 1, naturalH: 560 });
  const [flyerStyle, setFlyerStyle] = useState<CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "center center",
  });

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const flyer = flyerRef.current;
    if (!slot || !flyer) return;

    const applyFit = () => {
      /** Leave a little slack so the sheet + paperclip never kiss the viewport edge */
      const avail = Math.max(0, slot.clientHeight - 20);
      flushSync(() => {
        setFlyerStyle({ transform: "scale(1)", transformOrigin: "center center" });
      });
      const nh = flyer.offsetHeight;
      const scale = nh <= avail ? 1 : avail / nh;
      setFlyerStyle({ transform: `scale(${scale})`, transformOrigin: "center center" });
      setFit({ scale, naturalH: nh });
    };

    applyFit();

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(applyFit);
    });
    ro.observe(slot);
    ro.observe(flyer);

    window.addEventListener("resize", applyFit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyFit);
    };
  }, []);

  const bridgeHeight = fit.naturalH * fit.scale;

  /**
   * Megawordmark sizing — CSS-only (no binary-search JS).
   * Fixed `letter-spacing: 24px` on LogoWordmark made width dominated by px gaps at small font sizes,
   * shrinking the fitted text until it was effectively invisible. Here we use em spacing + vw clamp.
   */
  const megawordStyle: CSSProperties = {
    fontSize:
      "clamp(3.75rem, calc((100vw - 1rem) / 5.25), min(42rem, min(92vw, 55vh)))",
    letterSpacing: "0.11em",
  };

  return (
    <section className="surface-poster-hero relative isolate h-[calc(100svh-8rem)] max-h-[calc(100svh-8rem)] min-h-0 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/hero-industrial-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-mid-grey/38" aria-hidden />
      </div>
      <div className="grain-layer z-[1]" aria-hidden />
      <div className="vignette-layer z-[1]" aria-hidden />

      {/* Megawordmark: z-[2] stays below content column (z-10) so it reads as the hero plate; letterSpacing/fontSize inline override LogoWordmark defaults */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 left-0 right-0 z-[2] flex w-full justify-center px-0 pb-0"
        aria-hidden
      >
        <LogoWordmark
          style={megawordStyle}
          className={cn(
            "inline-block w-max max-w-[min(100%,100vw)] whitespace-nowrap text-charcoal",
            "drop-shadow-[0_2px_32px_rgba(255,255,255,0.18)] [text-shadow:0_1px_0_rgba(255,255,255,0.08)]"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col px-4 py-3 md:px-6 md:py-4">
        <div
          ref={slotRef}
          className="relative flex min-h-0 w-full flex-1 flex-col items-center justify-center overflow-visible"
        >
          <div
            className="relative mx-auto flex w-full max-w-[min(42rem,100%)] items-center justify-center overflow-visible px-1 sm:px-4"
            style={{
              height: bridgeHeight,
              maxHeight: "100%",
            }}
          >
            <div
              ref={flyerRef}
              style={flyerStyle}
              className="relative z-10 w-full max-w-[min(42rem,100%)] will-change-transform"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="w-full py-0"
              >
                <motion.div variants={fadeItem}>
                  <HeroBookingSheet />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
