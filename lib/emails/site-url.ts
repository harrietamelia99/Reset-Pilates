/** Absolute site URL for email links (set in production on Vercel). */
export function getSiteUrl(): string {
  return (
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://resetpilatesstudio.co.uk"
  );
}
