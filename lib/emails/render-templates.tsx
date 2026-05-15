import * as React from "react";
import { render } from "@react-email/render";
import NewsletterEmail from "@/emails/newsletter";
import PreLaunchWaitlistEmail from "@/emails/prelaunch-waitlist";
import ProgressUpdateEmail from "@/emails/progress-update";
import WelcomeBookingEmail from "@/emails/welcome-booking";
import type { NewsletterContent } from "@/lib/emails/newsletter-types";
import type { ProgressUpdateEmailProps } from "@/emails/progress-update";
import type { PreLaunchWaitlistEmailProps } from "@/emails/prelaunch-waitlist";
import type { WelcomeBookingEmailProps } from "@/emails/welcome-booking";

export async function renderWelcomeBookingHtml(props: WelcomeBookingEmailProps): Promise<string> {
  return render(<WelcomeBookingEmail {...props} />);
}

export async function renderPreLaunchWaitlistHtml(props: PreLaunchWaitlistEmailProps): Promise<string> {
  return render(<PreLaunchWaitlistEmail {...props} />);
}

export async function renderProgressUpdateHtml(props: ProgressUpdateEmailProps): Promise<string> {
  return render(<ProgressUpdateEmail {...props} />);
}

export async function renderNewsletterHtml(content: NewsletterContent): Promise<string> {
  return render(<NewsletterEmail content={content} />);
}
