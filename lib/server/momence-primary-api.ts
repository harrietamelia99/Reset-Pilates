/**
 * Momence Primary (site/embed) HTTP API — list resources for your host.
 * Base: https://momence.com/_api/primary/api/v1
 *
 * Credentials are passed as query params ({ hostId, token }). Keep both server-only env vars.
 * This is separate from OAuth2 Momence Public API (api.momence.com).
 */

export const MOMENCE_PRIMARY_RESOURCES = ["Events", "Videos", "Memberships", "Products", "Teachers"] as const;

export type MomencePrimaryResource = (typeof MOMENCE_PRIMARY_RESOURCES)[number];

export function isMomencePrimaryResource(s: string): s is MomencePrimaryResource {
  return (MOMENCE_PRIMARY_RESOURCES as readonly string[]).includes(s);
}

export type MomencePrimaryApiConfig = {
  /** e.g. https://momence.com/_api/primary/api/v1 */
  baseUrl: string;
  hostId: string;
  token: string;
};

/** Reads server env. Missing values => null. */
export function getMomencePrimaryApiConfig(): MomencePrimaryApiConfig | null {
  const hostId = process.env.MOMENCE_HOST_ID?.trim();
  const token =
    process.env.MOMENCE_PRIMARY_SITE_TOKEN?.trim() || process.env.MOMENCE_SITE_TOKEN?.trim();

  if (!hostId || !token) return null;

  const baseUrl =
    process.env.MOMENCE_PRIMARY_API_BASE?.trim().replace(/\/+$/, "") ||
    "https://momence.com/_api/primary/api/v1";

  return { baseUrl, hostId, token };
}

export type FetchMomencePrimaryResult =
  | { ok: true; status: number; data: unknown }
  | {
      ok: false;
      error: "not_configured" | "upstream_error" | "invalid_json";
      status?: number;
      message?: string;
    };

/**
 * GET `{baseUrl}/{resource}?hostId=…&token=…`
 */
export async function fetchMomencePrimaryResource(
  resource: MomencePrimaryResource
): Promise<FetchMomencePrimaryResult> {
  const cfg = getMomencePrimaryApiConfig();
  if (!cfg) {
    return { ok: false, error: "not_configured" };
  }

  const url = new URL(`${cfg.baseUrl.replace(/\/+$/, "")}/${resource}`);
  url.searchParams.set("hostId", cfg.hostId);
  url.searchParams.set("token", cfg.token);

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
      next: { revalidate: 0 },
    });
  } catch (e) {
    return {
      ok: false,
      error: "upstream_error",
      message: e instanceof Error ? e.message : "fetch failed",
    };
  }

  const text = await res.text();
  if (!text) {
    return res.ok ? { ok: true, status: res.status, data: null } : { ok: false, error: "upstream_error", status: res.status };
  }

  try {
    const data = JSON.parse(text) as unknown;
    if (!res.ok) {
      return { ok: false, error: "upstream_error", status: res.status, message: typeof data === "object" ? undefined : text };
    }
    return { ok: true, status: res.status, data };
  } catch {
    return { ok: false, error: "invalid_json", status: res.status, message: text.slice(0, 200) };
  }
}
