"use client";

import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOKING_HREF, CONTACT, NAV_LINKS } from "@/lib/constants";
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

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-light-grey bg-white font-sans">
      {/** Toolbar must stack above `#mobile-nav` overlay or the menu button (→ X) is covered */}
      <div className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-6 bg-white px-4 py-5 md:px-6">
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
          <NavBookNow className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-md active:translate-y-0 active:shadow-sm" />
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
          "fixed inset-0 z-40 bg-white transition lg:hidden",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0 invisible"
        )}
      >
        <button
          type="button"
          className="absolute right-4 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/20 text-charcoal transition-all duration-300 hover:-translate-y-0.5 hover:bg-light-grey/80 hover:shadow-sm active:translate-y-0"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          <CloseIcon className="h-6 w-6 shrink-0" />
        </button>
        <nav
          className="mx-auto flex max-h-screen flex-col gap-1 overflow-y-auto px-6 pb-12 pt-24"
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
          <NavBookNow
            className="mt-6 inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-5 py-3 text-sm font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-md active:translate-y-0"
            onClick={() => setOpen(false)}
          />
          {/* TODO: Set BOOKING_HREF in lib/constants.ts to your live Momence URL when ready. */}
        </nav>
      </div>
    </header>
  );
}
