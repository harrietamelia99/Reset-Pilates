import { Resend } from "resend";
import { renderWelcomeBookingHtml } from "@/lib/emails/render-templates";
import { getResendEmailConfig } from "@/lib/server/resend-config";
import type { WelcomeBookingEmailProps } from "@/emails/welcome-booking";

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

/**
 * Call from a booking webhook when a reservation is confirmed.
 * Subject line matches transactional tone of the welcome template.
 */
export async function sendWelcomeBookingEmail(
  to: string,
  props: WelcomeBookingEmailProps
): Promise<SendResult> {
  const config = getResendEmailConfig();
  if (!config) return { ok: false, reason: "not_configured" };

  const html = await renderWelcomeBookingHtml(props);
  const resend = new Resend(config.apiKey);
  const { error } = await resend.emails.send({
    from: config.from,
    to,
    subject: "You're booked — Reset Pilates",
    html,
  });

  if (error) {
    console.error("[sendWelcomeBookingEmail]", error);
    return { ok: false, reason: "send_failed" };
  }
  return { ok: true };
}
