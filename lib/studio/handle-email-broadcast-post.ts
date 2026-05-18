import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { Resend } from "resend";
import { renderNewsletterHtml, renderNewsletterPlainText } from "@/lib/emails/render-templates";
import { getResendEmailConfig } from "@/lib/server/resend-config";
import { isNewsletterContent } from "@/lib/emails/newsletter-types";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";
import type { StudioEmailDraftKind } from "@/lib/studio/email-draft-kind";
import { studioEmailEyebrow } from "@/lib/studio/email-draft-kind";
import { appendResendBroadcastFooter } from "@/lib/studio/append-resend-broadcast-footer";

type Body = {
  content?: unknown;
  subject?: string;
  /** Must match server phrase (default SEND) */
  confirmPhrase?: string;
};

function broadcastAudienceId(): string | null {
  const id = process.env.RESEND_STUDIO_BROADCAST_AUDIENCE_ID?.trim();
  return id || null;
}

function confirmPhraseRequired(): string {
  return (process.env.STUDIO_BROADCAST_CONFIRM_PHRASE?.trim() || "SEND").toUpperCase();
}

export async function handleEmailBroadcastPost(request: Request, kind: StudioEmailDraftKind): Promise<NextResponse> {
  const jar = cookies();
  const token = jar.get(STUDIO_COOKIE_NAME)?.value;
  if (!(await verifyStudioSessionValue(token))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const audienceId = broadcastAudienceId();
  if (!audienceId) {
    return NextResponse.json({ ok: false, error: "broadcast_not_configured" }, { status: 503 });
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

  if (!isNewsletterContent(body.content)) {
    return NextResponse.json({ ok: false, error: "invalid_content" }, { status: 400 });
  }

  const subjectRaw = typeof body.subject === "string" ? body.subject.trim() : "";
  if (subjectRaw.length < 2 || subjectRaw.length > 200) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const confirm = (typeof body.confirmPhrase === "string" ? body.confirmPhrase.trim() : "").toUpperCase();
  if (confirm !== confirmPhraseRequired()) {
    return NextResponse.json({ ok: false, error: "confirm_mismatch" }, { status: 400 });
  }

  const content = body.content;
  const eyebrow = studioEmailEyebrow(kind);

  let html: string;
  let text: string;
  try {
    html = await renderNewsletterHtml(content, eyebrow ? { eyebrow } : undefined);
    text = await renderNewsletterPlainText(content, eyebrow ? { eyebrow } : undefined);
  } catch (e) {
    console.error("[email-broadcast] render", kind, e);
    return NextResponse.json({ ok: false, error: "render_failed" }, { status: 500 });
  }

  const withFooter = appendResendBroadcastFooter(html, text);
  const previewText = content.intro.replace(/\s+/g, " ").trim().slice(0, 120);
  const broadcastName = `${kind === "alert" ? "Alert" : "Newsletter"} ${new Date().toISOString().slice(0, 10)} ${subjectRaw.slice(0, 40)}`;

  const resend = new Resend(config.apiKey);

  try {
    const created = await resend.broadcasts.create({
      audienceId,
      from: config.from,
      subject: subjectRaw,
      replyTo: config.notifyTo,
      html: withFooter.html,
      text: withFooter.text,
      previewText: previewText || undefined,
      name: broadcastName,
    });

    if (created.error || !created.data?.id) {
      console.error("[email-broadcast] create", kind, created.error);
      return NextResponse.json({ ok: false, error: "broadcast_create_failed" }, { status: 502 });
    }

    const sent = await resend.broadcasts.send(created.data.id, {});

    if (sent.error) {
      console.error("[email-broadcast] send", kind, sent.error, "broadcastId", created.data.id);
      return NextResponse.json({ ok: false, error: "broadcast_send_failed" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, broadcastId: created.data.id }, { status: 200 });
  } catch (e) {
    console.error("[email-broadcast] threw", kind, e);
    return NextResponse.json({ ok: false, error: "broadcast_failed" }, { status: 502 });
  }
}
