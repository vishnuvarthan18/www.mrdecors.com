import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { isAuthedFromRequest } from "@/lib/auth";
import { putUpload, StorageUnavailableError } from "@/lib/storage";

const ALLOWED = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/avif", "avif"],
]);

const EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp", "avif"]);

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

function resolveExtension(file: File): string | null {
  const fromMime = ALLOWED.get(file.type);
  if (fromMime) return fromMime;

  const ext = file.name.split(".").pop()?.toLowerCase();
  if (!ext || !EXTENSIONS.has(ext)) return null;
  return ext === "jpeg" ? "jpg" : ext;
}

function contentTypeForExtension(ext: string): string {
  if (ext === "jpg") return "image/jpeg";
  return `image/${ext}`;
}

export async function POST(request: Request) {
  if (!(await isAuthedFromRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const ext = resolveExtension(file);
    if (!ext) {
      return NextResponse.json(
        { error: "Unsupported file type. Use JPG, PNG, WebP, or AVIF." },
        { status: 415 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "File too large (max 8 MB)." }, { status: 413 });
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const key = `${randomUUID()}.${ext}`;
    const contentType = file.type || contentTypeForExtension(ext);

    await putUpload(key, bytes, contentType);

    return NextResponse.json({ path: `/api/media/${key}` });
  } catch (error) {
    if (error instanceof StorageUnavailableError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("Upload failed:", error);
    return NextResponse.json({ error: "Upload failed. Please try again." }, { status: 500 });
  }
}
