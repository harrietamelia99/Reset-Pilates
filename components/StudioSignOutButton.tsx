"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function StudioSignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    try {
      await fetch("/api/studio/logout", { method: "POST" });
      router.push("/studio/login");
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void signOut()}
      disabled={loading}
      className="font-accent text-xs font-bold uppercase tracking-wide text-warm-grey underline-offset-2 hover:text-charcoal hover:underline disabled:opacity-50"
    >
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
