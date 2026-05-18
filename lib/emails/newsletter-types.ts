/** Structured newsletter content: rendered into React Email (no raw HTML from AI). */
export type NewsletterSection = {
  heading: string;
  body: string;
  /** Hosted absolute https URL — must appear in Mari's uploaded assets list. */
  imageUrl?: string;
  /** Short alt text for accessibility (AI or Mari). */
  imageAlt?: string;
};

export type NewsletterContent = {
  headline: string;
  intro: string;
  /** Optional hero image below intro. */
  heroImageUrl?: string;
  heroImageAlt?: string;
  sections: NewsletterSection[];
  closing: string;
  ctaLabel: string;
  /** Absolute URL */
  ctaUrl: string;
};

function isHttpsUrl(s: string): boolean {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
}

export function isNewsletterContent(v: unknown): v is NewsletterContent {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (typeof o.headline !== "string" || typeof o.intro !== "string" || typeof o.closing !== "string") return false;
  if (typeof o.ctaLabel !== "string" || typeof o.ctaUrl !== "string") return false;
  if (o.heroImageUrl != null && (typeof o.heroImageUrl !== "string" || !isHttpsUrl(o.heroImageUrl))) return false;
  if (o.heroImageAlt != null && typeof o.heroImageAlt !== "string") return false;
  if (!Array.isArray(o.sections)) return false;
  for (const s of o.sections) {
    if (!s || typeof s !== "object") return false;
    const sec = s as Record<string, unknown>;
    if (typeof sec.heading !== "string" || typeof sec.body !== "string") return false;
    if (sec.imageUrl != null && (typeof sec.imageUrl !== "string" || !isHttpsUrl(sec.imageUrl))) return false;
    if (sec.imageAlt != null && typeof sec.imageAlt !== "string") return false;
  }
  return true;
}
