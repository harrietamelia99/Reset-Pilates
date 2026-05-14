import { forwardRef } from "react";
import type { CSSProperties } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Light wordmark on dark strips (footer). SVG is black; inverted for contrast. */
  variant?: "default" | "light";
  as?: "span" | "h1";
  style?: CSSProperties;
};

/**
 * Brand wordmark — vector at `public/brand/reset-wordmark.svg` (tight viewBox; matches export spacing).
 * Default `h-*` targets nav bar (footer passes its own `className`).
 */
export const LogoWordmark = forwardRef<HTMLImageElement, Props>(function LogoWordmark(
  { className, variant = "default", as: Tag = "span", style },
  ref
) {
  const img = (
    <Image
      ref={ref}
      src="/brand/reset-wordmark.svg"
      alt="reset."
      width={530}
      height={170}
      unoptimized
      draggable={false}
      className={cn(
        "h-[clamp(1.5rem,3.25vw,2rem)] w-auto max-w-full",
        variant === "light" && "brightness-0 invert",
        className
      )}
      style={style}
    />
  );

  if (Tag === "h1") {
    return <h1 className="m-0 inline-block p-0 leading-none">{img}</h1>;
  }

  return img;
});

LogoWordmark.displayName = "LogoWordmark";
