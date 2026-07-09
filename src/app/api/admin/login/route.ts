import { NextResponse } from "next/server";
import { AUTH_COOKIE, checkPassword, makeToken } from "@/lib/auth";
import {
  checkRateLimit,
  clearAttempts,
  getClientIp,
  recordFailedAttempt,
} from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: `Too many attempts. Try again in ${rate.retryAfterSec} seconds.` },
      { status: 429 },
    );
  }

  let password = "";
  try {
    const body = (await request.json()) as { password?: unknown };
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (!(await checkPassword(password))) {
    recordFailedAttempt(ip);
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  clearAttempts(ip);

  const token = await makeToken();
  const res = NextResponse.json({ ok: true, token });

  // Clear any legacy persistent cookie from previous auth model
  res.cookies.set(AUTH_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return res;
}
