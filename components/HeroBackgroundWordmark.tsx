"use client";

import type { RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
};

/**
 * Full-bleed hero wordmark: binary-search `font-size` (no transform scale).
 * Width buffer + post-pass bump fix integer rounding / right-edge gap.
 * Strong translateY pulls ink to the hero bottom (font line-box gap).
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
      const heroW = hero?.getBoundingClientRect().width ?? 0;
      const layoutW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;
      const vw = vv?.width ?? 0;

      const raw = Math.max(heroW, layoutW, innerW, vw, breakout.clientWidth);
      /**
       * Require slightly more than layout width so offsetWidth rounding / subpixels
       * never leave a strip beside the period (hero clips overflow).
       */
      const targetNeed = Math.ceil(raw * 1.025 + 4);

      if (targetNeed <= 0) return;

      let lo = 4;
      let hi = 48;
      text.style.fontSize = `${hi}px`;
      void text.offsetWidth;
      while (text.offsetWidth < targetNeed && hi < 4000) {
        hi *= 2;
        text.style.fontSize = `${hi}px`;
        void text.offsetWidth;
      }
      if (text.offsetWidth < targetNeed) {
        setFontPx(hi);
        return;
      }

      for (let i = 0; i < 40; i++) {
        const mid = (lo + hi) / 2;
        text.style.fontSize = `${mid}px`;
        void text.offsetWidth;
        if (text.offsetWidth >= targetNeed) hi = mid;
        else lo = mid;
      }

      let chosen = hi;
      text.style.fontSize = `${chosen}px`;
      void text.offsetWidth;

      /** Micro-step until width clears target (handles float font sizes vs integer metrics). */
      while (text.offsetWidth < targetNeed && chosen < 4000) {
        chosen += 0.2;
        text.style.fontSize = `${chosen}px`;
        void text.offsetWidth;
      }

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
            /**
             * Push glyph raster down into the section edge (line-box space below baseline).
             * Sized so typical Bethany metrics sit flush with hero bottom after overflow clip.
             */
            transform: "translateY(calc(0.28em + 18px))",
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
