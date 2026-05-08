"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, LayoutList } from "lucide-react";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { staggerContainer, fadeItem } from "@/lib/motion";
import { BOOKING_HREF } from "@/lib/constants";
import { LogoWordmark } from "@/components/LogoWordmark";
import { PaperSheet } from "@/components/PaperSheet";

export function HomeHero() {
  const slotRef = useRef<HTMLDivElement>(null);
  const flyerRef = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, naturalH: 560 });
  const [flyerStyle, setFlyerStyle] = useState<CSSProperties>({
    transform: "scale(1)",
    transformOrigin: "top center",
  });

  useLayoutEffect(() => {
    const slot = slotRef.current;
    const flyer = flyerRef.current;
    if (!slot || !flyer) return;

    const applyFit = () => {
      const avail = Math.max(0, slot.clientHeight - 2);
      flushSync(() => {
        setFlyerStyle({ transform: "scale(1)", transformOrigin: "top center" });
      });
      const nh = flyer.offsetHeight;
      const scale = nh <= avail ? 1 : avail / nh;
      setFlyerStyle({ transform: `scale(${scale})`, transformOrigin: "top center" });
      setFit({ scale, naturalH: nh });
    };

    applyFit();

    const ro = new ResizeObserver(() => {
      requestAnimationFrame(applyFit);
    });
    ro.observe(slot);

    window.addEventListener("resize", applyFit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", applyFit);
    };
  }, []);

  const bridgeHeight = fit.naturalH * fit.scale;

  return (
    <section className="surface-poster-hero relative h-[100svh] max-h-[100svh] min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/hero-industrial-texture.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0 bg-gradient-to-br from-mid-grey/15 via-mid-grey/40 to-mid-grey/55"
          aria-hidden
        />
      </div>
      <div className="grain-layer z-[1]" aria-hidden />
      <div className="vignette-layer z-[1]" aria-hidden />

      <div className="relative z-10 mx-auto flex h-full min-h-0 max-w-6xl flex-col px-4 pb-4 pt-24 md:px-6 md:pb-6 md:pt-28 lg:pt-[7.5rem]">
        {/* Slot fills space above wordmark; flyer scales down to fit — no inner scroll */}
        <div
          ref={slotRef}
          className="relative flex min-h-0 flex-1 flex-col items-center justify-center overflow-visible py-1 md:py-2"
        >
          <div
            className="relative mx-auto w-full max-w-3xl overflow-visible px-2 sm:px-6"
            style={{
              height: bridgeHeight,
              maxHeight: "100%",
            }}
          >
            <div
              ref={flyerRef}
              style={flyerStyle}
              className="absolute left-0 right-0 top-0 w-full max-w-3xl will-change-transform"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="w-full py-1"
              >
                <motion.div variants={fadeItem}>
                  <PaperSheet poster className="px-6 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-14 lg:py-12">
                    <p className="font-accent text-[9px] uppercase tracking-[0.2em] text-charcoal md:text-[10px]">
                      Pre-launch announcement
                    </p>

                    <div className="rule-poster my-3 md:my-5" />

                    <p className="text-center font-sans text-[10px] uppercase tracking-[0.28em] text-charcoal md:text-[11px]">
                      Nailsea · North Somerset
                    </p>

                    <h1 className="mt-4 text-center text-2xl font-bold uppercase leading-[1.05] tracking-heading text-charcoal sm:text-3xl md:mt-8 md:text-4xl md:leading-[1] lg:mt-10 lg:text-[3.25rem]">
                      Your new reset ritual.
                    </h1>

                    <div className="rule-poster my-4 md:my-6 lg:my-8" />

                    <p className="text-center font-accent text-[13px] leading-snug text-charcoal md:text-sm">
                      Reformer, Hot Mat & Mat Pilates.
                    </p>

                    <p className="mt-3 text-center font-accent text-[9px] uppercase tracking-[0.18em] text-charcoal md:mt-4 md:text-[10px]">
                      Opening 1st June 2026 — Founding memberships now available
                    </p>

                    <div className="rule-poster my-5 md:my-7 lg:my-9" />

                    <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                      {BOOKING_HREF.startsWith("/") ? (
                        <Link
                          href={BOOKING_HREF}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90"
                        >
                          <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                          Book a Class
                        </Link>
                      ) : (
                        <a
                          href={BOOKING_HREF}
                          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-90"
                        >
                          <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                          Book a Class
                        </a>
                      )}
                      <Link
                        href="/classes"
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 border-2 border-charcoal bg-white px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-light-grey"
                      >
                        <LayoutList className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                        View Classes
                      </Link>
                    </div>

                    <div className="mt-6 border-t border-charcoal pt-4 md:mt-8 md:pt-6">
                      <p className="font-accent text-[8px] uppercase leading-relaxed tracking-[0.14em] text-charcoal md:text-[9px]">
                        Booking via Momence — link updates before launch.
                      </p>
                    </div>
                  </PaperSheet>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-auto flex shrink-0 flex-col items-center pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 text-center md:pb-5 md:pt-6"
        >
          <LogoWordmark className="text-[1.65rem] text-white md:text-[2.25rem] lg:text-[2.5rem]" />
          <p className="mt-3 font-accent text-[10px] uppercase tracking-[0.18em] text-white/55">
            Pilates studio
          </p>
        </motion.div>
      </div>
    </section>
  );
}
