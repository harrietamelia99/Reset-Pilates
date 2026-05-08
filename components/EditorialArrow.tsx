import { cn } from "@/lib/cn";

const sizes = {
  /** Eyebrows, links */
  sm: "h-5 w-5",
  /** Default — section labels, cards */
  md: "h-9 w-9",
  /** Hero flyer, major bands */
  lg: "h-14 w-14",
} as const;

export type EditorialArrowSize = keyof typeof sizes;

type Props = {
  className?: string;
  /** Use on dark backgrounds */
  light?: boolean;
  /** Up-right (↗) or down-right (↘) */
  direction?: "ne" | "sw";
  /** Visual weight — default `md` is much larger than the old text glyph */
  size?: EditorialArrowSize;
};

/** Minimal diagonal arrow — thin strokes, inspired by editorial / poster marks */
function ArrowGlyph({ direction }: { direction: "ne" | "sw" }) {
  // viewBox 40×40: shaft + corner ticks at tip (line-art, not filled head)
  const sw = (
    <path
      d="M9 9 L29 29 M29 29 L20 29 M29 29 L29 20"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
  const ne = (
    <path
      d="M9 31 L31 9 M31 9 L22 9 M31 9 L31 18"
      stroke="currentColor"
      strokeWidth={1.65}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );

  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="block h-full w-full"
      aria-hidden
    >
      {direction === "sw" ? sw : ne}
    </svg>
  );
}

export function EditorialArrow({
  className,
  light,
  direction = "ne",
  size = "md",
}: Props) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center leading-none",
        sizes[size],
        light ? "text-white/55" : "text-charcoal/45",
        className
      )}
      aria-hidden
    >
      <ArrowGlyph direction={direction} />
    </span>
  );
}
