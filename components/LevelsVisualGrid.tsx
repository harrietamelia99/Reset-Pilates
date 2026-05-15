import type { LucideIcon } from "lucide-react";
import { Blend, Flame, LineChart, Sparkles, UserPlus } from "lucide-react";
import type { LEVELS_TILES } from "@/lib/studio-content";

const ICONS: Record<(typeof LEVELS_TILES)[number]["id"], LucideIcon> = {
  beginners: UserPlus,
  mixed: Blend,
  intermediate: LineChart,
  renew: Sparkles,
  rebuild: Flame,
};

type Tile = (typeof LEVELS_TILES)[number];

export function LevelsVisualGrid({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {tiles.slice(0, 3).map((t) => (
          <LevelCard key={t.id} tile={t} variant="soft" />
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {tiles.slice(3).map((t) => (
          <LevelCard key={t.id} tile={t} variant="accent" />
        ))}
      </div>
    </div>
  );
}

function LevelCard({ tile, variant }: { tile: Tile; variant: "soft" | "accent" }) {
  const Icon = ICONS[tile.id];
  const isAccent = variant === "accent";

  return (
    <div
      className={
        isAccent
          ? "flex gap-4 border border-charcoal/12 bg-charcoal/[0.03] p-4 md:p-5"
          : "flex gap-4 border border-light-grey bg-white p-4 md:p-5"
      }
    >
      <div
        className={
          isAccent
            ? "flex h-11 w-11 shrink-0 items-center justify-center border border-charcoal/15 bg-charcoal text-white"
            : "flex h-11 w-11 shrink-0 items-center justify-center border border-charcoal/10 bg-light-grey/40 text-charcoal"
        }
        aria-hidden
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <h3 className="text-sm font-bold uppercase tracking-heading text-charcoal">{tile.title}</h3>
          {"subtitle" in tile && tile.subtitle ? (
            <span className="font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">{tile.subtitle}</span>
          ) : null}
        </div>
        <p className="mt-2 font-accent text-[13px] leading-relaxed text-mid-grey md:text-sm">{tile.line}</p>
      </div>
    </div>
  );
}
