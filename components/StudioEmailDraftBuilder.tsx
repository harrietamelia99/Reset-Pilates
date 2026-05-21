"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { NewsletterContent } from "@/lib/emails/newsletter-types";
import { getFoundingMembershipNewsletterTemplate } from "@/lib/emails/example-newsletter-founding";

export type StudioEmailDraftVariant = "newsletter" | "alert";

const PREVIEW_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/** Must match server default in `handle-email-broadcast-post` (or STUDIO_BROADCAST_CONFIRM_PHRASE on Vercel). */
const BROADCAST_CONFIRM_WORD = "SEND";

type BuilderConfig = {
  previewEmailStorageKey: string;
  draftUrl: string;
  previewUrl: string;
  broadcastUrl: string;
  pageHeading: string;
  intro: string;
  titleLabel: string;
  titlePlaceholder: string;
  defaultAudience: string;
  notesPlaceholder: string;
  notesRows: number;
};

const BUILDER_CONFIG: Record<StudioEmailDraftVariant, BuilderConfig> = {
  newsletter: {
    previewEmailStorageKey: "reset-studio-newsletter-preview-email",
    draftUrl: "/api/studio/newsletter-draft",
    previewUrl: "/api/studio/newsletter-preview-email",
    broadcastUrl: "/api/studio/newsletter-broadcast",
    pageHeading: "Monthly newsletter",
    intro:
      "Add a title, your rough notes, and optional photos. The tool turns that into draft wording in the Reset email layout, or load the founding-membership starter below and edit from there, or use “Changes to make” to tweak a draft. Send yourself a test, then when you’re happy you can email your full list from the last step below.",
    titleLabel: "Newsletter title",
    titlePlaceholder: "e.g. May — timetable refresh & hot mat",
    defaultAudience: "Waitlist and members",
    notesPlaceholder:
      "Bullets: what happened this month, timetable changes, offers, personal sign-off ideas, which photo goes with what…",
    notesRows: 12,
  },
  alert: {
    previewEmailStorageKey: "reset-studio-alert-preview-email",
    draftUrl: "/api/studio/alert-draft",
    previewUrl: "/api/studio/alert-preview-email",
    broadcastUrl: "/api/studio/alert-broadcast",
    pageHeading: "Updates & alerts",
    intro:
      "For quick one-off emails — timetable changes, last-minute news, closures, reminders. Add notes and optional photos, tweak with “Changes to make” if you use the drafting helper, send yourself a test, then use the last step to email your full list when you’re ready.",
    titleLabel: "What this is about",
    titlePlaceholder: "e.g. Storm day — evening classes cancelled",
    defaultAudience: "Waitlist and members",
    notesPlaceholder:
      "What should people know? Dates, times, what’s cancelled or new, what to do next, booking link if it helps…",
    notesRows: 10,
  },
};

type AssetRow = {
  id: string;
  url: string;
  note: string;
  fileName: string;
  uploading: boolean;
  error?: string;
};

type Props = { variant: StudioEmailDraftVariant };

