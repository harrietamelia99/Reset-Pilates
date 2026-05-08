import { cn } from "@/lib/cn";

type Props = {
  aspect?: "video" | "square" | "portrait";
  className?: string;
};

export function PlaceholderImage({ aspect = "video", className }: Props) {
  const ratio =
    aspect === "square" ? "aspect-square" : aspect === "portrait" ? "aspect-[3/4]" : "aspect-video";
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden border border-light-grey/80 bg-gradient-to-br from-cream/70 via-light-grey to-light-grey text-sm text-warm-grey shadow-inner",
        ratio,
        className
      )}
    >
      [ Photography coming soon ]
    </div>
  );
}
