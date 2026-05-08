"use client";

import { Mail, MessageSquare, Send, Tags, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FORMSPREE_ACTION } from "@/lib/constants";

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      subject: "general",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setStatus("sending");
    const body = new FormData();
    body.append("name", data.name);
    body.append("email", data.email);
    body.append("_subject", `[Reset] ${data.subject}`);
    body.append("subject", data.subject);
    body.append("message", data.message);

    try {
      const res = await fetch(FORMSPREE_ACTION, {
        method: "POST",
        body,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        reset({ subject: "general" });
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
      {/* TODO: Replace FORMSPREE_ACTION in lib/constants.ts with your Formspree endpoint. */}

      <div>
        <label
          htmlFor="name"
          className="flex items-center gap-2 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey"
        >
          <User className="h-3.5 w-3.5 shrink-0 text-warm-grey/90" strokeWidth={1.5} aria-hidden />
          Name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          className="mt-2 w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
          {...register("name", { required: "Please add your name." })}
        />
        {errors.name && (
          <p className="mt-1 text-xs text-mid-grey">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="flex items-center gap-2 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey"
        >
          <Mail className="h-3.5 w-3.5 shrink-0 text-warm-grey/90" strokeWidth={1.5} aria-hidden />
          Email
        </label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          className="mt-2 w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
          {...register("email", { required: "Please add your email." })}
        />
        {errors.email && (
          <p className="mt-1 text-xs text-mid-grey">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="subject"
          className="flex items-center gap-2 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey"
        >
          <Tags className="h-3.5 w-3.5 shrink-0 text-warm-grey/90" strokeWidth={1.5} aria-hidden />
          Subject
        </label>
        <select
          id="subject"
          className="mt-2 w-full border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
          {...register("subject", { required: true })}
        >
          <option value="general">General Enquiry</option>
          <option value="founding">Founding Membership</option>
          <option value="group">Group Bookings</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="message"
          className="flex items-center gap-2 font-accent text-[10px] uppercase tracking-[0.15em] text-warm-grey"
        >
          <MessageSquare className="h-3.5 w-3.5 shrink-0 text-warm-grey/90" strokeWidth={1.5} aria-hidden />
          Message
        </label>
        <textarea
          id="message"
          rows={6}
          className="mt-2 w-full resize-y border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
          {...register("message", { required: "Please add a message." })}
        />
        {errors.message && (
          <p className="mt-1 text-xs text-mid-grey">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 border border-charcoal bg-charcoal px-8 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-charcoal/90 disabled:opacity-60"
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

      {status === "success" && (
        <p className="text-sm text-mid-grey" role="status">
          Thank you — your message has been sent.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-mid-grey" role="alert">
          Something went wrong. Please email hello@resetpilatesstudio.co.uk directly.
        </p>
      )}
    </form>
  );
}
