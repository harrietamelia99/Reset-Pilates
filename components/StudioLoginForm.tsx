"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type Props = {
  nextPath: string;
};

export function StudioLoginForm({ nextPath }: Props) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/studio/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        if (res.status === 503) {
          setError("Studio sign-in is not configured (missing STUDIO_PASSWORD or STUDIO_SESSION_SECRET).");
        } else {
          setError("Incorrect password.");
        }
        return;
      }
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label htmlFor="studio-password" className="mb-1.5 block font-accent text-[10px] uppercase tracking-[0.14em] text-warm-grey">
          Password
        </label>
        <input
          id="studio-password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-sm border border-light-grey bg-white px-4 py-3 text-sm text-charcoal outline-none focus:border-charcoal focus:ring-2 focus:ring-charcoal/10"
          required
        />
      </div>
      {error ? (
        <p className="text-sm text-mid-grey" role="alert">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={loading}
        className="inline-flex min-h-[44px] items-center justify-center border border-charcoal bg-charcoal px-8 py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:opacity-95 disabled:opacity-50"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
