# Waitlist data (local)

## Canonical list

After merging Typeform/Google exports, keep a deduped master list here:

- **`waitlist-members.tsv`** — columns `email` and `first_name_display` (tab-separated).

This file is **gitignored** by default so addresses do not land in the repo history. Remove the `/data/waitlist-members.tsv` line from `.gitignore` only if you deliberately want it tracked (e.g. private monorepo).

## Merge a new CSV export

From the project root:

```bash
npm run email:waitlist-import -- "/absolute/path/to/Your details_responses.csv"
```

- If `data/waitlist-members.tsv` already exists, rows from the CSV are **merged** in (same email = CSV wins for the display name).
- First occurrence per email in the CSV wins within that file (exports are usually newest-first).

Optional flags:

```bash
npx tsx --tsconfig tsconfig.json scripts/import-waitlist-csv.ts ./export.csv \
  --master ./path/to/old-list.tsv \
  --out ./data/waitlist-members.tsv
```

## Pre-launch thank-you email previews

To render the same branded email as live signups and a one-off recipients TSV under `email-previews/`:

```bash
npm run email:waitlist-export-prelaunch-preview -- "/path/to/export.csv"
```

Shared CSV parsing lives in `lib/waitlist-csv-import.ts`.
