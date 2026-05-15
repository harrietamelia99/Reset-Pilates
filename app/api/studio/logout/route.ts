import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { STUDIO_COOKIE_NAME } from "@/lib/studio/session";

export async function POST() {
  const jar = cookies();
  jar.set({
    name: STUDIO_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  });
  return NextResponse.json({ ok: true }, { status: 200 });
}
