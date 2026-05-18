"use client";

import { useMemo, useRef, useState } from "react";
import type { NewsletterContent } from "@/lib/emails/newsletter-types";

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
  const fileRef = useRef<HTMLInputElement>(null);

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

  async function generate() {
    setLoading(true);
    setError("");
    setContent(null);
    setHtml(null);
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

  return (
    <div className="space-y-8">
      <div className="rounded-sm border border-light-grey bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-bold uppercase tracking-heading text-charcoal">Monthly newsletter</h2>
        <p className="mt-3 max-w-2xl font-accent text-sm leading-relaxed text-mid-grey">
          Mari signs in here, adds rough notes and optional photos (compressed automatically). The model writes in her
          voice as structured copy only; the site drops it into the Reset email template with no raw HTML from the AI.
          Paste into Resend when you&apos;re happy with the preview.
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
            {loading ? "Drafting…" : "Generate branded draft"}
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
          <p className="font-accent text-xs text-warm-grey">
            Copy HTML from the preview if you need to paste into Resend Broadcasts, or send programmatically later.
          </p>
        </div>
      ) : null}
    </div>
  );
}
