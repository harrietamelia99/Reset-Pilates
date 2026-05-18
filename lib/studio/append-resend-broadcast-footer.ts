/**
 * Resend Broadcasts require an unsubscribe URL merge tag in the body.
 * @see https://resend.com/docs/dashboard/broadcasts/introduction
 */
export function appendResendBroadcastFooter(html: string, text: string): { html: string; text: string } {
  const footerHtml = `<p style="margin:28px 0 0;font-family:IBM Plex Mono,ui-monospace,monospace;font-size:11px;color:#8E898A;line-height:1.55;">You are receiving this because you are on the Reset Pilates mailing list.<br /><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color:#2b2b29;">Unsubscribe</a></p>`;
  const footerText = `\n\n---\nYou are receiving this because you are on the Reset Pilates mailing list.\nUnsubscribe: {{{RESEND_UNSUBSCRIBE_URL}}}\n`;
  return {
    html: `${html.trimEnd()}${footerHtml}`,
    text: `${text.trimEnd()}${footerText}`,
  };
}
