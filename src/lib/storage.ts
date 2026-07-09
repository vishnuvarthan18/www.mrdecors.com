import "server-only";
import { promises as fs } from "node:fs";
import path from "node:path";
import { getBindings } from "./cf";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const CONTENT_TYPES: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
};

export function contentTypeForKey(key: string): string {
  const ext = key.split(".").pop()?.toLowerCase() ?? "";
  return CONTENT_TYPES[ext] ?? "application/octet-stream";
}

export class StorageUnavailableError extends Error {
  constructor() {
    super("Image storage is not configured. Ensure the R2 bucket binding exists.");
    this.name = "StorageUnavailableError";
  }
}

export async function putUpload(
  key: string,
  bytes: Uint8Array,
  contentType: string,
): Promise<void> {
  const bindings = await getBindings();
  if (bindings?.BUCKET) {
    await bindings.BUCKET.put(key, bytes, {
      httpMetadata: { contentType },
    });
    return;
  }

  if (process.env.NODE_ENV === "development") {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOADS_DIR, key), bytes);
    return;
  }

  throw new StorageUnavailableError();
}

export async function getUpload(
  key: string,
): Promise<{ body: ReadableStream | Uint8Array; contentType: string } | null> {
  const bindings = await getBindings();
  if (bindings?.BUCKET) {
    const object = await bindings.BUCKET.get(key);
    if (!object) return null;
    return {
      body: object.body,
      contentType: object.httpMetadata?.contentType ?? contentTypeForKey(key),
    };
  }

  if (process.env.NODE_ENV === "development") {
    try {
      const file = await fs.readFile(path.join(UPLOADS_DIR, key));
      return {
        body: new Uint8Array(file),
        contentType: contentTypeForKey(key),
      };
    } catch {
      return null;
    }
  }

  return null;
}
