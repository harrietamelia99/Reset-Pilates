/**
 * Sends one live message per React Email template to an internal address for client approval.
 * Requires RESEND_API_KEY + RESEND_FROM in .env.local (same as production).
 *
 *   npm run email:send-previews-for-approval
 *
 * Override recipient: APPROVAL_PREVIEW_TO=you@example.com npm run email:send-previews-for-approval
 */
import * as React from "react";
import { loadEnvConfig } from "@next/env";
import { render } from "@react-email/render";
import { Resend } from "resend";
import WelcomeBookingEmail from "../emails/welcome-booking";
import PreLaunchWaitlistEmail from "../emails/prelaunch-waitlist";
import ProgressUpdateEmail from "../emails/progress-update";
import NewsletterEmail from "../emails/newsletter";
import { getExampleOpeningNewsletterContent } from "../lib/emails/example-newsletter";
import { getFoundingMembershipNewsletterTemplate } from "../lib/emails/example-newsletter-founding";
import { getResendEmailConfig } from "../lib/server/resend-config";
import { getSiteUrl } from "../lib/emails/site-url";

const DEFAULT_TO = "harriet@collectivstudio.uk";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");
  const to = (process.env.APPROVAL_PREVIEW_TO ?? DEFAULT_TO).trim();
  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM. Add them to .env.local.");
    process.exit(1);
  }

  const resend = new Resend(config.apiKey);
  const site = getSiteUrl();
  const sampleNewsletter = getExampleOpeningNewsletterContent(site);
  const foundingNewsletter = getFoundingMembershipNewsletterTemplate(site);

  const jobs: {
    subject: string;
    jsx: React.ReactElement;
  }[] = [
    {
      subject: "[Reset Pilates – client preview] Welcome after booking",
      jsx: (
        <WelcomeBookingEmail firstName="Alex" bookingSummary="Reformer, Tuesday 10:15, with Jamie" />
      ),
    },
    {
      subject:
        "[Reset Pilates – client preview] Waitlist signup + founding membership (matches live site)",
      jsx: (
        <PreLaunchWaitlistEmail
          firstName="Sam"
          personalNote="Sample note: we've just confirmed crèche slots for Thursday mornings. More soon."
        />
      ),
    },
    {
      subject: "[Reset Pilates – client preview] Studio progress update",
      jsx: <ProgressUpdateEmail />,
    },
    {
      subject: "[Reset Pilates – client preview] Newsletter (structured)",
      jsx: <NewsletterEmail content={sampleNewsletter} />,
    },
    {
      subject:
        "[Reset Pilates – client preview] Newsletter (founding only, studio broadcasts)",
      jsx: <NewsletterEmail content={foundingNewsletter} />,
    },
  ];

  console.log(`Sending ${jobs.length} previews from ${config.from} → ${to}`);

  for (let i = 0; i < jobs.length; i++) {
    const { subject, jsx } = jobs[i]!;
    const html = await render(jsx);
    const text = await render(jsx, { plainText: true });

    const { data, error } = await resend.emails.send({
      from: config.from,
      to: [to],
      subject,
      html,
      text,
      headers: {
        "X-Reset-Email-Preview": "template-approval",
      },
    });

    if (error) {
      console.error(`✗ ${subject}`, error.message);
    } else {
      console.log(`✓ ${subject} id=${data?.id ?? "?"}`);
    }

    if (i < jobs.length - 1) await sleep(600);
  }

  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
