import { NextResponse } from "next/server";
import { Resend } from "resend";
import { escapeHtml } from "@/lib/server/email-html";
import { getResendEmailConfig } from "@/lib/server/resend-config";

const MAX_MESSAGE = 8000;
const MAX_FIELD = 500;

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
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

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const phone = typeof body.phone === "string" ? body.phone.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > MAX_FIELD) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > MAX_FIELD) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (phone.length > MAX_FIELD) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }
  if (message.length < 20 || message.length > MAX_MESSAGE) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const resend = new Resend(config.apiKey);
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    phone: escapeHtml(phone || "Not given"),
    message: escapeHtml(message).replace(/\n/g, "<br/>"),
  };

  const html = `
    <p>Hi, someone&apos;s just sent a message through the contact page.</p>
    <p><strong>Name</strong><br/>${safe.name}</p>
    <p><strong>Email</strong><br/><a href="mailto:${escapeHtml(email)}">${safe.email}</a></p>
    <p><strong>Phone</strong><br/>${safe.phone}</p>
    <p><strong>Message</strong><br/>${safe.message}</p>
    <p style="margin-top:2rem;font-size:12px;color:#666;">Source: contact page</p>
  `;

  const { error } = await resend.emails.send({
    from: config.from,
    to: config.notifyTo,
    replyTo: email,
    subject: "Reset · new message from the website",
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
