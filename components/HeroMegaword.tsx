"use client";

/**
 * Large “reset.” behind the hero flyer — standalone markup/styles so nav/footer LogoWordmark
 * (fixed 24px tracking, cn merge order) cannot override hero sizing or colour.
 */
export function HeroMegaword() {
  return (
    <div
      className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center"
      aria-hidden
    >
      <span
        className="pointer-events-none select-none whitespace-nowrap lowercase leading-none antialiased"
        style={{
          fontFamily: 'var(--font-logo-wordmark), Georgia, "Times New Roman", serif',
          fontWeight: 400,
          fontFeatureSettings: '"kern" 1',
          color: "var(--color-charcoal)",
          letterSpacing: "0.11em",
          /**
           * Keep total word width ≤ ~100vw so `overflow-hidden` on the hero doesn’t clip to “r” + “.” only.
           * ~6 glyphs + tracking → cap font-size ~22–26vw equivalent (see max below).
           */
          fontSize:
            "clamp(3.25rem, calc((100vw - 32px) / 6.25), 12.5rem)",
          textShadow:
            "0 1px 0 rgba(255,255,255,0.14), 0 4px 36px rgba(255,255,255,0.18)",
          width: "max-content",
          maxWidth: "100%",
          boxSizing: "border-box",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        reset.
      </span>
    </div>
  );
}
