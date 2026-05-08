import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  className?: string;
  /** Light mark for dark backgrounds (inverts artwork). */
  variant?: "default" | "light";
  as?: "span" | "h1";
  /** Prefer for above-the-fold marks (e.g. nav). */
  priority?: boolean;
};

/**
 * Brand logo — SVG at `/images/brand-logo.svg`.
 */
export function LogoWordmark({ className, variant = "default", as: Tag = "span", priority }: Props) {
  return (
    <Tag
      className={cn(
        "inline-flex shrink-0 items-center overflow-visible",
        variant === "light" && "[&_img]:brightness-0 [&_img]:invert",
        className
      )}
    >
      <Image
        src="/images/brand-logo.svg"
        alt="Reset Pilates — Mat, Reformer & Hot Mat Pilates"
        width={2880}
        height={1800}
        className="block h-full w-auto max-w-full object-contain object-left"
        unoptimized
        priority={priority}
      />
    </Tag>
  );
}
