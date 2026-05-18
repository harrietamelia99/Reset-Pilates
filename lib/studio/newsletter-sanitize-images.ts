import type { NewsletterContent } from "@/lib/emails/newsletter-types";

/** Remove any image URLs the model invented (not in Mari's upload list). */
export function sanitizeNewsletterImages(content: NewsletterContent, allowedAbsoluteUrls: string[]): NewsletterContent {
  const allowed = new Set(allowedAbsoluteUrls.map((u) => u.trim()).filter(Boolean));

  const heroOk =
    content.heroImageUrl && allowed.has(content.heroImageUrl.trim()) ? content.heroImageUrl.trim() : undefined;

  const sections = content.sections.map((s) => {
    const url = s.imageUrl?.trim();
    const imageUrl = url && allowed.has(url) ? url : undefined;
    return {
      ...s,
      imageUrl,
      imageAlt: imageUrl ? s.imageAlt : undefined,
    };
  });

  return {
    ...content,
    heroImageUrl: heroOk,
    heroImageAlt: heroOk ? content.heroImageAlt : undefined,
    sections,
  };
}
