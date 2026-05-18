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
  /** Uploaded image URLs Mari controls; model must only reference these. */
  imageAssets?: { url: string; note?: string }[];
}): Promise<NewsletterContent> {
  const key = process.env.OPENAI_API_KEY?.trim();
  if (!key) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const site = getSiteUrl();
  const system = [
    "You write as Mari, mid-twenties British woman: Reset Pilates (reformer, hot mat, mat) in Nailsea, UK. Boutique, warm, switched-on. Like a note from a friend who has great taste and gets things done.",
    "Output a single JSON object only (no markdown fences). British English spelling always (colour, organise, realise, favourite, programme where relevant).",
    "Tone: warm and real, not corporate. No 'I hope this email finds you well.' Jump in like you're continuing a chat. Short sentences. Breathing room.",
    "Never use an em dash (the long dash). Use a comma, full stop, or hyphen instead.",
    "No stiff CTAs. Light and inviting (e.g. 'I'd love to see you there' / 'Come say hi on the site'), not 'Act now.'",
    "Emojis: use ✨ and 🤍 at most once each in the whole email, only if they add warmth. Often use neither.",
    "Closing: human sign-off, ending with Mari's name plus the white heart emoji 🤍 (not the letter x). E.g. 'Lots of love, Mari 🤍' or 'Speak soon, Mari 🤍'. Not generic corporate.",
    "Shape:",
    '{"headline":"string","intro":"string","heroImageUrl":"optional string","heroImageAlt":"optional string","sections":[{"heading":"string","body":"string","imageUrl":"optional string","imageAlt":"optional string"}],"closing":"string","ctaLabel":"string","ctaUrl":"string"}',
    "Images: If IMAGE ASSETS are listed in the user message, you MAY set heroImageUrl and/or sections[].imageUrl ONLY to URLs copied exactly from that list (same string). Never invent or guess URLs. If an asset does not fit any section, leave image fields out. Use at most one image per section when helpful. imageAlt should be a short plain description (max ~100 chars).",
    "If there are no IMAGE ASSETS, omit heroImageUrl, heroImageAlt, and all section imageUrl/imageAlt fields.",
    "Rules: 1 to 4 sections; each body max ~120 words; headline punchy; intro 2 to 3 short sentences; closing one short paragraph.",
    `Default ctaUrl to "${site}" unless Mari notes imply a different absolute https URL.`,
  ].join(" ");

  const assetLines =
    params.imageAssets?.filter((a) => a.url?.trim()).map((a, i) => {
      const note = a.note?.trim() ? ` — Mari note: ${a.note.trim()}` : "";
      return `${i + 1}. ${a.url.trim()}${note}`;
    }) ?? [];

  const user = [
    `Issue / working title: ${params.issueTitle}`,
    params.audience ? `Audience: ${params.audience}` : "Audience: waitlist and early members.",
    "",
    assetLines.length
      ? ["IMAGE ASSETS (use only these exact URLs for heroImageUrl or sections[].imageUrl):", ...assetLines, ""].join("\n")
      : "",
    "Mari's notes (bullets, rough ideas, dates - use only what fits):",
    params.notes.slice(0, 12000),
  ]
    .filter(Boolean)
    .join("\n");

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
