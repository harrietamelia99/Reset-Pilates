import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Light ink on dark strips (footer, etc.). */
  variant?: "default" | "light";
  as?: "span" | "h1";
};

/**
 * Wordmark “reset.” — Bethany Elingston (`--font-logo-wordmark`, self-hosted OTF).
 * Letter-spacing matches brand artwork: open, airy kerning (not condensed).
 */
export function LogoWordmark({ className, variant = "default", as: Tag = "span" }: Props) {
  return (
    <Tag
      className={cn(
        "font-logo font-normal lowercase leading-none antialiased",
        "tracking-[0.07em] [font-feature-settings:'kern'_1]",
        variant === "light" ? "text-white" : "text-charcoal",
        className
      )}
    >
      reset.
    </Tag>
  );
}
