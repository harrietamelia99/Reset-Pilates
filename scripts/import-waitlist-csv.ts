/**
 * Merge a Typeform/Google-style waitlist CSV into data/waitlist-members.tsv (canonical list).
 * CSV wins on duplicate emails (names refreshed from latest export).
 *
 * Usage:
 *   npx tsx --tsconfig tsconfig.json scripts/import-waitlist-csv.ts /path/to/export.csv
 *
 *   npm run email:waitlist-import -- "/path/to/Your details_responses.csv"
 *
 * Flags:
 *   --master PATH   Existing TSV to merge into (default: data/waitlist-members.tsv if it exists)
 *   --out PATH      Output TSV (default: data/waitlist-members.tsv)
 */
import { existsSync, readFileSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  mergeRecipientsFromCsv,
  parseWaitlistRecipientsTsv,
  recipientsToTsv,
} from "@/lib/waitlist-csv-import";

const DEFAULT_OUT = join(process.cwd(), "data/waitlist-members.tsv");

function parseArgs(argv: string[]) {
  const paths: string[] = [];
  let master: string | null = null;
  let out = DEFAULT_OUT;

  for (let i = 2; i < argv.length; i++) {
    const a = argv[i]!;
    if (a === "--master" && argv[i + 1]) {
      master = argv[++i]!;
      continue;
    }
    if (a === "--out" && argv[i + 1]) {
      out = argv[++i]!;
      continue;
    }
    if (!a.startsWith("--")) paths.push(a);
  }

  return { csvPath: paths[0] ?? "", master, out };
}

async function main() {
  const { csvPath, master, out } = parseArgs(process.argv);

  if (!csvPath) {
    console.error(
      "Usage: tsx scripts/import-waitlist-csv.ts /path/to/export.csv [--master existing.tsv] [--out data/waitlist-members.tsv]"
    );
    process.exit(1);
  }
  if (!existsSync(csvPath)) {
    console.error("CSV not found:", csvPath);
    process.exit(1);
  }

  const csvText = readFileSync(csvPath, "utf8");

  const masterPath = master ?? (existsSync(DEFAULT_OUT) ? DEFAULT_OUT : null);
  let existing = masterPath && existsSync(masterPath) ? parseWaitlistRecipientsTsv(readFileSync(masterPath, "utf8")) : [];

  if (master && !existsSync(master)) {
    console.error("--master file not found:", master);
    process.exit(1);
  }

  const before = existing.length;
  const merged = mergeRecipientsFromCsv(existing, csvText);

  await mkdir(join(process.cwd(), "data"), { recursive: true });
  await writeFile(out, recipientsToTsv(merged), "utf8");

  console.log(`Merged waitlist → ${out}`);
  console.log(`  Previous rows (master): ${before}`);
  console.log(`  Total unique emails:    ${merged.length}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
