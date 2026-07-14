/**
 * Schedule personalised waitlist + founding emails for everyone in a CSV/TSV export (Resend scheduled_at).
 *
 * Batch API cannot schedule yet; this loops one POST per recipient (~380 calls ≈ a few minutes).
 *
 * Dry-run (default): prints recipient count + scheduled time only.
 *
 *   npx tsx --tsconfig tsconfig.json scripts/schedule-waitlist-bulk-send.tsx "/path/to/export.csv"
 *
 * Schedule for real:
 *
 *   npx tsx --tsconfig tsconfig.json scripts/schedule-waitlist-bulk-send.tsx "/path/to/export.csv" --live
 *
 * Options:
 *   --scheduled-at ISO8601   Override send time (default: next 18:00 Europe/London if still ahead of now + 2 min)
 *   --ensure EMAIL         Always include this address (default: harriet@collectivstudio.uk)
 *   --ensure-first NAME    First name for --ensure row (default: Harriet)
 *   --offset N               Skip first N recipients after sorting by email (resume after quota errors)
 *
 * Requires RESEND_API_KEY + RESEND_FROM in `.env.local`.
 */
import { existsSync, readFileSync } from "node:fs";
import { loadEnvConfig } from "@next/env";
import { Resend } from "resend";
import { getResendEmailConfig } from "../lib/server/resend-config";
import {
  renderPreLaunchWaitlistHtml,
  renderPreLaunchWaitlistPlainText,
} from "../lib/emails/render-templates";
import {
  parseWaitlistCsvExport,
  parseWaitlistRecipientsTsv,
  type WaitlistRecipientRow,
} from "@/lib/waitlist-csv-import";

const LIVE_SUBJECT = "You're on the waitlist: founding membership details";

function loadRecipients(filePath: string): WaitlistRecipientRow[] {
  const raw = readFileSync(filePath, "utf8");
  if (filePath.toLowerCase().endsWith(".tsv")) {
    return parseWaitlistRecipientsTsv(raw);
  }
  return parseWaitlistCsvExport(raw);
}

/** Next minute where clocks in Europe/London read 18:00 (whole minute match). */
function findNextLondonSixPm(notBeforeMs: number): Date {
  const tz = "Europe/London";
  const bufferMs = 120_000;
  let ms = Math.ceil((notBeforeMs + bufferMs) / 60_000) * 60_000;
  const limit = notBeforeMs + 96 * 3600 * 1000;

  while (ms < limit) {
    const d = new Date(ms);
    const parts = new Intl.DateTimeFormat("en-GB", {
      timeZone: tz,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).formatToParts(d);
    const h = parts.find((p) => p.type === "hour")!.value;
    const m = parts.find((p) => p.type === "minute")!.value;
    if (h === "18" && m === "00") {
      return d;
    }
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
  let ensureEmail = "harriet@collectivstudio.uk";
  let ensureFirstName = "Harriet";
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
    if (a === "--ensure" && argv[i + 1]) {
      ensureEmail = argv[++i]!.trim().toLowerCase();
      continue;
    }
    if (a === "--ensure-first" && argv[i + 1]) {
      ensureFirstName = argv[++i]!.trim();
      continue;
    }
    if (a === "--offset" && argv[i + 1]) {
      offset = Math.max(0, Number.parseInt(argv[++i]!, 10) || 0);
      continue;
    }
    if (!a.startsWith("--")) positional.push(a);
  }

  return {
    path: positional[0] ?? "",
    live,
    scheduledAtIso,
    ensureEmail,
    ensureFirstName,
    offset,
  };
}

function mergeEnsure(rows: WaitlistRecipientRow[], ensureEmail: string, ensureFirstName: string): WaitlistRecipientRow[] {
  const map = new Map<string, WaitlistRecipientRow>();
  for (const r of rows) {
    const email = r.email.toLowerCase();
    map.set(email, { email, firstName: r.firstName });
  }
  map.set(ensureEmail.toLowerCase(), {
    email: ensureEmail.toLowerCase(),
    firstName: ensureFirstName.trim() || "there",
  });
  return Array.from(map.values()).sort((a, b) => a.email.localeCompare(b.email));
}

async function sleep(ms: number): Promise<void> {
  await new Promise((r) => setTimeout(r, ms));
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

  const { path: listPath, live, scheduledAtIso, ensureEmail, ensureFirstName, offset } = parseArgs(process.argv);

  if (!listPath || !existsSync(listPath)) {
    console.error(
      "Usage: tsx scripts/schedule-waitlist-bulk-send.tsx /path/to/export.csv [--live] [--scheduled-at ISO8601] [--offset N]"
    );
    process.exit(1);
  }

  const rawRows = loadRecipients(listPath);
  if (rawRows.length === 0) {
    console.error("No recipients found in file.");
    process.exit(1);
  }

  const recipients = mergeEnsure(rawRows, ensureEmail, ensureFirstName);

  const scheduledDate =
    scheduledAtIso != null ? new Date(scheduledAtIso) : findNextLondonSixPm(Date.now());

  if (Number.isNaN(scheduledDate.getTime())) {
    console.error("Invalid --scheduled-at datetime.");
    process.exit(1);
  }

  const scheduledIso = scheduledDate.toISOString();
  const minLeadMs = 120_000;
  if (scheduledDate.getTime() < Date.now() + minLeadMs) {
    console.error(
      "Scheduled time is too soon or in the past. Pass a future --scheduled-at ISO8601 or wait until tomorrow's 18:00 London."
    );
    process.exit(1);
  }

  const slice = offset > 0 ? recipients.slice(offset) : recipients;

  console.log(`Recipients (deduped, ensure merged): ${recipients.length}`);
  if (offset > 0) {
    console.log(`Resume offset ${offset}: scheduling ${slice.length} remaining`);
  }
  console.log(`Scheduled send (UTC): ${scheduledIso}`);
  console.log(`Scheduled send (London wall): ${formatLondon(scheduledDate)}`);

  if (!live) {
    console.log("\nDry run only. Pass --live to schedule these sends via Resend.");
    process.exit(0);
  }

  if (slice.length === 0) {
    console.error("Nothing to send after offset.");
    process.exit(1);
  }

  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM in .env.local.");
    process.exit(1);
  }

  const resend = new Resend(config.apiKey);
  let ok = 0;
  const failures: { email: string; message: string }[] = [];

  for (let i = 0; i < slice.length; i++) {
    const row = slice[i]!;
    const html = await renderPreLaunchWaitlistHtml({ firstName: row.firstName });
    const text = await renderPreLaunchWaitlistPlainText({ firstName: row.firstName });
    const { error } = await resend.emails.send({
      from: config.from,
      to: [row.email],
      subject: LIVE_SUBJECT,
      html,
      text,
      scheduledAt: scheduledIso,
      headers: {
        "X-Reset-Waitlist-Bulk": "scheduled",
      },
    });

    if (error) {
      failures.push({ email: row.email, message: error.message });
      console.error(`✗ ${row.email}: ${error.message}`);
    } else {
      ok++;
    }

    if (i < slice.length - 1) await sleep(220);
  }

  console.log(`\nScheduled OK: ${ok}  Failed: ${failures.length}`);
  if (failures.length > 0) {
    console.error("Failures:", failures.slice(0, 20));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
