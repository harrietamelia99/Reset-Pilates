import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { renderNewsletterHtml, renderNewsletterPlainText } from "@/lib/emails/render-templates";
import { getResendEmailConfig } from "@/lib/server/resend-config";
import { isNewsletterContent } from "@/lib/emails/newsletter-types";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";
import type { StudioEmailDraftKind } from "@/lib/studio/email-draft-kind";
import { STUDIO_EMAIL_PREVIEW_HEADER, STUDIO_EMAIL_PREVIEW_SUBJECT, studioEmailEyebrow } from "@/lib/studio/email-draft-kind";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  to?: string;
  content?: unknown;
};

export async function handleEmailPreviewPost(request: Request, kind: StudioEmailDraftKind): Promise<NextResponse> {
  const jar = cookies();
  const token = jar.get(STUDIO_COOKIE_NAME)?.value;
  if (!(await verifyStudioSessionValue(token))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const config = getResendEmailConfig();
  if (!config) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const to = typeof body.to === "string" ? body.to.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(to) || to.length > 320) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  if (!isNewsletterContent(body.content)) {
    return NextResponse.json({ ok: false, error: "invalid_content" }, { status: 400 });
  }

  const content = body.content;
  const eyebrow = studioEmailEyebrow(kind);

  let html: string;
  let text: string;
  try {
    html = await renderNewsletterHtml(content, eyebrow ? { eyebrow } : undefined);
    text = await renderNewsletterPlainText(content, eyebrow ? { eyebrow } : undefined);
  } catch (e) {
    console.error("[email-preview] render", kind, e);
    return NextResponse.json({ ok: false, error: "render_failed" }, { status: 500 });
  }

  const resend = new Resend(config.apiKey);
  const subject = STUDIO_EMAIL_PREVIEW_SUBJECT[kind];

  try {
    const { error } = await resend.emails.send({
      from: config.from,
      to,
      subject,
      html,
      text,
      headers: {
        "X-Reset-Email-Preview": STUDIO_EMAIL_PREVIEW_HEADER[kind],
      },
    });

    if (error) {
      console.error("[email-preview] Resend", kind, error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("[email-preview] Resend threw", kind, e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
