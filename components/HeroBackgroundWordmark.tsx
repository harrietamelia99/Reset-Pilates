"use client";

import type { RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
};

/**
 * Edge-to-edge hero wordmark without `transform: scale()` — scaling via layout-sized `font-size`
 * avoids flex centering bugs (scaled visuals ≠ layout box). Optional `100vw` strip breaks out
 * of any accidental ancestor shrink. Binary-search font size so intrinsic width matches viewport.
 */
export function HeroBackgroundWordmark({ heroRef }: Props) {
  const breakoutRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [fontPx, setFontPx] = useState<number | null>(null);

  useLayoutEffect(() => {
    const text = textRef.current;
    const breakout = breakoutRef.current;
    if (!text || !breakout) return;

    const fit = () => {
      const hero = heroRef.current;
      const vv = window.visualViewport;
      /** Prefer layout viewport width; match hero strip when it matches (sub-pixel safe). */
      const heroW = hero?.getBoundingClientRect().width ?? 0;
      const layoutW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;
      const vw = vv?.width ?? 0;
      const targetW = Math.max(heroW, layoutW, innerW, vw, breakout.clientWidth);

      if (targetW <= 0) return;

      /**
       * Find the smallest font-size (px) whose rendered width is still >= targetW
       * (then hero `overflow-hidden` can clip a hair — reads flush, no side gutters).
       */
      let lo = 4;
      let hi = 48;
      text.style.fontSize = `${hi}px`;
      void text.offsetWidth;
      while (text.offsetWidth < targetW && hi < 4000) {
        hi *= 2;
        text.style.fontSize = `${hi}px`;
        void text.offsetWidth;
      }
      if (text.offsetWidth < targetW) {
        setFontPx(hi);
        return;
      }

      for (let i = 0; i < 36; i++) {
        const mid = (lo + hi) / 2;
        text.style.fontSize = `${mid}px`;
        void text.offsetWidth;
        if (text.offsetWidth >= targetW) hi = mid;
        else lo = mid;
      }

      const chosen = hi;
      text.style.fontSize = `${chosen}px`;
      setFontPx(chosen);
    };

    const scheduleFit = () => {
      requestAnimationFrame(() => requestAnimationFrame(fit));
    };

    void document.fonts.ready.then(scheduleFit);
    scheduleFit();

    const ro = new ResizeObserver(scheduleFit);
    ro.observe(breakout);
    const heroEl = heroRef.current;
    if (heroEl) ro.observe(heroEl);

    window.addEventListener("resize", fit);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      vv?.removeEventListener("resize", fit);
    };
  }, [heroRef]);

  return (
    <div
      ref={breakoutRef}
      className="pointer-events-none absolute bottom-0 left-1/2 z-[2] w-screen max-w-[100vw] -translate-x-1/2"
      aria-hidden
    >
      <div className="flex w-full items-end justify-center overflow-visible">
        <span
          ref={textRef}
          className="block max-w-none whitespace-nowrap font-normal lowercase leading-none antialiased"
          style={{
            fontFamily: 'var(--font-logo-wordmark), Georgia, "Times New Roman", serif',
            fontWeight: 400,
            fontFeatureSettings: '"kern" 1',
            fontSize: fontPx != null ? `${fontPx}px` : "256px",
            letterSpacing: "0.09em",
            lineHeight: 1,
            padding: 0,
            margin: 0,
            /** Pull raster down so ink sits on the section edge (line-box / metrics gap above grey strip). */
            transform: "translateY(calc(0.12em + 4px))",
            color: "var(--color-charcoal)",
            opacity: fontPx != null ? 1 : 0,
            transition: fontPx != null ? "opacity 0.12s ease-out" : undefined,
            textShadow:
              "0 1px 0 rgba(255,255,255,0.08), 0 4px 28px rgba(255,255,255,0.12)",
          }}
        >
          reset.
        </span>
      </div>
    </div>
  );
}
