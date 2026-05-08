"use client";

import Link from "next/link";
import { Megaphone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { OPENING_DATE_LABEL } from "@/lib/constants";

const STORAGE_KEY = "reset-prelaunch-banner-dismissed";

export function PreLaunchBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="relative z-[60] border-b border-mid-grey bg-mid-grey text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-3 px-4 py-2.5 pr-14 text-center md:gap-4 md:px-6">
        <Megaphone className="hidden h-4 w-4 shrink-0 text-white/70 sm:block" strokeWidth={1.5} aria-hidden />
        <Link
          href="/pricing"
          className="font-accent text-[10px] uppercase tracking-[0.15em] text-white underline-offset-4 transition hover:underline md:text-xs"
        >
          {OPENING_DATE_LABEL}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-light-grey transition hover:bg-white/10 hover:text-white"
          aria-label="Dismiss announcement"
        >
          <X className="h-4 w-4" strokeWidth={1.5} aria-hidden />
        </button>
      </div>
    </div>
  );
}
