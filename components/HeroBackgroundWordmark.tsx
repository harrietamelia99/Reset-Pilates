"use client";

import { useLayoutEffect, useRef, useState } from "react";

/**
 * Full-bleed “reset.” behind the flyer — matches poster mockup:
 * glyphs span hero width (measured uniform scale),
 * tight line box, baseline flush with hero / next-section split,
 * slight transparency so texture reads through.
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
      text.style.transform = "scale(1)";
      void text.offsetWidth;
      const cw = container.clientWidth;
      const tw = text.offsetWidth;
      if (cw <= 0 || tw <= 0) return;
      setScale(cw / tw);
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
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] flex items-end justify-center overflow-visible"
      aria-hidden
    >
      <span
        ref={textRef}
        className="inline-block max-w-none whitespace-nowrap font-normal lowercase leading-none antialiased"
        style={{
          fontFamily: 'var(--font-logo-wordmark), Georgia, "Times New Roman", serif',
          fontWeight: 400,
          fontFeatureSettings: '"kern" 1',
          /** Fixed design size; scale() fits container width — true edge-to-edge without stretch */
          fontSize: "256px",
          letterSpacing: "0.09em",
          lineHeight: 1,
          padding: 0,
          margin: 0,
          color: "rgba(43, 43, 41, 0.92)",
          transform: `scale(${scale})`,
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
