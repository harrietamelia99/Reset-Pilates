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
};

export function EmailAlertsForm({ variant = "light" }: Props) {
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
          <label htmlFor="alerts-email" className="sr-only">
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
              id="alerts-email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              className={cn(
                "w-full border py-3 pl-10 pr-4 text-sm outline-none transition",
                variant === "dark"
                  ? "border-white/25 bg-white text-charcoal placeholder:text-mid-grey focus:border-white focus:ring-2 focus:ring-white/25"
                  : "border-light-grey bg-white text-charcoal placeholder:text-warm-grey/80 focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
              )}
              {...register("email", { required: "Please enter your email." })}
            />
          </div>
          {errors.email && (
            <p className={cn("mt-1.5 text-xs", variant === "dark" ? "text-white/70" : "text-mid-grey")}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className={cn(
            "inline-flex min-h-[44px] items-center justify-center gap-2 border px-8 py-3 text-xs font-bold uppercase tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:shrink-0",
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
            "font-accent text-[11px] uppercase leading-relaxed tracking-[0.12em]",
            variant === "dark" ? "text-white/55" : "text-warm-grey"
          )}
        >
          Opening dates, offers &amp; timetable drops, no spam.
        </p>
      </div>

      {status === "success" && (
        <p className={cn("text-sm", variant === "dark" ? "text-white/80" : "text-mid-grey")} role="status">
          You&apos;re on the list, look out for news from Reset.
        </p>
      )}
      {status === "error" && (
        <p className={cn("text-sm", variant === "dark" ? "text-white/80" : "text-mid-grey")} role="alert">
          That didn&apos;t go through. Please try again or email hello@resetpilatesstudio.co.uk.
        </p>
      )}
    </form>
  );
}
