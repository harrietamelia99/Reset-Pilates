import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  fetchMomencePrimaryResource,
  isMomencePrimaryResource,
} from "@/lib/server/momence-primary-api";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";

export const dynamic = "force-dynamic";

/**
 * Debug / integration: proxies Momence Primary list endpoints using env credentials.
 * GET /api/studio/momence-primary/Events  (Videos | Memberships | Products | Teachers)
 * Requires studio session cookie.
 */
export async function GET(
  _request: Request,
  context: { params: { resource: string } }
): Promise<NextResponse> {
  const jar = cookies();
  const sessionToken = jar.get(STUDIO_COOKIE_NAME)?.value;
  if (!(await verifyStudioSessionValue(sessionToken))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  const { resource } = context.params;
  if (!resource || !isMomencePrimaryResource(resource)) {
    return NextResponse.json(
      {
        ok: false,
        error: "validation",
        message:
          "Resource must be one of: Events, Videos, Memberships, Products, Teachers.",
      },
      { status: 400 }
    );
  }

  const result = await fetchMomencePrimaryResource(resource);
  if (!result.ok && result.error === "not_configured") {
    return NextResponse.json(
      {
        ok: false,
        error: "not_configured",
        message: "Set MOMENCE_HOST_ID and MOMENCE_PRIMARY_SITE_TOKEN in the server environment.",
      },
      { status: 503 }
    );
  }

  if (!result.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: result.error,
        status: result.status,
        message: result.message,
      },
      { status: result.status && result.status >= 400 ? result.status : 502 }
    );
  }

  return NextResponse.json({ ok: true, resource, data: result.data }, { status: 200 });
}
