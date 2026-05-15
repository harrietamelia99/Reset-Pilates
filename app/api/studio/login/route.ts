import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STUDIO_COOKIE_NAME, signStudioSessionValue } from "@/lib/studio/session";
import { timingSafeStringEqual } from "@/lib/studio/timing-safe";

type Body = { password?: string };

export async function POST(request: Request) {
  const configured =
    process.env.STUDIO_PASSWORD?.length &&
    process.env.STUDIO_SESSION_SECRET &&
    process.env.STUDIO_SESSION_SECRET.length >= 16;

  if (!configured) {
    return NextResponse.json({ ok: false, error: "studio_not_configured" }, { status: 503 });
  }

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password : "";
  if (!timingSafeStringEqual(password, process.env.STUDIO_PASSWORD ?? "")) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const token = await signStudioSessionValue();
  if (!token) {
    return NextResponse.json({ ok: false, error: "session_error" }, { status: 500 });
  }

  const jar = cookies();
  jar.set({
    name: STUDIO_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
