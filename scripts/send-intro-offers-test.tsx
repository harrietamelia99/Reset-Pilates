/**
 * Send one preview of the intro offers newsletter (Resend).
 *
 *   npx tsx --tsconfig tsconfig.json scripts/send-intro-offers-test.tsx <email> [firstName]
 *
 * Requires RESEND_API_KEY + RESEND_FROM in `.env.local`.
 */
import { loadEnvConfig } from "@next/env";
import { Resend } from "resend";
import {
  getIntroOffersNewsletterTemplate,
  INTRO_OFFERS_EMAIL_SUBJECT,
} from "@/lib/emails/example-newsletter-intro-offers";
import { minifyEmailHtml } from "@/lib/emails/minify-email-html";
import { getResendEmailConfig } from "@/lib/server/resend-config";
import { getSiteUrl } from "@/lib/emails/site-url";
import { renderNewsletterHtml, renderNewsletterPlainText } from "@/lib/emails/render-templates";

function uniqueTestSubject(): string {
  const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
  return `[TEST ${stamp}] ${INTRO_OFFERS_EMAIL_SUBJECT}`;
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

  const to = process.argv[2]?.trim();
  const firstName = process.argv[3]?.trim() || "there";

  if (!to?.includes("@")) {
    console.error("Usage: tsx scripts/send-intro-offers-test.tsx <email> [firstName]");
    process.exit(1);
  }

  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM in .env.local.");
    process.exit(1);
  }

  const site = getSiteUrl();
  const content = getIntroOffersNewsletterTemplate(site, firstName);
  const preview = "3-class packs from £30 — Reformer, hot mat or mat.";

  const html = minifyEmailHtml(
    await renderNewsletterHtml(content, {
      eyebrow: "From Mari at Reset",
      preview,
    })
  );
  const text = await renderNewsletterPlainText(content, {
    eyebrow: "From Mari at Reset",
    preview,
  });

  const subject = uniqueTestSubject();
  const resend = new Resend(config.apiKey);
  const { data, error } = await resend.emails.send({
    from: config.from,
    to: [to],
    subject,
    html,
    text,
    headers: {
      "X-Reset-Email-Preview": "intro-offers",
    },
  });

  if (error) {
    console.error("Resend error:", error.message);
    process.exit(1);
  }

  console.log("Sent:", data?.id ?? "?");
  console.log("Subject:", subject);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
