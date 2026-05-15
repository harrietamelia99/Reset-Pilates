const encoder = new TextEncoder();

function toBase64UrlBytes(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function toBase64Url(buf: ArrayBuffer): string {
  return toBase64UrlBytes(new Uint8Array(buf));
}

function fromBase64Url(s: string): Uint8Array {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function importHmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export const STUDIO_COOKIE_NAME = "reset_studio";

function getSecret(): string | null {
  const s = process.env.STUDIO_SESSION_SECRET?.trim();
  if (!s || s.length < 16) return null;
  return s;
}

/** 7-day signed session cookie value (Edge + Node compatible). */
export async function signStudioSessionValue(): Promise<string | null> {
  const secret = getSecret();
  if (!secret) return null;
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const payload = JSON.stringify({ exp, v: 1 });
  const payloadB64 = toBase64UrlBytes(encoder.encode(payload));
  const key = await importHmacKey(secret);
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payloadB64));
  return `${payloadB64}.${toBase64Url(sig)}`;
}

export async function verifyStudioSessionValue(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = getSecret();
  if (!secret) return false;
  const i = token.lastIndexOf(".");
  if (i <= 0) return false;
  const payloadB64 = token.slice(0, i);
  const sigB64 = token.slice(i + 1);
  if (!payloadB64 || !sigB64) return false;

  try {
    const key = await importHmacKey(secret);
    const sigBytes = fromBase64Url(sigB64);
    const ok = await crypto.subtle.verify(
      "HMAC",
      key,
      new Uint8Array(sigBytes),
      encoder.encode(payloadB64)
    );
    if (!ok) return false;
    const payloadJson = new TextDecoder().decode(fromBase64Url(payloadB64));
    const payload = JSON.parse(payloadJson) as { exp?: number; v?: number };
    if (payload.v !== 1 || typeof payload.exp !== "number") return false;
    if (payload.exp < Math.floor(Date.now() / 1000)) return false;
    return true;
  } catch {
    return false;
  }
}
