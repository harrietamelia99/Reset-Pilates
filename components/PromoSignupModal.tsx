"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { EmailAlertsForm } from "@/components/EmailAlertsForm";

const STORAGE_DISMISS = "reset-promo-updates-dismissed";
const STORAGE_SUBSCRIBED = "reset-promo-updates-subscribed";
const SHOW_DELAY_MS = 1400;

/**
 * One-time style prompt for email updates. Skips /studio, respects localStorage after dismiss or signup.
 */
export function PromoSignupModal() {
  const pathname = usePathname();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  const close = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_DISMISS, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  }, []);

  const onSignupSuccess = useCallback(() => {
    try {
      localStorage.setItem(STORAGE_SUBSCRIBED, "1");
    } catch {
      /* ignore */
    }
    window.setTimeout(() => setOpen(false), 2200);
  }, []);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!pathname || pathname.startsWith("/studio")) return;

    let dismissed = false;
    let subscribed = false;
    try {
      dismissed = localStorage.getItem(STORAGE_DISMISS) === "1";
      subscribed = localStorage.getItem(STORAGE_SUBSCRIBED) === "1";
    } catch {
      /* private mode */
    }
    if (dismissed || subscribed) return;

    const t = window.setTimeout(() => setOpen(true), SHOW_DELAY_MS);
    return () => window.clearTimeout(t);
  }, [hydrated, pathname]);

  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    window.setTimeout(() => {
      panelRef.current?.querySelector<HTMLElement>("#promo-email")?.focus();
    }, 0);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused.current?.focus?.();
    };
  }, [open, close]);

  if (!hydrated || !open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button
        type="button"
        className="absolute inset-0 bg-charcoal/60 backdrop-blur-[2px] transition-opacity"
        aria-label="Close dialog"
        onClick={close}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-charcoal shadow-2xl"
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-charcoal" aria-hidden />
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.12]">
          <Image
            src="/images/promo-modal-background.png"
            alt=""
            fill
            className="object-cover object-center brightness-[0.38] saturate-[0.7]"
            sizes="(max-width: 640px) 100vw, 448px"
          />
        </div>
        <div className="absolute inset-0 z-[2] bg-charcoal/96 backdrop-blur-[2px]" aria-hidden />
        <div className="relative z-[3] p-4 sm:p-5">
          <div className="relative rounded-sm border border-white/10 bg-[#1c1c1a]/90 py-6 pl-5 pr-12 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm sm:py-7 sm:pl-6 sm:pr-14">
          <button
            type="button"
            onClick={close}
            className="absolute right-2.5 top-2.5 rounded p-2 text-white/90 transition hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-3 sm:top-3"
            aria-label="Close"
          >
            <X className="h-5 w-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]" strokeWidth={1.75} aria-hidden />
          </button>

          <p className="font-accent text-[10px] uppercase tracking-[0.14em] text-white/95 [text-shadow:0_1px_3px_rgba(0,0,0,0.55)]">
            Stay in the loop
          </p>
          <h2
            id={titleId}
            className="mt-2 text-xl font-bold uppercase tracking-heading text-white sm:text-2xl [text-shadow:0_1px_4px_rgba(0,0,0,0.55),0_0_28px_rgba(0,0,0,0.35)]"
          >
            Get opening updates
          </h2>
          <p className="mt-3 font-accent text-sm leading-relaxed text-white [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
            Timetable drops, founding offers, and studio news. No spam, just what you need to be first on the list.
          </p>

          <div className="mt-6">
            <EmailAlertsForm variant="dark" idPrefix="promo" onSuccess={onSignupSuccess} />
          </div>

          <button
            type="button"
            onClick={close}
            className="mt-4 w-full text-center font-accent text-[11px] uppercase tracking-wide text-white/90 underline-offset-4 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)] hover:text-white hover:underline"
          >
            Maybe later
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
