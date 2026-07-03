import "server-only";
import { cookies } from "next/headers";
import crypto from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const AUTH_COOKIE = "mrd_admin";

/**
 * Read a secret from the Cloudflare env (production/preview via
 * `wrangler secret put`), falling back to process.env / .env.local for
 * local `next dev`.
 */
async function getEnvVar(name: "ADMIN_PASSWORD" | "ADMIN_SESSION_SECRET"): Promise<string> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as Record<string, unknown>)[name];
    if (typeof value === "string" && value) return value;
  } catch {
    /* not in a Cloudflare context (plain next dev) */
  }
  return process.env[name] ?? "";
}

async function getSessionSecret(): Promise<string> {
  return (await getEnvVar("ADMIN_SESSION_SECRET")) || "dev-insecure-secret-change-me";
}

function sign(value: string, secret: string): string {
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}

export async function makeToken(): Promise<string> {
  const secret = await getSessionSecret();
  const payload = "authed";
  return `${payload}.${sign(payload, secret)}`;
}

export async function verifyToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const secret = await getSessionSecret();
  return safeEqual(sig, sign(payload, secret));
}

export async function checkPassword(password: string): Promise<boolean> {
  const expected = await getEnvVar("ADMIN_PASSWORD");
  if (!expected) return false;
  return safeEqual(password, expected);
}

export async function isAuthed(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(AUTH_COOKIE)?.value);
}
