"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { NewsletterContent } from "@/lib/emails/newsletter-types";

const PREVIEW_EMAIL_STORAGE_KEY = "reset-studio-newsletter-preview-email";
const PREVIEW_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type AssetRow = {
  id: string;
  url: string;
  note: string;
  fileName: string;
  uploading: boolean;
  error?: string;
};

export function StudioNewsletterBuilder() {
  const [issueTitle, setIssueTitle] = useState("");
  const [audience, setAudience] = useState("Waitlist and members");
  const [notes, setNotes] = useState("");
  const [assets, setAssets] = useState<AssetRow[]>([]);
  const [content, setContent] = useState<NewsletterContent | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewEmail, setPreviewEmail] = useState("");
  const [previewSendState, setPreviewSendState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [previewSendMessage, setPreviewSendMessage] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(PREVIEW_EMAIL_STORAGE_KEY);
      if (saved?.trim()) setPreviewEmail(saved.trim());
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (!previewEmail.trim() || !PREVIEW_EMAIL_RE.test(previewEmail.trim())) return;
    try {
      sessionStorage.setItem(PREVIEW_EMAIL_STORAGE_KEY, previewEmail.trim());
    } catch {
      /* ignore */
    }
  }, [previewEmail]);

  const hasImages = useMemo(() => assets.some((a) => a.url && !a.uploading), [assets]);
  const anyUploading = assets.some((a) => a.uploading);
  const notesOk = hasImages ? notes.trim().length >= 3 : notes.trim().length >= 10;
  const canGenerate =
    issueTitle.trim().length >= 2 && notesOk && !anyUploading && !loading;

  async function addFiles(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file) continue;
      const id = crypto.randomUUID();
      setAssets((prev) => [...prev, { id, url: "", note: "", fileName: file.name, uploading: true }]);

      const fd = new FormData();
      fd.append("file", file);

      try {
        const res = await fetch("/api/studio/newsletter-image", { method: "POST", body: fd });
        const data = (await res.json()) as {
          ok?: boolean;
          url?: string;
          error?: string;
          message?: string;
        };
        if (!res.ok) {
          const msg =
            data.error === "blob_not_configured"
              ? data.message ?? "Production uploads need Vercel Blob (see .env.example)."
              : data.error === "invalid_type"
                ? "Use JPG, PNG, WebP, or GIF."
                : data.error === "file_too_large"
                  ? "That file is too large. Try a smaller photo."
                  : data.message ?? "Upload failed.";
          setAssets((prev) =>
            prev.map((a) => (a.id === id ? { ...a, uploading: false, error: msg } : a))
          );
          continue;
        }
        if (typeof data.url === "string") {
          setAssets((prev) =>
            prev.map((a) => (a.id === id ? { ...a, url: data.url!, uploading: false, error: undefined } : a))
          );
        }
      } catch {
        setAssets((prev) =>
          prev.map((a) => (a.id === id ? { ...a, uploading: false, error: "Network error." } : a))
        );
      }
    }
    if (fileRef.current) fileRef.current.value = "";
  }

  function removeAsset(id: string) {
    setAssets((prev) => prev.filter((a) => a.id !== id));
  }

  function setNote(id: string, note: string) {
    setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, note } : a)));
  }

  const canRefineWithFeedback =
    Boolean(content) &&
    aiFeedback.trim().length >= 8 &&
    !loading &&
    !anyUploading &&
    issueTitle.trim().length >= 2 &&
    notesOk;

  async function regenerateWithFeedback() {
    if (!content || !canRefineWithFeedback) return;
    setLoading(true);
    setError("");
    setHtml(null);
    setPreviewSendState("idle");
    setPreviewSendMessage("");
    try {
      const imageAssets = assets
        .filter((a) => a.url && !a.uploading)
        .map((a) => ({ url: a.url, note: a.note.trim() || undefined }));
      const res = await fetch("/api/studio/newsletter-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          issueTitle,
          notes,
          audience,
          imageAssets,
          previousContent: content,
          feedback: aiFeedback.trim(),
        }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        content?: NewsletterContent;
        html?: string;
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        if (data.error === "openai_not_configured") {
          setError("Add OPENAI_API_KEY to the server environment to use AI drafting.");
        } else if (data.error === "unauthorized") {
          setError("Session expired. Sign in again from the studio home.");
        } else if (data.error === "validation") {
          setError("Feedback needs at least a few words, and your title/notes need to stay valid.");
        } else if (data.error === "invalid_previous") {
          setError("Regenerate from scratch, then try feedback again.");
        } else {
          setError(data.message ?? "Could not apply feedback. Try again.");
        }
        return;
      }
      if (data.content && typeof data.html === "string") {
        setContent(data.content);
        setHtml(data.html);
        setAiFeedback("");
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    setLoading(true);
    setError("");
    setContent(null);
    setHtml(null);
    setPreviewSendState("idle");
    setPreviewSendMessage("");
    setAiFeedback("");
    try {
      const imageAssets = assets
        .filter((a) => a.url && !a.uploading)
        .map((a) => ({ url: a.url, note: a.note.trim() || undefined }));
      const res = await fetch("/api/studio/newsletter-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueTitle, notes, audience, imageAssets }),
      });
      const data = (await res.json()) as {
        ok?: boolean;
        content?: NewsletterContent;
        html?: string;
        error?: string;
        message?: string;
      };
      if (!res.ok) {
        if (data.error === "openai_not_configured") {
          setError("Add OPENAI_API_KEY to the server environment to use AI drafting.");
        } else if (data.error === "unauthorized") {
          setError("Session expired. Sign in again from the studio home.");
        } else if (data.error === "validation") {
          setError("Add a title and enough notes (or a few words plus photos).");
        } else {
          setError(data.message ?? "Could not generate a draft. Try again.");
        }
        return;
      }
      if (data.content && typeof data.html === "string") {
        setContent(data.content);
        setHtml(data.html);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }

  const previewEmailOk = PREVIEW_EMAIL_RE.test(previewEmail.trim());

  async function sendPreviewToInbox() {
    if (!content || !previewEmailOk) return;
    setPreviewSendState("sending");
    setPreviewSendMessage("");
    try {
      const res = await fetch("/api/studio/newsletter-preview-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: previewEmail.trim(), content }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        if (data.error === "unauthorized") {
          setPreviewSendState("error");
          setPreviewSendMessage("Session expired. Sign in again from the studio home.");
        } else if (data.error === "not_configured") {
          setPreviewSendState("error");
          setPreviewSendMessage("Resend is not configured on the server.");
        } else {
          setPreviewSendState("error");
          setPreviewSendMessage("Could not send the preview. Try again.");
        }
        return;
      }
      setPreviewSendState("success");
      setPreviewSendMessage(
        "Sent. Check your inbox and spam. Only you were emailed — your full list was not contacted."
      );
    } catch {
      setPreviewSendState("error");
      setPreviewSendMessage("Network error.");
    }
  }

  return (
    <div className="space-y-8">
      <div className="rounded-sm border border-light-grey bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-bold uppercase tracking-heading text-charcoal">Monthly newsletter</h2>
        <p className="mt-3 max-w-2xl font-accent text-sm leading-relaxed text-mid-grey">
          Mari signs in here, adds rough notes and optional photos (compressed automatically). The model writes in her
          voice as structured copy only; the site drops it into the Reset email template with no raw HTML from the AI.
          If a draft is close but not quite right, she can add short feedback and ask for a revised version (same title
          and notes). When you&apos;re happy with a draft, you can email yourself a real inbox preview, then use Resend
          for the full list when you&apos;re ready.
        </p>
        <div className="rule-section my-6 max-w-xs" aria-hidden />
        <div className="space-y-4">
          <div>
            <label
              htmlFor="issue-title"
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              Issue title
            </label>
            <input
              id="issue-title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              placeholder="e.g. May — timetable refresh & hot mat"
              className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
          </div>
          <div>
            <label
              htmlFor="audience"
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              Audience (optional)
            </label>
            <input
              id="audience"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
          </div>

          <div>
            <span className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">
              Photos (optional, up to 8)
            </span>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              className="w-full max-w-md font-accent text-sm text-charcoal file:mr-4 file:border-0 file:bg-charcoal file:px-4 file:py-2 file:font-accent file:text-xs file:font-bold file:uppercase file:tracking-wide file:text-white"
              onChange={(e) => void addFiles(e.target.files)}
            />
            <p className="mt-2 max-w-xl font-accent text-xs text-warm-grey">
              Production: set <code className="text-charcoal">BLOB_READ_WRITE_TOKEN</code> (Vercel Blob). Local dev: saves
              under <code className="text-charcoal">/public/newsletter-media/</code> with your site origin in the URL.
            </p>
            {assets.length ? (
              <ul className="mt-4 space-y-4">
                {assets.map((a) => (
                  <li
                    key={a.id}
                    className="flex flex-col gap-2 border border-light-grey bg-[#fafafa] p-3 md:flex-row md:items-start"
                  >
                    <div className="h-20 w-28 shrink-0 overflow-hidden bg-light-grey">
                      {a.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.url} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center font-accent text-[10px] text-warm-grey">
                          {a.uploading ? "Uploading…" : "—"}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="truncate font-accent text-xs text-mid-grey">{a.fileName}</p>
                      {a.error ? <p className="text-xs text-red-800">{a.error}</p> : null}
                      <label className="sr-only" htmlFor={`cap-${a.id}`}>
                        Note for image
                      </label>
                      <input
                        id={`cap-${a.id}`}
                        value={a.note}
                        onChange={(e) => setNote(a.id, e.target.value)}
                        disabled={!a.url || !!a.error}
                        placeholder="Short hint for the AI (e.g. reformer room, Mari teaching)"
                        className="w-full border border-light-grey bg-white px-3 py-2 text-sm text-charcoal outline-none focus:border-charcoal disabled:opacity-50"
                      />
                      <button
                        type="button"
                        onClick={() => removeAsset(a.id)}
                        className="font-accent text-[10px] font-bold uppercase tracking-wide text-charcoal underline-offset-2 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <div>
            <label htmlFor="notes" className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">
              Your notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={12}
              placeholder="Bullets: what happened this month, timetable changes, offers, personal sign-off ideas, which photo goes with what…"
              className="w-full resize-y border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
            <p className="mt-1 font-accent text-xs text-warm-grey">
              {hasImages
                ? "With photos: at least a few words (3+) so the AI has context."
                : "Without photos: at least 10 characters of notes."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void generate()}
            disabled={!canGenerate}
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-95 disabled:opacity-40"
          >
            {loading ? (content ? "Working…" : "Drafting…") : "Generate branded draft"}
          </button>
          {error ? (
            <p className="text-sm text-mid-grey" role="alert">
              {error}
            </p>
          ) : null}
        </div>
      </div>

      {content ? (
        <div className="rounded-sm border border-light-grey bg-white p-6 shadow-sm md:p-8">
          <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal">Structured draft</h3>
          <p className="mt-2 font-accent text-sm font-medium text-charcoal">{content.headline}</p>
          <p className="mt-3 font-accent text-sm leading-relaxed text-mid-grey">{content.intro}</p>
          {content.heroImageUrl ? (
            <p className="mt-2 font-accent text-xs text-warm-grey">
              Hero image: {content.heroImageUrl.slice(0, 72)}
              {content.heroImageUrl.length > 72 ? "…" : ""}
            </p>
          ) : null}
          <ul className="mt-4 list-inside list-disc space-y-2 font-accent text-sm text-mid-grey">
            {content.sections.map((s, i) => (
              <li key={i}>
                <span className="font-medium text-charcoal">{s.heading}:</span> {s.body}
                {s.imageUrl ? (
                  <span className="mt-1 block text-xs text-warm-grey">Includes image: {s.imageAlt ?? "photo"}</span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-accent text-sm text-mid-grey">{content.closing}</p>
          <p className="mt-2 font-accent text-xs text-warm-grey">
            CTA: {content.ctaLabel} → {content.ctaUrl}
          </p>

          <div className="rule-section my-6 max-w-xs" aria-hidden />
          <div>
            <label
              htmlFor="ai-feedback"
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              Refine with feedback
            </label>
            <textarea
              id="ai-feedback"
              value={aiFeedback}
              onChange={(e) => setAiFeedback(e.target.value)}
              rows={4}
              placeholder="e.g. Softer headline, mention Saturday waitlist, shorter intro, swap hero for the studio photo…"
              className="w-full resize-y border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
              disabled={loading}
            />
            <p className="mt-1 font-accent text-xs text-warm-grey">
              At least 8 characters. Uses your current draft plus the title and notes above — adjust those first if the
              whole direction should change.
            </p>
            <button
              type="button"
              onClick={() => void regenerateWithFeedback()}
              disabled={!canRefineWithFeedback}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-white px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white disabled:opacity-40"
            >
              {loading ? "Revising…" : "Regenerate with feedback"}
            </button>
          </div>
        </div>
      ) : null}

      {html ? (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal">Email preview</h3>
          <iframe
            title="Email preview"
            srcDoc={html}
            sandbox="allow-same-origin"
            className="h-[640px] w-full border border-light-grey bg-white"
          />
          <div className="rounded-sm border border-light-grey bg-[#fafafa] p-4 md:p-5">
            <p className="font-accent text-xs font-bold uppercase tracking-wide text-charcoal">Send a real preview</p>
            <p className="mt-2 max-w-xl font-accent text-xs leading-relaxed text-mid-grey">
              Enter an email address (yours or someone reviewing the copy). We&apos;ll send one message with this draft
              only. Your mailing list is not contacted.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="min-w-[240px] flex-1">
                <label
                  htmlFor="preview-email"
                  className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
                >
                  Preview email
                </label>
                <input
                  id="preview-email"
                  type="email"
                  autoComplete="email"
                  value={previewEmail}
                  onChange={(e) => {
                    setPreviewEmail(e.target.value);
                    if (previewSendState !== "idle") {
                      setPreviewSendState("idle");
                      setPreviewSendMessage("");
                    }
                  }}
                  placeholder="you@example.com"
                  className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
                />
              </div>
              <button
                type="button"
                onClick={() => void sendPreviewToInbox()}
                disabled={!content || !previewEmailOk || previewSendState === "sending"}
                className="inline-flex min-h-[44px] shrink-0 items-center justify-center border border-charcoal bg-white px-6 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white disabled:opacity-40"
              >
                {previewSendState === "sending" ? "Sending…" : "Email me this preview"}
              </button>
            </div>
            {previewSendMessage ? (
              <p
                className={`mt-3 font-accent text-sm ${
                  previewSendState === "success"
                    ? "text-charcoal"
                    : previewSendState === "error"
                      ? "text-red-800"
                      : "text-mid-grey"
                }`}
                role="status"
              >
                {previewSendMessage}
              </p>
            ) : null}
          </div>
          <p className="font-accent text-xs text-warm-grey">
            You can still copy HTML from the iframe in the browser if you need to paste into Resend Broadcasts.
          </p>
        </div>
      ) : null}
    </div>
  );
}
