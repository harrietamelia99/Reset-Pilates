import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  as?: "span" | "h1";
};

/**
 * Brand wordmark — Playfair Display applied via parent layout (font-playfair class).
 * Lowercase "reset." with full stop; do not alter.
 */
export function LogoWordmark({ className, as: Tag = "span" }: Props) {
  return (
    <Tag className={cn("font-playfair lowercase tracking-tight", className)}>
      reset.
    </Tag>
  );
}
