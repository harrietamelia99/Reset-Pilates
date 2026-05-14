import { cn } from "@/lib/cn";

const aspectClass: Record<"5/3" | "4/3" | "3/4" | "video" | "wide", string> = {
  "5/3": "aspect-[5/3]",
  "4/3": "aspect-[4/3]",
  "3/4": "aspect-[3/4]",
  video: "aspect-video",
  /** Short panoramic strip */
  wide: "aspect-[21/9] min-h-[140px] max-h-[200px]",
};

export type ImagePlaceholderAspect = keyof typeof aspectClass;

type Props = {
  /** Describes the image that will replace this block */
  caption: string;
  aspect?: ImagePlaceholderAspect;
  className?: string;
};

/**
 * Bordered, labelled block for photography or illustrations not yet added.
 * Swap for `next/image` (or remove) when assets are ready.
 */
export function ImagePlaceholder({ caption, aspect = "5/3", className }: Props) {
  return (
    <figure
      className={cn(
        "relative w-full overflow-hidden border border-charcoal/10 bg-gradient-to-br from-light-grey/45 via-white to-light-grey/55",
        aspectClass[aspect],
        className
      )}
    >
      <figcaption className="sr-only">Image placeholder: {caption}</figcaption>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, #2b2b29 0, #2b2b29 1px, transparent 1px, transparent 11px)",
        }}
        aria-hidden
      />
      <div className="relative flex h-full min-h-[8rem] flex-col items-center justify-center gap-1.5 px-6 py-8 text-center sm:min-h-0">
        <span className="font-accent text-[10px] uppercase tracking-[0.22em] text-warm-grey">
          Image placeholder
        </span>
        <span className="max-w-md font-accent text-xs leading-relaxed text-mid-grey">{caption}</span>
      </div>
    </figure>
  );
}
