import { cn } from "@/lib/cn";

type Props = {
  aspect?: "video" | "square" | "portrait";
  className?: string;
  /** Override default placeholder caption */
  caption?: string;
};

export function PlaceholderImage({
  aspect = "video",
  className,
  caption = "[ Photography coming soon ]",
}: Props) {
  const ratio =
    aspect === "square" ? "aspect-square" : aspect === "portrait" ? "aspect-[3/4]" : "aspect-video";
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-light-grey bg-light-grey px-3 text-center text-sm text-warm-grey",
        ratio,
        className
      )}
    >
      {caption}
    </div>
  );
}
