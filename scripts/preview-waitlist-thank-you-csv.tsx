/**
 * Reads a Typeform/Google-style export CSV (Submitted At, First Name, Email Address),
 * dedupes by email, and writes HTML/text previews for the SAME email as the website
 * waitlist signup email: founding membership + personalised intro (same as live `/api/email-alerts`).
 * Use after sign-off for people who signed up on a previous form — do not send until approved.
 *
 * Does NOT call Resend.
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.json scripts/preview-waitlist-thank-you-csv.tsx "/path/to/export.csv"
 *
 *   npm run email:waitlist-export-prelaunch-preview -- "/path/to/export.csv"
 *   npm run email:waitlist-thankyou-preview -- "/path/to/export.csv"  (alias)
 *
 * To merge exports into data/waitlist-members.tsv (gitignored master list):
 *   npm run email:waitlist-import -- "/path/to/export.csv"
 *
 * Output (gitignored): email-previews/waitlist-export-prelaunch-*
 */
import * as React from "react";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { render } from "@react-email/render";
import PreLaunchWaitlistEmail from "../emails/prelaunch-waitlist";
import { parseWaitlistCsvExport, recipientsToTsv } from "@/lib/waitlist-csv-import";

const OUT_PREFIX = "waitlist-export-prelaunch";
const OUT_DIR = join(process.cwd(), "email-previews");
const BRAND_DIR = join(process.cwd(), "public/brand");

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

/** Same subject as automatic /api/email-alerts subscriber send */
const SUGGESTED_SUBJECT = "You're on the waitlist: founding membership details";

async function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error("Usage: tsx scripts/preview-waitlist-thank-you-csv.tsx /path/to/export.csv");
    process.exit(1);
  }
  if (!existsSync(csvPath)) {
    console.error("File not found:", csvPath);
    process.exit(1);
  }

  const text = readFileSync(csvPath, "utf8");
  const recipients = parseWaitlistCsvExport(text);
  if (recipients.length === 0) {
    console.error("CSV has no valid rows or missing Email column.");
    process.exit(1);
  }

  await mkdir(OUT_DIR, { recursive: true });

  const sampleProps = { firstName: recipients[0]?.firstName ?? "Sam" };
  const sampleHtmlRaw = await render(<PreLaunchWaitlistEmail {...sampleProps} />);
  const sampleHtml = inlineBrandImagesForLocalPreview(sampleHtmlRaw);
  const sampleText = await render(<PreLaunchWaitlistEmail {...sampleProps} />, { plainText: true });

  await writeFile(join(OUT_DIR, `${OUT_PREFIX}.html`), sampleHtml, "utf8");
  await writeFile(join(OUT_DIR, `${OUT_PREFIX}.txt`), sampleText, "utf8");
  await writeFile(join(OUT_DIR, `${OUT_PREFIX}-subject.txt`), `${SUGGESTED_SUBJECT}\n`, "utf8");

  await writeFile(join(OUT_DIR, `${OUT_PREFIX}-recipients.tsv`), recipientsToTsv(recipients), "utf8");

  const note = `Pre-launch waitlist (${OUT_PREFIX}) — preview only, not sent

Same branded email as when someone joins the waitlist on the live site (waitlist welcome + founding membership in one message).
Use for people who signed up on an older contact form / export — wait for sign-off before sending.

Suggested subject (matches live signup): see ${OUT_PREFIX}-subject.txt
  ${SUGGESTED_SUBJECT}

Files:
  - ${OUT_PREFIX}.html — open in a browser (images inlined for file://)
  - ${OUT_PREFIX}.txt — plain-text for Resend \`text\` field
  - ${OUT_PREFIX}-recipients.tsv — ${recipients.length} unique emails (deduped)

Sending later with Resend (example per row):
  import { renderPreLaunchWaitlistHtml, renderPreLaunchWaitlistPlainText } from "@/lib/emails/render-templates";
  const html = await renderPreLaunchWaitlistHtml({ firstName });
  const text = await renderPreLaunchWaitlistPlainText({ firstName });
  await resend.emails.send({ from, to: email, subject: "${SUGGESTED_SUBJECT}", html, text });

Or Resend Broadcasts / batch with merged firstName.
`;
  await writeFile(join(OUT_DIR, `${OUT_PREFIX}-README.txt`), note, "utf8");

  console.log(`Unique recipients (deduped): ${recipients.length}`);
  console.log(`Wrote previews to ${OUT_DIR}/`);
  console.log(`Open email-previews/${OUT_PREFIX}.html to review.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
