"use client";

import Link from "next/link";
import { MessageCircle, Send, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { getChatbotReply } from "@/lib/chatbotReply";
import { cn } from "@/lib/cn";

type Msg = {
  id: string;
  role: "user" | "bot";
  text: string;
  cta?: { href: string; label: string; external?: boolean };
};

const WELCOME =
  "Hi! Ask about opening, where we are, classes, or booking. For anything personal or detailed, I’ll send you to the right page or email.";

const QUICK_PROMPTS: { label: string; send: string }[] = [
  { label: "When do you open?", send: "When do you open" },
  { label: "Where is the studio?", send: "Where is the studio" },
  { label: "How do I book?", send: "How do I book a class" },
  { label: "Email the team", send: "I want to contact you" },
];

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const inputId = useId();

  const openAndWelcome = useCallback(() => {
    setOpen(true);
    setMessages((m) => (m.length > 0 ? m : [{ id: uid(), role: "bot", text: WELCOME }]));
  }, []);

  const send = useCallback((raw: string) => {
    const t = raw.trim();
    if (!t) return;
    setTyping(true);
    setMessages((m) => [...m, { id: uid(), role: "user", text: t }]);
    setDraft("");
    window.setTimeout(() => {
      const r = getChatbotReply(t);
      setTyping(false);
      setMessages((m) => [
        ...m,
        { id: uid(), role: "bot", text: r.text, cta: r.cta },
      ]);
    }, 450);
  }, []);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => (open ? setOpen(false) : openAndWelcome())}
        className={cn(
          "fixed z-[55] flex h-14 w-14 items-center justify-center rounded-full border border-charcoal bg-charcoal text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-mid-grey hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal",
          "bottom-[max(0.75rem,env(safe-area-inset-bottom,0px))] right-[max(0.75rem,env(safe-area-inset-right,0px))]",
          open && "bg-mid-grey"
        )}
        aria-expanded={open}
        aria-controls="reset-chat-panel"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={1.75} aria-hidden />
        ) : (
          <MessageCircle className="h-7 w-7" strokeWidth={1.5} aria-hidden />
        )}
      </button>

      {open ? (
        <div
          id="reset-chat-panel"
          role="dialog"
          aria-labelledby={titleId}
          className="fixed bottom-[calc(4rem+max(0.75rem,env(safe-area-inset-bottom,0px)))] right-[max(0.75rem,env(safe-area-inset-right,0px))] z-[55] flex h-[min(72vh,560px)] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border border-charcoal/15 bg-white shadow-2xl"
        >
          <div className="border-b border-charcoal/10 bg-charcoal px-4 py-3 text-white">
            <p id={titleId} className="font-sans text-sm font-bold uppercase tracking-wide">
              Need a hand?
            </p>
            <p className="mt-1 font-accent text-[11px] leading-snug text-white/75">
              Quick answers here. We&apos;ll link you to the site or email when that&apos;s easier.
            </p>
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto px-3 py-4 font-accent text-sm leading-relaxed"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}
              >
                <div
                  className={cn(
                    "max-w-[92%] rounded-lg px-3 py-2.5",
                    msg.role === "user"
                      ? "bg-charcoal text-white"
                      : "border border-charcoal/12 bg-light-grey/40 text-charcoal"
                  )}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  {msg.cta ? (
                    <div className="mt-2">
                      {msg.cta.external ? (
                        <a
                          href={msg.cta.href}
                          className="inline-flex text-xs font-medium uppercase tracking-wide text-charcoal underline underline-offset-4 transition hover:opacity-80"
                        >
                          {msg.cta.label} →
                        </a>
                      ) : (
                        <Link
                          href={msg.cta.href}
                          className="inline-flex text-xs font-medium uppercase tracking-wide text-charcoal underline underline-offset-4 transition hover:opacity-80"
                          onClick={() => setOpen(false)}
                        >
                          {msg.cta.label} →
                        </Link>
                      )}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {typing ? (
              <div className="flex justify-start">
                <div className="rounded-lg border border-charcoal/12 bg-light-grey/30 px-3 py-2 font-accent text-xs text-mid-grey">
                  Typing…
                </div>
              </div>
            ) : null}
          </div>

          {messages.filter((m) => m.role === "user").length === 0 ? (
            <div className="border-t border-charcoal/10 px-3 pb-2 pt-1">
              <p className="mb-2 font-accent text-[10px] uppercase tracking-[0.12em] text-mid-grey">
                Quick picks
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.send}
                    type="button"
                    onClick={() => send(p.send)}
                    className="rounded-full border border-charcoal/15 bg-white px-2.5 py-1 font-accent text-[11px] text-charcoal transition hover:border-charcoal/40 hover:bg-light-grey/50"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <form
            className="border-t border-charcoal/10 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <label htmlFor={inputId} className="sr-only">
              Message
            </label>
            <div className="flex gap-2">
              <input
                id={inputId}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Type your question…"
                className="min-h-[44px] flex-1 rounded border border-charcoal/20 bg-white px-3 py-2 font-accent text-sm text-charcoal placeholder:text-warm-grey focus:border-charcoal focus:outline-none focus:ring-1 focus:ring-charcoal"
                autoComplete="off"
              />
              <button
                type="submit"
                className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded border border-charcoal bg-charcoal text-white transition hover:bg-mid-grey"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </>
  );
}
