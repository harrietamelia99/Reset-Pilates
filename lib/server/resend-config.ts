import { CONTACT } from "@/lib/constants";

export type ResendEmailConfig = {
  apiKey: string;
  /** Verified sender in Resend (e.g. Reset Pilates <hello@yourdomain.com>) */
  from: string;
  /** Inbox that receives form submissions */
  notifyTo: string;
};

/**
 * Reads Resend + routing from env. Missing `RESEND_API_KEY` or `RESEND_FROM` → null
 * (API routes should return 503 with a generic message).
 */
export function getResendEmailConfig(): ResendEmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM?.trim();
  if (!apiKey || !from) return null;

  const notifyTo = (process.env.NOTIFY_EMAIL ?? CONTACT.email).trim();
  return { apiKey, from, notifyTo };
}
