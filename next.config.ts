import type { NextConfig } from "next";

// This site is served by Cloudflare Workers via the OpenNext adapter
// (see wrangler.jsonc / open-next.config.ts), which needs server rendering
// and API routes. Do NOT set `output: "export"` — that static mode is
// incompatible with the admin CMS, D1, and R2.
const nextConfig: NextConfig = {};

export default nextConfig;
