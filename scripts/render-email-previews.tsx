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
  headline: "June at Reset — fit-out, timetable, and a hello from the mat",
  intro:
    "We are in the final stretch before opening week. Here is what changed since last time, and what to watch for in your inbox next.",
  sections: [
    {
      heading: "Studio progress",
      body: "Flooring and mirrors are in; kit is being staged for your first reformer block. We are testing heating for hot mat so the room feels right, not stifling.",
    },
    {
      heading: "Founding memberships",
      body: "A few founding spots remain. If you have been waiting to lock your rate for twelve months, this is the window before we switch to standard pricing at opening.",
    },
  ],
  closing: "Thank you for being early believers. We cannot wait to move with you.",
  ctaLabel: "View pricing",
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
        personalNote="We have just confirmed the creche slots for Pilates-and-play on Thursday mornings — more soon."
      />
    ),
  });

  pages.push({
    file: "progress-update.html",
    title: "Progress update",
    html: await render(
      <ProgressUpdateEmail
        issueTitle="Build update — late spring"
        lead="Quick read on Crown Glass, memberships, and what happens in the next fortnight."
        sections={[
          { title: "On site", body: "Sign-off on lighting; acoustic treatment in the hot mat room next week." },
          { title: "Booking", body: "Momence is being populated with your founding tiers first, then drop-ins." },
        ]}
        ctaLabel="Read more on the site"
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
