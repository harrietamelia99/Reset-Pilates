/**
 * Send one preview of the Summer Deals promotional email (Resend).
 *
 *   npm exec tsx --tsconfig tsconfig.json scripts/send-summer-deals-test.tsx <email>
 *
 * Requires RESEND_API_KEY + RESEND_FROM in `.env.local`.
 */
import { loadEnvConfig } from "@next/env";
import { render } from "@react-email/render";
import * as React from "react";
import { Resend } from "resend";
import SummerDealsEmail from "@/emails/summer-deals";
import { SUMMER_DEALS_EMAIL_SUBJECT } from "@/lib/emails/example-newsletter-summer-deals";
import { minifyEmailHtml } from "@/lib/emails/minify-email-html";
import { getResendEmailConfig } from "@/lib/server/resend-config";

function uniqueTestSubject(): string {
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  return `[TEST ${stamp}] ${SUMMER_DEALS_EMAIL_SUBJECT}`;
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

  const to = process.argv[2]?.trim() || "harriet@collectivstudio.uk";

  if (!to.includes("@")) {
    console.error("Usage: tsx scripts/send-summer-deals-test.tsx [email]");
    process.exit(1);
  }

  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM in .env.local.");
    process.exit(1);
  }

  const preview = "Claim your summer voucher! Enjoy 3 exclusive deals now.";
  const html = minifyEmailHtml(await render(<SummerDealsEmail preview={preview} />));
  const text = await render(<SummerDealsEmail preview={preview} />, { plainText: true });

  const subject = uniqueTestSubject();
  const resend = new Resend(config.apiKey);
  const { data, error } = await resend.emails.send({
    from: config.from,
    to: [to],
    subject,
    html,
    text,
    headers: {
      "X-Reset-Email-Preview": "summer-deals",
    },
  });

  if (error) {
    console.error("Resend error:", error.message);
    process.exit(1);
  }

  console.log("Sent:", data?.id ?? "?");
  console.log("Subject:", subject);
  console.log("To:", to);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
