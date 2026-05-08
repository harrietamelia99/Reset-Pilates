import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  as?: "span" | "h1";
};

/**
 * Brand wordmark — Bodoni Moda (Didone-style serif, `--font-logo-serif`).
 * Lowercase "reset." with full stop; do not alter.
 */
export function LogoWordmark({ className, as: Tag = "span" }: Props) {
  return (
    <Tag className={cn("font-logo font-normal lowercase tracking-tight", className)}>
      reset.
    </Tag>
  );
}
