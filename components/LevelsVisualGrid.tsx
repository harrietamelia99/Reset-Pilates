import type { LEVELS_TILES } from "@/lib/studio-content";

type Tile = (typeof LEVELS_TILES)[number];

export function LevelsVisualGrid({ tiles }: { tiles: readonly Tile[] }) {
  return (
    <div className="mt-6 grid gap-3 sm:grid-cols-3">
      {tiles.map((t, i) => (
        <LevelCard key={t.id} tile={t} number={i + 1} />
      ))}
    </div>
  );
}

function LevelCard({ tile, number }: { tile: Tile; number: number }) {
  return (
    <div className="flex gap-4 border border-light-grey bg-white p-4 md:p-5">
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center border border-charcoal/10 bg-light-grey/40 text-charcoal"
        aria-hidden
      >
        <span className="font-accent text-lg font-bold tabular-nums leading-none tracking-tight">{number}</span>
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold uppercase tracking-heading text-charcoal">{tile.title}</h3>
        <p className="mt-2 font-accent text-[13px] leading-relaxed text-mid-grey md:text-sm">{tile.line}</p>
      </div>
    </div>
  );
}
