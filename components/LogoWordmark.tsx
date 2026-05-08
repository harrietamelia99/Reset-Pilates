import { forwardRef } from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Light ink on dark strips (footer, etc.). */
  variant?: "default" | "light";
  as?: "span" | "h1";
  style?: CSSProperties;
};

/**
 * Wordmark “reset.” — Bethany Elingston (`--font-logo-wordmark`, self-hosted OTF).
 * Letter-spacing: 24px on the wordmark (override in nav/footer where smaller type needs tighter tracking).
 */
export const LogoWordmark = forwardRef<HTMLElement, Props>(function LogoWordmark(
  { className, variant = "default", as: Tag = "span", style },
  ref
) {
  return (
    <Tag
      ref={ref as React.Ref<HTMLSpanElement & HTMLHeadingElement>}
      className={cn(
        "font-logo font-normal lowercase leading-none antialiased",
        "tracking-[24px] [font-feature-settings:'kern'_1]",
        variant === "light" ? "text-white" : "text-charcoal",
        className
      )}
      style={style}
    >
      reset.
    </Tag>
  );
});

LogoWordmark.displayName = "LogoWordmark";
