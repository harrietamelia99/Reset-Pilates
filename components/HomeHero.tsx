"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { CSSProperties, RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { staggerContainer, fadeItem } from "@/lib/motion";
import { HeroBookingSheet } from "@/components/HeroBookingSheet";
import { LogoWordmark } from "@/components/LogoWordmark";
import { cn } from "@/lib/cn";

/** Fit “reset.” + 24px tracking to container width (avoids overflow clip looking centered). */
function useMegawordmarkFit(wordRef: RefObject<HTMLElement | null>, wrapRef: RefObject<HTMLDivElement | null>) {
  const [fontPx, setFontPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let rafUntilRefs = 0;

    const fit = () => {
      const wrap = wrapRef.current;
      const word = wordRef.current;
      if (!wrap || !word || cancelled) return;

      const maxW = wrap.getBoundingClientRect().width;
      if (maxW < 8) return;

      let lo = 12;
      let hi = Math.min(maxW * 4, 8000);
      for (let i = 0; i < 44; i++) {
        const mid = (lo + hi) / 2;
        word.style.fontSize = `${mid}px`;
        void word.offsetWidth;
        if (word.scrollWidth <= maxW) lo = mid;
        else hi = mid;
      }
      word.style.removeProperty("font-size");

      const safe = Number.isFinite(lo) && lo >= 12 && lo <= 8000 ? lo : null;
      if (!cancelled) setFontPx(safe);
    };

    const scheduleFit = () => requestAnimationFrame(fit);

    const attach = () => {
      const wrap = wrapRef.current;
      const word = wordRef.current;
      if (!wrap || !word) {
        rafUntilRefs += 1;
        if (rafUntilRefs < 90 && !cancelled) requestAnimationFrame(attach);
        return;
      }

      fit();
      void document.fonts.ready.then(() => {
        if (!cancelled) scheduleFit();
      });

      ro = new ResizeObserver(() => scheduleFit());
      ro.observe(wrap);
      window.addEventListener("orientationchange", fit);
    };

    attach();

    return () => {
      cancelled = true;
      ro?.disconnect();
      window.removeEventListener("orientationchange", fit);
    };
  }, [wordRef, wrapRef]);

  return fontPx;
}

export function HomeHero() {
  const slotRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const megawordWrapRef = useRef<HTMLDivElement>(null);
  const megawordRef = useRef<HTMLElement>(null);
  const megafontPx = useMegawordmarkFit(megawordRef, megawordWrapRef);
  const megafontApplied =
    megafontPx != null && Number.isFinite(megafontPx) && megafontPx >= 12 && megafontPx <= 8000;

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

  return (
    <section className="surface-poster-hero relative h-[calc(100svh-8rem)] max-h-[calc(100svh-8rem)] min-h-0 overflow-hidden">
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

      {/* Megawordmark — measured width = container so full phrase is visible edge-to-edge; z below flyer */}
      <div
        ref={megawordWrapRef}
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] flex w-full justify-center px-0 pb-0"
        aria-hidden
      >
        <LogoWordmark
          ref={megawordRef}
          style={megafontApplied ? { fontSize: megafontPx } : undefined}
          className={cn(
            "inline-block w-max max-w-full whitespace-nowrap text-charcoal/85 drop-shadow-[0_2px_24px_rgba(255,255,255,0.12)]",
            !megafontApplied && "text-[length:clamp(3.5rem,calc(100vw/6.5),50rem)]"
          )}
        />
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-0 w-full max-w-6xl flex-col px-4 py-3 md:px-6 md:py-4">
        {/* Navbar sits above this section in the document; flex-center places the sheet in the viewport band */}
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
              className="relative w-full max-w-[min(42rem,100%)] will-change-transform"
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
