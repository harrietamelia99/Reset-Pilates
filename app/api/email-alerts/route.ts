import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/server/email-html";
import { getResendEmailConfig } from "@/lib/server/resend-config";

const MAX_FIELD = 500;

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

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.notifyTo,
    replyTo: email,
    subject: "Reset · new email alerts signup",
    html,
  });

  if (error) {
    console.error("[email-alerts] Resend error:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
