/**
 * One-off: knock out near-black background from product photo → PNG with alpha.
 * Run: node scripts/knockout-paperclip.cjs
 */
const path = require("path");
const sharp = require("sharp");

(async () => {
  const src = path.join(__dirname, "../public/images/paperclip.png");
  const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const out = Buffer.alloc(width * height * 4);
  /** Pixels darker than this luminance become transparent (JPEG-safe margin). */
  const thresh = 44;

  for (let i = 0; i < width * height; i++) {
    const o = i * channels;
    const r = data[o];
    const g = data[o + 1];
    const b = data[o + 2];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    const j = i * 4;
    out[j] = r;
    out[j + 1] = g;
    out[j + 2] = b;
    out[j + 3] = lum < thresh ? 0 : 255;
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(src);

  console.log("Updated", src, "with alpha (threshold luminance", thresh + ")");
})();
