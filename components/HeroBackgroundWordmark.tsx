"use client";

import type { RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  heroRef: RefObject<HTMLElement | null>;
};

function readTextWidth(el: HTMLElement): number {
  const r = el.getBoundingClientRect();
  return r.width;
}

/**
 * Full-bleed hero wordmark — binary-search font-size using subpixel width vs innerWidth,
 * so the period reaches the right edge; vertical tuning closes the thin strip under the baseline.
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
      /** Measure without translate so metrics stay stable */
      text.style.transform = "none";
      void text.offsetWidth;

      const hero = heroRef.current;
      const vv = window.visualViewport;
      const heroW = hero?.getBoundingClientRect().width ?? 0;
      const layoutW = document.documentElement.clientWidth;
      const innerW = window.innerWidth;
      const vw = vv?.width ?? 0;

      /**
       * Match the visible browser width (innerWidth often ≥ clientWidth when scrollbar present).
       * Extra % + px forces glyph box past edges so nothing reads “short” on the right.
       */
      const raw = Math.max(heroW, layoutW, innerW, vw, breakout.clientWidth);
      const targetNeed = Math.max(raw * 1.065 + 14, innerW * 1.055 + 12);

      if (targetNeed <= 0) return;

      let lo = 4;
      let hi = 48;
      text.style.fontSize = `${hi}px`;
      void text.offsetWidth;
      while (readTextWidth(text) < targetNeed && hi < 4000) {
        hi *= 2;
        text.style.fontSize = `${hi}px`;
        void text.offsetWidth;
      }
      if (readTextWidth(text) < targetNeed) {
        setFontPx(hi);
        text.style.transform = "";
        return;
      }

      for (let i = 0; i < 42; i++) {
        const mid = (lo + hi) / 2;
        text.style.fontSize = `${mid}px`;
        void text.offsetWidth;
        if (readTextWidth(text) >= targetNeed) hi = mid;
        else lo = mid;
      }

      let chosen = hi;
      text.style.fontSize = `${chosen}px`;
      void text.offsetWidth;

      while (readTextWidth(text) < targetNeed && chosen < 4000) {
        chosen += 0.15;
        text.style.fontSize = `${chosen}px`;
        void text.offsetWidth;
      }

      setFontPx(chosen);
      text.style.transform = "";
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
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] w-full"
      aria-hidden
    >
      <div className="flex w-full items-end justify-center overflow-visible">
        <span
          ref={textRef}
          className="block max-w-none whitespace-nowrap font-normal lowercase antialiased"
          style={{
            fontFamily: 'var(--font-logo-wordmark), Georgia, "Times New Roman", serif',
            fontWeight: 400,
            fontFeatureSettings: '"kern" 1',
            fontSize: fontPx != null ? `${fontPx}px` : "256px",
            letterSpacing: "0.09em",
            lineHeight: 0.86,
            padding: 0,
            margin: 0,
            marginBottom: "-0.12em",
            transform: "translateY(calc(0.15em + 8px))",
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
