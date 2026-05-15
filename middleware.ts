import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { STUDIO_COOKIE_NAME, signStudioSessionValue, verifyStudioSessionValue } from "@/lib/studio/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/studio")) {
    return NextResponse.next();
  }
  if (pathname === "/studio/login") {
    const token = request.cookies.get(STUDIO_COOKIE_NAME)?.value;
    if (await verifyStudioSessionValue(token)) {
      return NextResponse.redirect(new URL("/studio", request.url));
    }
    return NextResponse.next();
  }

  const token = request.cookies.get(STUDIO_COOKIE_NAME)?.value;
  if (!(await verifyStudioSessionValue(token))) {
    const url = request.nextUrl.clone();
    url.pathname = "/studio/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/studio", "/studio/:path*"],
};
