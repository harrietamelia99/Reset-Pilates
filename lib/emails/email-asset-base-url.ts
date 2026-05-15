/**
 * Base URL for `/public` assets used in email `<img src>` (header, icons).
 * Defaults match `getSiteUrl()` but you can override so images load during local preview
 * while links still use another origin (e.g. EMAIL_ASSET_BASE_URL=http://localhost:3000 with `next dev` running).
 */
export function getEmailAssetBaseUrl(): string {
  return (
    process.env.EMAIL_ASSET_BASE_URL?.trim() ||
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    "https://resetpilatesstudio.co.uk"
  ).replace(/\/+$/, "");
}
