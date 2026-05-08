"use client";

import { useEffect, useState } from "react";

/**
 * In development, Safari often shows “localhost” with no port — that is port 80, not `next dev`
 * (default 3000). CSS and routes then fail to match this app.
 */
export function DevHostHint() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const { hostname, port, protocol } = window.location;
    const noExplicitPort = port === "";
    const local =
      hostname === "localhost" || hostname === "127.0.0.1" || hostname === "[::1]";
    if (protocol === "http:" && local && noExplicitPort) {
      setShow(true);
    }
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] border-t border-charcoal/25 bg-amber-100 px-4 py-3 text-center font-accent text-xs text-charcoal">
      <strong className="font-sans uppercase tracking-wide">Dev server URL</strong>
      {" — "}
      <span className="text-mid-grey">
        Bare <code className="rounded bg-white/80 px-1 py-0.5">localhost</code> uses{" "}
        <strong>port 80</strong>, not Next.js. Use{" "}
      </span>
      <a href="http://localhost:3000/" className="font-semibold text-charcoal underline">
        http://localhost:3000
      </a>
      <span className="text-mid-grey"> (or the port shown in your terminal after </span>
      <code className="rounded bg-white/80 px-1 py-0.5">npm run dev</code>
      <span className="text-mid-grey">).</span>
    </div>
  );
}
