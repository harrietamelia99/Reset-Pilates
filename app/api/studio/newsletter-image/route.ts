import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { processAndStoreNewsletterImage } from "@/lib/studio/newsletter-image-upload";
import { publicOriginFromRequest } from "@/lib/studio/request-public-origin";
import { STUDIO_COOKIE_NAME, verifyStudioSessionValue } from "@/lib/studio/session";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function POST(request: Request) {
  const jar = cookies();
  const token = jar.get(STUDIO_COOKIE_NAME)?.value;
  if (!(await verifyStudioSessionValue(token))) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_form" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "missing_file" }, { status: 400 });
  }

  const mime = (file.type || "application/octet-stream").toLowerCase();
  if (!ALLOWED_TYPES.has(mime)) {
    return NextResponse.json({ ok: false, error: "invalid_type" }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());

  try {
    const origin = publicOriginFromRequest(request);
    const { url } = await processAndStoreNewsletterImage(file.name || "upload.jpg", buf, origin);
    return NextResponse.json({ ok: true, url }, { status: 200 });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "unknown";
    if (msg === "file_too_large") {
      return NextResponse.json({ ok: false, error: "file_too_large" }, { status: 413 });
    }
    if (msg === "blob_not_configured") {
      return NextResponse.json(
        {
          ok: false,
          error: "blob_not_configured",
          message:
            "Image uploads on production need BLOB_READ_WRITE_TOKEN (Vercel Blob). See .env.example.",
        },
        { status: 503 }
      );
    }
    console.error("[newsletter-image]", e);
    return NextResponse.json({ ok: false, error: "upload_failed", message: msg }, { status: 502 });
  }
}
