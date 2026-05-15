import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { renderNewsletterHtml } from "@/lib/emails/render-templates";
import { draftNewsletterWithOpenAI } from "@/lib/studio/openai-newsletter";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";

type Body = {
  issueTitle?: string;
  notes?: string;
  audience?: string;
};

export async function POST(request: Request) {
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

  if (issueTitle.length < 2 || notes.length < 10) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  try {
    const content = await draftNewsletterWithOpenAI({ issueTitle, notes, audience });
    const html = await renderNewsletterHtml(content);
    return NextResponse.json({ ok: true, content, html }, { status: 200 });
  } catch (e) {
    const message = e instanceof Error ? e.message : "unknown";
    if (message.includes("OPENAI_API_KEY")) {
      return NextResponse.json({ ok: false, error: "openai_not_configured" }, { status: 503 });
    }
    console.error("[newsletter-draft]", e);
    return NextResponse.json({ ok: false, error: "draft_failed", message }, { status: 502 });
  }
}
