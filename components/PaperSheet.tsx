"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Decorative paper clip SVG top-left */
  pin?: boolean;
  /** Stronger folds + pure white — recruitment flyer reference */
  poster?: boolean;
};

export function PaperSheet({ children, className, pin = true, poster = false }: Props) {
  const reactId = useId().replace(/:/g, "");
  const gradId = `clip-metal-${reactId}`;
  const shadowId = `clip-shadow-${reactId}`;

  return (
    <div
      className={cn(
        "paper-sheet relative bg-white text-charcoal",
        poster && "poster-paper",
        className
      )}
    >
      {pin && (
        <span
          className="pointer-events-none absolute -left-0.5 -top-1 z-10 w-10 drop-shadow-sm"
          aria-hidden
        >
          {/* Classic gem clip wire — scaled Lucide-style path, metallic stroke */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="-rotate-[18deg]"
          >
            <defs>
              <linearGradient id={gradId} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#545456" />
                <stop offset="0.28" stopColor="#FFFFFF" />
                <stop offset="0.52" stopColor="#8E898A" />
                <stop offset="0.78" stopColor="#C6C5C4" />
                <stop offset="1" stopColor="#2b2b29" />
              </linearGradient>
              <filter
                id={shadowId}
                x="-35%"
                y="-35%"
                width="170%"
                height="170%"
                colorInterpolationFilters="sRGB"
              >
                <feDropShadow
                  dx="0.4"
                  dy="1.2"
                  stdDeviation="1.1"
                  floodColor="#2b2b29"
                  floodOpacity="0.28"
                />
              </filter>
            </defs>
            {/* Soft ground shadow on paper */}
            <path
              d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.38-8.38A4 4 0 1 1 18 18l-8.38 8.38a2 2 0 0 1-2.83-2.83l8.49-8.48"
              stroke="rgba(43, 43, 41, 0.12)"
              strokeWidth="2.15"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              transform="translate(0.35 0.55)"
            />
            <path
              d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.38-8.38A4 4 0 1 1 18 18l-8.38 8.38a2 2 0 0 1-2.83-2.83l8.49-8.48"
              stroke={`url(#${gradId})`}
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              filter={`url(#${shadowId})`}
            />
          </svg>
        </span>
      )}
      <span className="crease-overlay pointer-events-none absolute inset-0" aria-hidden />
      {children}
    </div>
  );
}
