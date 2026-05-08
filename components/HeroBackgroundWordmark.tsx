"use client";

import type { RefObject } from "react";
import { useLayoutEffect, useRef, useState } from "react";

type Props = {
  /** Hero `<section>` — width matches painted bleed (handles sub-pixel vs generic `innerWidth`). */
  heroRef: RefObject<HTMLElement | null>;
};

/**
 * Reference layout: “reset.” edge-to-edge at hero bottom, behind the flyer — no side or bottom gutter.
 */
export function HeroBackgroundWordmark({ heroRef }: Props) {
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

      const hero = heroRef.current;
      const vv = window.visualViewport;
      const targetW = Math.max(
        hero?.getBoundingClientRect().width ?? 0,
        window.innerWidth,
        document.documentElement.clientWidth,
        vv?.width ?? 0
      );

      const tw = text.offsetWidth;
      if (targetW <= 0 || tw <= 0) return;

      /** Bleed past edges so hero `overflow-hidden` clips — reads flush like the mockup. */
      const next = (targetW / tw) * 1.068;
      setScale(next);
      setVisible(true);
    };

    const scheduleFit = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(fit);
      });
    };

    void document.fonts.ready.then(scheduleFit);
    scheduleFit();

    const ro = new ResizeObserver(() => {
      scheduleFit();
    });
    ro.observe(container);
    const heroEl = heroRef.current;
    if (heroEl) ro.observe(heroEl);

    window.addEventListener("resize", fit);
    const vv = window.visualViewport;
    vv?.addEventListener("resize", fit);
    vv?.addEventListener("scroll", fit);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
      vv?.removeEventListener("resize", fit);
      vv?.removeEventListener("scroll", fit);
    };
  }, [heroRef]);

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
          color: "var(--color-charcoal)",
          transform: `translateY(6px) scale(${scale})`,
          transformOrigin: "center bottom",
          opacity: visible ? 1 : 0,
          transition: visible ? "opacity 0.15s ease-out" : undefined,
          textShadow:
            "0 1px 0 rgba(255,255,255,0.08), 0 4px 28px rgba(255,255,255,0.12)",
        }}
      >
        reset.
      </span>
    </div>
  );
}
