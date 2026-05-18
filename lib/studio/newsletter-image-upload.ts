/**
 * Newsletter images: store on Vercel Blob (production) or local public/ (dev only).
 */
import { randomBytes } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { put } from "@vercel/blob";
import sharp from "sharp";

const MAX_BYTES = 6 * 1024 * 1024;
const MAX_WIDTH = 1400;

function isLikelyProduction(): boolean {
  return process.env.VERCEL === "1" || process.env.NODE_ENV === "production";
}

export async function processAndStoreNewsletterImage(
  fileName: string,
  input: Buffer,
  publicOrigin: string
): Promise<{ url: string }> {
  if (input.length > MAX_BYTES) {
    throw new Error("file_too_large");
  }

  const jpegBuf = await sharp(input)
    .rotate()
    .resize({
      width: MAX_WIDTH,
      withoutEnlargement: true,
    })
    .jpeg({ quality: 86, mozjpeg: true })
    .toBuffer();

  const token = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  if (token) {
    const safeBase = (fileName.replace(/[^a-zA-Z0-9._-]+/g, "-").slice(-80) || "image").replace(/\.[^.]+$/, "");
    const key = `newsletter/${Date.now()}-${randomBytes(6).toString("hex")}-${safeBase}.jpg`;
    const blob = await put(key, jpegBuf, {
      access: "public",
      contentType: "image/jpeg",
    });
    return { url: blob.url };
  }

  if (isLikelyProduction()) {
    throw new Error("blob_not_configured");
  }

  const id = `${Date.now()}-${randomBytes(6).toString("hex")}`;
  const relativeDir = join(process.cwd(), "public", "newsletter-media");
  await mkdir(relativeDir, { recursive: true });
  const outName = `${id}.jpg`;
  await writeFile(join(relativeDir, outName), jpegBuf);
  const base = publicOrigin.replace(/\/+$/, "");
  return { url: `${base}/newsletter-media/${outName}` };
}
