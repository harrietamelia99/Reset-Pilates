/**
 * Send one live test of the combined waitlist + founding email (matches `/api/email-alerts` subscriber mail).
 *
 *   npx tsx --tsconfig tsconfig.json scripts/send-waitlist-test.tsx <email> [firstName]
 *
 * Requires RESEND_API_KEY + RESEND_FROM in `.env.local`.
 */
import { loadEnvConfig } from "@next/env";
import { Resend } from "resend";
import { getResendEmailConfig } from "../lib/server/resend-config";
import {
  renderPreLaunchWaitlistHtml,
  renderPreLaunchWaitlistPlainText,
} from "../lib/emails/render-templates";

const LIVE_SUBJECT = "You're on the waitlist: founding membership details";

/** Gmail threads identical subjects; stacked tests collapse behind “…” taps on mobile. */
function uniqueTestSubject(): string {
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  return `[TEST ${stamp}] ${LIVE_SUBJECT}`;
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

  const to = process.argv[2]?.trim();
  const firstName = process.argv[3]?.trim() || "there";

  if (!to?.includes("@")) {
    console.error("Usage: tsx scripts/send-waitlist-test.tsx <email> [firstName]");
    process.exit(1);
  }

  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM. Add them to .env.local.");
    process.exit(1);
  }

  const html = await renderPreLaunchWaitlistHtml({ firstName });
  const text = await renderPreLaunchWaitlistPlainText({ firstName });

  const resend = new Resend(config.apiKey);
  const { data, error } = await resend.emails.send({
    from: config.from,
    to: [to],
    subject: uniqueTestSubject(),
    html,
    text,
    headers: {
      "X-Reset-Email-Preview": "manual-waitlist-test",
    },
  });

  if (error) {
    console.error("Resend error:", error.message);
    process.exit(1);
  }

  console.log("Sent:", data?.id ?? "?");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
