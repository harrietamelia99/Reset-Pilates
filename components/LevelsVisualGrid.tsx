import type { LEVELS_TILES } from "@/lib/studio-content";

type Tile = (typeof LEVELS_TILES)[number];

export function LevelsVisualGrid({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <div className="mt-6 space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        {tiles.slice(0, 3).map((t, i) => (
          <LevelCard key={t.id} tile={t} variant="soft" number={i + 1} />
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

function LevelCard({ tile, variant, number }: { tile: Tile; variant: "soft" | "accent"; number?: number }) {
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
        {number != null ? (
          <span className="font-accent text-lg font-bold tabular-nums leading-none tracking-tight">{number}</span>
        ) : null}
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
