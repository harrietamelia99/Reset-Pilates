/**
 * Renders sample HTML for each React Email template into ./email-previews/
 * Run: npm run email:preview
 * Open: email-previews/index.html in a browser (file:// or static server).
 */
import * as React from "react";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { render } from "@react-email/render";
import WelcomeBookingEmail from "../emails/welcome-booking";
import PreLaunchWaitlistEmail from "../emails/prelaunch-waitlist";
import ProgressUpdateEmail from "../emails/progress-update";
import NewsletterEmail from "../emails/newsletter";
import { getExampleOpeningNewsletterContent } from "../lib/emails/example-newsletter";
import { getFoundingMembershipNewsletterTemplate } from "../lib/emails/example-newsletter-founding";
import { getIntroOffersNewsletterTemplate } from "../lib/emails/example-newsletter-intro-offers";
import { getSiteUrl } from "../lib/emails/site-url";

const OUT = join(process.cwd(), "email-previews");
const BRAND_DIR = join(process.cwd(), "public/brand");

/**
 * Static preview HTML is often opened without a server; remote /brand URLs may 404 until deploy.
 * Gmail blocks data URIs in real sends; embedding here is preview-only.
 */
function inlineBrandImagesForLocalPreview(html: string): string {
  const pairs: { file: string; pattern: RegExp }[] = [
    { file: "reset-email-header.png", pattern: /src="[^"]*\/brand\/reset-email-header\.png"/gi },
    { file: "instagram-email.png", pattern: /src="[^"]*\/brand\/instagram-email\.png"/gi },
  ];
  let out = html;
  for (const { file, pattern } of pairs) {
    const fp = join(BRAND_DIR, file);
    if (!existsSync(fp)) continue;
    const dataUri = `src="data:image/png;base64,${readFileSync(fp).toString("base64")}"`;
    out = out.replace(pattern, dataUri);
  }
  return out;
}

const sampleNewsletter = getExampleOpeningNewsletterContent(getSiteUrl());
const sampleFoundingNewsletter = getFoundingMembershipNewsletterTemplate(getSiteUrl());
const sampleIntroOffersNewsletter = getIntroOffersNewsletterTemplate(getSiteUrl(), "Sam");

async function main() {
  await mkdir(OUT, { recursive: true });

  const pages: { file: string; title: string; html: string }[] = [];

  pages.push({
    file: "welcome-booking.html",
    title: "Welcome — booking",
    html: await render(
      <WelcomeBookingEmail firstName="Alex" bookingSummary="Reformer, Tuesday 10:15, with Jamie" />
    ),
  });

  pages.push({
    file: "prelaunch-waitlist.html",
    title: "Waitlist signup + founding membership (combined)",
    html: await render(
      <PreLaunchWaitlistEmail
        firstName="Sam"
        personalNote="We've just confirmed the crèche slots for Pilates-and-play on Thursday mornings. More soon, I promise."
      />
    ),
  });

  pages.push({
    file: "progress-update.html",
    title: "Studio update",
    html: await render(<ProgressUpdateEmail />),
  });

  pages.push({
    file: "newsletter.html",
    title: "Newsletter (opening example)",
    html: await render(<NewsletterEmail content={sampleNewsletter} />),
  });

  pages.push({
    file: "newsletter-founding.html",
    title: "Newsletter (founding membership template)",
    html: await render(<NewsletterEmail content={sampleFoundingNewsletter} />),
  });

  pages.push({
    file: "newsletter-intro-offers.html",
    title: "Newsletter (intro offers live)",
    html: await render(
      <NewsletterEmail
        content={sampleIntroOffersNewsletter}
        eyebrow="From Mari at Reset"
        preview="3-class packs from £30 — Reformer, hot mat or mat."
      />
    ),
  });

  for (const p of pages) {
    await writeFile(join(OUT, p.file), inlineBrandImagesForLocalPreview(p.html), "utf8");
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
  <p class="note">Regenerate with <code>npm run email:preview</code>. Images are inlined here so file:// works. For <code>npm run email:dev</code>, set <code>EMAIL_ASSET_BASE_URL=http://localhost:3000</code> and run <code>next dev</code> so /public assets load, or deploy so your live domain serves <code>/brand/*.png</code>.</p>
</body>
</html>`;

  await writeFile(join(OUT, "index.html"), indexHtml, "utf8");
  console.log(`Wrote ${pages.length + 1} files to ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
