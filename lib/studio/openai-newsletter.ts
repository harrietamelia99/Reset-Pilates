import type { NewsletterContent } from "@/lib/emails/newsletter-types";
import { isNewsletterContent } from "@/lib/emails/newsletter-types";
import { getSiteUrl } from "@/lib/emails/site-url";

const MODEL = process.env.NEWSLETTER_OPENAI_MODEL ?? "gpt-4o-mini";

function normalizeUrl(url: string): string {
  const t = url.trim();
  if (t.startsWith("https://") || t.startsWith("http://")) return t;
  return getSiteUrl();
}

export async function draftNewsletterWithOpenAI(params: {
  issueTitle: string;
  notes: string;
  audience?: string;
}): Promise<NewsletterContent> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const site = getSiteUrl();
  const system = [
    "You help Mari write a short community email for Reset Pilates (reformer, hot mat, mat) in Nailsea, UK.",
    "Output a single JSON object only (no markdown fences). British English. Warm, confident, not salesy.",
    "Shape:",
    '{"headline":"string","intro":"string","sections":[{"heading":"string","body":"string"}],"closing":"string","ctaLabel":"string","ctaUrl":"string"}',
    "Rules: 1–4 sections; each body max ~120 words; headline punchy; intro 2–3 sentences; closing one short paragraph.",
    `Default ctaUrl to "${site}" unless Mari notes imply a different absolute https URL.`,
  ].join(" ");

  const user = [
    `Issue / working title: ${params.issueTitle}`,
    params.audience ? `Audience: ${params.audience}` : "Audience: waitlist and early members.",
    "",
    "Mari's notes (bullets, rough ideas, dates — use only what fits):",
    params.notes.slice(0, 12000),
  ].join("\n");

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      temperature: 0.65,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`OpenAI error ${res.status}: ${errText.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  const raw = data.choices?.[0]?.message?.content;
  if (!raw) throw new Error("Empty model response");

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    throw new Error("Model did not return valid JSON");
  }

  if (!isNewsletterContent(parsed)) {
    throw new Error("Model JSON did not match the newsletter shape");
  }

  return {
    ...parsed,
    ctaUrl: normalizeUrl(parsed.ctaUrl),
    sections: parsed.sections.slice(0, 4),
  };
}
