"use client";

import Link from "next/link";
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
      <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-2.5 pr-12 text-center md:px-6">
        <Link
          href="/pricing"
          className="font-accent text-[10px] uppercase tracking-[0.15em] text-white underline-offset-4 transition hover:underline md:text-xs"
        >
          {OPENING_DATE_LABEL}
        </Link>
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 font-accent text-[10px] uppercase tracking-widest text-light-grey hover:text-white"
          aria-label="Dismiss announcement"
        >
          Close
        </button>
      </div>
    </div>
  );
}
