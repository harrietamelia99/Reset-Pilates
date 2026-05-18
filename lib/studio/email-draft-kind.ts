export type StudioEmailDraftKind = "newsletter" | "alert";

export function studioEmailEyebrow(kind: StudioEmailDraftKind): string | undefined {
  return kind === "alert" ? "Update from Mari" : undefined;
}

export const STUDIO_EMAIL_PREVIEW_SUBJECT = {
  newsletter: "Newsletter preview — Reset Pilates (not sent to your list)",
  alert: "Update preview — Reset Pilates (not sent to your list)",
} as const;

export const STUDIO_EMAIL_PREVIEW_HEADER = {
  newsletter: "newsletter-studio",
  alert: "alert-studio",
} as const;
