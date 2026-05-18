import { handleEmailPreviewPost } from "@/lib/studio/handle-email-preview-post";

export async function POST(request: Request) {
  return handleEmailPreviewPost(request, "alert");
}
