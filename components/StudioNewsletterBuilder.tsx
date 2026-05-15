"use client";

import { useState } from "react";
import type { NewsletterContent } from "@/lib/emails/newsletter-types";

export function StudioNewsletterBuilder() {
  const [issueTitle, setIssueTitle] = useState("");
  const [audience, setAudience] = useState("Waitlist and early members");
  const [notes, setNotes] = useState("");
  const [content, setContent] = useState<NewsletterContent | null>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    setLoading(true);
    setError("");
    setContent(null);
    setHtml(null);
    try {
      const res = await fetch("/api/studio/newsletter-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ issueTitle, notes, audience }),
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
        <h2 className="text-lg font-bold uppercase tracking-heading text-charcoal">Newsletter from your notes</h2>
        <p className="mt-3 max-w-xl font-accent text-sm leading-relaxed text-mid-grey">
          Write rough bullets, dates, and tone in the box. The model returns structured copy only; the site renders it
          into the branded Reset email template (no raw HTML from the AI).
        </p>
        <div className="rule-section my-6 max-w-xs" aria-hidden />
        <div className="space-y-4">
          <div>
            <label htmlFor="issue-title" className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">
              Issue title
            </label>
            <input
              id="issue-title"
              value={issueTitle}
              onChange={(e) => setIssueTitle(e.target.value)}
              placeholder="e.g. April build update"
              className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
          </div>
          <div>
            <label htmlFor="audience" className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">
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
            <label htmlFor="notes" className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">
              Your notes
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={12}
              placeholder="Bullets: fit-out progress, opening week offer, creche update, timetable teaser…"
              className="w-full resize-y border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal"
            />
          </div>
          <button
            type="button"
            onClick={() => void generate()}
            disabled={loading || issueTitle.trim().length < 2 || notes.trim().length < 10}
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
          <ul className="mt-4 list-inside list-disc space-y-2 font-accent text-sm text-mid-grey">
            {content.sections.map((s, i) => (
              <li key={i}>
                <span className="font-medium text-charcoal">{s.heading}:</span> {s.body}
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
            Copy HTML from devtools if you need to paste into Resend Broadcasts, or connect Resend batch send later.
          </p>
        </div>
      ) : null}
    </div>
  );
}
