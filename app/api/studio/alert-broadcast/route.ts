import { handleEmailBroadcastPost } from "@/lib/studio/handle-email-broadcast-post";

export async function POST(request: Request) {
  return handleEmailBroadcastPost(request, "alert");
}
