import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadApiKey(): string | null {
  for (const name of [".env.local", ".env"]) {
    const p = join(process.cwd(), name);
    if (!existsSync(p)) continue;
    const m = readFileSync(p, "utf8").match(/^RESEND_API_KEY=(.+)$/m);
    if (m?.[1]) return m[1].trim().replace(/^["']|["']$/g, "");
  }
  return process.env.RESEND_API_KEY?.trim() ?? null;
}

async function main() {
  const key = loadApiKey();
  if (!key) {
    console.error("No RESEND_API_KEY");
    process.exit(1);
  }

  const subjects = new Map<string, number>();
  let after: string | undefined;

  for (let page = 0; page < 20; page++) {
    const url = new URL("https://api.resend.com/emails");
    url.searchParams.set("limit", "100");
    if (after) url.searchParams.set("after", after);

    const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` } });
    const json = (await res.json()) as {
      data?: { id: string; subject?: string }[];
      has_more?: boolean;
    };
    const rows = json.data ?? [];
    for (const r of rows) {
      const s = r.subject?.trim() || "(no subject)";
      subjects.set(s, (subjects.get(s) || 0) + 1);
    }
    if (!json.has_more || rows.length === 0) break;
    after = rows[rows.length - 1]?.id;
  }

  const sorted = Array.from(subjects.entries()).sort((a, b) => b[1] - a[1]);
  console.log(`Unique subjects in Resend (${sorted.length}):\n`);
  for (const [s, n] of sorted) {
    console.log(`${String(n).padStart(4)}  ${s}`);
  }
}

main().catch(console.error);
