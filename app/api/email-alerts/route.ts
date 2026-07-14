import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/server/email-html";
import { renderPreLaunchWaitlistHtml, renderPreLaunchWaitlistPlainText } from "@/lib/emails/render-templates";
import { getResendEmailConfig } from "@/lib/server/resend-config";

const MAX_FIELD = 500;

function firstNameFromSignup(name: string): string {
  const t = name.trim();
  if (!t) return "there";
  const first = t.split(/\s+/)[0] ?? "";
  if (!first || first.length > 80) return "there";
  return first;
}

type Body = {
  email?: string;
  name?: string;
  _gotcha?: string;
};

export async function POST(request: Request) {
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

  if (body._gotcha) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX_FIELD) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (name.length > MAX_FIELD) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const resend = new Resend(config.apiKey);
  const safeEmail = escapeHtml(email);
  const safeName = name ? escapeHtml(name) : "Not given";

  const html = `
    <p>Hi, someone&apos;s signed up for email alerts from the homepage.</p>
    <p><strong>Email</strong><br/><a href="mailto:${escapeHtml(email)}">${safeEmail}</a></p>
    <p><strong>Name</strong><br/>${safeName}</p>
    <p style="margin-top:2rem;font-size:12px;color:#666;">Source: homepage email alerts</p>
  `;

  let sendResult: { error?: unknown };
  try {
    sendResult = await resend.emails.send({
      from: config.from,
      to: config.notifyTo,
      replyTo: email,
      subject: "Reset · new email alerts signup",
      html,
    });
  } catch (e) {
    console.error("[email-alerts] Resend threw (staff notify):", e);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  const { error: staffError } = sendResult;
  if (staffError) {
    const errMsg =
      staffError && typeof staffError === "object" && "message" in staffError
        ? String((staffError as { message: unknown }).message)
        : String(staffError);
    console.error("[email-alerts] Resend error (staff notify):", errMsg, JSON.stringify(staffError));
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  let subscriberHtml: string;
  let subscriberText: string;
  try {
    const props = { firstName: firstNameFromSignup(name) };
    subscriberHtml = await renderPreLaunchWaitlistHtml(props);
    subscriberText = await renderPreLaunchWaitlistPlainText(props);
  } catch (e) {
    console.error("[email-alerts] render subscriber template:", e);
    return NextResponse.json({ ok: false, error: "subscriber_send_failed" }, { status: 502 });
  }

  let subscriberResult: { error?: unknown };
  try {
    subscriberResult = await resend.emails.send({
      from: config.from,
      to: email,
      subject: "You're on the mailing list | Reset Pilates",
      html: subscriberHtml,
      text: subscriberText,
    });
  } catch (e) {
    console.error("[email-alerts] Resend threw (subscriber):", e);
    return NextResponse.json({ ok: false, error: "subscriber_send_failed" }, { status: 502 });
  }

  const subErr = subscriberResult.error;
  if (subErr) {
    const errMsg =
      subErr && typeof subErr === "object" && "message" in subErr
        ? String((subErr as { message: unknown }).message)
        : String(subErr);
    console.error("[email-alerts] Resend error (subscriber):", errMsg, JSON.stringify(subErr));
    return NextResponse.json({ ok: false, error: "subscriber_send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
