import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { renderNewsletterHtml } from "@/lib/emails/render-templates";
import { isNewsletterContent } from "@/lib/emails/newsletter-types";
import { studioEmailEyebrow } from "@/lib/studio/email-draft-kind";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";

type Body = { content?: unknown };

/**
 * Builds HTML for arbitrary newsletter JSON (no OpenAI).
 * Authenticated studio use only — e.g. static templates loaded in the newsletter tool.
 */
export async function POST(request: Request): Promise<NextResponse> {
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

  if (!isNewsletterContent(body.content)) {
    return NextResponse.json({ ok: false, error: "invalid_content" }, { status: 400 });
  }

  const eyebrow = studioEmailEyebrow("newsletter");

  try {
    const html = await renderNewsletterHtml(body.content, eyebrow ? { eyebrow } : undefined);
    return NextResponse.json({ ok: true, html }, { status: 200 });
  } catch (e) {
    console.error("[newsletter-render-html]", e);
    return NextResponse.json({ ok: false, error: "render_failed" }, { status: 500 });
  }
}
