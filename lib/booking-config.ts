/**
 * Momence scheduling embed (iframe `src`).
 * Default: Reset Pilates Momence storefront. Override with `NEXT_PUBLIC_MOMENCE_SCHEDULE_URL` if the link changes.
 */

export const BOOKING_PAGE_PATH = "/book" as const;

/** Public booking page — safe to ship in client bundle; override via env for a different host widget if needed. */
export const DEFAULT_MOMENCE_SCHEDULE_EMBED_URL = "https://momence.com/u/reset-pilates-NZotvt";

function resolvedScheduleUrl(): string {
  const fromEnv =
    typeof process.env.NEXT_PUBLIC_MOMENCE_SCHEDULE_URL === "string"
      ? process.env.NEXT_PUBLIC_MOMENCE_SCHEDULE_URL.trim()
      : "";
  return fromEnv || DEFAULT_MOMENCE_SCHEDULE_EMBED_URL;
}

/** Effective iframe `src` (env wins when set). */
export const MOMENCE_SCHEDULE_EMBED_URL = resolvedScheduleUrl();

/** True when the resolved URL is iframe-ready. */
export function hasMomenceScheduleEmbed(): boolean {
  const raw = resolvedScheduleUrl();
  if (!raw) return false;
  try {
    const u = new URL(raw);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

/** All “Book” CTAs route to `/book`. */
export function getBookingHref(): string {
  return BOOKING_PAGE_PATH;
}

/** “Coming soon” in the nav only if the resolved URL is invalid (e.g. bad env override). */
export function getBookingNavShowsComingSoonDialog(): boolean {
  return !hasMomenceScheduleEmbed();
}
