"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Full-bleed “reset.” behind the flyer — viewport-wide (no side inset),
 * baseline flush with the hero / next-section split (no bottom gap).
 */
export function HeroBackgroundWordmark() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [scale, setScale] = useState(1);
  const [visible, setVisible] = useState(false);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fit = () => {
      text.style.transform = "translateY(0) scale(1)";
      void text.offsetWidth;

      /** Match full layout viewport (avoids 1–2px gutters vs `100vw` + scrollbar quirks). */
      const targetW = document.documentElement.clientWidth;
      const tw = text.getBoundingClientRect().width;
      if (targetW <= 0 || tw <= 0) return;

      /**
       * Tiny horizontal overscale so anti-aliasing/subpixels still read edge-to-edge
       * under `overflow-hidden` on the hero (fills screen with no side padding).
       */
      const next = (targetW / tw) * 1.006;
      setScale(next);
      setVisible(true);
    };

    const scheduleFit = () => {
      requestAnimationFrame(fit);
    };

    void document.fonts.ready.then(scheduleFit);
    scheduleFit();

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(fit);
    });
    ro.observe(container);

    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex w-full min-w-full max-w-none items-end justify-center overflow-visible"
      aria-hidden
    >
      <span
        ref={textRef}
        className="block max-w-none whitespace-nowrap font-normal lowercase leading-none antialiased"
        style={{
          fontFamily: 'var(--font-logo-wordmark), Georgia, "Times New Roman", serif',
          fontWeight: 400,
          fontFeatureSettings: '"kern" 1',
          fontSize: "256px",
          letterSpacing: "0.09em",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          color: "rgba(43, 43, 41, 0.92)",
          transform: `translateY(1px) scale(${scale})`,
          transformOrigin: "center bottom",
          opacity: visible ? 1 : 0,
          transition: visible ? "opacity 0.15s ease-out" : undefined,
          textShadow:
            "0 1px 0 rgba(255,255,255,0.1), 0 4px 32px rgba(255,255,255,0.12)",
        }}
      >
        reset.
      </span>
    </div>
  );
}
