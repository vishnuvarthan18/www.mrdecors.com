import "server-only";
import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Cloudflare bindings, available only inside the Workers runtime (production
 * or `npm run preview`). During plain `next dev` there is no Cloudflare
 * context, so this resolves to null and callers fall back to local storage.
 */
export type AppBindings = {
  DB?: D1Database;
  BUCKET?: R2Bucket;
};

export async function getBindings(): Promise<AppBindings | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    return (env ?? null) as AppBindings | null;
  } catch {
    return null;
  }
}
