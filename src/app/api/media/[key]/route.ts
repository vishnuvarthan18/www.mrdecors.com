import { promises as fs } from "node:fs";
import path from "node:path";
import { getBindings } from "@/lib/cf";

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

function contentTypeFor(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  const { key } = await params;

  // Basic guard against path traversal.
  if (!key || key.includes("/") || key.includes("..")) {
    return new Response("Bad request", { status: 400 });
  }

  const cacheHeaders = {
    "Content-Type": contentTypeFor(key),
    "Cache-Control": "public, max-age=31536000, immutable",
  };

  const bindings = await getBindings();
  if (bindings?.BUCKET) {
    const object = await bindings.BUCKET.get(key);
    if (!object) return new Response("Not found", { status: 404 });
    return new Response(object.body, { headers: cacheHeaders });
  }

  // Local filesystem (dev)
  try {
    const file = await fs.readFile(path.join(process.cwd(), "public", "uploads", key));
    return new Response(new Uint8Array(file), { headers: cacheHeaders });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
