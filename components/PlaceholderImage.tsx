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
        "flex items-center justify-center bg-light-grey text-sm text-warm-grey",
        ratio,
        className
      )}
    >
      [ Photography coming soon ]
    </div>
  );
}
