/** Public base URL for links returned to the browser (uploaded file URLs). */
export function publicOriginFromRequest(request: Request): string {
  const url = new URL(request.url);
  const proto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  if (proto && host) {
    return `${proto}://${host}`;
  }
  return `${url.protocol}//${url.host}`;
}
