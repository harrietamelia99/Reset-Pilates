"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Decorative paper clip — PNG at `/public/images/paperclip.png`, else inline SVG fallback */
  pin?: boolean;
  /** Stronger folds + pure white — recruitment flyer reference */
  poster?: boolean;
  /** No hairline border — flat panel on editorial backgrounds */
  flat?: boolean;
};

function PaperClipSvg() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-14 w-14 -rotate-[36deg]"
      aria-hidden
    >
      <path
        d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.38-8.38A4 4 0 1 1 18 18l-8.38 8.38a2 2 0 0 1-2.83-2.83l8.49-8.48"
        stroke="#2b2b29"
        strokeWidth="1.85"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function PaperSheet({ children, className, pin = true, poster = false, flat = false }: Props) {
  const [useSvgFallback, setUseSvgFallback] = useState(false);

  return (
    <div
      className={cn(
        "paper-sheet relative bg-white text-charcoal",
        poster && "poster-paper",
        flat && "!border-0",
        className
      )}
    >
      {pin && (
        <span className="pointer-events-none absolute -left-1 -top-5 z-10 h-14 w-14" aria-hidden>
          {useSvgFallback ? (
            <PaperClipSvg />
          ) : (
            <Image
              src="/images/paperclip.png"
              alt=""
              width={280}
              height={280}
              className="-rotate-[36deg] h-14 w-14 object-contain object-left-top"
              sizes="56px"
              onError={() => setUseSvgFallback(true)}
            />
          )}
        </span>
      )}
      <span className="crease-overlay pointer-events-none absolute inset-0" aria-hidden />
      {children}
    </div>
  );
}
