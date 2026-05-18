import type { ReactNode } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team area | Reset Pilates",
  robots: { index: false, follow: false },
};

export default function StudioLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[70vh] border-t border-light-grey bg-[#faf9f8]">
      <div className="mx-auto max-w-3xl px-4 py-10 md:px-6 md:py-14">{children}</div>
    </div>
  );
}
