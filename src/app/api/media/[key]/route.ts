import { getUpload } from "@/lib/storage";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;

  // Basic guard against path traversal.
  if (!key || key.includes("/") || key.includes("..")) {
    return new Response("Bad request", { status: 400 });
  }

  const object = await getUpload(key);
  if (!object) return new Response("Not found", { status: 404 });

  return new Response(object.body as BodyInit, {
    headers: {
      "Content-Type": object.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
