/**
 * Shrinks HTML emails so clients like Gmail are less likely to clip (~102KB threshold).
 * Conservative: collapses whitespace between tags only (no bare newline stripping inside body text).
 */
export function minifyEmailHtml(html: string): string {
  let out = html;
  let prev = "";
  while (out !== prev) {
    prev = out;
    out = out.replace(/>\s+</g, "><");
  }

  const stacks: [RegExp, string][] = [
    [/IBM Plex Mono, ui-monospace, Courier New, monospace/gi, "IBM Plex Mono,ui-monospace,monospace"],
    [/IBM Plex Mono, ui-monospace, monospace/gi, "IBM Plex Mono,ui-monospace,monospace"],
    [/Helvetica Neue, Helvetica, Arial, sans-serif/gi, "Helvetica Neue,Helvetica,Arial,sans-serif"],
  ];
  for (const [re, rep] of stacks) {
    out = out.replace(re, rep);
  }

  return out.trim();
}
