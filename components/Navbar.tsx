"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOKING_HREF, NAV_LINKS } from "@/lib/constants";
import { LogoWordmark } from "@/components/LogoWordmark";
import { cn } from "@/lib/cn";

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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-light-grey bg-white font-sans">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4 md:px-6">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <LogoWordmark className="text-2xl leading-none text-charcoal md:text-[1.75rem]" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-medium uppercase tracking-wide text-charcoal transition hover:opacity-80"
            >
              {l.label}
            </Link>
          ))}
          <NavBookNow className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-mid-grey" />
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center border border-mid-grey lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span
              className={cn(
                "block h-px w-6 bg-charcoal transition",
                open && "translate-y-[3px] rotate-45"
              )}
            />
            <span
              className={cn("block h-px w-6 bg-charcoal transition", open && "opacity-0")}
            />
            <span
              className={cn(
                "block h-px w-6 bg-charcoal transition",
                open && "-translate-y-[7px] -rotate-45"
              )}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav"
        className={cn(
          "fixed inset-0 z-40 bg-white transition lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 invisible"
        )}
      >
        <nav
          className="mx-auto flex max-h-screen flex-col gap-1 overflow-y-auto px-6 pb-12 pt-24"
          aria-label="Mobile"
        >
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="border-b border-light-grey py-4 text-lg font-medium uppercase tracking-wide text-charcoal"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <NavBookNow
            className="mt-6 inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-3 text-sm font-bold uppercase tracking-wide text-white"
            onClick={() => setOpen(false)}
          />
          {/* TODO: Set BOOKING_HREF in lib/constants.ts to your live Momence URL when ready. */}
        </nav>
      </div>
    </header>
  );
}
