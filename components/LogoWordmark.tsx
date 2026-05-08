import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Light ink on dark strips (footer, etc.). */
  variant?: "default" | "light";
  as?: "span" | "h1";
};

/**
 * Wordmark “reset.” — Bodoni Moda via `font-logo` (crisp at any size).
 * Avoid raster “SVG” logos that embed PNGs; they blur when scaled.
 */
export function LogoWordmark({ className, variant = "default", as: Tag = "span" }: Props) {
  return (
    <Tag
      className={cn(
        "font-logo font-normal lowercase tracking-tight antialiased",
        variant === "light" ? "text-white" : "text-charcoal",
        className
      )}
    >
      reset.
    </Tag>
  );
}
