/**
 * Typeform / Google Forms-style exports: "Submitted At", "First Name", "Email Address".
 * Used by waitlist preview + merge imports (dedupe by email, lowercase).
 */

export type WaitlistRecipientRow = { email: string; firstName: string };

export function parseCsvLine(line: string): string[] {
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

export function displayFirstName(raw: string): string {
  const t = raw.trim();
  if (!t) return "there";
  if (t.includes("@")) {
    const local = t.split("@")[0] ?? "";
    if (!local) return "there";
    return local.replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  }
  return t;
}

/** Rows top-to-bottom; first occurrence wins per email (typical export = newest first). */
export function parseWaitlistCsvExport(csvText: string): WaitlistRecipientRow[] {
  const text = csvText.replace(/^\uFEFF/, "");
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];

  const header = parseCsvLine(lines[0]!).map((h) => h.toLowerCase());
  const idxName = header.findIndex((h) => h.includes("first name") || h === "name");
  const idxEmail = header.findIndex((h) => h.includes("email"));
  if (idxEmail < 0) return [];

  const byEmail = new Map<string, WaitlistRecipientRow>();

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

  return Array.from(byEmail.values()).sort((a, b) => a.email.localeCompare(b.email));
}

const TSV_HEADER = "email\tfirst_name_display";

/** Parses our canonical TSV (header + rows). */
export function parseWaitlistRecipientsTsv(tsvText: string): WaitlistRecipientRow[] {
  const lines = tsvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) return [];
  const header = lines[0]!.toLowerCase().split("\t").map((s) => s.trim());
  const emailIdx = header.findIndex((h) => h === "email");
  const nameIdx = header.findIndex((h) => h.includes("first"));
  if (emailIdx < 0 || nameIdx < 0) return [];

  const out: WaitlistRecipientRow[] = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i]!.split("\t");
    const email = (cols[emailIdx] ?? "").trim().toLowerCase();
    if (!email.includes("@")) continue;
    const firstName = displayFirstName((cols[nameIdx] ?? "").trim() || email);
    out.push({ email, firstName });
  }
  return dedupeRecipients(out);
}

export function recipientsToTsv(rows: WaitlistRecipientRow[]): string {
  const sorted = [...rows].sort((a, b) => a.email.localeCompare(b.email));
  return [TSV_HEADER].concat(sorted.map((x) => `${x.email}\t${x.firstName}`)).join("\n") + "\n";
}

export function dedupeRecipients(rows: WaitlistRecipientRow[]): WaitlistRecipientRow[] {
  const byEmail = new Map<string, WaitlistRecipientRow>();
  for (const row of rows) {
    const email = row.email.trim().toLowerCase();
    if (!email.includes("@")) continue;
    if (!byEmail.has(email)) {
      byEmail.set(email, { email, firstName: row.firstName.trim() || displayFirstName(email) });
    }
  }
  return Array.from(byEmail.values()).sort((a, b) => a.email.localeCompare(b.email));
}

/**
 * Union of existing + CSV export. CSV rows processed in file order (first wins per email within file);
 * then existing entries fill any emails missing from CSV.
 */
export function mergeRecipientsFromCsv(
  existing: WaitlistRecipientRow[],
  csvText: string
): WaitlistRecipientRow[] {
  const fromCsv = parseWaitlistCsvExport(csvText);
  const map = new Map<string, WaitlistRecipientRow>();

  for (const row of dedupeRecipients(existing)) {
    map.set(row.email, row);
  }
  for (const row of fromCsv) {
    map.set(row.email, row);
  }

  return Array.from(map.values()).sort((a, b) => a.email.localeCompare(b.email));
}
