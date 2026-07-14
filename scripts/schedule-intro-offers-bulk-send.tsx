/**
 * Schedule intro offers newsletter for everyone on the waitlist / mailing list export.
 *
 *   npx tsx --tsconfig tsconfig.json scripts/schedule-intro-offers-bulk-send.tsx [list.tsv|csv] [--live]
 *
 * Default list: data/waitlist-members.tsv (or pass CSV path).
 * Default send time: next 18:00 Europe/London.
 */
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadEnvConfig } from "@next/env";
import { Resend } from "resend";
import {
  getIntroOffersNewsletterTemplate,
  INTRO_OFFERS_EMAIL_SUBJECT,
} from "@/lib/emails/example-newsletter-intro-offers";
import { minifyEmailHtml } from "@/lib/emails/minify-email-html";
import { getResendEmailConfig } from "../lib/server/resend-config";
import { getSiteUrl } from "../lib/emails/site-url";
import { renderNewsletterHtml, renderNewsletterPlainText } from "../lib/emails/render-templates";
import {
  parseWaitlistCsvExport,
  parseWaitlistRecipientsTsv,
  type WaitlistRecipientRow,
} from "@/lib/waitlist-csv-import";

const DEFAULT_LIST = join(process.cwd(), "data/waitlist-members.tsv");
const FALLBACK_CSV = "/Users/harrietpearce/Downloads/Your details_responses.csv";
const PREVIEW_TEXT = "3-class packs from £30 — Reformer, hot mat or mat.";

function loadRecipients(filePath: string): WaitlistRecipientRow[] {
  const raw = readFileSync(filePath, "utf8");
  if (filePath.toLowerCase().endsWith(".tsv")) {
    return parseWaitlistRecipientsTsv(raw);
  }
  return parseWaitlistCsvExport(raw);
}

function findNextLondonSixPm(notBeforeMs: number): Date {
  const bufferMs = 120_000;
  let ms = Math.ceil((notBeforeMs + bufferMs) / 60_000) * 60_000;
  const limit = notBeforeMs + 96 * 3600 * 1000;

  while (ms < limit) {
    const d = new Date(ms);
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(d);
    const h = parts.find((p) => p.type === "hour")!.value;
    const m = parts.find((p) => p.type === "minute")!.value;
    if (h === "18" && m === "00") return d;
    ms += 60_000;
  }

  throw new Error("Could not find the next 18:00 Europe/London within four days.");
}

function formatLondon(isoDate: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZoneName: "short",
  }).format(isoDate);
}

function parseArgs(argv: string[]) {
  const positional: string[] = [];
  let live = false;
  let scheduledAtIso: string | null = null;
  let offset = 0;

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--live") {
      live = true;
      continue;
    }
    if (a === "--scheduled-at" && argv[i + 1]) {
      scheduledAtIso = argv[++i]!;
      continue;
    }
    if (a === "--offset" && argv[i + 1]) {
      offset = Math.max(0, Number.parseInt(argv[++i]!, 10) || 0);
      continue;
    }
    if (!a.startsWith("--")) positional.push(a);
  }

  return { path: positional[0] ?? "", live, scheduledAtIso, offset };
}

function resolveListPath(explicit: string): string {
  if (explicit && existsSync(explicit)) return explicit;
  if (existsSync(DEFAULT_LIST)) return DEFAULT_LIST;
  if (existsSync(FALLBACK_CSV)) return FALLBACK_CSV;
  return explicit || DEFAULT_LIST;
}

async function renderForRecipient(firstName: string) {
  const site = getSiteUrl();
  const content = getIntroOffersNewsletterTemplate(site, firstName);
  const html = minifyEmailHtml(
    await renderNewsletterHtml(content, {
      eyebrow: "From Mari at Reset",
      preview: PREVIEW_TEXT,
    })
  );
  const text = await renderNewsletterPlainText(content, {
    eyebrow: "From Mari at Reset",
    preview: PREVIEW_TEXT,
  });
  return { html, text };
}

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

  const { path: pathArg, live, scheduledAtIso, offset } = parseArgs(process.argv);
  const listPath = resolveListPath(pathArg);

  if (!existsSync(listPath)) {
    console.error("Recipient list not found:", listPath);
    console.error("Run email:waitlist-import first or pass a CSV/TSV path.");
    process.exit(1);
  }

  const recipients = loadRecipients(listPath);
  if (recipients.length === 0) {
    console.error("No recipients in list.");
    process.exit(1);
  }

  const scheduledDate =
    scheduledAtIso != null ? new Date(scheduledAtIso) : findNextLondonSixPm(Date.now());

  if (Number.isNaN(scheduledDate.getTime())) {
    console.error("Invalid --scheduled-at.");
    process.exit(1);
  }

  const scheduledIso = scheduledDate.toISOString();
  if (scheduledDate.getTime() < Date.now() + 120_000) {
    console.error("Scheduled time is in the past or too soon. Use --scheduled-at for a future slot.");
    process.exit(1);
  }

  const slice = offset > 0 ? recipients.slice(offset) : recipients;

  console.log(`List: ${listPath}`);
  console.log(`Recipients: ${recipients.length}`);
  console.log(`Subject: ${INTRO_OFFERS_EMAIL_SUBJECT}`);
  if (offset > 0) console.log(`Resume from offset ${offset}: ${slice.length} remaining`);
  console.log(`Scheduled (UTC): ${scheduledIso}`);
  console.log(`Scheduled (London): ${formatLondon(scheduledDate)}`);

  if (!live) {
    console.log("\nDry run. Pass --live to schedule via Resend.");
    process.exit(0);
  }

  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM.");
    process.exit(1);
  }

  const resend = new Resend(config.apiKey);
  let ok = 0;
  const failures: { email: string; message: string }[] = [];

  for (let i = 0; i < slice.length; i++) {
    const row = slice[i]!;
    const { html, text } = await renderForRecipient(row.firstName);
    const { error } = await resend.emails.send({
      from: config.from,
      to: [row.email],
      subject: INTRO_OFFERS_EMAIL_SUBJECT,
      html,
      text,
      scheduledAt: scheduledIso,
      headers: { "X-Reset-Intro-Offers-Bulk": "scheduled" },
    });

    if (error) {
      failures.push({ email: row.email, message: error.message });
      console.error(`✗ ${row.email}: ${error.message}`);
    } else {
      ok++;
    }

    if ((i + 1) % 40 === 0 || i === 0) {
      console.log(`… scheduled ${i + 1}/${slice.length}`);
    }
    if (i < slice.length - 1) await sleep(220);
  }

  console.log(`\nScheduled OK: ${ok}  Failed: ${failures.length}`);
  if (failures.length > 0) {
    console.error("First failures:", failures.slice(0, 15));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
