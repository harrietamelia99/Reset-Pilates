"use client";

import Image from "next/image";

type Props = {
  /** Pass `true` for above-the-fold hero LCP */
  priority?: boolean;
};

/** Same texture + gradient stack as {@link HomeHero} — reuse on poster strips site-wide */
export function PosterHeroBackdrop({ priority = false }: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0">
        <Image
          src="/images/hero-industrial-texture.png"
          alt=""
          fill
          priority={priority}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/[0.06] via-transparent to-black/25"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/[0.04]"
        aria-hidden
      />
    </div>
  );
}
