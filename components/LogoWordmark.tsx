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
 * Brand wordmark — vector at `public/brand/reset-wordmark.svg` (spacing matches design export).
 * Default height matches previous nav type scale; override with `className` (e.g. footer sizes).
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
      width={705}
      height={591}
      unoptimized
      draggable={false}
      className={cn(
        "h-[clamp(1.375rem,3.4vw,1.6875rem)] w-auto max-w-full",
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
