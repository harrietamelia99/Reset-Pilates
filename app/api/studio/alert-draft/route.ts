import { handleEmailDraftPost } from "@/lib/studio/handle-email-draft-post";

export async function POST(request: Request) {
  return handleEmailDraftPost(request, "alert");
}
