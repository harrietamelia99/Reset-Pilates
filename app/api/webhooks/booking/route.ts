import { NextResponse } from "next/server";
import { sendWelcomeBookingEmail } from "@/lib/emails/send-welcome-booking";

type Body = {
  email?: string;
  firstName?: string;
  bookingSummary?: string;
};

/**
 * Secured with a shared secret header. Point Momence (or your booking provider) here when they support webhooks.
 * Header: `x-reset-booking-secret` must match `BOOKING_WEBHOOK_SECRET`.
 */
export async function POST(request: Request) {
  const secret = process.env.BOOKING_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ ok: false, error: "webhook_not_configured" }, { status: 503 });
  }

  const header = request.headers.get("x-reset-booking-secret");
  if (header !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
  const bookingSummary =
    typeof body.bookingSummary === "string" && body.bookingSummary.trim()
      ? body.bookingSummary.trim()
      : undefined;

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || firstName.length < 1) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 400 });
  }

  const result = await sendWelcomeBookingEmail(email, { firstName, bookingSummary });
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.reason }, { status: result.reason === "not_configured" ? 503 : 502 });
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
