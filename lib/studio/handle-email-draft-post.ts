import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { renderNewsletterHtml } from "@/lib/emails/render-templates";
import { draftNewsletterWithOpenAI } from "@/lib/studio/openai-newsletter";
import { sanitizeNewsletterImages } from "@/lib/studio/newsletter-sanitize-images";
import { isNewsletterContent, type NewsletterContent } from "@/lib/emails/newsletter-types";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";
import type { StudioEmailDraftKind } from "@/lib/studio/email-draft-kind";
import { studioEmailEyebrow } from "@/lib/studio/email-draft-kind";

type Body = {
  issueTitle?: string;
  notes?: string;
  audience?: string;
  imageAssets?: { url?: string; note?: string }[];
  previousContent?: unknown;
  feedback?: string;
};

function parseImageAssets(raw: unknown): { url: string; note?: string }[] {
  if (!Array.isArray(raw)) return [];
  const out: { url: string; note?: string }[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const o = item as Record<string, unknown>;
    const url = typeof o.url === "string" ? o.url.trim() : "";
    if (!url.startsWith("https://") && !url.startsWith("http://")) continue;
    const note = typeof o.note === "string" ? o.note.trim() : undefined;
    out.push({ url, note: note || undefined });
    if (out.length >= 8) break;
  }
  return out;
}

export async function handleEmailDraftPost(request: Request, kind: StudioEmailDraftKind): Promise<NextResponse> {
  const jar = cookies();
  const token = jar.get(STUDIO_COOKIE_NAME)?.value;
  if (!(await verifyStudioSessionValue(token))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const issueTitle = typeof body.issueTitle === "string" ? body.issueTitle.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";
  const audience = typeof body.audience === "string" ? body.audience.trim() : undefined;
  const imageAssets = parseImageAssets(body.imageAssets);
  const hasImages = imageAssets.length > 0;
  const feedback = typeof body.feedback === "string" ? body.feedback.trim() : "";
  let previousContent: NewsletterContent | undefined;
  if (feedback.length > 0) {
    if (feedback.length < 8) {
      return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
    }
    if (!isNewsletterContent(body.previousContent)) {
      return NextResponse.json({ ok: false, error: "invalid_previous" }, { status: 400 });
    }
    previousContent = body.previousContent;
  }

  if (issueTitle.length < 2) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (!hasImages && notes.length < 10) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (hasImages && notes.length < 3) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  try {
    const emailKind = kind === "alert" ? "alert" : "newsletter";
    const draft = await draftNewsletterWithOpenAI({
      issueTitle,
      notes,
      audience,
      imageAssets,
      previousContent,
      feedback: feedback.length > 0 ? feedback : undefined,
      emailKind,
    });
    const allowedUrls = imageAssets.map((a) => a.url);
    const content = sanitizeNewsletterImages(draft, allowedUrls);
    const eyebrow = studioEmailEyebrow(kind);
    const html = await renderNewsletterHtml(content, eyebrow ? { eyebrow } : undefined);
    return NextResponse.json({ ok: true, content, html }, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown";
    if (message.includes("OPENAI_API_KEY")) {
      return NextResponse.json({ ok: false, error: "openai_not_configured" }, { status: 503 });
    }
    console.error("[email-draft]", kind, e);
    return NextResponse.json({ ok: false, error: "draft_failed", message }, { status: 502 });
  }
}
