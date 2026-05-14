import type { Metadata } from "next";
import { ComingSoon } from "@/components/ComingSoon";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Our Classes | Reset Pilates Studio",
    description:
      "Reformer, hot mat, and mat Pilates in Nailsea — full timetables and class detail are on the way for our June 2026 opening.",
    openGraph: {
      title: "Our Classes | Reset Pilates Studio",
      description:
        "Schedules and class pages for reformer, hot mat, and mat Pilates — launching before we open in Nailsea.",
    },
  };
}

export default function ClassesPage() {
  return (
    <ComingSoon
      label="Classes"
      headline="Timetables & class detail — final polish"
      description="We're finishing schedules, how to book each format, and what to expect in reformer, hot mat, and mat sessions before we publish the full breakdown."
    />
  );
}
