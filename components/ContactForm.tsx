"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CONTACT, CONTACT_FORMSPREE_ACTION } from "@/lib/constants";
import { cn } from "@/lib/cn";

type FormValues = {
  name: string;
  email: string;
  phone: string;
  message: string;
  _gotcha?: string;
};

type Props = {
  className?: string;
};

export function ContactForm({ className }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("sending");
    const body = new FormData();
    body.append("name", data.name.trim());
    body.append("email", data.email.trim());
    body.append("phone", data.phone?.trim() ?? "");
    body.append("message", data.message.trim());
    body.append("_subject", "[Reset Pilates] Website enquiry");
    body.append("source", "contact-page");
    if (data._gotcha) body.append("_gotcha", data._gotcha);

    try {
      const res = await fetch(CONTACT_FORMSPREE_ACTION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        reset({ name: "", email: "", phone: "", message: "", _gotcha: "" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none transition placeholder:text-warm-grey/80 focus:border-charcoal focus:ring-2 focus:ring-charcoal/10";

  const labelClass =
    "mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("relative space-y-5", className)}
      noValidate
    >
      <label htmlFor="contact-website" className="sr-only">
        Leave this field empty
      </label>
      <input
        id="contact-website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        className="absolute h-0 w-0 overflow-hidden opacity-0"
        aria-hidden
        {...register("_gotcha")}
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            {...register("name", {
              required: "Please enter your name.",
              minLength: { value: 2, message: "Please enter at least 2 characters." },
            })}
          />
          {errors.name && (
            <p id="contact-name-error" className="mt-1.5 text-xs text-mid-grey" role="alert">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            {...register("email", {
              required: "Please enter your email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
          />
          {errors.email && (
            <p id="contact-email-error" className="mt-1.5 text-xs text-mid-grey" role="alert">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="contact-phone" className={labelClass}>
          Phone <span className="font-sans font-normal normal-case tracking-normal text-warm-grey/90">(optional)</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone number if you would like a call back"
          className={inputClass}
          {...register("phone")}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          rows={6}
          className={cn(inputClass, "min-h-[140px] resize-y")}
          placeholder="Classes, memberships, partnerships, press, ask us anything."
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          {...register("message", {
            required: "Please enter a message.",
            minLength: { value: 20, message: "Please write at least a few words (20 characters minimum)." },
          })}
        />
        {errors.message && (
          <p id="contact-message-error" className="mt-1.5 text-xs text-mid-grey" role="alert">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-charcoal/90 hover:shadow-md active:translate-y-0 disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:shrink-0"
        >
          {status === "sending" ? (
            "Sending…"
          ) : (
            <>
              <Send className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
              Send message
            </>
          )}
        </button>
        <p className="font-accent text-[11px] uppercase leading-relaxed tracking-[0.12em] text-warm-grey">
          We never share your details. Prefer email?{" "}
          <a href={`mailto:${CONTACT.email}`} className="text-charcoal underline-offset-2 hover:underline">
            {CONTACT.email}
          </a>
        </p>
      </div>

      {status === "success" && (
        <p className="text-sm text-mid-grey" role="status">
          Thank you, your message is on its way. We&apos;ll get back to you as soon as we can.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-mid-grey" role="alert">
          Something went wrong. Please try again or email us directly at{" "}
          <a href={`mailto:${CONTACT.email}`} className="font-medium text-charcoal underline-offset-2 hover:underline">
            {CONTACT.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
