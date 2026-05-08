import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Light ink on dark strips (footer, etc.). */
  variant?: "default" | "light";
  as?: "span" | "h1";
};

/**
 * Wordmark “reset.” — Bethany Elingston (`--font-logo-wordmark`, self-hosted OTF).
 * Tight tracking (~−0.19em) to match near-touching letter spacing in brand artwork.
 */
export function LogoWordmark({ className, variant = "default", as: Tag = "span" }: Props) {
  return (
    <Tag
      className={cn(
        "font-logo font-normal lowercase leading-none antialiased",
        "tracking-[-0.19em] [font-feature-settings:'kern'_1]",
        variant === "light" ? "text-white" : "text-charcoal",
        className
      )}
    >
      reset.
    </Tag>
  );
}
