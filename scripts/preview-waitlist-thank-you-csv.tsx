/**
 * Reads a Typeform/Google-style export CSV (Submitted At, First Name, Email Address),
 * dedupes by email, and writes HTML/text previews for the SAME email as the website
 * waitlist: PreLaunchWaitlistEmail (not a separate “bulk thank-you” template).
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
 * Output (gitignored): email-previews/waitlist-export-prelaunch-*
 */
import * as React from "react";
import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { render } from "@react-email/render";
import PreLaunchWaitlistEmail from "../emails/prelaunch-waitlist";

const OUT_PREFIX = "waitlist-export-prelaunch";
const OUT_DIR = join(process.cwd(), "email-previews");
const BRAND_DIR = join(process.cwd(), "public/brand");

function parseCsvLine(line: string): string[] {
  const fields: string[] = [];
  let i = 0;
  while (i < line.length) {
    if (line[i] === ",") {
      fields.push("");
      i++;
      continue;
    }
    if (line[i] === '"') {
      i++;
      let value = "";
      while (i < line.length) {
        if (line[i] === '"') {
          if (line[i + 1] === '"') {
            value += '"';
            i += 2;
            continue;
          }
          i++;
          break;
        }
        value += line[i];
        i++;
      }
      fields.push(value);
      if (line[i] === ",") i++;
      continue;
    }
    let raw = "";
    while (i < line.length && line[i] !== ",") {
      raw += line[i];
      i++;
    }
    fields.push(raw.trim());
    if (line[i] === ",") i++;
  }
  return fields;
}

function displayFirstName(raw: string): string {
  const t = raw.trim();
  if (!t) return "there";
  if (t.includes("@")) {
    const local = t.split("@")[0] ?? "";
    if (!local) return "there";
    return local.replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return t;
}

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
const SUGGESTED_SUBJECT = "Pre-launch waitlist confirmation";

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

  const text = readFileSync(csvPath, "utf8").replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    console.error("CSV has no data rows.");
    process.exit(1);
  }

  const header = parseCsvLine(lines[0]!).map((h) => h.toLowerCase());
  const idxName = header.findIndex((h) => h.includes("first name") || h === "name");
  const idxEmail = header.findIndex((h) => h.includes("email"));
  if (idxEmail < 0) {
    console.error('Could not find an "Email" column in the header row.');
    process.exit(1);
  }

  type Row = { firstName: string; email: string };
  const byEmail = new Map<string, Row>();

  for (let r = 1; r < lines.length; r++) {
    const cols = parseCsvLine(lines[r]!);
    const emailRaw = (cols[idxEmail] ?? "").trim().toLowerCase();
    if (!emailRaw || !emailRaw.includes("@")) continue;
    const nameRaw = idxName >= 0 ? (cols[idxName] ?? "").trim() : "";
    const firstName = displayFirstName(nameRaw || emailRaw);
    if (!byEmail.has(emailRaw)) {
      byEmail.set(emailRaw, { firstName, email: emailRaw });
    }
  }

  const recipients = Array.from(byEmail.values()).sort((a, b) => a.email.localeCompare(b.email));

  await mkdir(OUT_DIR, { recursive: true });

  const sampleProps = { firstName: recipients[0]?.firstName ?? "Sam" };
  const sampleHtmlRaw = await render(<PreLaunchWaitlistEmail {...sampleProps} />);
  const sampleHtml = inlineBrandImagesForLocalPreview(sampleHtmlRaw);
  const sampleText = await render(<PreLaunchWaitlistEmail {...sampleProps} />, { plainText: true });

  await writeFile(join(OUT_DIR, `${OUT_PREFIX}.html`), sampleHtml, "utf8");
  await writeFile(join(OUT_DIR, `${OUT_PREFIX}.txt`), sampleText, "utf8");
  await writeFile(join(OUT_DIR, `${OUT_PREFIX}-subject.txt`), `${SUGGESTED_SUBJECT}\n`, "utf8");

  const tsv = ["email\tfirst_name_display"].concat(recipients.map((x) => `${x.email}\t${x.firstName}`)).join("\n");
  await writeFile(join(OUT_DIR, `${OUT_PREFIX}-recipients.tsv`), tsv, "utf8");

  const note = `Pre-launch waitlist (${OUT_PREFIX}) — preview only, not sent

Same branded email as when someone joins the waitlist on the live site (PreLaunchWaitlistEmail).
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
