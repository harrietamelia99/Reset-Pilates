/**
 * Cancel scheduled transactional emails created by schedule-waitlist-bulk-send.tsx.
 *
 * Lists GET https://api.resend.com/emails (paginated), filters rows where `scheduled_at`
 * is set and subject matches the live waitlist mail, then POST …/emails/:id/cancel.
 *
 * Dry-run (default): prints matches only.
 *
 *   npx tsx --tsconfig tsconfig.json scripts/cancel-resend-scheduled-waitlist.tsx
 *
 * Cancel for real:
 *
 *   npx tsx --tsconfig tsconfig.json scripts/cancel-resend-scheduled-waitlist.tsx --live
 *
 * Requires RESEND_API_KEY in `.env.local`.
 */
import { loadEnvConfig } from "@next/env";

const WAITLIST_SUBJECT = "You're on the waitlist: founding membership details";

type ListRow = {
  id: string;
  subject?: string | null;
  scheduled_at?: string | null;
  last_event?: string | null;
};

type ListResponse = {
  object?: string;
  has_more?: boolean;
  data?: ListRow[];
};

async function fetchEmailPage(apiKey: string, after?: string): Promise<ListResponse> {
  const url = new URL("https://api.resend.com/emails");
  url.searchParams.set("limit", "100");
  if (after) url.searchParams.set("after", after);

  const res = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });

  const json = (await res.json()) as ListResponse & { message?: string };
  if (!res.ok) {
    throw new Error(`List emails failed (${res.status}): ${JSON.stringify(json)}`);
  }
  return json;
}

async function collectScheduledWaitlist(apiKey: string): Promise<ListRow[]> {
  const matches: ListRow[] = [];
  let after: string | undefined;
  let guard = 0;

  while (guard++ < 500) {
    const page = await fetchEmailPage(apiKey, after);
    const rows = page.data ?? [];
    for (const row of rows) {
      if (row.scheduled_at && row.subject === WAITLIST_SUBJECT) {
        matches.push(row);
      }
    }
    if (!page.has_more || rows.length === 0) break;
    after = rows[rows.length - 1]?.id;
    if (!after) break;
  }

  return matches;
}

async function cancelEmail(apiKey: string, id: string): Promise<{ ok: boolean; message?: string }> {
  const res = await fetch(`https://api.resend.com/emails/${encodeURIComponent(id)}/cancel`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: "{}",
    signal: AbortSignal.timeout(45_000),
  });
  const raw = await res.text();
  if (!res.ok) {
    return { ok: false, message: raw.slice(0, 400) };
  }
  return { ok: true };
}

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

  const live = process.argv.includes("--live");
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    console.error("Missing RESEND_API_KEY in environment (.env.local).");
    process.exit(1);
  }

  console.log(`Finding scheduled emails with subject: "${WAITLIST_SUBJECT}"`);
  const scheduled = await collectScheduledWaitlist(apiKey);

  console.log(`Matched ${scheduled.length} scheduled row(s).`);
  if (scheduled.length <= 10) {
    for (const r of scheduled) {
      console.log(`  ${r.id} → ${r.scheduled_at}`);
    }
  }

  if (!live) {
    console.log("\nDry run only. Pass --live to cancel these scheduled sends.");
    process.exit(0);
  }

  let ok = 0;
  const failures: { id: string; message: string }[] = [];

  for (let i = 0; i < scheduled.length; i++) {
    const id = scheduled[i]!.id;
    if ((i + 1) % 40 === 0 || i === 0) {
      console.log(`… cancelling ${i + 1}/${scheduled.length}`);
    }
    const result = await cancelEmail(apiKey, id);
    if (!result.ok) {
      failures.push({ id, message: result.message ?? "unknown" });
      console.error(`✗ ${id}: ${result.message}`);
    } else {
      ok++;
    }
    if (i < scheduled.length - 1) await new Promise((r) => setTimeout(r, 80));
  }

  console.log(`\nCancelled OK: ${ok}  Failed: ${failures.length}`);
  if (failures.length > 0) process.exit(1);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
