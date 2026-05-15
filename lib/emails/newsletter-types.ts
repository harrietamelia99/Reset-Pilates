/** Structured newsletter content: rendered into React Email (no raw HTML from AI). */
export type NewsletterContent = {
  headline: string;
  intro: string;
  sections: { heading: string; body: string }[];
  closing: string;
  ctaLabel: string;
  /** Absolute URL */
  ctaUrl: string;
};

export function isNewsletterContent(v: unknown): v is NewsletterContent {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  if (typeof o.headline !== "string" || typeof o.intro !== "string" || typeof o.closing !== "string")
    return false;
  if (typeof o.ctaLabel !== "string" || typeof o.ctaUrl !== "string") return false;
  if (!Array.isArray(o.sections)) return false;
  for (const s of o.sections) {
    if (!s || typeof s !== "object") return false;
    const sec = s as Record<string, unknown>;
    if (typeof sec.heading !== "string" || typeof sec.body !== "string") return false;
  }
  return true;
}
