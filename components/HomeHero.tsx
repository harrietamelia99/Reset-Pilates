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
import { PaperSheet } from "@/components/PaperSheet";

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
        <div className="absolute inset-0 bg-mid-grey/38" aria-hidden />
      </div>
      <div className="grain-layer z-[1]" aria-hidden />
      <div className="vignette-layer z-[1]" aria-hidden />

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
                  <PaperSheet poster className="px-5 py-5 sm:px-7 sm:py-6 md:px-9 md:py-7 lg:px-11 lg:py-8">
                    <p className="font-accent text-[9px] uppercase tracking-[0.2em] text-charcoal md:text-[10px]">
                      Pre-launch announcement
                    </p>

                    <div className="rule-section my-2.5 md:my-4" />

                    <p className="text-center font-sans text-[10px] uppercase tracking-[0.28em] text-charcoal md:text-[11px]">
                      Nailsea · North Somerset
                    </p>

                    <h1 className="mt-3 text-center text-2xl font-bold uppercase leading-[1.05] tracking-heading text-charcoal sm:text-3xl md:mt-6 md:text-4xl md:leading-[1] lg:mt-8 lg:text-[2.85rem]">
                      <span className="block">Your new</span>
                      <span className="block">
                        <span className="relative mx-auto inline-block">
                          Reset ritual
                          <span className="absolute bottom-[0.08em] left-full ml-[0.06em] inline-block leading-none">
                            .
                          </span>
                        </span>
                      </span>
                    </h1>

                    <div className="rule-section my-3 md:my-5 lg:my-6" />

                    <p className="text-center font-accent text-[13px] leading-snug text-charcoal md:text-sm">
                      Reformer, Hot Mat & Mat Pilates.
                    </p>

                    <p className="mt-2.5 text-center font-accent text-[9px] uppercase tracking-[0.18em] text-charcoal md:mt-3 md:text-[10px]">
                      Opening 1st June 2026 — Founding memberships now available
                    </p>

                    <div className="rule-section my-4 md:my-6 lg:my-7" />

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
                        className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal/40 bg-white px-8 py-3 text-center text-xs font-bold uppercase tracking-wide text-charcoal transition hover:border-charcoal/65 hover:bg-light-grey"
                      >
                        <LayoutList className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
                        View Classes
                      </Link>
                    </div>

                    <div className="mt-4 border-t border-charcoal pt-3 md:mt-6 md:pt-5">
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
      </div>
    </section>
  );
}
