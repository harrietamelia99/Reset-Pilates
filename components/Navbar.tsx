"use client";

import Link from "next/link";
import { CalendarDays, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { BOOKING_HREF, BOOKING_NAV_SHOW_COMING_SOON_DIALOG, CONTACT, NAV_LINKS } from "@/lib/constants";
import { InstagramGlyph } from "@/components/icons/SocialBrandIcons";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { LogoWordmark } from "@/components/LogoWordmark";
import { cn } from "@/lib/cn";

function NavInstagram({ className }: { className?: string }) {
  return (
    <a
      href={CONTACT.instagram.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center p-1 text-charcoal transition-all duration-300 hover:-translate-y-px hover:opacity-70 active:translate-y-0",
        className
      )}
      aria-label={`Instagram (${CONTACT.instagram.handle})`}
    >
      <InstagramGlyph className="h-[22px] w-[22px] shrink-0" strokeWidth={1.5} />
    </a>
  );
}

function NavBookNow({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) {
  if (BOOKING_HREF.startsWith("/")) {
    return (
      <Link href={BOOKING_HREF} className={className} onClick={onClick}>
        <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
        Book Now
      </Link>
    );
  }
  return (
    <a href={BOOKING_HREF} className={className} onClick={onClick}>
      <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
      Book Now
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [bookingSoonOpen, setBookingSoonOpen] = useState(false);
  const bookingTitleId = useId();
  const bookingPanelRef = useRef<HTMLDivElement>(null);
  const bookingPrevFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!bookingSoonOpen) return;
    bookingPrevFocus.current = document.activeElement as HTMLElement | null;
    window.setTimeout(() => {
      bookingPanelRef.current?.querySelector<HTMLButtonElement>("[data-booking-dialog-close]")?.focus();
    }, 0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setBookingSoonOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      bookingPrevFocus.current?.focus?.();
    };
  }, [bookingSoonOpen]);

  return (
    <>
    <header
      className={cn(
        "sticky top-0 border-b border-light-grey bg-cream font-sans",
        /** Menu open: stack above `PreLaunchBanner` (z-60) so overlay isn’t clipped under it */
        open ? "z-[70]" : "z-50"
      )}
    >
      {/** Toolbar must stack above `#mobile-nav` overlay or the menu button (→ X) is covered */}
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-6 bg-cream px-4 py-5 md:px-6">
        <Link
          href="/"
          className="shrink-0"
          aria-label="Reset Pilates home"
          onClick={() => setOpen(false)}
        >
          <LogoWordmark />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-wide text-charcoal transition-all duration-300 hover:-translate-y-px hover:opacity-80"
            >
              {l.label}
            </Link>
          ))}
          <NavInstagram />
          {BOOKING_NAV_SHOW_COMING_SOON_DIALOG ? (
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-md active:translate-y-0 active:shadow-sm"
              onClick={() => setBookingSoonOpen(true)}
            >
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Book Now
            </button>
          ) : (
            <NavBookNow className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-md active:translate-y-0 active:shadow-sm" />
          )}
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <NavInstagram />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center border border-mid-grey"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <CloseIcon className="h-5 w-5 shrink-0" />
            ) : (
              <span className="flex flex-col gap-1.5">
                <span className="block h-px w-6 bg-charcoal transition" />
                <span className="block h-px w-6 bg-charcoal transition" />
                <span className="block h-px w-6 bg-charcoal transition" />
              </span>
            )}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 bg-cream transition lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 invisible"
        )}
      >
        <button
          type="button"
          className="absolute right-4 top-[max(1.25rem,env(safe-area-inset-top,0px))] flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-light-grey/80 hover:shadow-sm active:translate-y-0"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <CloseIcon className="h-6 w-6 shrink-0" />
        </button>
        <nav
          className="mx-auto flex max-h-screen flex-col gap-1 overflow-y-auto px-6 pb-12 pt-[max(7.5rem,calc(5.5rem+env(safe-area-inset-top,0px)))]"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-light-grey py-4 text-lg font-medium uppercase tracking-wide text-charcoal transition-all duration-300 hover:translate-x-1 hover:opacity-80"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={CONTACT.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border-b border-light-grey py-4 text-lg font-medium uppercase tracking-wide text-charcoal transition-all duration-300 hover:translate-x-1 hover:opacity-80"
            onClick={() => setOpen(false)}
          >
            <InstagramGlyph className="h-6 w-6 shrink-0" strokeWidth={1.5} aria-hidden />
            Instagram
          </a>
          {BOOKING_NAV_SHOW_COMING_SOON_DIALOG ? (
            <button
              type="button"
              className="mt-6 inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-md active:translate-y-0"
              onClick={() => {
                setBookingSoonOpen(true);
                setOpen(false);
              }}
            >
              <CalendarDays className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Book Now
            </button>
          ) : (
            <NavBookNow
              className="mt-6 inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-md active:translate-y-0"
              onClick={() => setOpen(false)}
            />
          )}
        </nav>
      </div>
    </header>

    {BOOKING_NAV_SHOW_COMING_SOON_DIALOG && bookingSoonOpen ? (
      <div
        className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
        role="presentation"
      >
        <button
          type="button"
          className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px]"
          aria-label="Close dialog"
          onClick={() => setBookingSoonOpen(false)}
        />
        <div
          ref={bookingPanelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={bookingTitleId}
          className="relative z-10 w-full max-w-md border border-charcoal/15 bg-white p-6 shadow-2xl sm:p-8"
        >
          <button
            type="button"
            data-booking-dialog-close
            className="absolute right-3 top-3 rounded p-2 text-mid-grey transition hover:bg-light-grey/60 hover:text-charcoal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal"
            aria-label="Close"
            onClick={() => setBookingSoonOpen(false)}
          >
            <X className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </button>
          <p className="font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">Booking</p>
          <h2 id={bookingTitleId} className="mt-2 text-xl font-bold uppercase tracking-heading text-charcoal sm:text-2xl">
            Coming soon
          </h2>
          <p className="mt-4 font-accent text-sm leading-relaxed text-mid-grey md:text-[15px]">
            You&apos;ll soon be able to schedule your classes in{" "}
            <span className="font-medium text-charcoal">Momence</span>. We&apos;re finishing the live timetable and
            booking link; in the meantime, pricing and FAQs are on the site, or email us at{" "}
            <a href={`mailto:${CONTACT.email}`} className="text-charcoal underline underline-offset-2 hover:opacity-80">
              {CONTACT.email}
            </a>
            .
          </p>
          <button
            type="button"
            className="mt-8 w-full border border-charcoal bg-charcoal py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95 hover:shadow-md active:translate-y-0 sm:w-auto sm:px-10"
            onClick={() => setBookingSoonOpen(false)}
          >
            OK
          </button>
        </div>
      </div>
    ) : null}
    </>
  );
}