export function StudioEmailDraftBuilder({ variant }: Props) {
  const c = BUILDER_CONFIG[variant];
  const idPrefix = variant;

  const [issueTitle, setIssueTitle] = useState("");
  const [audience, setAudience] = useState(c.defaultAudience);
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
  const [listSubject, setListSubject] = useState("");
  const [broadcastReadyChecked, setBroadcastReadyChecked] = useState(false);
  const [broadcastConfirm, setBroadcastConfirm] = useState("");
  const [broadcastSendState, setBroadcastSendState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [broadcastSendMessage, setBroadcastSendMessage] = useState("");
  const [templateLoading, setTemplateLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!content) {
      setListSubject("");
      return;
    }
    setListSubject((prev) => prev.trim() || issueTitle.trim() || content.headline);
  }, [content, issueTitle]);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(c.previewEmailStorageKey);
      if (saved?.trim()) setPreviewEmail(saved.trim());
    } catch {
      /* ignore */
    }
  }, [c.previewEmailStorageKey]);

  useEffect(() => {
    if (!previewEmail.trim() || !PREVIEW_EMAIL_RE.test(previewEmail.trim())) return;
    try {
      sessionStorage.setItem(c.previewEmailStorageKey, previewEmail.trim());
    } catch {
      /* ignore */
    }
  }, [previewEmail, c.previewEmailStorageKey]);

  const hasImages = useMemo(() => assets.some((a) => a.url && !a.uploading), [assets]);
  const anyUploading = assets.some((a) => a.uploading);
  const notesOk = hasImages ? notes.trim().length >= 3 : notes.trim().length >= 10;
  const canGenerate = issueTitle.trim().length >= 2 && notesOk && !anyUploading && !loading;

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
              ? data.message ??
                "Photos can’t be uploaded on the live site yet. Try again later or use a smaller image, or ask whoever manages the website."
              : data.error === "invalid_type"
                ? "Use JPG, PNG, WebP, or GIF."
                : data.error === "file_too_large"
                  ? "That file is too large. Try a smaller photo."
                  : data.message ?? "Upload failed.";
          setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, uploading: false, error: msg } : a)));
          continue;
        }
        if (typeof data.url === "string") {
          setAssets((prev) =>
            prev.map((a) => (a.id === id ? { ...a, url: data.url!, uploading: false, error: undefined } : a))
          );
        }
      } catch {
        setAssets((prev) => prev.map((a) => (a.id === id ? { ...a, uploading: false, error: "Network error." } : a)));
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

  const resolveSiteBaseForTemplates = useCallback(() => {
    if (typeof window !== "undefined" && window.location?.origin) {
      return window.location.origin.replace(/\/+$/, "");
    }
    return (
      process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "").trim() || "https://resetpilatesstudio.co.uk"
    );
  }, []);

  const loadFoundingMembershipTemplate = useCallback(async () => {
    if (variant !== "newsletter") return;
    setTemplateLoading(true);
    setError("");
    setBroadcastSendState("idle");
    setBroadcastSendMessage("");
    setBroadcastReadyChecked(false);
    setBroadcastConfirm("");
    setPreviewSendState("idle");
    setPreviewSendMessage("");
    try {
      const base = resolveSiteBaseForTemplates();
      const template = getFoundingMembershipNewsletterTemplate(base);

      const res = await fetch("/api/studio/newsletter-render-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: template }),
      });

      const data = (await res.json()) as { ok?: boolean; html?: string; error?: string };

      if (!res.ok || typeof data.html !== "string") {
        if (data.error === "unauthorized") {
          setError("Please sign back into the studio and try again.");
        } else {
          setError(data.error === "render_failed" ? "Couldn't build the email preview." : "Could not load template.");
        }
        return;
      }

      setIssueTitle("Founding membership");
      setNotes(
        "Template loaded with current founding rates from the website. Edit this note or use “Changes to make”, then “Create draft” if you’d like the AI assistant to rework it."
      );
      setAudience("Waitlist and founding interest");
      setAiFeedback("");
      setContent(template);
      setHtml(data.html);
    } catch {
      setError("Network error.");
    } finally {
      setTemplateLoading(false);
    }
  }, [resolveSiteBaseForTemplates, variant]);

  function draftBody(extra?: { previousContent?: NewsletterContent; feedback?: string }) {
    const imageAssets = assets
      .filter((a) => a.url && !a.uploading)
      .map((a) => ({ url: a.url, note: a.note.trim() || undefined }));
    return {
      issueTitle,
      notes,
      audience,
      imageAssets,
      ...extra,
    };
  }

  async function regenerateWithFeedback() {
    if (!content || !canRefineWithFeedback) return;
    setLoading(true);
    setError("");
    setHtml(null);
    setPreviewSendState("idle");
    setPreviewSendMessage("");
    setBroadcastSendState("idle");
    setBroadcastSendMessage("");
    setBroadcastReadyChecked(false);
    setBroadcastConfirm("");
    try {
      const res = await fetch(c.draftUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftBody({ previousContent: content, feedback: aiFeedback.trim() })),
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
          setError("The drafting assistant isn’t turned on for this site yet. Ask whoever looks after the website.");
        } else if (data.error === "unauthorized") {
          setError("You’ve been signed out. Please sign in again.");
        } else if (data.error === "validation") {
          setError(
            "Say a bit more in your feedback (at least a few words), and check the title and notes above still look right."
          );
        } else if (data.error === "invalid_previous") {
          setError("Start with “Create draft” again, then you can ask for changes.");
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
    setBroadcastSendState("idle");
    setBroadcastSendMessage("");
    setBroadcastReadyChecked(false);
    setBroadcastConfirm("");
    try {
      const res = await fetch(c.draftUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draftBody()),
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
          setError("The drafting assistant isn’t turned on for this site yet. Ask whoever looks after the website.");
        } else if (data.error === "unauthorized") {
          setError("You’ve been signed out. Please sign in again.");
        } else if (data.error === "validation") {
          setError("Please add a short title and enough in the notes (or a few words if you’ve added photos).");
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

  const canSendToList =
    Boolean(content) &&
    previewSendState === "success" &&
    listSubject.trim().length >= 2 &&
    broadcastReadyChecked &&
    broadcastConfirm.trim().toUpperCase() === BROADCAST_CONFIRM_WORD &&
    !loading &&
    !anyUploading &&
    broadcastSendState !== "sending";

  async function sendBroadcastToList() {
    if (!content || !canSendToList) return;
    setBroadcastSendState("sending");
    setBroadcastSendMessage("");
    try {
      const res = await fetch(c.broadcastUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          subject: listSubject.trim(),
          confirmPhrase: broadcastConfirm.trim(),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        if (data.error === "unauthorized") {
          setBroadcastSendState("error");
          setBroadcastSendMessage("You’ve been signed out. Please sign in again.");
        } else if (data.error === "broadcast_not_configured") {
          setBroadcastSendState("error");
          setBroadcastSendMessage(
            "Sending to your full list isn’t set up on the website yet. Ask whoever looks after Resend / the mailing list."
          );
        } else if (data.error === "confirm_mismatch") {
          setBroadcastSendState("error");
          setBroadcastSendMessage(`Type ${BROADCAST_CONFIRM_WORD} exactly to confirm.`);
        } else if (data.error === "not_configured") {
          setBroadcastSendState("error");
          setBroadcastSendMessage("Email isn’t fully configured on the server yet.");
        } else if (data.error === "validation") {
          setBroadcastSendState("error");
          setBroadcastSendMessage("Check the inbox subject line (at least a couple of characters).");
        } else {
          setBroadcastSendState("error");
          setBroadcastSendMessage("Could not send to your list. Try again or check the Resend dashboard.");
        }
        return;
      }
      setBroadcastSendState("success");
      setBroadcastSendMessage(
        "Sending started. It can take a few minutes for everyone to receive it. Check your Resend dashboard for status."
      );
    } catch {
      setBroadcastSendState("error");
      setBroadcastSendMessage("Network error.");
    }
  }

  async function sendPreviewToInbox() {
    if (!content || !previewEmailOk) return;
    setPreviewSendState("sending");
    setPreviewSendMessage("");
    try {
      const res = await fetch(c.previewUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: previewEmail.trim(), content }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        if (data.error === "unauthorized") {
          setPreviewSendState("error");
          setPreviewSendMessage("You’ve been signed out. Please sign in again.");
        } else if (data.error === "not_configured") {
          setPreviewSendState("error");
          setPreviewSendMessage("Test emails aren’t set up on this site yet. Ask whoever looks after the website.");
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

  const feedbackPlaceholder =
    variant === "alert"
      ? "e.g. Shorter, mention refunds, warmer sign-off, use the timetable photo…"
      : "e.g. Softer headline, mention the Saturday waitlist, shorter intro, use the class photo for the top…";

  return (
    <div className="space-y-8">
      <div className="rounded-sm border border-light-grey bg-white p-6 shadow-sm md:p-8">
        <h2 className="text-lg font-bold uppercase tracking-heading text-charcoal">{c.pageHeading}</h2>
        <p className="mt-3 max-w-2xl font-accent text-sm leading-relaxed text-mid-grey">{c.intro}</p>
        {variant === "newsletter" ? (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => void loadFoundingMembershipTemplate()}
              disabled={templateLoading || loading || anyUploading}
              className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-white px-5 py-2.5 font-accent text-[11px] font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white disabled:opacity-40"
            >
              {templateLoading ? "Loading…" : "Load founding membership template"}
            </button>
            <span className="max-w-xl font-accent text-xs text-warm-grey">
              Fetches live founding prices from your site settings, shows a preview, then you can send a test or run through the AI drafts as usual.
            </span>
          </div>
        ) : null}
        <div className="rule-section my-6 max-w-xs" aria-hidden />
        <div className="space-y-4">
          <div>
            <label
              htmlFor={`${idPrefix}-issue-title`}
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              {c.titleLabel}
            </label>
            <input
              id={`${idPrefix}-issue-title`}
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              placeholder={c.titlePlaceholder}
              className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
          </div>
          <div>
            <label
              htmlFor={`${idPrefix}-audience`}
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              Who it’s for (optional)
            </label>
            <input
              id={`${idPrefix}-audience`}
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
              JPG, PNG, or similar. Large files may take a moment or may need resizing.
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
                      <label className="sr-only" htmlFor={`${idPrefix}-cap-${a.id}`}>
                        Note for this photo
                      </label>
                      <input
                        id={`${idPrefix}-cap-${a.id}`}
                        value={a.note}
                        onChange={(e) => setNote(a.id, e.target.value)}
                        disabled={!a.url || !!a.error}
                        placeholder="Optional note (e.g. reformer room, class shot)"
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
            <label
              htmlFor={`${idPrefix}-notes`}
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              Your notes
            </label>
            <textarea
              id={`${idPrefix}-notes`}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={c.notesRows}
              placeholder={c.notesPlaceholder}
              className="w-full resize-y border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
            <p className="mt-1 font-accent text-xs text-warm-grey">
              {hasImages
                ? "With photos: add at least a few words so the draft matches what you mean."
                : "Without photos: please write at least a sentence or two."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void generate()}
            disabled={!canGenerate}
            className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-95 disabled:opacity-40"
          >
            {loading ? (content ? "Working…" : "Creating draft…") : "Create draft"}
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
          <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal">Your draft</h3>
          <p className="mt-2 font-accent text-sm font-medium text-charcoal">{content.headline}</p>
          <p className="mt-3 font-accent text-sm leading-relaxed text-mid-grey">{content.intro}</p>
          {content.heroImageUrl ? (
            <p className="mt-2 font-accent text-xs text-warm-grey">Includes a main photo at the top of the email.</p>
          ) : null}
          <ul className="mt-4 list-inside list-disc space-y-2 font-accent text-sm text-mid-grey">
            {content.sections.map((s, i) => (
              <li key={i}>
                <span className="font-medium text-charcoal">{s.heading}:</span> {s.body}
                {s.imageUrl ? (
                  <span className="mt-1 block text-xs text-warm-grey">Includes a photo ({s.imageAlt ?? "image"}).</span>
                ) : null}
              </li>
            ))}
          </ul>
          <p className="mt-4 font-accent text-sm text-mid-grey">{content.closing}</p>
          <p className="mt-2 font-accent text-xs text-warm-grey">
            Button: “{content.ctaLabel}” links to {content.ctaUrl}
          </p>

          <div className="rule-section my-6 max-w-xs" aria-hidden />
          <div>
            <label
              htmlFor={`${idPrefix}-ai-feedback`}
              className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
            >
              Changes to make (optional)
            </label>
            <textarea
              id={`${idPrefix}-ai-feedback`}
              value={aiFeedback}
              onChange={(e) => setAiFeedback(e.target.value)}
              rows={4}
              placeholder={feedbackPlaceholder}
              className="w-full resize-y border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
              disabled={loading}
            />
            <p className="mt-1 font-accent text-xs text-warm-grey">
              At least a few words. The tool uses this together with your title and notes above — change those first if
              you want a completely different angle.
            </p>
            <button
              type="button"
              onClick={() => void regenerateWithFeedback()}
              disabled={!canRefineWithFeedback}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-white px-8 py-3 text-xs font-bold uppercase tracking-wide text-charcoal transition hover:bg-charcoal hover:text-white disabled:opacity-40"
            >
              {loading ? "Updating…" : "Update draft"}
            </button>
          </div>
        </div>
      ) : null}

      {html ? (
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wide text-charcoal">How it will look</h3>
          <iframe
            title={variant === "alert" ? "Update email preview" : "Newsletter preview"}
            srcDoc={html}
            sandbox="allow-same-origin"
            className="h-[640px] w-full border border-light-grey bg-white"
          />
          <div className="rounded-sm border border-light-grey bg-[#fafafa] p-4 md:p-5">
            <p className="font-accent text-xs font-bold uppercase tracking-wide text-charcoal">Send yourself a test</p>
            <p className="mt-2 max-w-xl font-accent text-xs leading-relaxed text-mid-grey">
              Enter your email (or someone checking the wording). We&apos;ll send this draft once. Nobody on your mailing
              list is included.
            </p>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
              <div className="min-w-[240px] flex-1">
                <label
                  htmlFor={`${idPrefix}-preview-email`}
                  className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
                >
                  Your email
                </label>
                <input
                  id={`${idPrefix}-preview-email`}
                  type="email"
                  autoComplete="email"
                  value={previewEmail}
                  onChange={(e) => {
                    setPreviewEmail(e.target.value);
                    if (previewSendState !== "idle") {
                      setPreviewSendState("idle");
                      setPreviewSendMessage("");
                    }
                    setBroadcastSendState("idle");
                    setBroadcastSendMessage("");
                    setBroadcastReadyChecked(false);
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

          <div className="rounded-sm border border-charcoal/20 bg-white p-4 md:p-5">
            <p className="font-accent text-xs font-bold uppercase tracking-wide text-charcoal">
              Last step: send to your mailing list
            </p>
            <p className="mt-2 max-w-xl font-accent text-xs leading-relaxed text-mid-grey">
              Only do this after you&apos;ve sent yourself a test above and checked it. This emails{" "}
              <strong className="font-medium text-charcoal">everyone in your main Resend list</strong> — the same
              audience your developer linked for you. An unsubscribe line is added automatically.
            </p>
            <div className="mt-4">
              <label
                htmlFor={`${idPrefix}-list-subject`}
                className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
              >
                Inbox subject line
              </label>
              <input
                id={`${idPrefix}-list-subject`}
                value={listSubject}
                onChange={(e) => setListSubject(e.target.value)}
                disabled={!content || broadcastSendState === "sending"}
                placeholder="What people see in their inbox"
                className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal disabled:opacity-50"
              />
            </div>
            <label className="mt-4 flex cursor-pointer items-start gap-3 font-accent text-sm text-mid-grey">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 border-light-grey text-charcoal"
                checked={broadcastReadyChecked}
                onChange={(e) => {
                  setBroadcastReadyChecked(e.target.checked);
                  setBroadcastSendState("idle");
                  setBroadcastSendMessage("");
                }}
                disabled={!content || previewSendState !== "success" || broadcastSendState === "sending"}
              />
              <span>
                I&apos;ve reviewed my test email and I&apos;m ready to send this version to the full list.
              </span>
            </label>
            <div className="mt-4">
              <label
                htmlFor={`${idPrefix}-broadcast-confirm`}
                className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey"
              >
                Type {BROADCAST_CONFIRM_WORD} to confirm
              </label>
              <input
                id={`${idPrefix}-broadcast-confirm`}
                value={broadcastConfirm}
                onChange={(e) => {
                  setBroadcastConfirm(e.target.value);
                  setBroadcastSendState("idle");
                  setBroadcastSendMessage("");
                }}
                autoComplete="off"
                disabled={!content || broadcastSendState === "sending"}
                placeholder={BROADCAST_CONFIRM_WORD}
                className="w-full max-w-xs border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal uppercase disabled:opacity-50"
              />
            </div>
            <button
              type="button"
              onClick={() => void sendBroadcastToList()}
              disabled={!canSendToList}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-95 disabled:opacity-40"
            >
              {broadcastSendState === "sending" ? "Sending to list…" : "Send to everyone on the list"}
            </button>
            {previewSendState !== "success" ? (
              <p className="mt-3 font-accent text-xs text-warm-grey">
                Send a test email first — then you can use this button.
              </p>
            ) : null}
            {broadcastSendMessage ? (
              <p
                className={`mt-3 font-accent text-sm ${
                  broadcastSendState === "success"
                    ? "text-charcoal"
                    : broadcastSendState === "error"
                      ? "text-red-800"
                      : "text-mid-grey"
                }`}
                role="status"
              >
                {broadcastSendMessage}
              </p>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
