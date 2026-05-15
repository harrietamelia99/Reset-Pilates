/**
 * Renders sample HTML for each React Email template into ./email-previews/
 * Run: npm run email:preview
 * Open: email-previews/index.html in a browser (file:// or static server).
 */
import * as React from "react";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { render } from "@react-email/render";
import WelcomeBookingEmail from "../emails/welcome-booking";
import PreLaunchWaitlistEmail from "../emails/prelaunch-waitlist";
import ProgressUpdateEmail from "../emails/progress-update";
import NewsletterEmail from "../emails/newsletter";
import type { NewsletterContent } from "../lib/emails/newsletter-types";

const OUT = join(process.cwd(), "email-previews");

const sampleNewsletter: NewsletterContent = {
  headline: "June at Reset: fit-out, timetable, and a hello from the mat",
  intro:
    "We're in the final push before opening week. Here's what shifted since I last wrote, and what might land in your inbox next.",
  sections: [
    {
      heading: "Studio progress",
      body: "Flooring and mirrors are in. Kit is being staged for your first reformer block. We're dialling in heating for hot mat so the room feels cosy, not stuffy.",
    },
    {
      heading: "Founding memberships",
      body: "A handful of founding spots are still open. If you've been meaning to lock your rate for twelve months, this is the window before we go to standard pricing at opening.",
    },
  ],
  closing: "Thank you for believing in this before the doors were even open. Can't wait to move with you. Lots of love, Mari x",
  ctaLabel: "Peek at pricing",
  ctaUrl: "https://resetpilatesstudio.co.uk/pricing",
};

async function main() {
  await mkdir(OUT, { recursive: true });

  const pages: { file: string; title: string; html: string }[] = [];

  pages.push({
    file: "welcome-booking.html",
    title: "Welcome — booking",
    html: await render(
      <WelcomeBookingEmail firstName="Alex" bookingSummary="Reformer — Tuesday 10:15, with Jamie" />
    ),
  });

  pages.push({
    file: "prelaunch-waitlist.html",
    title: "Pre-launch — waitlist",
    html: await render(
      <PreLaunchWaitlistEmail
        firstName="Sam"
        personalNote="We've just confirmed the crèche slots for Pilates-and-play on Thursday mornings. More soon, I promise."
      />
    ),
  });

  pages.push({
    file: "progress-update.html",
    title: "Progress update",
    html: await render(
      <ProgressUpdateEmail
        issueTitle="Build update, late spring"
        lead="Quick one on Crown Glass, memberships, and what's cooking in the next fortnight."
        sections={[
          { title: "On site", body: "Lighting sign-off is done. Acoustic treatment in the hot mat room lands next week." },
          { title: "Booking", body: "We're loading Momence with founding tiers first, then drop-ins. You'll hear when it's your turn to book." },
        ]}
        ctaLabel="See what's new on the site"
      />
    ),
  });

  pages.push({
    file: "newsletter.html",
    title: "Newsletter (structured)",
    html: await render(<NewsletterEmail content={sampleNewsletter} />),
  });

  for (const p of pages) {
    await writeFile(join(OUT, p.file), p.html, "utf8");
  }

  const indexHtml = `<!DOCTYPE html>
<html lang="en-GB">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Reset — email previews</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 40rem; margin: 2rem auto; padding: 0 1rem; color: #2b2b29; }
    h1 { font-size: 1.25rem; letter-spacing: 0.08em; text-transform: uppercase; }
    ul { line-height: 1.8; padding-left: 1.2rem; }
    a { color: #2b2b29; }
    p.note { font-size: 0.85rem; color: #545456; margin-top: 2rem; }
  </style>
</head>
<body>
  <h1>Email previews</h1>
  <p>Static HTML generated from React Email templates (sample copy).</p>
  <ul>
${pages.map((p) => `    <li><a href="./${p.file}">${p.title}</a></li>`).join("\n")}
  </ul>
  <p class="note">Regenerate with <code>npm run email:preview</code>. This folder is gitignored.</p>
</body>
</html>`;

  await writeFile(join(OUT, "index.html"), indexHtml, "utf8");
  console.log(`Wrote ${pages.length + 1} files to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
