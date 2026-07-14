"use client";

import { Bell, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_ALERTS_API_PATH } from "@/lib/constants";
import { cn } from "@/lib/cn";

type FormValues = {
  email: string;
  name: string;
  _gotcha?: string;
};

type Props = {
  /** Dark strip on homepage; default matches light sections elsewhere */
  variant?: "light" | "dark";
  /** Prefix for input ids (avoids duplicates when two forms are on the page, e.g. promo modal). */
  idPrefix?: string;
  /** Called after a successful signup (e.g. close modal, analytics). */
  onSuccess?: () => void;
  /** Place the disclaimer under the button instead of beside it (use in narrow modals). */
  stackFooterNote?: boolean;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailAlertsForm({
  variant = "light",
  idPrefix = "alerts",
  onSuccess,
  stackFooterNote = false,
}: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorHint, setErrorHint] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { email: "", name: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("sending");
    setErrorHint(null);

    try {
      const res = await fetch(EMAIL_ALERTS_API_PATH, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: data.email.trim(),
          name: data.name?.trim() ?? "",
          _gotcha: data._gotcha ?? "",
        }),
      });
      if (res.ok) {
        reset({ email: "", name: "", _gotcha: "" });
        setStatus("success");
        onSuccess?.();
        return;
      }

      let payload: { error?: string } = {};
      try {
        payload = (await res.json()) as { error?: string };
      } catch {
        /* ignore */
      }

      setStatus("error");
      if (payload.error === "validation") {
        setErrorHint(
          "Check your email address is complete (for example name@gmail.com), then try again."
        );
      } else if (payload.error === "not_configured") {
        setErrorHint(
          "Sign-up isn't available from the server yet. Please email hello@resetpilatesstudio.co.uk and we'll add you."
        );
      } else if (payload.error === "send_failed") {
        setErrorHint(
          "Your details look fine, but we couldn't notify the studio just now. Please email hello@resetpilatesstudio.co.uk to join the list, or try again in a little while."
        );
      } else if (payload.error === "subscriber_send_failed") {
        setErrorHint(
          "We saved your sign-up for the studio, but the waitlist confirmation email didn't send. Check spam, or email hello@resetpilatesstudio.co.uk."
        );
      } else {
        setErrorHint(
          "Something went wrong on our side. Your email may still be fine; please try again in a few minutes or email hello@resetpilatesstudio.co.uk."
        );
      }
    } catch {
      setStatus("error");
      setErrorHint(
        "We couldn't reach the server. Check your connection, then try again, or email hello@resetpilatesstudio.co.uk."
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5">
      <label htmlFor={`${idPrefix}-website`} className="sr-only">
        Leave this field empty
      </label>
      <input
        id={`${idPrefix}-website`}
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
        {...register("_gotcha")}
      />

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-3">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="sr-only">
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            type="text"
            autoComplete="given-name"
            placeholder="Name"
            className={cn(
              "w-full border px-4 py-3 text-sm outline-none transition",
              variant === "dark"
                ? "border-white/25 bg-white text-charcoal placeholder:text-mid-grey focus:border-white focus:ring-2 focus:ring-white/25"
                : "border-light-grey bg-white text-charcoal placeholder:text-warm-grey/80 focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
            )}
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-email`} className="sr-only">
            Email address
          </label>
          <div className="relative">
            <Mail
              className={cn(
                "pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2",
                variant === "dark" ? "text-mid-grey" : "text-warm-grey"
              )}
              strokeWidth={1.5}
              aria-hidden
            />
            <input
              id={`${idPrefix}-email`}
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className={cn(
                "w-full border py-3 pl-10 pr-4 text-sm outline-none transition",
                variant === "dark"
                  ? "border-white/25 bg-white text-charcoal placeholder:text-mid-grey focus:border-white focus:ring-2 focus:ring-white/25"
                  : "border-light-grey bg-white text-charcoal placeholder:text-warm-grey/80 focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
              )}
              {...register("email", {
                required: "Please enter your email.",
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Enter a complete email address (e.g. name@gmail.com).",
                },
              })}
            />
          </div>
          {errors.email && (
            <p
              className={cn(
                "mt-1.5 text-xs [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]",
                variant === "dark" ? "text-white/90" : "text-mid-grey"
              )}
            >
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div
        className={cn(
          "flex gap-3",
          stackFooterNote ? "flex-col items-stretch" : "flex-col sm:flex-row sm:items-center"
        )}
      >
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex min-h-[48px] items-center justify-center gap-2.5 border px-9 py-3.5 text-xs font-bold uppercase leading-snug tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:shrink-0",
            variant === "dark"
              ? "border-white bg-white text-charcoal hover:bg-white/90"
              : "border-charcoal bg-charcoal text-white hover:bg-charcoal/90"
          )}
        >
          {status === "sending" ? (
            "Signing up…"
          ) : (
            <>
              <Bell className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Get email alerts
            </>
          )}
        </button>
        <p
          className={cn(
            "max-w-prose font-accent text-[11px] uppercase leading-snug tracking-[0.12em] [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]",
            stackFooterNote ? "" : "sm:min-w-0 sm:flex-1",
            variant === "dark" ? "text-white" : "text-warm-grey"
          )}
        >
          Offers, timetable updates &amp; studio news, no spam.
        </p>
      </div>

      {status === "success" && (
        <p
          className={cn(
            "text-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]",
            variant === "dark" ? "text-white" : "text-mid-grey"
          )}
          role="status"
        >
          You&apos;re on the list. Look out for our confirmation email (check spam), and news from
          Reset soon.
        </p>
      )}
      {status === "error" && (
        <p
          className={cn(
            "text-sm [text-shadow:0_1px_3px_rgba(0,0,0,0.45)]",
            variant === "dark" ? "text-white" : "text-mid-grey"
          )}
          role="alert"
        >
          {errorHint ||
            "That didn&apos;t go through. Please try again or email hello@resetpilatesstudio.co.uk."}
        </p>
      )}
    </form>
  );
}
