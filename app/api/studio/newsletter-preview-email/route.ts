import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { renderNewsletterHtml, renderNewsletterPlainText } from "@/lib/emails/render-templates";
import { getResendEmailConfig } from "@/lib/server/resend-config";
import { isNewsletterContent } from "@/lib/emails/newsletter-types";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Body = {
  to?: string;
  content?: unknown;
};

/**
 * Sends one newsletter preview to an address Mari chooses (studio session required).
 * Re-renders HTML from structured content on the server (same as production template).
 */
export async function POST(request: Request) {
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

  let html: string;
  let text: string;
  try {
    html = await renderNewsletterHtml(content);
    text = await renderNewsletterPlainText(content);
  } catch (e) {
    console.error("[newsletter-preview-email] render", e);
    return NextResponse.json({ ok: false, error: "render_failed" }, { status: 500 });
  }

  const resend = new Resend(config.apiKey);
  const subject = "Newsletter preview — Reset Pilates (not sent to your list)";

  try {
    const { error } = await resend.emails.send({
      from: config.from,
      to,
      subject,
      html,
      text,
      headers: {
        "X-Reset-Email-Preview": "newsletter-studio",
      },
    });

    if (error) {
      console.error("[newsletter-preview-email] Resend", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
  } catch (e) {
    console.error("[newsletter-preview-email] Resend threw", e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
