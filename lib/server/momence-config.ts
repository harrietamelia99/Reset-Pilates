/**
 * Server-only Momence Public API configuration.
 * Create a client: https://momence.com/dashboard/profile?host-redirect=public-api-clients
 * Auth (OAuth2): https://api.docs.momence.com/docs/getting-started
 *
 * Access tokens expire within a few hours; production code should use refresh_token,
 * or client_id + client_secret to obtain tokens on demand.
 */

export type MomenceEnvConfig = {
  /** e.g. https://api.momence.com */
  apiBaseUrl: string;
  clientId: string | undefined;
  clientSecret: string | undefined;
  /** Short-lived bearer from password / auth-code / refresh flow */
  accessToken: string | undefined;
  refreshToken: string | undefined;
};

export function getMomenceEnvConfig(): MomenceEnvConfig {
  const apiBaseUrl =
    process.env.MOMENCE_API_BASE_URL?.trim().replace(/\/+$/, "") || "https://api.momence.com";

  return {
    apiBaseUrl,
    clientId: process.env.MOMENCE_CLIENT_ID?.trim() || undefined,
    clientSecret: process.env.MOMENCE_CLIENT_SECRET?.trim() || undefined,
    accessToken:
      process.env.MOMENCE_ACCESS_TOKEN?.trim() || process.env.MOMENCE_TOKEN?.trim() || undefined,
    refreshToken: process.env.MOMENCE_REFRESH_TOKEN?.trim() || undefined,
  };
}

/** True if enough is set to try an API call (you may still get 401 if the access token expired). */
export function hasMomenceApiCredentials(): boolean {
  const c = getMomenceEnvConfig();
  if (c.accessToken) return true;
  return Boolean(c.clientId && c.clientSecret);
}
