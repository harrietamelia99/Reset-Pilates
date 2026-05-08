"use client";

import { Bell, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL_ALERTS_FORMSPREE_ACTION } from "@/lib/constants";

type FormValues = {
  email: string;
  name: string;
  _gotcha?: string;
};

export function EmailAlertsForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

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
    const body = new FormData();
    body.append("email", data.email);
    body.append("name", data.name?.trim() ?? "");
    body.append("_subject", "[Reset Pilates] Email alerts signup");
    body.append("source", "homepage-email-alerts");
    if (data._gotcha) body.append("_gotcha", data._gotcha);

    try {
      const res = await fetch(EMAIL_ALERTS_FORMSPREE_ACTION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        reset({ email: "", name: "", _gotcha: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-5" noValidate>
      <label htmlFor="alerts-website" className="sr-only">
        Leave this field empty
      </label>
      <input
        id="alerts-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
        {...register("_gotcha")}
      />

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-3">
        <div>
          <label htmlFor="alerts-name" className="sr-only">
            Name (optional)
          </label>
          <input
            id="alerts-name"
            type="text"
            autoComplete="given-name"
            placeholder="Name (optional)"
            className="w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none placeholder:text-warm-grey/80 transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="alerts-email" className="sr-only">
            Email address
          </label>
          <div className="relative">
            <Mail
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-grey"
              strokeWidth={1.5}
              aria-hidden
            />
            <input
              id="alerts-email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className="w-full border border-light-grey bg-white py-3 pl-10 pr-4 text-sm text-charcoal outline-none placeholder:text-warm-grey/80 transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
              {...register("email", { required: "Please enter your email." })}
            />
          </div>
          {errors.email && (
            <p className="mt-1.5 text-xs text-mid-grey">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90 disabled:opacity-60 sm:shrink-0"
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
        <p className="font-accent text-[11px] uppercase leading-relaxed tracking-[0.12em] text-warm-grey">
          Opening dates, offers &amp; timetable drops — no spam.
        </p>
      </div>

      {status === "success" && (
        <p className="text-sm text-mid-grey" role="status">
          You&apos;re on the list — look out for news from Reset.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-mid-grey" role="alert">
          That didn&apos;t go through. Please try again or email hello@resetpilatesstudio.co.uk.
        </p>
      )}
    </form>
  );
}
