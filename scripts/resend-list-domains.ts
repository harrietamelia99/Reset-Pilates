/**
 * Prints domain names + status Resend associates with your API key (from .env.local).
 * Helps debug "domain not verified" when dashboard shows Verified.
 *
 *   npm run email:check-resend
 */
import { loadEnvConfig } from "@next/env";
import { Resend } from "resend";
import { getResendEmailConfig } from "../lib/server/resend-config";

async function main() {
  loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");
  const config = getResendEmailConfig();
  if (!config) {
    console.error("Missing RESEND_API_KEY or RESEND_FROM in .env.local");
    process.exit(1);
  }

  const resend = new Resend(config.apiKey);
  const { data: body, error } = await resend.domains.list();

  if (error) {
    console.error("domains.list failed:", error.message);
    process.exit(1);
  }

  const rows =
    body && typeof body === "object" && "data" in body && Array.isArray((body as { data: unknown }).data)
      ? ((body as { data: { name?: string; status?: string; region?: string }[] }).data ?? [])
      : [];

  console.log("RESEND_FROM in use:", config.from);
  console.log("");

  if (rows.length === 0) {
    console.log(
      "No domains returned for this API key. Common causes:\n" +
        "  • RESEND_API_KEY is from a different Resend account than the one where you verified resetpilatesstudio.co.uk\n" +
        "  • The key is “sending access” only — try a full-access key to list domains, or create a new key on the correct account\n" +
        "  • Dashboard shows Verified — copy a fresh API key from that same account into .env.local, then re-run this command.\n"
    );
    if (body && typeof body === "object") {
      console.log("Raw /domains response keys:", Object.keys(body).join(", "));
    }
    process.exitCode = 1;
    return;
  }
  for (const d of rows) {
    console.log(`${d.name}\tstatus=${d.status}\tregion=${d.region}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
